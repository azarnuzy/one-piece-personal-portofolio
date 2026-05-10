import { createContext, useContext } from "react";

import type { BlogCategory } from "@/pages/blog/data";

interface BlogCategoryContextValue {
  activeCategory: BlogCategory;
  setCategory: (cat: BlogCategory) => void;
}

export const BlogCategoryContext = createContext<BlogCategoryContextValue>({
  activeCategory: "all",
  setCategory: () => {},
});

export function useBlogCategory(): BlogCategoryContextValue {
  return useContext(BlogCategoryContext);
}
