import { ApplicationConfig,  inject,  provideAppInitializer,  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

function initializeApp(config:ConfigService) {
  return config.loadObservable();
}
export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection(),
    provideRouter(routes),
      provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        provideHttpClient(),
        provideAppInitializer(()=>initializeApp(inject(ConfigService))),
  ]
};
