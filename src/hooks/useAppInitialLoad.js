import { useState, useEffect } from "react";
import { useCategories } from "./useCategories";
import { useCarousel } from "./useCarousel";
import { useExchangeRate } from "./useCurrency";

/**
 * Hook to manage the initial app loading state
 * Tracks multiple critical API calls and provides overall loading status
 */
export function useAppInitialLoad() {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Track critical data that should be loaded before showing the app
  const categoriesQuery = useCategories();
  const carouselQuery = useCarousel();
  const exchangeRateQuery = useExchangeRate();

  useEffect(() => {
    // Calculate progress based on what's loaded
    const queries = [categoriesQuery, carouselQuery, exchangeRateQuery];
    const loadedCount = queries.filter(
      (q) => !q.isLoading && (q.data || q.isError)
    ).length;
    const totalCount = queries.length;

    // Calculate progress percentage (0-100)
    const newProgress = Math.round((loadedCount / totalCount) * 100);
    setProgress(newProgress);

    // Mark as complete when all critical data is loaded or errored
    // (we show the app even if some queries fail)
    if (loadedCount === totalCount && !isComplete) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [
    categoriesQuery.isLoading,
    categoriesQuery.data,
    categoriesQuery.isError,
    carouselQuery.isLoading,
    carouselQuery.data,
    carouselQuery.isError,
    exchangeRateQuery.isLoading,
    exchangeRateQuery.data,
    exchangeRateQuery.isError,
    isComplete,
  ]);

  return {
    isLoading: !isComplete,
    progress,
    queries: {
      categories: categoriesQuery,
      carousel: carouselQuery,
      exchangeRate: exchangeRateQuery,
    },
  };
}
