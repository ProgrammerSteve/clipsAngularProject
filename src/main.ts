import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { AppModule } from './app/app.module';
import { enableProdMode, isDevMode } from '@angular/core';

import { environment } from './environments/environment';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'



if (!isDevMode()) {
  enableProdMode()
}


firebase.initializeApp(environment.firebase)

let appInit = false

firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
    appInit = true
  }

})



