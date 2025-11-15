import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import uzTranslation from "./locales/uz.json";
import ruTranslation from "./locales/ru.json";
import enTranslation from "./locales/en.json";

const resources = {
  uz: { translation: uzTranslation },
  ru: { translation: ruTranslation },
  en: { translation: enTranslation },
};


const savedLanguage = localStorage.getItem("language") || "uz";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "uz",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
