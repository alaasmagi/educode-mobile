import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import et from './locales/et.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      et: { translation: et }
    },
    lng: 'et',
    fallbackLng: 'et',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
