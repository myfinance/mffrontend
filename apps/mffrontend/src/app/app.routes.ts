import { Route } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { TenanteditorShellComponent } from '@mffrontend/tenanteditor/shell';

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
      {
        path: 'home',
        component: HomeViewComponent,
      },
      {
        path: 'tenanteditor',
        component: TenanteditorShellComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'not_found',
  },
];
