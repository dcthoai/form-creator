import { Component, ElementRef } from '@angular/core';
import { EDITOR_CONFIG_TITLE, EDITOR_CONFIG_DESCRIPTION, FormData } from './form.constants';
import { QUESTION_TYPE_CHECKBOX, QUESTION_TYPE_RADIO } from './form.constants';
import { EDITOR_CLASS_TITLE, EDITOR_CLASS_DESCRIPTION } from './form.constants';
import { closeAllQuestionEditor, closeFormTitleEditor, moveFormControlToPosition } from './form.utils';

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

    constructor(private elementRef: ElementRef) {}

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
    }

    cloneQuestion(questionIndex: number): void {

    }

    deleteQuestion(questionIndex: number): void {
        if (questionIndex >= 0 && this.formData.questions.length > 0)
            this.formData.questions.splice(questionIndex, 1);
        
        moveFormControlToPosition(window.scrollY);
    }
}
