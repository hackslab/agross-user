import i18n from "../i18n";

/**
 * Extracts a localized text field from an API item.
 * It falls back from the specific language (e.g., 'en') to a default language ('uz')
 * if the requested language field doesn't exist.
 *
 * @param {object} item The object from the API (e.g., a product or category).
 * @param {string} fieldName The base name of the field (e.g., 'name', 'description').
 * @param {string} [language] The desired language code (e.g., 'en', 'ru'). Defaults to current i18n language.
 * @returns {string} The localized text, or an empty string if not found.
 */
export const getLocalizedText = (item, fieldName, language) => {
  if (!item || !fieldName) return "";

  const lang = language || i18n.language || "uz";
  const fallbackLang = "uz";

  const langField = `${fieldName}_${lang}`;
  const fallbackField = `${fieldName}_${fallbackLang}`;

  return item[langField] || item[fallbackField] || item[fieldName] || "";
};
