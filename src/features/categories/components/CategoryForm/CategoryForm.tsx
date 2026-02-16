import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import type { CategoryType } from "../../../../types/category";
import { useCategory } from "../../../../hooks/useCategory";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CategoryFormProps = {
	categoryData: CategoryType | undefined;
	close: () => void;
};

const CategorySchema = z.object({
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
});

type CategoryFormData = z.infer<typeof CategorySchema>;

export const CategoryForm = ({ categoryData, close }: CategoryFormProps) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CategoryFormData>({ resolver: zodResolver(CategorySchema), defaultValues: categoryData || {} });

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
