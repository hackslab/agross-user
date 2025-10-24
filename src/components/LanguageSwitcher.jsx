import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const languages = {
  uz: { nativeName: "UZ", flag: "🇺🇿" },
  en: { nativeName: "EN", flag: "🇺🇸" },
  ru: { nativeName: "RU", flag: "🇷🇺" },
  kz: { nativeName: "KZ", flag: "🇰🇿" },
};

const languageOrder = ["uz", "en", "ru", "kz"];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.resolvedLanguage || "uz";

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="language-switcher">
      <select
        className="lang-select"
        value={currentLang}
        onChange={handleLanguageChange}
        title={t("languageSwitcher.title")}
      >
        <option value={currentLang} disabled>
          {languages[currentLang].flag} {languages[currentLang].nativeName}
        </option>
        {languageOrder
          .filter((langCode) => langCode !== currentLang)
          .map((langCode) => (
            <option key={langCode} value={langCode}>
              {languages[langCode].flag} {languages[langCode].nativeName}
            </option>
          ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
