import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = ({ isLoading = true, progress = 0 }) => {
  const { t } = useTranslation();
  const [fadeOut, setFadeOut] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Start fade out animation
      setFadeOut(true);
      // Remove component after animation completes
      const timer = setTimeout(() => {
        setShow(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-content">
        {/* Animated Logo */}
        <div className="logo-container">
          <div className="logo-wrapper">
            <img src={logo} alt="Agross Logo" className="loading-logo" />
            <div className="logo-glow"></div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="brand-title">Agross</h1>
        <p className="brand-subtitle">{t("loading.subtitle")}</p>

        {/* Loading Animation */}
        <div className="loading-animation">
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {progress < 100 ? t("loading.loadingText") : t("loading.ready")}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
