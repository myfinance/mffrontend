import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NotFoundViewComponent} from './views/not-found-view/not-found-view.component';
import {ErrorViewComponent} from './views/error-view/error-view.component';
import {HomeComponent} from './views/home-view/home.component';
import {TopNavigationComponent} from './shared/components/top-navigation/top-navigation.component';
import {BasicLayoutComponent} from './shared/components/basic-layout/basic-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundViewComponent,
    ErrorViewComponent,
    HomeComponent,
    TopNavigationComponent,
    BasicLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
