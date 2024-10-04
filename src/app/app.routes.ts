import { Route } from '@angular/router';
import { BasicLayoutViewComponent } from './basic-layout-view/basic-layout-view.component';
import { LoginComponent } from '../libs/shared/data-access-mfdata/login/login.component';
import { LogoutComponent } from '../libs/shared/data-access-mfdata/logout/logout.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { TenanteditorComponent } from '../libs/tenanteditor/tenanteditor/tenanteditor.component';
import { InstrumenteditorComponent } from '../libs/instrumenteditor/instrumenteditor/instrumenteditor.component';
import { TransactioneditorComponent } from '../libs/transactioneditor/transactioneditor/transactioneditor.component';
import { MassloadComponent } from '../libs/transactioneditor/massload/massload.component';
import { AssetviewComponent } from '../libs/assetview/assetview/assetview.component';
import { RecurrenttransactioneditorComponent } from '../libs/recurrenttransactioneditor/recurrenttransactioneditor/recurrenttransactioneditor.component';
import { SecurityAnalysisViewComponent } from '../libs/securityanalysisview/security-analysis-view/security-analysis-view.component';
import { PriceEditorComponent } from '../libs/priceeditor/price-editor/price-editor.component';

export const appRoutes: Route[] = [  
   /* {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },*/
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
        path: 'priceeditor',
        component: PriceEditorComponent,
      },
      {
        path: 'transactionmassload',
        component: MassloadComponent,
      },
      {
        path: 'recurrenttransactioneditor',
        component: RecurrenttransactioneditorComponent,
      },
      {
        path: 'assetview',
        component: AssetviewComponent,
      },      
      {
        path: 'securityanalysisview',
        component: SecurityAnalysisViewComponent,
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
