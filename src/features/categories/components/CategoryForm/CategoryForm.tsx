import React, { useState } from "react";
import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import type { CategoryType } from "../../../../utils/category";
import { useCategory } from "../../../../hooks/useCategory";

type CategoryFormProps = {
	categoryData: CategoryType | undefined;
	close: () => void;
};

export const CategoryForm = ({ categoryData, close }: CategoryFormProps) => {
	const [category, setCategory] = useState<Partial<CategoryType>>(categoryData || {});
	const { createCategory, updateCategory } = useCategory();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (category.id) {
			updateCategory(category.id, { ...category });
		} else {
			if (!category.name) return;
			createCategory({ id: crypto.randomUUID(), name: category.name });
		}
		close();
	};

	const handleChange = (name: keyof CategoryType, value: string | number) => {
		setCategory((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input<CategoryType>
				id="name"
				name="name"
				label="Nome"
				type="text"
				placeholder="Digite o nome da categoria"
				onChange={handleChange}
				value={category.name ? category.name : ""}
			/>
		</Form>
	);
};
