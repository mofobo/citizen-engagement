import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/security/guards/auth.guard';
import {LoginComponent} from './presentation/login/login.component';
import {IssueListComponent} from './presentation/issue-list/issue-list.component';
import {CreateIssueComponent} from './presentation/create-issue/create-issue.component';


const routes: Routes = [
  // Add this default route to redirect to issues
  {path: '', redirectTo: 'issues', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'issues', component: IssueListComponent, canActivate: [AuthGuard]},
  {path: 'create-issue', component: CreateIssueComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
