import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import {Landing} from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from './api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TendersComponent} from './tenders/tenders.component';
import {TenderService} from './tenders/tender.service';
import {TenderComponent} from './tenders/tender/tender.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TenderUpdateComponent} from './tenders/tender-update/tender-update.component';
import {TenderCreateComponent} from './tenders/tender-create/tender-create.component';

const appRoutes: Routes = [
  { path: 'tenders', component: TendersComponent },
  { path: 'tenders/:tender', component: TenderComponent },
  { path: '', component: Landing },
];

@NgModule({
    declarations: [
        AppComponent,
        TendersComponent,
        TenderComponent,
        TenderUpdateComponent,
        TenderCreateComponent,
        Landing,
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
        {enableTracing: false} // <-- debugging purposes only
       ),
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        InfiniteScrollModule,
        NgxSpinnerModule,
        ModalModule,
        ToastrModule.forRoot(),
        TooltipModule,
        PopoverModule,
        ButtonsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    entryComponents: [
        TenderComponent
    ],
    providers: [
      ApiService,
      TenderService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
