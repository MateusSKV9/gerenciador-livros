import { createContext, useContext } from "react";
import type { CategoryType } from "../utils/category";

type useCategoryProps = {
	categories: CategoryType[];
	getCategory: (id: string) => CategoryType | undefined;
	createCategory: (category: CategoryType) => void;
	updateCategory: (id: string, data: Partial<CategoryType>) => void;
	deleteCategory: (id: string) => void;
};

export const CategoryContext = createContext<useCategoryProps | null>(null);

export const useCategory = () => {
	const context = useContext(CategoryContext);

	if (!context) throw new Error("useCategory deve ser usado dentro de um CategoryProvider.");

	return context;
};
