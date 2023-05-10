import { Route } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';

export const appRoutes: Route[] = [  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BasicLayoutViewComponent,
    children: [
      {
        path: 'not_found',
        component: NotFoundViewComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not_found',
  },
];
