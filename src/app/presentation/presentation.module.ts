import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {DataModule} from '../data/data.module';
import {IssueListComponent} from './issue-list/issue-list.component';
import {MatTableModule} from '@angular/material/table';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {BrowserModule} from '@angular/platform-browser';
import {CreateIssueComponent} from './create-issue/create-issue.component';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {IssueDetailsComponent} from './issue-details/issue-details.component';
import { IssuesMapComponent } from './issues-map/issues-map.component';
import {RouterModule} from '@angular/router';
import { ModifyIssueComponent } from './modify-issue/modify-issue.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DataModule,
    BrowserModule,
    FormsModule,
    CdkTableModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    RouterModule,
  ],
  declarations: [
    IssueListComponent,
    LoginComponent,
    CreateIssueComponent,
    IssueDetailsComponent,
    IssuesMapComponent,
    ModifyIssueComponent,
  ],
  exports: [
    IssueListComponent,
    LoginComponent
  ],
  providers: []
})
export class PresentationModule {
}
