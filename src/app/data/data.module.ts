import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {IssueRepository} from '../core/repositories/issue.repository';
import {IssueWebRepository} from './repository/issue-web-repository/issue-web.repository';
import {AuthRepository} from '../core/repositories/auth.repository';
import {AuthWebRepository} from './repository/auth-web-repository/auth-web.repository';
import {LocalStorageRepository} from '../core/repositories/local-storage.repository';
import {LocalstorageLocalRepository} from './repository/localstorage-local-repository/localstorage-local.repository';
import {UserRepository} from '../core/repositories/user.repository';
import {UserWebRepository} from './repository/user-web-repository/user-web.repository';
import {IssueTypeRepository} from '../core/repositories/issue-type.repository';
import {IssueTypeWebRepository} from './repository/issue-type-web-repository/issue-type-web.repository';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    {provide: IssueRepository, useClass: IssueWebRepository},
    {provide: IssueTypeRepository, useClass: IssueTypeWebRepository},
    {provide: UserRepository, useClass: UserWebRepository},
    {provide: AuthRepository, useClass: AuthWebRepository},
    {provide: LocalStorageRepository, useClass: LocalstorageLocalRepository}
  ],
  exports: []
})
export class DataModule {
}
