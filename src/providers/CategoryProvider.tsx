import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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

	const getCategory = useCallback(
		(id: string) => {
			return categories.find((cat) => cat.id === id);
		},
		[categories]
	);

	const createCategory = useCallback((category: CategoryType) => {
		setCategories((prev) => [...prev, category]);
	}, []);

	const updateCategory = useCallback((id: string, data: Partial<CategoryType>) => {
		setCategories((prev) => prev.map((category) => (category.id === id ? { ...category, ...data } : category)));
	}, []);

	const deleteCategory = useCallback((id: string) => {
		setCategories((prev) => prev.filter((category) => category.id !== id));
	}, []);

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	const value = useMemo(
		() => ({
			categories,
			getCategory,
			createCategory,
			updateCategory,
			deleteCategory,
		}),
		[categories, getCategory, createCategory, updateCategory, deleteCategory]
	);

	return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};
