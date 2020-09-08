import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IssueRepository} from '../core/repositories/issue.repository';
import {IssueWebRepository} from './repository/issue-web-repository/issue-web.repository';
import {AuthRepository} from '../core/repositories/auth.repository';
import {AuthWebRepository} from './repository/auth-web-repository/auth-web.repository';
import {LocalStorageRepository} from '../core/repositories/local-storage.repository';
import {LocalstorageLocalRepository} from './repository/localstorage-local-repository/localstorage-local.repository';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    {provide: IssueRepository, useClass: IssueWebRepository},
    {provide: AuthRepository, useClass: AuthWebRepository},
    {provide: LocalStorageRepository, useClass: LocalstorageLocalRepository}
  ],
  exports: []
})
export class DataModule {
}
