import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "../services/product.service";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/localization";

const transformProductData = (data, lng) => {
  if (!data) return null;

  const transformSingle = (product) => {
    if (!product) return null;
    const transformedProduct = {
      ...product,
      name: getLocalizedText(product, "name", lng),
      description: getLocalizedText(product, "description", lng),
      structure: getLocalizedText(product, "structure", lng),
    };

    if (product.category) {
      transformedProduct.category = {
        ...product.category,
        name: getLocalizedText(product.category, "name", lng),
        description: getLocalizedText(product.category, "description", lng),
      };
    }

    if (product.subcategory) {
      transformedProduct.subcategory = {
        ...product.subcategory,
        name: getLocalizedText(product.subcategory, "name", lng),
      };
    }

    return transformedProduct;
  };

  if (Array.isArray(data)) {
    return data.map(transformSingle);
  }
  return transformSingle(data);
};

export function useProducts(params) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    keepPreviousData: true,
    staleTime: 60 * 1000,
    select: (data) => transformProductData(data, i18n.language),
  });
}

export function useProduct(productId) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
    staleTime: 60 * 1000,
    select: (data) => transformProductData(data, i18n.language),
  });
}
