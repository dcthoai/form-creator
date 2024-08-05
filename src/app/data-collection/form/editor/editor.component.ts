import { ChangeDetectorRef, Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ElementRef, EventEmitter, HostListener} from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { closeAllQuestionEditor, closeAllTextEditor, closeFormTitleEditor, moveFormControlToPosition } from '../form.utils';
import { EDITOR_CONFIG } from '../form.constants';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    // Angular will not add unique value to selectors, css is applied globally instead of just this component
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {
    @Input() editorId: string;
    @Input() customClass: string;
    @Input() editorContent: string;
    @Input() editorConfig: AngularEditorConfig = EDITOR_CONFIG;
    @Output() editorClick = new EventEmitter<void>();
    @Output() editorResult = new EventEmitter<string>();

    constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.cdr.detectChanges();   // in this case to avoid ExpressionChangedAfterItHasBeenCheckedError
    }

    sendData(): void {
        console.log('Data before send: ', this.editorContent);

        this.editorResult.emit(this.editorContent);
    }

    openEditor(event: Event): void {
        const e = event.currentTarget as HTMLElement;
        const parentQuestionElement = e.closest('.question');
        const parentFormTitleElement = e.closest('.form .form__title');

        if (parentQuestionElement) {
            closeFormTitleEditor();
            closeAllQuestionEditor();
            parentQuestionElement.classList.add('active');
            moveFormControlToPosition(parentQuestionElement as HTMLElement);
        }

        if (parentFormTitleElement) {
            closeAllQuestionEditor();
            parentFormTitleElement.classList.add('active');
            moveFormControlToPosition(parentFormTitleElement as HTMLElement);
        }

        event.stopPropagation();    // Prevent click events from spreading to parent element
        closeAllTextEditor();
        this.editorClick.emit();
        const element = event.currentTarget as HTMLElement;
        element.classList.add('active');
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        // Close all text editors when clicking outside
        if (!this.elementRef.nativeElement.contains(event.target)) {
            closeFormTitleEditor();
            closeAllTextEditor();
        }
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(): void {
        const scrollPosition = window.scrollY || 0;
        const viewportHeight = window.innerHeight;
        const formControlElement = document.querySelector('.form .form__control') as HTMLElement;
        const rect = formControlElement.getBoundingClientRect(); // Current form control position

        if (rect.top < 80)  // Exceeds the top of the screen
            moveFormControlToPosition(scrollPosition);
        else {
            if (rect.bottom > viewportHeight)   // Exceeds the bottom of the screen
                moveFormControlToPosition(scrollPosition + viewportHeight - 250);
            else {
                // Move form control to the position of the active editor
                const currentSectionActive = document.querySelector('.form__title.active, .question.active');

                if (currentSectionActive)
                    moveFormControlToPosition(currentSectionActive as HTMLElement);
            }
        }
    }
}
