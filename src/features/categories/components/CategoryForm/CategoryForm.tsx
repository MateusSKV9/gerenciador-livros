import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "@/shared";
import { useCategory } from "../../hooks/use-category";
import { CategorySchema, type Category, type CategoryFormData } from "../../schemas/category-schema";

type CategoryFormProps = {
	categoryData: Category | undefined;
	close: () => void;
};

export const CategoryForm = ({ categoryData, close }: CategoryFormProps) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ resolver: zodResolver(CategorySchema), defaultValues: categoryData || {} });

	const { createCategory, updateCategory } = useCategory();

	const handleOnSubmit: SubmitHandler<CategoryFormData> = (data) => {
		if (categoryData?.id) {
			updateCategory(categoryData.id, { ...data });
		} else {
			createCategory({ id: crypto.randomUUID(), ...data });
		}
		close();
	};

	return (
		<Form onSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				label="Nome"
				type="text"
				placeholder="Digite o nome da categoria"
				error={errors.name?.message}
				{...register("name")}
			/>
		</Form>
	);
};
