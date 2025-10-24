import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-column footer-main">
            <div className="footer-logo">
              <img
                src={logo}
                alt={t("navbar.logoAlt")}
                className="footer-logo-icon"
              />
              <span className="footer-logo-text">AGROSS</span>
            </div>

            <p className="footer-description">{t("footer.workingHours")}</p>
            <p className="footer-address">📍 {t("footer.address")}</p>

            <div className="footer-social">
              <a
                href="https://t.me/palma_plast777"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L14 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11L17 7L13 17L11 13L7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/palmaplast_.777._/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@yusufsobirov09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div className="footer-column">
            <h3 className="footer-title">{t("footer.contacts")}</h3>
            <ul className="footer-links">
              <li>
                <strong>{t("footer.showroom")}:</strong>
                <br />
                <a
                  href={`tel:+${t("contact.showroomPhone").replace(/\s/g, "")}`}
                >
                  {t("contact.showroomPhone")}
                </a>
              </li>
              <li>
                <strong>{t("footer.warehouse")}:</strong>
                <br />
                <a
                  href={`tel:+${t("contact.warehousePhone").replace(
                    /\s/g,
                    ""
                  )}`}
                >
                  {t("contact.warehousePhone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Managers */}
          <div className="footer-column">
            <h3 className="footer-title">{t("footer.manager")}</h3>
            <ul className="footer-links">
              <li>
                <strong>{t("contact.manager1")}:</strong>
                <br />
                <a
                  href={`tel:+${t("contact.manager1Phone").replace(/\s/g, "")}`}
                >
                  {t("contact.manager1Phone")}
                </a>
              </li>
              <li>
                <strong>{t("contact.manager2")}:</strong>
                <br />
                <a
                  href={`tel:+${t("contact.manager2Phone").replace(/\s/g, "")}`}
                >
                  {t("contact.manager2Phone")}
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/PalmaPlast_777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegram-link"
                >
                  💬 {t("footer.telegramHandle")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
