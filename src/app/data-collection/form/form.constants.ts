import { AngularEditorConfig } from '@kolkov/angular-editor';

/*  This custom configuration allows changing the appearance and functionality
    for different types of text editors.
*/

export const EDITOR_CONFIG: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Roboto',
    minHeight: '22px',
    toolbarPosition: 'bottom',
    showToolbar: true,
    enableToolbar: true,
    placeholder: 'Enter text here...',
    sanitize: true,
};

export const EDITOR_CONFIG_TITLE: AngularEditorConfig = {
    ...EDITOR_CONFIG,
    placeholder: 'Tiêu đề biểu mẫu'
};

export const EDITOR_CONFIG_DESCRIPTION: AngularEditorConfig = {
    ...EDITOR_CONFIG,
    placeholder: 'Mô tả biểu mẫu'
};

export const EDITOR_CONFIG_QUESTION: AngularEditorConfig = {
    ...EDITOR_CONFIG,
    placeholder: 'Nội dung câu hỏi'
};

export const EDITOR_CONFIG_OPTION: AngularEditorConfig = {
    ...EDITOR_CONFIG,
    showToolbar: false
};

// Custom class to change editor view
export const EDITOR_CLASS_TITLE: string = 'editor-title';
export const EDITOR_CLASS_DESCRIPTION: string = 'editor-description';
export const EDITOR_CLASS_QUESTION: string = 'editor-question';
export const EDITOR_CLASS_OPTION: string = 'editor-option';

export const QUESTION_TYPE_CHECKBOX: QuestionType = {
    name: 'checkbox',
    description: 'Nhiều lựa chọn'
};

export const QUESTION_TYPE_RADIO: QuestionType = {
    name: 'radio',
    description: 'Trắc nghiệm'
};

export const QUESTION_TYPE_DROPDOWN: QuestionType = {
    name: 'dropdown',
    description: 'Menu'
};

export const QUESTION_TYPE_SORTTEXT: QuestionType = {
    name: 'sort-text',
    description: 'Trả lời ngắn'
};

export const QUESTION_TYPE_LONGTEXT: QuestionType = {
    name: 'long-text',
    description: 'Đoạn văn'
};

export const QUESTION_TYPE_DATE: QuestionType = {
    name: 'date',
    description: 'Ngày tháng'
};

export const QUESTION_TYPE_TIME: QuestionType = {
    name: 'time',
    description: 'Giờ'
};

export interface QuestionType {
    name: string;
    description: string;
}

export interface OptionDetails {
    id: string;
    content: string;
    index: number;
}

export interface QuestionDetails {
    id: string;
    formId: string;
    index: number;
    name: string;
    isRequired: boolean;
    type: QuestionType;
    options: OptionDetails[];
}

export interface FormData {
    id: string;
    title: string;
    description: string;
    questions: QuestionDetails[];
}
