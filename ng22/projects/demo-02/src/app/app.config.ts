import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ERROR_LEVEL } from './core/services/logger';
import { environment } from '../environments/environment';

import LocaleES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(LocaleES);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    {
      provide: ERROR_LEVEL,
      useValue: environment.logLevel
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
};
