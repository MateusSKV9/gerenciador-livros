import { createContext, useContext } from "react";
import type { Category } from "../schemas/category-schema";

type useCategoryProps = {
	categories: Category[];
	createCategory: (category: Category) => void;
	getCategory: (id: string) => Category | undefined;
	updateCategory: (id: string, data: Partial<Category>) => void;
	deleteCategory: (id: string) => void;
};

export const CategoryContext = createContext<useCategoryProps | null>(null);

export const useCategory = () => {
	const context = useContext(CategoryContext);

	if (!context) throw new Error("useCategory deve ser usado dentro de um CategoryProvider.");

	return context;
};
