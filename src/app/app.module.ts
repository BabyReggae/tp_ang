import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';//?
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
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { CanvasComponent } from './canvas/canvas.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from './alert';

import { AccValidationComponent } from './acc-validation/acc-validation.component';
import { SoloGameComponent } from './solo-game/solo-game.component';
import { ShopComponent } from './shop/shop.component';
import { ProfilComponent } from './profil/profil.component';
import { RankComponent } from './rank/rank.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuService } from './services/menu.service';
import { MenuComponent } from './menu/menu.component';
import { ShopSkinComponent } from './shop-skin/shop-skin.component';
import { ShopOwnedComponent } from './shop-owned/shop-owned.component';
import { ShopPromotionComponent } from './shop-promotion/shop-promotion.component';





const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path : 'account-validation/:token', component: AccValidationComponent  },

  { path: 'appareils', canActivate : [ AuthGuard ],component: AppareilViewComponent },
  { path: 'edit', canActivate : [ AuthGuard ],component: AppareilEditComponent },
  { path: 'user', canActivate : [ AuthGuard ],component: UserListComponent },

  /** main APPs Routes */
  { path : 'root', canActivate : [ AuthGuard ], redirectTo : 'sologame' },
  { path: 'sologame', canActivate : [ AuthGuard ],component: SoloGameComponent },
  { path: 'shop', canActivate : [ AuthGuard ],component: ShopComponent },
  { path: 'profil', canActivate : [ AuthGuard ],component: ProfilComponent },
  { path: 'rank', canActivate : [ AuthGuard ],component: RankComponent },
  { path: 'settings', canActivate : [ AuthGuard ],component: SettingsComponent },
  { path: 'logout', canActivate : [ AuthGuard ],component: LogoutComponent },
  /** end main routes */

  /** SHOP */
  { path: 'shopowned', canActivate : [ AuthGuard ],component: ShopOwnedComponent },
  { path: 'shoppromotion', canActivate : [ AuthGuard ],component: ShopPromotionComponent },


  /** special routes  */
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
    AppareilEditComponent,
    UserListComponent,
    CanvasComponent,
    AccValidationComponent,
    SoloGameComponent,
    ShopComponent,
    ProfilComponent,
    RankComponent,
    SettingsComponent,
    LogoutComponent,
    MenuComponent,
    ShopSkinComponent,
    ShopOwnedComponent,
    ShopPromotionComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    AlertModule,
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGuard,
    UserService,
    HttpClientModule,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


  
}
