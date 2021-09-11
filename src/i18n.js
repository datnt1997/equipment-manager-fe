import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './locales/en/common.json';
import login from './locales/en/login.json';
import equipmentAdmin from './locales/en/equipmentAdmin.json';
import equipmentUser from './locales/en/equipmentUser.json';

const resources = {
  en: {
    common,
    login,
    equipmentAdmin,
    equipmentUser
  }
};

i18n
.use(initReactI18next) // passes i18n down to react-i18next
.init({
  resources,
  lng: 'en',
  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;