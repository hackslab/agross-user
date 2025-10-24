import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useCarousel } from "../hooks/useCarousel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Hero.css";

const Hero = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useCarousel();
  const slides = Array.isArray(data)
    ? data.map((item) => ({ id: item.id, image: item.file, alt: "carousel" }))
    : [];

  return (
    <section className="hero-section">
      <div className="hero-swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          className="hero-swiper"
        >
          {(isLoading ? [1, 2, 3] : slides).map((slide, idx) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide">
                <img
                  src={
                    slide.image ||
                    "https://via.placeholder.com/1400x600?text=Loading"
                  }
                  alt={t("altTexts.carouselSlide", { index: idx + 1 })}
                  className="hero-slide-image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
