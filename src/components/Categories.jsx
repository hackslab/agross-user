import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategories } from "../hooks/useCategories";
import { useCountries } from "../hooks/useCountries";
import { useProducts } from "../hooks/useProducts";
import { useExchangeRate } from "../hooks/useCurrency";
import { formatPriceWithRate } from "../utils/priceFormatter";
import "./Categories.css";

const Categories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  // Cart and favourites removed

  const [selectedCategory, setSelectedCategory] = useState(id || "0");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(id || "0");
  }, [id]);

  // Lock body scroll when filters modal is open
  useEffect(() => {
    if (isFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFiltersOpen]);

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories();
  const {
    data: countriesData,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useCountries();
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useProducts();
  const { data: exchangeRateData } = useExchangeRate();
  const exchangeRate = exchangeRateData?.sell || 0;

  const countries = useMemo(
    () => [
      { id: "all", name: t("categories.allCountries") },
      ...(Array.isArray(countriesData) ? countriesData : []),
    ],
    [countriesData, t]
  );

  const categories = useMemo(() => {
    const cats = Array.isArray(categoriesData) ? categoriesData : [];
    // Compute counts for categories and subcategories based on products
    const products = Array.isArray(productsData) ? productsData : [];
    const categoryIdToCount = new Map();
    const subcategoryIdToCount = new Map();
    for (const p of products) {
      if (p.categoryId)
        categoryIdToCount.set(
          p.categoryId,
          (categoryIdToCount.get(p.categoryId) || 0) + 1
        );
      if (p.subcategoryId)
        subcategoryIdToCount.set(
          p.subcategoryId,
          (subcategoryIdToCount.get(p.subcategoryId) || 0) + 1
        );
    }
    const mapped = cats.map((c) => ({
      ...c,
      count: categoryIdToCount.get(c.id) || 0,
      subcategories: Array.isArray(c.subcategories)
        ? c.subcategories.map((s) => ({
            ...s,
            count: subcategoryIdToCount.get(s.id) || 0,
          }))
        : [],
    }));
    return [
      {
        id: "0",
        name: t("categories.allProducts"),
        count: products.length,
        subcategories: [],
      },
      ...mapped,
    ];
  }, [categoriesData, productsData, t]);

  const loading =
    isLoadingCategories || isLoadingCountries || isLoadingProducts;
  const error =
    isErrorCategories || isErrorCountries || isErrorProducts
      ? t("categories.error")
      : "";

  // Get current category
  const currentCategory = categories.find(
    (c) => String(c.id) === String(selectedCategory)
  );

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    navigate(`/category/${categoryId}`);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = Array.isArray(productsData) ? productsData : [];
    if (selectedCategory && selectedCategory !== "0") {
      list = list.filter(
        (p) => String(p.categoryId) === String(selectedCategory)
      );
    }
    if (selectedSubcategory) {
      list = list.filter(
        (p) => String(p.subcategoryId) === String(selectedSubcategory)
      );
    }
    if (selectedCountry !== "all") {
      list = list.filter(
        (p) => String(p.countryId) === String(selectedCountry)
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => (p.name || "").toLowerCase().includes(q));
    }
    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return list;
  }, [
    productsData,
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    searchQuery,
    sortBy,
  ]);

  // Actions removed

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("0");
    setSelectedSubcategory(null);
    setSelectedCountry("all");
    setSortBy("popular");
    // Navigate to category/0 without any search params to clear search
    navigate("/category/0", { replace: true });
  };

  // Check if any filters are active (excluding category selection)
  const hasActiveFilters =
    selectedSubcategory !== null ||
    selectedCountry !== "all" ||
    sortBy !== "popular" ||
    searchQuery.trim() !== "";

  return (
    <section className="categories-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            {t("home")}
          </a>
          <span className="separator">/</span>
          <a
            href="/categories"
            onClick={(e) => {
              e.preventDefault();
              navigate("/categories");
            }}
          >
            {t("catalog.title")}
          </a>
          {selectedCategory !== "0" && (
            <>
              <span className="separator">/</span>
              <span className="current">{currentCategory?.name}</span>
            </>
          )}
          {selectedCategory === "0" && (
            <>
              <span className="separator">/</span>
              <span className="current">{t("categories.allProducts")}</span>
            </>
          )}
        </div>

        <div className="categories-layout">
          {/* Sidebar Filters */}
          <aside className="sidebar">
            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                className="reset-filters-btn"
                onClick={handleResetFilters}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 9L15 15M15 9L9 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{t("categories.resetFilters")}</span>
              </button>
            )}

            <div className="filter-section">
              <h3 className="filter-title">{t("categories.categories")}</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-item ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="category-item-info">
                      <span className="category-item-name">
                        {category.name}
                      </span>
                      <span className="category-item-count">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            {currentCategory && currentCategory.subcategories.length > 0 && (
              <div className="filter-section">
                <h3 className="filter-title">
                  {t("categories.subcategories")}
                </h3>
                <div className="subcategory-list">
                  <button
                    className={`subcategory-item ${
                      selectedSubcategory === null ? "active" : ""
                    }`}
                    onClick={() => setSelectedSubcategory(null)}
                  >
                    <span className="subcategory-name">
                      {t("categories.all")}
                    </span>
                  </button>
                  {currentCategory.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      className={`subcategory-item ${
                        selectedSubcategory === subcategory.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedSubcategory(subcategory.id)}
                    >
                      <span className="subcategory-name">
                        {subcategory.name}
                      </span>
                      <span className="subcategory-count">
                        {subcategory.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="filter-section">
              <h3 className="filter-title">{t("categories.country")}</h3>
              <div className="country-filters">
                {countries.map((country) => (
                  <label key={country.id} className="radio-label">
                    <input
                      type="radio"
                      name="country"
                      value={country.id}
                      checked={String(selectedCountry) === String(country.id)}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    />
                    <span>
                      {country.flag} {country.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="categories-main">
            {/* Header */}
            <div className="categories-header">
              <div className="header-info">
                <div className="header-info-row">
                  <div className="header-info-text">
                    <h1 className="page-title">
                      {searchQuery
                        ? t("categories.searchResults", { query: searchQuery })
                        : categories.find(
                            (c) => String(c.id) === String(selectedCategory)
                          )?.name || t("catalog.title")}
                    </h1>
                    <p className="results-count">
                      {t("categories.resultsFound", {
                        count: filteredProducts.length,
                      })}
                      {searchQuery && filteredProducts.length === 0 && (
                        <span className="no-results-text">
                          {t("categories.noResults")}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    className="mobile-filters-btn"
                    onClick={() => setIsFiltersOpen(true)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {t("categories.filters")}
                  </button>
                </div>
              </div>

              <div className="sort-controls">
                <label className="sort-label">
                  <span>{t("categories.sort")}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="popular">
                      {t("categories.sortPopular")}
                    </option>
                    <option value="price-low">
                      {t("categories.sortPriceLow")}
                    </option>
                    <option value="price-high">
                      {t("categories.sortPriceHigh")}
                    </option>
                    <option value="rating">{t("categories.sortRating")}</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Products Grid */}
            {loading && <div className="products-grid">{t("loading")}</div>}
            {error && !loading && (
              <div className="products-grid" style={{ color: "#d00" }}>
                {error}
              </div>
            )}
            {!loading && !error && (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div
                      className="product-image-wrapper"
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.files && product.files[0] ? (
                        product.files[0].isVideo ? (
                          <video
                            src={product.files[0].url}
                            preload="metadata"
                            muted
                            playsInline
                            className="product-image"
                            onLoadedMetadata={(e) => {
                              try {
                                e.currentTarget.currentTime = 0.001;
                              } catch {
                                // Ignore errors when setting video time
                              }
                            }}
                            onSeeked={(e) => {
                              try {
                                e.currentTarget.pause();
                              } catch {
                                // Ignore errors when pausing video
                              }
                            }}
                          />
                        ) : (
                          <img
                            src={product.files[0].url}
                            alt={product.name}
                            className="product-image"
                          />
                        )
                      ) : (
                        <img
                          src="https://via.placeholder.com/400x300?text=Product"
                          alt={product.name}
                          className="product-image"
                        />
                      )}
                    </div>

                    <div className="product-details">
                      <h3
                        className="product-name"
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        {product.name}
                      </h3>

                      <div className="product-country">
                        <span className="country-label">
                          {product.country?.name || ""}
                        </span>
                      </div>

                      <div className="product-footer">
                        <div className="product-price-box">
                          <div className="product-price">
                            {
                              formatPriceWithRate(
                                product.price || 0,
                                exchangeRate
                              ).usd
                            }
                          </div>
                          <div className="product-price-secondary">
                            {
                              formatPriceWithRate(
                                product.price || 0,
                                exchangeRate
                              ).som
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filters Modal */}
        {isFiltersOpen && (
          <>
            <div
              className="filters-overlay"
              onClick={() => setIsFiltersOpen(false)}
            />
            <div className="filters-modal">
              <div className="filters-modal-header">
                <h3>{t("categories.filters", { context: "plural" })}</h3>
                <button
                  className="filters-close-btn"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="filters-modal-content">
                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <button
                    className="reset-filters-btn"
                    onClick={handleResetFilters}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M9 9L15 15M15 9L9 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{t("categories.resetFilters")}</span>
                  </button>
                )}

                <div className="filter-section">
                  <h3 className="filter-title">{t("categories.categories")}</h3>
                  <div className="category-list">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`category-item ${
                          selectedCategory === category.id ? "active" : ""
                        }`}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <div className="category-item-info">
                          <span className="category-item-name">
                            {category.name}
                          </span>
                          <span className="category-item-count">
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {currentCategory &&
                  currentCategory.subcategories.length > 0 && (
                    <div className="filter-section">
                      <h3 className="filter-title">
                        {t("categories.subcategories")}
                      </h3>
                      <div className="subcategory-list">
                        <button
                          className={`subcategory-item ${
                            selectedSubcategory === null ? "active" : ""
                          }`}
                          onClick={() => setSelectedSubcategory(null)}
                        >
                          <span className="subcategory-name">
                            {t("categories.all")}
                          </span>
                        </button>
                        {currentCategory.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.id}
                            className={`subcategory-item ${
                              selectedSubcategory === subcategory.id
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedSubcategory(subcategory.id)
                            }
                          >
                            <span className="subcategory-name">
                              {subcategory.name}
                            </span>
                            <span className="subcategory-count">
                              {subcategory.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="filter-section">
                  <h3 className="filter-title">{t("categories.country")}</h3>
                  <div className="country-filters">
                    {countries.map((country) => (
                      <label key={country.id} className="radio-label">
                        <input
                          type="radio"
                          name="country-modal"
                          value={country.id}
                          checked={
                            String(selectedCountry) === String(country.id)
                          }
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        />
                        <span>
                          {country.flag} {country.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filters-modal-footer">
                <button
                  className="apply-filters-btn"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  {t("categories.apply")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Categories;
