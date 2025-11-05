import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import "./Catalog.css";

const Catalog = () => {
  const { t } = useTranslation();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts();
  const categories = useMemo(() => {
    const categoriesList = Array.isArray(categoriesData) ? categoriesData : [];
    const productsList = Array.isArray(productsData) ? productsData : [];
    const categoryIdToCount = new Map();
    for (const p of productsList) {
      if (p.categoryId) {
        categoryIdToCount.set(
          p.categoryId,
          (categoryIdToCount.get(p.categoryId) || 0) + 1
        );
      }
    }
    const mapped = categoriesList.map((c) => ({
      id: c.id,
      name: c.name,
      count: categoryIdToCount.get(c.id) || 0,
      image: c.image || "https://via.placeholder.com/500x400?text=Rasm+yo'q",
    }));
    const total = productsList.length;
    const allItem = {
      id: 0,
      name: t("catalog.allCategories"),
      count: total,
      image: "/plant.jpg",
    };
    return [allItem, ...mapped.slice(0, 5)];
  }, [categoriesData, productsData, t]);

  const isLoading = categoriesLoading || productsLoading;
  const isError = categoriesError || productsError;

  return (
    <section className="catalog-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("catalog.title")}</h2>
          <Link to="/categories" className="view-all-btn">
            {t("viewAll")}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4L13 10L7 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        {isLoading && <div className="categories-grid">{t("loading")}</div>}
        {isError && (
          <div className="categories-grid" style={{ color: "#d00" }}>
            {t("error")}
          </div>
        )}
        {!isLoading && !isError && Array.isArray(categoriesData) && (
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={
                  category.id === 0 ? "/categories" : `/category/${category.id}`
                }
                className="category-card"
              >
                <div className="category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">
                    {t("productCount", { count: category.count })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
