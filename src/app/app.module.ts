import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComposantTestComponent } from './composant-test/composant-test.component';
import { AppareilComponent } from './appareil/appareil.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    ComposantTestComponent,
    AppareilComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
