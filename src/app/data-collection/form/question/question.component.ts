import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EDITOR_CONFIG_QUESTION, QuestionDetails, QuestionType } from '../form.constants';
import { QUESTION_TYPE_CHECKBOX, QUESTION_TYPE_RADIO, QUESTION_TYPE_DROPDOWN } from '../form.constants';
import { QUESTION_TYPE_TIME, QUESTION_TYPE_LONGTEXT, QUESTION_TYPE_DATE, QUESTION_TYPE_SORTTEXT } from '../form.constants';
import { EDITOR_CLASS_QUESTION } from '../form.constants';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    @Input() questionDetails: QuestionDetails;
    @Input() questionIndex: number;
    @Output() questionCloneIndex = new EventEmitter<number>();
    @Output() questionDeleteIndex = new EventEmitter<number>();

    // Const custom config for text editor
    EDITOR_CONFIG_QUESTION: AngularEditorConfig = EDITOR_CONFIG_QUESTION;

    EDITOR_CLASS_QUESTION: string = EDITOR_CLASS_QUESTION;

    QUESTION_TYPE_RADIO: QuestionType = QUESTION_TYPE_RADIO;
    QUESTION_TYPE_CHECKBOX: QuestionType = QUESTION_TYPE_CHECKBOX;
    QUESTION_TYPE_DROPDOWN: QuestionType = QUESTION_TYPE_DROPDOWN;
    QUESTION_TYPE_LONGTEXT: QuestionType = QUESTION_TYPE_LONGTEXT;
    QUESTION_TYPE_SORTTEXT: QuestionType = QUESTION_TYPE_SORTTEXT;
    QUESTION_TYPE_DATE: QuestionType = QUESTION_TYPE_DATE;
    QUESTION_TYPE_TIME: QuestionType = QUESTION_TYPE_TIME;

    ngOnInit(): void {
        // Add a default answer when the question is initialized
        this.questionDetails.options.push({
            id: '',
            content: 'Tùy chọn',
            index: 1
        });
    }

    setQuestionType(questionType: QuestionType) {
        this.questionDetails.type = questionType;

        if (!this.isQuestionOptions()) {
            // Convert the question to a single answer format
            this.questionDetails.options = [{
                id: '',
                content: '',
                index: null
            }]
        }
    }

    isQuestionOptions(): boolean {
        return this.questionDetails.type.name === 'radio' ||
               this.questionDetails.type.name === 'checkbox' ||
               this.questionDetails.type.name === 'dropdown';
    }

    addNewQuestionOption(): void {
        this.questionDetails.options.push({
            id: null,
            content: 'Tùy chọn',
            index: this.questionDetails.options.length + 1
        });
    }

    deleteQuestionOption(questionOptionIndex: number): void {
        // Only delete when there are more than 1 options
        if (questionOptionIndex >= 0 && this.questionDetails.options.length > 1)
            this.questionDetails.options.splice(questionOptionIndex, 1);
    }

    cloneQuestionRequest(): void {
        this.questionCloneIndex.emit(this.questionIndex);
    }

    deleteQuestionRequest(): void {
        this.questionDeleteIndex.emit(this.questionIndex);
    }

    toggleQuestionRequired(): void {
        this.questionDetails.isRequired = !this.questionDetails.isRequired;
    }
}
