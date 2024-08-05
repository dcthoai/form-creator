import { ChangeDetectorRef, Component } from '@angular/core';
import { EDITOR_CONFIG_TITLE, EDITOR_CONFIG_DESCRIPTION, FormData } from './form.constants';
import { QUESTION_TYPE_RADIO } from './form.constants';
import { EDITOR_CLASS_TITLE, EDITOR_CLASS_DESCRIPTION } from './form.constants';
import { moveFormControlToPosition } from './form.utils';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent {
    // Const custom config for text editor
    EDITOR_CONFIG_TITLE = EDITOR_CONFIG_TITLE;
    EDITOR_CONFIG_DESCRIPTION = EDITOR_CONFIG_DESCRIPTION;
    EDITOR_CLASS_TITLE = EDITOR_CLASS_TITLE;
    EDITOR_CLASS_DESCRIPTION = EDITOR_CLASS_DESCRIPTION;

    constructor(private cdr: ChangeDetectorRef) {}

    public formData: FormData = {
        id: null,
        title: 'Mẫu không có tiêu đề',
        description: 'Mô tả biểu mẫu',
        questions: []
    };

    addNewQuestion(): void {
        this.formData.questions.push({
            id: this.formData.questions.length + '',
            formId: this.formData.id + '',
            index: this.formData.questions.length,
            name: 'Câu hỏi',
            isRequired: false,
            type: QUESTION_TYPE_RADIO,
            options: []
        });

        this.cdr.detectChanges();
    }

    cloneQuestion(questionIndex: number): void {
        const questionToClone = this.formData.questions[questionIndex];
        // Deep copy to avoid referring to the same variable
        const newQuestion = JSON.parse(JSON.stringify(questionToClone));
        
        this.formData.questions.splice(questionIndex + 1, 0, newQuestion);
        // Update question index after delete
        this.formData.questions.forEach((question, index) => {
            question.index = index;
        });

        this.cdr.detectChanges();
    }

    deleteQuestion(questionIndex: number): void {
        if (questionIndex >= 0 && this.formData.questions.length > 0) {
            this.formData.questions.splice(questionIndex, 1);

            // Update question index after delete
            this.formData.questions.forEach((question, index) => {
                question.index = index;
            });
        }

        moveFormControlToPosition(window.scrollY);
    }

    updateQuestionData(newQuestionContent: any): void {
        this.formData.questions[newQuestionContent.index] = newQuestionContent.content;
    }

    updateFormTitle(newTitle: string): void {
        this.formData.title = newTitle;
    }

    updateFormDescription(newDescription: string): void {
        this.formData.description = newDescription;
    }

    viewData(): void {
        this.formData = JSON.parse(JSON.stringify(this.formData));
        this.cdr.detectChanges();
        console.log(this.formData);
    }
}
