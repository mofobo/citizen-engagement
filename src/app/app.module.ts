import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DummyPageComponent} from './dummy-page/dummy-page.component';
import {SecurityModule} from './security/security.module';
import {ApiTokenInterceptorService} from './api/ap-token-interceptor.service';
import {IssueComponent} from './issue/issue.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DummyPageComponent,
    IssueComponent
  ],
  imports: [
    SecurityModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
