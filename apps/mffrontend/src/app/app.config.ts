import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import { MfconfigService } from '@mffrontend/shared/data-access-mfconfig';

/**
 * Loads the configuration of the given configuration service.
 * @param configService The configuration service to be used to load the configuration.
 */
export function initConfiguration(configService: MfconfigService) {
  return () => configService.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations()/*,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfiguration,
      deps: [MfconfigService],
      multi: true
    }*/
  ],
};


