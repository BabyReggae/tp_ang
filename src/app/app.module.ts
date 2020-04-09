import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { PostComponent } from './post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotFound404Component } from './not-found404/not-found404.component';
import { AuthGuard } from './services/authGuard.service';
import { AppareilEditComponent } from './appareil-edit/appareil-edit.component';


const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },

  { path: 'appareils', canActivate : [ AuthGuard ],component: AppareilViewComponent },
  { path: 'edit', canActivate : [ AuthGuard ],component: AppareilEditComponent },


  { path: '', component: AuthComponent },
  { path : 'not-found', component : NotFound404Component },
  { path : '**', redirectTo : 'not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    PostComponent,
    AuthComponent,
    AppareilViewComponent,
    NotFound404Component,
    AppareilEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
