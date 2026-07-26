import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';
import { JwtInterceptor } from '../utils/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    ),
    importProvidersFrom(FormsModule)
  ]
};
