const env = process.env.NODE_ENV || 'development'
const dev = env !== 'production'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

const supportedLocales = ['en']

// NOTE: For future reference:
// https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    // debug: dev,
    fallbackLng: 'en',
    supportedLngs: supportedLocales,
    // preload: supportedLocales,
    ns: ['common'],
    defaultNS: 'common',
    // React config
    react: {
      // trigger a rerender when language is changed
      bindI18n: 'languageChanged',
      // we're NOT using suspsense to detect when the translations have loaded
      useSuspense: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })

export default i18n
