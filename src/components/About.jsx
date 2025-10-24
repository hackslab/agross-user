import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Shield,
  Leaf,
  Heart,
  Target,
  Users,
  CheckCircle,
  Sprout,
  Package,
  Globe,
} from "lucide-react";
import logo from "../assets/logo.png";
import "./About.css";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">{t("home")}</Link>
          <span className="separator">/</span>
          <span className="current">{t("about.breadcrumb")}</span>
        </nav>

        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <div className="brand-logo-section">
              <img
                src={logo}
                alt={t("navbar.logoAlt")}
                className="about-logo"
              />
              <h1 className="about-title">Agross</h1>
            </div>
            <p className="about-tagline">{t("about.heroTagline")}</p>
          </div>
        </div>

        {/* Main Content */}
        <section className="about-intro">
          <div className="intro-card">
            <h2 className="section-heading">{t("about.introTitle")}</h2>
            <p
              className="intro-text"
              dangerouslySetInnerHTML={{ __html: t("about.introP1") }}
            />
            <p className="intro-text">{t("about.introP2")}</p>
          </div>
        </section>

        {/* Company Experience */}
        <section className="experience-section">
          <div className="experience-card">
            <div className="experience-icon-wrapper">
              <Globe size={48} />
            </div>
            <div className="experience-content">
              <h2 className="section-heading">{t("about.experienceTitle")}</h2>
              <p className="experience-text">{t("about.experienceText")}</p>
              <div className="partners-logos">
                <div className="partner-flag">🇷🇺</div>
                <div className="partner-flag">🇮🇷</div>
                <div className="partner-flag">🇨🇳</div>
                <div className="partner-flag">🇰🇷</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products List */}
        <section className="products-section">
          <div className="products-header">
            <Package size={48} />
            <h2 className="section-heading">{t("about.productsTitle")}</h2>
          </div>
          <div className="products-grid">
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product1")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product2")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product3")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product4")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product5")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product6")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product7")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product8")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product9")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product10")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product11")}</span>
            </div>
            <div className="product-item">
              <CheckCircle size={20} className="product-check" />
              <span>{t("about.product12")}</span>
            </div>
          </div>
        </section>

        {/* Brand Promise */}
        <section className="brand-promise">
          <div className="promise-header">
            <Shield className="promise-icon" size={48} />
            <h2 className="section-heading">{t("about.promiseTitle")}</h2>
          </div>
          <div className="promise-content">
            <div className="promise-card highlight">
              <div className="promise-icon-wrapper">
                <Shield size={40} />
              </div>
              <h3>{t("about.promiseCardTitle")}</h3>
              <p>{t("about.promiseCardText")}</p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="philosophy-section">
          <h2 className="section-heading center">
            {t("about.philosophyTitle")}
          </h2>
          <p className="philosophy-intro">{t("about.philosophyIntro")}</p>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="philosophy-icon-wrapper protection">
                <Shield size={48} />
              </div>
              <div className="philosophy-content">
                <h3>{t("about.protectionTitle")}</h3>
                <p>{t("about.protectionText")}</p>
                <ul className="features-list">
                  <li>
                    <CheckCircle size={20} />
                    <span>{t("about.protectionFeature1")}</span>
                  </li>
                  <li>
                    <CheckCircle size={20} />
                    <span>{t("about.protectionFeature2")}</span>
                  </li>
                  <li>
                    <CheckCircle size={20} />
                    <span>{t("about.protectionFeature3")}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="philosophy-card">
              <div className="philosophy-icon-wrapper productivity">
                <Leaf size={48} />
              </div>
              <div className="philosophy-content">
                <h3>{t("about.productivityTitle")}</h3>
                <p>{t("about.productivityText")}</p>
                <ul className="features-list">
                  <li>
                    <CheckCircle size={20} />
                    <span>{t("about.productivityFeature1")}</span>
                  </li>
                  <li>
                    <CheckCircle size={20} />
                    <span>{t("about.productivityFeature2")}</span>
                  </li>
                  <li>
                    <CheckCircle size={20} />
                    <span>{t("about.productivityFeature3")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="balance-note">
            <Sprout size={24} />
            <p>{t("about.balanceNote")}</p>
          </div>
        </section>

        {/* Character */}
        <section className="character-section">
          <div className="character-card">
            <div className="character-icon-wrapper">
              <Heart size={48} />
            </div>
            <div className="character-content">
              <h2 className="section-heading">{t("about.characterTitle")}</h2>
              <p
                className="character-description"
                dangerouslySetInnerHTML={{
                  __html: t("about.characterDescription"),
                }}
              />
              <div className="character-traits">
                <div className="trait">
                  <div className="trait-icon">
                    <Heart size={24} />
                  </div>
                  <span>{t("about.traitKind")}</span>
                </div>
                <div className="trait">
                  <div className="trait-icon">
                    <Sprout size={24} />
                  </div>
                  <span>{t("about.traitCreative")}</span>
                </div>
                <div className="trait">
                  <div className="trait-icon">
                    <Target size={24} />
                  </div>
                  <span>{t("about.traitModern")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="audience-section">
          <div className="audience-header">
            <Users size={48} />
            <h2 className="section-heading">{t("about.audienceTitle")}</h2>
          </div>

          <p className="audience-intro">{t("about.audienceIntro")}</p>

          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-icon">
                <Target size={40} />
              </div>
              <h3>{t("about.audienceEntrepreneursTitle")}</h3>
              <p>{t("about.audienceEntrepreneursText")}</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon">
                <Sprout size={40} />
              </div>
              <h3>{t("about.audienceFarmersTitle")}</h3>
              <p>{t("about.audienceFarmersText")}</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon">
                <Users size={40} />
              </div>
              <h3>{t("about.audienceLargeScaleTitle")}</h3>
              <p>{t("about.audienceLargeScaleText")}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>{t("about.ctaTitle")}</h2>
            <p>{t("about.ctaText")}</p>
            <div className="cta-buttons">
              <Link to="/catalog" className="btn-primary">
                {t("about.ctaCatalog")}
              </Link>
              <Link to="/" className="btn-secondary">
                <ArrowLeft size={20} />
                {t("about.ctaHome")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
