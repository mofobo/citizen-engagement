import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {DataModule} from '../data/data.module';
import {IssueListComponent} from './issue-list/issue-list.component';
import {MatTableModule} from '@angular/material/table';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    DataModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    IssueListComponent,
    LoginComponent
  ],
  exports: [
    IssueListComponent,
    LoginComponent
  ],
  providers: []
})
export class PresentationModule {
}
