import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutUsecase} from './core/usecases/logout.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Citizen Engagement';

  constructor(private logoutUsecase: LogoutUsecase, private router: Router) {
  }

  logout(): void {
    this.logoutUsecase.execute().subscribe();
    this.router.navigateByUrl('/login');
  }
}
