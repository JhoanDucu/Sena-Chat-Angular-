import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterLink, RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(FormsModule, ReactiveFormsModule, HttpClientModule)
  ]
};
