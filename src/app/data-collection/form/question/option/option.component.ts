import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { EDITOR_CONFIG_OPTION, EDITOR_CLASS_OPTION, OptionDetails, QUESTION_TYPE_SORTTEXT, QUESTION_TYPE_LONGTEXT, QUESTION_TYPE_DATE, QUESTION_TYPE_TIME } from '../../form.constants';
import { QUESTION_TYPE_CHECKBOX, QUESTION_TYPE_DROPDOWN, QUESTION_TYPE_RADIO } from '../../form.constants';

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
    @Input() optionIndex: number;
    @Input() optionType: string;
    @Input() optionDetails: OptionDetails;
    @Output() optionResult = new EventEmitter<OptionDetails>();
    @Output() optionDeleteIndex = new EventEmitter<number>();
    public questionTemplateType: TemplateRef<any>;

    // Custom config for text editor
    public EDITOR_CONFIG_OPTION = EDITOR_CONFIG_OPTION;
    public EDITOR_CLASS_OPTION = EDITOR_CLASS_OPTION;

    @ViewChild('typeQuestionRadio') templateRadio: TemplateRef<any>;
    @ViewChild('typeQuestionCheckbox') templateCheckbox: TemplateRef<any>;
    @ViewChild('typeQuestionDropdown') templateDropdown: TemplateRef<any>;
    @ViewChild('typeQuestionSortText') templateSortText: TemplateRef<any>;
    @ViewChild('typeQuestionLongText') templateLongText: TemplateRef<any>;
    @ViewChild('typeQuestionDate') templateDate: TemplateRef<any>;
    @ViewChild('typeQuestionTime') templateTime: TemplateRef<any>;

    ngOnInit() {
        this.setTemplateByQuestionType();
    }

    setTemplateByQuestionType(): void {
        // Check the type and set the corresponding template
        switch (this.optionType) {
            case QUESTION_TYPE_CHECKBOX.name:
                this.questionTemplateType = this.templateCheckbox;
                break;

            case QUESTION_TYPE_DROPDOWN.name:
                this.questionTemplateType = this.templateDropdown;
                break;

            case QUESTION_TYPE_RADIO.name:
                this.questionTemplateType = this.templateRadio;
                break;

            case QUESTION_TYPE_SORTTEXT.name:
                this.questionTemplateType = this.templateSortText;
                break;

            case QUESTION_TYPE_LONGTEXT.name:
                this.questionTemplateType = this.templateLongText;
                break;

            case QUESTION_TYPE_DATE.name:
                this.questionTemplateType = this.templateDate;
                break;

            case QUESTION_TYPE_TIME.name:
                this.questionTemplateType = this.templateTime;
                break;
        }
    }

    // Send data to parent component
    handleEditorResult(data: string): void {
        this.optionDetails.content = data;
        this.optionResult.emit(this.optionDetails);
    }

    deleteQuestionOptionRequest(): void {
        this.optionDeleteIndex.emit(this.optionIndex);
    }
}
