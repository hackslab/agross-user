import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import "./AllCategories.css";

const AllCategories = () => {
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
      description: c.description || t("allCategories.noDescription"),
      image: c.image || "https://via.placeholder.com/500x400?text=Rasm+yo'q",
    }));
    const total = productsList.length;
    return [
      {
        id: 0,
        name: t("allCategories.allCatName"),
        count: total,
        description: t("allCategories.allCatDescription"),
        image:
          "/plant.jpg",
      },
      ...mapped,
    ];
  }, [categoriesData, productsData, t]);

  const isLoading = categoriesLoading || productsLoading;
  const isError = categoriesError || productsError;

  if (isLoading) {
    return (
      <div className="container" style={{ padding: "40px 0" }}>
        {t("loading")}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container" style={{ padding: "40px 0", color: "#d00" }}>
        {t("error")}
      </div>
    );
  }

  return (
    <div className="all-categories-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">{t("home")}</Link>
          <span className="separator">/</span>
          <span className="current">{t("allCategories.breadcrumb")}</span>
        </div>

        {/* Page Header */}
        <div className="all-categories-header">
          <div className="header-content">
            <h1 className="page-title">{t("allCategories.title")}</h1>
            <p className="page-subtitle">
              {t("allCategories.subtitle")}
            </p>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{categoriesData.length + 1}</span>
              <span className="stat-label">{t("allCategories.statCategories")}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{productsData.length}</span>
              <span className="stat-label">{t("allCategories.statProducts")}</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {Array.isArray(categoriesData) && categories.length > 1 && (
          <div className="all-categories-grid">
            {categories.map((category) => (
              <Link
                to={
                  category.id === 0 ? "/category/0" : `/category/${category.id}`
                }
                key={category.id}
                className="all-category-card"
              >
                <div className="all-category-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="all-category-image"
                  />
                </div>
                <div className="all-category-content">
                  <div className="all-category-header">
                    <h3 className="all-category-title">{category.name}</h3>
                  </div>
                  <p className="all-category-description">
                    {category.description}
                  </p>
                  <div className="all-category-footer">
                    <span className="all-category-count">
                      {t("productCount", { count: category.count })}
                    </span>
                    <div className="view-category-btn">
                      {t("allCategories.view")}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M7 4L13 10L7 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
