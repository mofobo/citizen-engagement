import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/security/guards/auth.guard';
import {LoginComponent} from './presentation/login/login.component';
import {IssueListComponent} from './presentation/issue-list/issue-list.component';
import {CreateIssueComponent} from './presentation/create-issue/create-issue.component';
import {IssueDetailsComponent} from './presentation/issue-details/issue-details.component';
import {IssuesMapComponent} from './presentation/issues-map/issues-map.component';


const routes: Routes = [
  // Add this default route to redirect to issues
  {path: '', redirectTo: 'issues', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'issues', component: IssueListComponent, canActivate: [AuthGuard]},
  {path: 'issues-map', component: IssuesMapComponent, canActivate: [AuthGuard]},
  {path: 'issues/:id', component: IssueDetailsComponent, canActivate: [AuthGuard]},
  {path: 'create-issue', component: CreateIssueComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
