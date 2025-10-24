import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFound.css";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Animated 404 with plant icon */}
        <div className="error-display">
          <div className="error-number">
            <span className="digit">4</span>
            <div className="plant-icon">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pot */}
                <path
                  d="M45 95L35 110H85L75 95H45Z"
                  fill="#8B4513"
                  opacity="0.8"
                />
                <rect x="40" y="85" width="40" height="10" rx="2" fill="#A0522D" />

                {/* Plant stem */}
                <path
                  d="M60 85C60 85 55 70 55 60C55 50 58 45 60 40"
                  stroke="#045e52"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Leaves */}
                <ellipse
                  cx="48"
                  cy="55"
                  rx="12"
                  ry="8"
                  fill="#d6e865"
                  transform="rotate(-25 48 55)"
                />
                <ellipse
                  cx="72"
                  cy="60"
                  rx="12"
                  ry="8"
                  fill="#d6e865"
                  transform="rotate(25 72 60)"
                />
                <ellipse
                  cx="45"
                  cy="70"
                  rx="10"
                  ry="7"
                  fill="#d6e865"
                  transform="rotate(-35 45 70)"
                />
                <ellipse
                  cx="75"
                  cy="72"
                  rx="10"
                  ry="7"
                  fill="#d6e865"
                  transform="rotate(35 75 72)"
                />

                {/* Top leaves */}
                <ellipse
                  cx="55"
                  cy="42"
                  rx="14"
                  ry="9"
                  fill="#d6e865"
                  transform="rotate(-15 55 42)"
                />
                <ellipse
                  cx="65"
                  cy="45"
                  rx="14"
                  ry="9"
                  fill="#d6e865"
                  transform="rotate(15 65 45)"
                />
              </svg>
            </div>
            <span className="digit">4</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="error-title">{t("notFound.title")}</h1>
        <p
          className="error-message"
          dangerouslySetInnerHTML={{ __html: t("notFound.message") }}
        />

        {/* Action buttons */}
        <div className="error-actions">
          <Link to="/" className="btn-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 10L2.29289 9.29289L1.58579 10L2.29289 10.7071L3 10ZM17 11C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9V11ZM7.29289 4.29289L2.29289 9.29289L3.70711 10.7071L8.70711 5.70711L7.29289 4.29289ZM2.29289 10.7071L7.29289 15.7071L8.70711 14.2929L3.70711 9.29289L2.29289 10.7071ZM3 11H17V9H3V11Z"
                fill="currentColor"
              />
              <path
                d="M17 10C17 13.866 13.866 17 10 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {t("notFound.goHome")}
          </Link>
          <Link to="/categories" className="btn-secondary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5H9V11H3V5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 5H17V11H11V5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 13H9V19H3V13Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 13H17V19H11V13Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("notFound.viewCatalog")}
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="decorative-elements">
          <div className="floating-leaf leaf-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <ellipse
                cx="20"
                cy="20"
                rx="15"
                ry="10"
                fill="#d6e865"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className="floating-leaf leaf-2">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <ellipse
                cx="15"
                cy="15"
                rx="12"
                ry="8"
                fill="#d6e865"
                opacity="0.5"
              />
            </svg>
          </div>
          <div className="floating-leaf leaf-3">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
              <ellipse
                cx="17.5"
                cy="17.5"
                rx="14"
                ry="9"
                fill="#d6e865"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
