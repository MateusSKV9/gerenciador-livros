import { isAfter, isValid, parseISO } from "date-fns";
import z from "zod";

export const BookSchema = z
	.object({
		name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
		totalPages: z.coerce.number().min(1, "Quantidade no mínimo 1"),
		category: z.string().optional(),

		startDate: z
			.string()
			.optional()
			.refine((date) => !date || isValid(parseISO(date)), { message: "Data inválida" }),

		endDate: z
			.string()
			.refine((date) => !date || isAfter(parseISO(date), new Date()), { message: "A data deve ser futura" })
			.optional(),
	})
	.refine(
		(fields) => {
			if (!fields.startDate || !fields.endDate) return true;
			return isAfter(parseISO(fields.endDate), parseISO(fields.startDate));
		},
		{
			path: ["endDate"],
			message: "A data de término deve ser maior que de início",
		}
	);
