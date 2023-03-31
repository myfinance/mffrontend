import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundViewComponent} from './views/not-found-view/not-found-view.component';
import {ErrorViewComponent} from './views/error-view/error-view.component';
import {HomeComponent} from './views/home-view/home.component';
import {BasicLayoutComponent} from './shared/components/basic-layout/basic-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '', component: BasicLayoutComponent,
    children: [
      {
        path: 'not_found',
        component: NotFoundViewComponent
      },
      {
        path: 'error',
        component: ErrorViewComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not_found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
