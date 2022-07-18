import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MissingTranslationService } from '@app/core/services/missing-translation.service';

import { LayoutModule } from '@app/layout/layout.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '@environment/environment';
import { SharedModule } from '@shared/shared.module';
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({type: 'pacman'}),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
      // registrationStrategy: 'registerImmediately'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
      defaultLanguage: environment.defaultLocale
    }),
    LayoutModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorInterceptor
    },
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: {
        baseUrl: environment.apiUrl
      }
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

export function HttpLoaderFactory (http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
