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
    @Output() questionUpdateData = new EventEmitter<any>();

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
        if (this.questionDetails.options.length === 0) {
            this.questionDetails.options.push({
                id: '',
                content: 'Tùy chọn',
                index: 1
            });

            this.sendData();
        }
    }

    sendData(): void {
        this.questionUpdateData.emit({content: this.questionDetails, index: this.questionIndex});
    }

    updateQuestionName(newQuestionName: string) {
        this.questionDetails.name = newQuestionName;
        this.sendData();
    }

    updateQuestionOptionContent(newQuestionOption: any) {
        this.questionDetails.options[newQuestionOption.index] = newQuestionOption.option;
        this.sendData();
    }

    setQuestionType(questionType: QuestionType) {
        this.questionDetails.type = questionType;
        // Actions are just a way to make angular detect data changes and update the view
        this.questionDetails = JSON.parse(JSON.stringify(this.questionDetails));

        if (!this.isQuestionOptions()) {
            // Convert the question to a single answer format
            this.questionDetails.options = [{
                id: '',
                content: 'Tùy chọn',
                index: null
            }]
        }

        this.sendData();
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

        this.sendData();
    }

    deleteQuestionOption(questionOptionIndex: number): void {
        // Only delete when there are more than 1 options
        if (questionOptionIndex >= 0 && this.questionDetails.options.length > 1) {
            this.questionDetails.options.splice(questionOptionIndex, 1);
            this.sendData();
        }
    }

    cloneQuestionRequest(): void {
        this.questionCloneIndex.emit(this.questionIndex);
    }

    deleteQuestionRequest(): void {
        this.questionDeleteIndex.emit(this.questionIndex);
    }

    toggleQuestionRequired(): void {
        this.questionDetails.isRequired = !this.questionDetails.isRequired;
        this.sendData();
    }
}
