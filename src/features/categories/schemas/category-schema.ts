import z from "zod";

//  1. Schema da Entidade (API / Banco / Estado Global)
export const CategorySchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Obrigatório").max(45, "Máx. de 45"),
});
export type Category = z.infer<typeof CategorySchema>;

// 2. Schema do Formulário
export const CategoryFormSchema = CategorySchema.pick({ name: true });
export type CategoryFormData = z.infer<typeof CategoryFormSchema>;
