import { useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useCategories } from "../hooks/useCategories";
import { useExchangeRate } from "../hooks/useCurrency";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Extract category ID from current URL
  const getCurrentCategoryId = () => {
    const match = location.pathname.match(/^\/category\/([^/?#]+)/);
    return match ? match[1] : "0";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Get current category ID from URL
      const currentCategoryId = getCurrentCategoryId();
      navigate(
        `/category/${currentCategoryId}?search=${encodeURIComponent(
          searchQuery
        )}`
      );
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Navigate back to current category page when clearing search
    const currentCategoryId = getCurrentCategoryId();
    navigate(`/category/${currentCategoryId}`);
  };

  const { data: categoriesData, isLoading, isError } = useCategories();
  const navCategories = useMemo(
    () => (Array.isArray(categoriesData) ? categoriesData : []),
    [categoriesData]
  );

  const { data: exchangeRateData } = useExchangeRate();

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <nav className="top-nav">
            <Link to="/category/0">{t("navbar.allProducts")}</Link>
            <Link to="/about">{t("navbar.about")}</Link>
          </nav>
          <div className="top-actions">
            {exchangeRateData && (
              <div className="currency-rates">
                <span className="currency-label">
                  {t("navbar.currencyRate")}
                </span>
                <div className="currency-item">
                  <span>{t("navbar.currencyBuy")}</span>
                  <span className="currency-value">
                    {parseFloat(exchangeRateData.buy).toLocaleString("ru-RU", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="currency-item">
                  <span>{t("navbar.currencySell")}</span>
                  <span className="currency-value">
                    {parseFloat(exchangeRateData.sell).toLocaleString("ru-RU", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )}
            <a
              href={`tel:${t("contact.callCenter").replace(/\s/g, "")}`}
              className="phone"
            >
              {t("navbar.phone")}
            </a>
            <div className="top-divider" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="main-nav">
        <div className="container">
          <div className="nav-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <img src={logo} alt={t("navbar.logoAlt")} />
              <span className="brand-name">Agross</span>
            </Link>

            {/* Search Bar */}
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder={t("navbar.searchPlaceholder")}
                value={searchQuery}
                onChange={handleSearchInput}
                className="search-input"
                aria-label={t("navbar.searchPlaceholder")}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={handleClearSearch}
                  aria-label={t("navbar.clearSearch")}
                >
                  ×
                </button>
              )}
              <button
                type="submit"
                className="search-btn"
                aria-label={t("navbar.searchPlaceholder")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Nav Actions */}
            <div className="nav-actions" />

            {/* Catalog Button (moved to right) */}
            <Link to="/categories" className="catalog-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {t("navbar.catalog")}
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        <div className="container">
          <nav className="categories">
            {isLoading && <span className="category-link">{t("loading")}</span>}
            {isError && !isLoading && (
              <span className="category-link" style={{ color: "#d00" }}>
                {t("navbar.categoryError")}
              </span>
            )}
            {!isLoading &&
              !isError &&
              navCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="category-link"
                >
                  {category.name}
                </Link>
              ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
