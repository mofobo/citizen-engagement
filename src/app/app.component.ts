import {Component} from '@angular/core';
import {AuthService} from './security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Citizen Engagement';

  constructor(private auth: AuthService, private router: Router) {
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
