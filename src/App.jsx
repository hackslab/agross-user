import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import WhyUs from "./components/WhyUs";
import PopularProducts from "./components/PopularProducts";
import Categories from "./components/Categories";
import AllCategories from "./components/AllCategories";
import Footer from "./components/Footer";
// Auth, Cart, and Favourites removed
import NotFound from "./components/NotFound";
import ProductDetail from "./components/ProductDetail";
import About from "./components/About";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContact from "./components/FloatingContact";
import LoadingScreen from "./components/LoadingScreen";
import SEOHelmet from "./components/SEOHelmet";
import { useAppInitialLoad } from "./hooks/useAppInitialLoad";

function App() {
  const isAuthPage = false; // Auth removed
  const { isLoading, progress } = useAppInitialLoad();

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={progress} />
      <SEOHelmet />
      <div className="app">
        <ScrollToTop />
        {!isAuthPage && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Catalog />
                  <WhyUs />
                  <PopularProducts />
                </>
              }
            />
            <Route path="/categories" element={<AllCategories />} />
            <Route
              path="/category"
              element={<Navigate to="/categories" replace />}
            />
            <Route path="/category/:id" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* Auth, Cart, and Favourites routes removed */}
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster richColors position="top-right" />
        {!isAuthPage && <Footer />}
        <FloatingContact />
      </div>
    </>
  );
}

export default App;
