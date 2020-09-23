import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {IssueRepository} from '../core/repositories/issue.repository';
import {IssueWebRepository} from './repository/remote/issue-web.repository';
import {AuthRepository} from '../core/repositories/auth.repository';
import {AuthWebRepository} from './repository/remote/auth-web.repository';
import {LocalStorageRepository} from '../core/repositories/local-storage.repository';
import {LocalstorageLocalRepository} from './repository/local/localstorage-local.repository';
import {UserRepository} from '../core/repositories/user.repository';
import {UserWebRepository} from './repository/remote/user-web.repository';
import {IssueTypeRepository} from '../core/repositories/issue-type.repository';
import {IssueTypeWebRepository} from './repository/remote/issue-type-web.repository';
import {ApiInformationRepository} from '../core/repositories/api-information.repository';
import {ApiInformationWebRepository} from './repository/remote/api-information-web.repository';

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
    {provide: LocalStorageRepository, useClass: LocalstorageLocalRepository},
    {provide: ApiInformationRepository, useClass: ApiInformationWebRepository}
  ],
  exports: []
})
export class DataModule {
}
