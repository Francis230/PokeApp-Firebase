// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules, RouteReuseStrategy } from '@angular/router';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),                   // Importa todo lo necesario para Ionic
    provideAnimations(),                     // Animaciones de Angular e Ionic
    provideHttpClient(),                     // HTTPClient para llamadas HTTP
    provideRouter(routes, withPreloading(PreloadAllModules)), // Router con preloading de módulos
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Estrategia especial para Ionic
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  // Firebase App
    provideAuth(() => getAuth()),            // Firebase Auth
    provideFirestore(() => getFirestore())  // Firestore
  ]
});


