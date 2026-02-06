import { useEffect, useState, type ReactNode } from "react";
import { CategoryContext } from "../hooks/useCategory";
import type { CategoryType } from "../utils/category";

const initialCategories: CategoryType[] = [
	{ id: "1", name: "Cristão" },
	{ id: "2", name: "Bíblia" },
];

type CategoryProviderProps = {
	children: ReactNode;
};

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
	const [categories, setCategories] = useState<CategoryType[]>(() => {
		const stored = localStorage.getItem("categories");
		return stored ? JSON.parse(stored) : initialCategories;
	});

	const createCategory = (category: CategoryType) => {
		setCategories((prev) => [...prev, category]);
	};

	const getCategory = (id: string) => {
		return categories.find((Category) => Category.id === id);
	};

	const updateCategory = (id: string, data: Partial<CategoryType>) => {
		setCategories((prev) => prev.map((category) => (category.id === id ? { ...category, ...data } : category)));
	};

	const deleteCategory = (id: string) => {
		setCategories((prev) => prev.filter((category) => category.id !== id));
	};

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	const value = { categories, createCategory, getCategory, updateCategory, deleteCategory };

	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};
