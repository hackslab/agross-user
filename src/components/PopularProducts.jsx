import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../hooks/useProducts";
import { useExchangeRate } from "../hooks/useCurrency";
import { formatPriceWithRate } from "../utils/priceFormatter";
import "./PopularProducts.css";

const PopularProducts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useProducts();
  const { data: exchangeRateData } = useExchangeRate();
  const exchangeRate = exchangeRateData?.sell || 0;
  const products = useMemo(
    () => (Array.isArray(data) ? data.slice(0, 8) : []),
    [data]
  );

  // Cart and favourites removed

  return (
    <section className="popular-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("popularProducts.title")}</h2>
          <Link to="/category/0" className="view-all-btn">
            {t("viewAll")}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4L13 10L7 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {isLoading && <div className="products-grid">{t("loading")}</div>}
        {isError && !isLoading && (
          <div className="products-grid" style={{ color: "#d00" }}>
            {t("error")}
          </div>
        )}
        {!isLoading && !isError && (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card-popular">
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
                <div className="product-info">
                  <h3
                    className="product-name"
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.name}
                  </h3>
                  <div className="product-footer">
                    <div className="product-price">
                      <div className="price-main">
                        {
                          formatPriceWithRate(product.price || 0, exchangeRate)
                            .usd
                        }
                      </div>
                      <div className="price-sub">
                        {
                          formatPriceWithRate(product.price || 0, exchangeRate)
                            .som
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
