import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import type { CategoryType } from "../../../../types/category";
import { useCategory } from "../../../../hooks/useCategory";
import { useForm, type SubmitHandler } from "react-hook-form";

type CategoryFormProps = {
	categoryData: CategoryType | undefined;
	close: () => void;
};

type CategoryFormData = {
	name: string;
};

export const CategoryForm = ({ categoryData, close }: CategoryFormProps) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CategoryFormData>({ defaultValues: categoryData || {} });

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
				{...register("name", {
					required: "Nome é obrigatório",
					maxLength: { value: 45, message: "Máximo de 45 caracteres" },
				})}
			/>
		</Form>
	);
};
