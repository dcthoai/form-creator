import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routers: Routes = [
    {
        path: '',
        loadChildren: './data-collection/data-collection.module#DataCollectionModule'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routers)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
