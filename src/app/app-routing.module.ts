import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './presentation/login/login.component';
import {AuthGuard} from './core/security/guards/auth.guard';
import {IssueListComponent} from './presentation/issue-list/issue-list.component';


const routes: Routes = [
  // Add this default route to redirect to issues
  {path: '', redirectTo: 'issues', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  // Add the route to display the issues page
  {
    path: 'issues',
    component: IssueListComponent,
    // Prevent access to this page to unauthenticated users
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
