import { Route } from '@angular/router';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { TenanteditorComponent } from '@mffrontend/tenanteditor';
import { AssetviewComponent } from '@mffrontend/assetview';
import { InstrumenteditorComponent } from '@mffrontend/instrumenteditor';
import { TransactioneditorComponent } from '@mffrontend/transactioneditor';
import { LoginComponent, LogoutComponent } from '@mffrontend/shared/data-access-mfdata';

export const appRoutes: Route[] = [  {
    path: '',
    redirectTo: '',
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
        path: '',
        component: HomeViewComponent,
      },
      {
        path: 'tenanteditor',
        component: TenanteditorComponent,
      },
      {
        path: 'instrumenteditor',
        component: InstrumenteditorComponent,
      },
      {
        path: 'transactioneditor',
        component: TransactioneditorComponent,
      },
      {
        path: 'assetview',
        component: AssetviewComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'not_found',
  },
];
