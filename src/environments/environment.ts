// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyClv3rtBr5waZdOLWHPeSjjUyW4WYor7jU',
    authDomain: 'todos-13036.firebaseapp.com',
    databaseURL: 'https://todos-13036.firebaseio.com',
    projectId: 'todos-13036',
    storageBucket: 'todos-13036.appspot.com',
    messagingSenderId: '816386023114',
    appId: '1:816386023114:web:db6467eee4af5508165e33'
  }
  // firebase.initializeApp(config);
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
