import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NotFoundViewComponent} from './views/not-found-view/not-found-view.component';
import {ErrorViewComponent} from './views/error-view/error-view.component';
import {HomeComponent} from './views/home-view/home.component';
import {TopNavigationComponent} from './shared/components/top-navigation/top-navigation.component';
import {BasicLayoutComponent} from './shared/components/basic-layout/basic-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

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
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
