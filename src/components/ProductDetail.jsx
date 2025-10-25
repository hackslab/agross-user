import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useExchangeRate } from "../hooks/useCurrency";
import { formatPriceWithRate } from "../utils/priceFormatter";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useProduct(id);
  const { data: productsData } = useProducts();
  const { data: exchangeRateData } = useExchangeRate();
  const exchangeRate = exchangeRateData?.sell || 0;

  const relatedProducts = useMemo(() => {
    if (!product || !Array.isArray(productsData)) return [];
    const sameCategory = productsData.filter(
      (p) => String(p.categoryId) === String(product.categoryId)
    );
    return sameCategory.filter((p) => String(p.id) !== String(id)).slice(0, 4);
  }, [product, productsData, id]);

  useEffect(() => {
    if (!isLoadingProduct && isErrorProduct) {
      navigate("/404");
    }
  }, [isLoadingProduct, isErrorProduct, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      product?.files &&
      Array.isArray(product.files) &&
      product.files.length > 0
    ) {
      const firstIsVideo = Boolean(product.files[0]?.isVideo);
      if (firstIsVideo) {
        const firstImageIndex = product.files.findIndex((f) => !f.isVideo);
        setSelectedImage(firstImageIndex !== -1 ? firstImageIndex : 0);
      } else {
        setSelectedImage(0);
      }
    } else {
      setSelectedImage(0);
    }
  }, [id, product?.files]);

  if (isLoadingProduct) {
    return (
      <div className="product-detail-page">
        <div className="container">{t("loading")}</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const selectedFile = product.files?.[selectedImage];

  return (
    <div className="product-detail-page">
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
          <span className="separator">/</span>
          {product.category && (
            <a
              href={`/category/${product.category.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/category/${product.category.id}`);
              }}
            >
              {product.category.name}
            </a>
          )}
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="product-main">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              {selectedFile ? (
                selectedFile.isVideo ? (
                  <video
                    key={selectedFile.url}
                    src={selectedFile.url}
                    controls
                    muted
                    className="main-video-player"
                  />
                ) : (
                  <img src={selectedFile.url} alt={product.name} />
                )
              ) : (
                <img
                  src="https://via.placeholder.com/800x600?text=Product"
                  alt={t("altTexts.productPlaceholder")}
                />
              )}
            </div>
            {product.files && product.files.length > 1 && (
              <div className="thumbnail-list">
                {product.files.map((file, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    {file.isVideo ? (
                      <video
                        src={file.url}
                        preload="metadata"
                        muted
                        playsInline
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
                        src={file.url}
                        alt={`${product.name} ${index + 1}`}
                      />
                    )}
                    {file.isVideo && (
                      <div className="video-overlay">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            {/* Rating removed */}
            <div className="product-meta">
              <div className="product-country">
                <span className="country-name">
                  {product.country?.name || ""}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="price-section">
              <div className="price-box">
                <span className="current-price">
                  {formatPriceWithRate(product.price || 0, exchangeRate).usd}
                </span>
                <span className="price-secondary">
                  {formatPriceWithRate(product.price || 0, exchangeRate).som}
                </span>
              </div>
              {/* Old price/discount not provided by API; hide for now */}
            </div>

            {/* Stock Status */}
            <div className="stock-section">
              {product.quantity > 0 ? (
                <div className="in-stock">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M16.667 5L7.5 14.167 3.333 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("productDetail.available")}</span>
                </div>
              ) : (
                <div className="out-of-stock">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15 5L5 15M5 5l10 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{t("productDetail.notAvailable")}</span>
                </div>
              )}
            </div>

            {/* Quantity and action buttons removed */}

            {/* Features removed */}
          </div>
        </div>

        {/* Product Details Section (no tabs) */}
        <div className="product-details-section">
          <div className="tabs-content">
            <div className="tab-panel">
              <h2>{t("productDetail.about")}</h2>
              <p className="description-text">{product.description}</p>

              <h2>{t("productDetail.features")}</h2>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td className="spec-label">
                      {t("productDetail.category")}
                    </td>
                    <td className="spec-value">
                      {product.category?.name || product.categoryId}
                    </td>
                  </tr>
                  <tr>
                    <td className="spec-label">
                      {t("productDetail.subcategory")}
                    </td>
                    <td className="spec-value">
                      {product.subcategory?.name || product.subcategoryId}
                    </td>
                  </tr>
                  <tr>
                    <td className="spec-label">{t("productDetail.country")}</td>
                    <td className="spec-value">
                      {product.country?.name || product.countryId}
                    </td>
                  </tr>
                  <tr>
                    <td className="spec-label">{t("productDetail.type")}</td>
                    <td className="spec-value">{product.type || "-"}</td>
                  </tr>
                  <tr>
                    <td className="spec-label">
                      {t("productDetail.structure")}
                    </td>
                    <td className="spec-value">{product.structure || "-"}</td>
                  </tr>
                  <tr>
                    <td className="spec-label">{t("productDetail.unit")}</td>
                    <td className="spec-value">
                      {product.unit?.name || product.unitId || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="spec-label">{t("productDetail.price")}</td>
                    <td className="spec-value">
                      {
                        formatPriceWithRate(product.price || 0, exchangeRate)
                          .usd
                      }{" "}
                      /{" "}
                      {
                        formatPriceWithRate(product.price || 0, exchangeRate)
                          .som
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">{t("productDetail.related")}</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="related-product-card"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="product-image-wrapper">
                    {relatedProduct.files && relatedProduct.files[0] ? (
                      relatedProduct.files[0].isVideo ? (
                        <video
                          src={relatedProduct.files[0].url}
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
                          src={relatedProduct.files[0].url}
                          alt={relatedProduct.name}
                          className="product-image"
                        />
                      )
                    ) : (
                      <img
                        src="https://via.placeholder.com/400x300?text=Product"
                        alt={relatedProduct.name}
                        className="product-image"
                      />
                    )}
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{relatedProduct.name}</h3>
                    <div className="product-price">
                      <div className="price-main">
                        {
                          formatPriceWithRate(
                            relatedProduct.price || 0,
                            exchangeRate
                          ).usd
                        }
                      </div>
                      <div className="price-sub">
                        {
                          formatPriceWithRate(
                            relatedProduct.price || 0,
                            exchangeRate
                          ).som
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
