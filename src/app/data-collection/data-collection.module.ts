import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { EditorComponent } from './form/editor/editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DataCollectionComponent } from './data-collection.component';
import { AnswerComponent } from './answer/answer.component';
import { SettingComponent } from './setting/setting.component';
import { QuestionComponent } from './form/question/question.component';
import { OptionComponent } from './form/question/option/option.component';

const routes: Routes = [
    { path: '', component: DataCollectionComponent },
    { path: 'answers', component: FormComponent },
    { path: 'setting', component: FormComponent }
];

@NgModule({
    declarations: [
        DataCollectionComponent,
        AnswerComponent,
        SettingComponent,
        FormComponent,
        EditorComponent,
        QuestionComponent,
        OptionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularEditorModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        DataCollectionComponent
    ]
})
export class DataCollectionModule { }
