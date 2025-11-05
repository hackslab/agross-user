import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

/**
 * SEOHelmet - Dynamic SEO meta tags updater for multi-language support
 *
 * This component updates the document title and meta description based on:
 * - Current language (uz, ru, en, kz)
 * - Current route/page
 *
 * Usage: Add <SEOHelmet /> at the top level of your App component
 */

const SEOHelmet = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || "uz";

  useEffect(() => {
    // Define SEO content for different pages and languages
    const seoContent = {
      "/": {
        en: {
          title: "Agross - Greenhouse Film & Equipment Supplier in Uzbekistan",
          description:
            "Essential greenhouse film and equipment supplier in Uzbekistan. Complete solutions from greenhouse construction to equipment. Quality products for entrepreneurs, farmers, and large-scale agriculturists.",
        },
        uz: {
          title: "Agross - O'zbekistonda issiqxona plyonkasi va jihozlari",
          description:
            "O'zbekistonda issiqxona plyonkasi va jihozlarining yetkazib beruvchisi. Tadbirkorlar, dehqonlar va fermerlar uchun issiqxona qurilishidan jihozlargacha to'liq yechimlar.",
        },
        ru: {
          title:
            "Агросс - Поставщик тепличной пленки и оборудования в Узбекистане",
          description:
            "Поставщик тепличной пленки и оборудования в Узбекистане. Комплексные решения от строительства теплиц до оборудования для предпринимателей, фермеров и крупных аграриев.",
        },
        kz: {
          title:
            "Agross - Өзбекстандағы жылыжай пленкасы мен жабдықтарының жеткізушісі",
          description:
            "Өзбекстандағы жылыжай пленкасы мен жабдықтарының жеткізушісі. Кәсіпкерлер, дихандар және фермерлер үшін жылыжай құрылысынан жабдыққа дейінгі толық шешімдер.",
        },
      },
      "/about": {
        en: {
          title: "About Agross - Greenhouse Solutions Since 2004",
          description:
            "Learn about Agross, providing greenhouse film and equipment in Uzbekistan since 2004. Our promise: Safety and Life for your agricultural success.",
        },
        uz: {
          title: "Agross haqida - 2004 yildan beri issiqxona yechimlari",
          description:
            "2004 yildan beri O'zbekistonda issiqxona plyonkasi va jihozlarini taqdim etayotgan Agross haqida bilib oling. Bizning va'damiz: Xavfsizlik va Hayot.",
        },
        ru: {
          title: "О компании Агросс - Тепличные решения с 2004 года",
          description:
            "Узнайте об Агросс, поставщике тепличной пленки и оборудования в Узбекистане с 2004 года. Наше обещание: Безопасность и Жизнь.",
        },
        kz: {
          title: "Agross туралы - 2004 жылдан бері жылыжай шешімдері",
          description:
            "2004 жылдан бері Өзбекстанда жылыжай пленкасы мен жабдықтарын ұсынатын Agross туралы біліңіз. Біздің уәдеміз: Қауіпсіздік және Өмір.",
        },
      },
      "/categories": {
        en: {
          title: "Product Categories - Agross Greenhouse Equipment",
          description:
            "Browse all categories of greenhouse equipment and materials. Polyethylene film, drip irrigation, shade nets, agro fabric, and more.",
        },
        uz: {
          title: "Mahsulot kategoriyalari - Agross issiqxona jihozlari",
          description:
            "Issiqxona jihozlari va materiallarining barcha kategoriyalarini ko'ring. Polietilen plyonka, tomchilab sug'orish, soya setkalari, agrovolokno va boshqalar.",
        },
        ru: {
          title: "Категории товаров - Агросс тепличное оборудование",
          description:
            "Просмотрите все категории тепличного оборудования и материалов. Полиэтиленовая пленка, капельный полив, затеняющие сетки, агроволокно и многое другое.",
        },
        kz: {
          title: "Өнім санаттары - Agross жылыжай жабдықтары",
          description:
            "Жылыжай жабдықтары мен материалдарының барлық санаттарын қараңыз. Полиэтилен пленка, тамшылатып суару, көлеңкелік торлар, агроматериал және т.б.",
        },
      },
    };

    // Get current page path (without query params)
    const currentPath = location.pathname;

    // Find matching SEO content or use homepage defaults
    let pageSEO = seoContent[currentPath] || seoContent["/"];

    // Handle dynamic routes (category, product pages)
    if (currentPath.startsWith("/category/")) {
      pageSEO = {
        en: {
          title: "Products - Agross Greenhouse Equipment",
          description:
            "Browse our selection of greenhouse equipment and agricultural supplies.",
        },
        uz: {
          title: "Mahsulotlar - Agross issiqxona jihozlari",
          description:
            "Issiqxona jihozlari va qishloq xo'jaligi ta'minotini ko'ring.",
        },
        ru: {
          title: "Товары - Агросс тепличное оборудование",
          description:
            "Просмотрите наш ассортимент тепличного оборудования и сельскохозяйственных материалов.",
        },
        kz: {
          title: "Өнімдер - Agross жылыжай жабдықтары",
          description:
            "Жылыжай жабдықтары мен ауыл шаруашылығы материалдарын қараңыз.",
        },
      };
    } else if (currentPath.startsWith("/product/")) {
      pageSEO = {
        en: {
          title: "Product Details - Agross",
          description:
            "View detailed information about our greenhouse equipment and materials.",
        },
        uz: {
          title: "Mahsulot tafsilotlari - Agross",
          description:
            "Issiqxona jihozlari va materiallari haqida batafsil ma'lumot oling.",
        },
        ru: {
          title: "Детали товара - Агросс",
          description:
            "Просмотрите подробную информацию о нашем тепличном оборудовании и материалах.",
        },
        kz: {
          title: "Өнім егжей-тегжейі - Agross",
          description:
            "Жылыжай жабдықтары мен материалдары туралы толық ақпаратты қараңыз.",
        },
      };
    }

    // Get language-specific content
    const langContent = pageSEO[currentLang] || pageSEO["en"];

    // Update document title
    document.title = langContent.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", langContent.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", langContent.title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", langContent.description);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", langContent.title);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", langContent.description);
    }

    // Update html lang attribute
    document.documentElement.lang = currentLang;

    // Update Open Graph locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const localeMap = {
      uz: "uz_UZ",
      ru: "ru_RU",
      en: "en_US",
      kz: "kk_KZ",
    };
    if (ogLocale) {
      ogLocale.setAttribute("content", localeMap[currentLang] || "uz_UZ");
    }
  }, [currentLang, location.pathname, i18n.language]);

  // This component doesn't render anything
  return null;
};

export default SEOHelmet;
