import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "../services/category.service";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/localization";

const transformCategoryData = (data, lng) => {
  if (!data) return null;

  const transformSingle = (category) => {
    if (!category) return null;
    return {
      ...category,
      name: getLocalizedText(category, "name", lng),
      description: getLocalizedText(category, "description", lng),
      subcategories: Array.isArray(category.subcategories)
        ? category.subcategories.map((sub) => ({
            ...sub,
            name: getLocalizedText(sub, "name", lng),
          }))
        : [],
    };
  };

  if (Array.isArray(data)) {
    return data.map(transformSingle);
  }
  return transformSingle(data);
};

export function useCategories() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    select: (data) => transformCategoryData(data, i18n.language),
  });
}

export function useCategory(categoryId) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: Boolean(categoryId),
    staleTime: 5 * 60 * 1000,
    select: (data) => transformCategoryData(data, i18n.language),
  });
}
