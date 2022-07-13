export const environment = {
  production: false,
  apiUrl: 'https://memologist-be.herokuapp.com',
  testApiUrl: 'http://localhost:3000',
  websiteUrl: 'https://memologist.herokuapp.com/',
  locales: {
    en: 'en',
    ua: 'ua'
  },
  defaultLocale: 'ua',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
