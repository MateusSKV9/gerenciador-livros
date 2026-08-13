import { isAfter, isSameDay, isValid, parseISO, startOfDay } from "date-fns";
import z from "zod";

// 1. Constantes e Tipos de Status
export const BOOK_STATUS = {
	to_read: "A ler",
	reading: "Lendo",
	completed: "Concluído",
} as const;

export type BookStatus = keyof typeof BOOK_STATUS;
export const BookStatusSchema = z.enum(Object.keys(BOOK_STATUS) as [BookStatus, ...BookStatus[]]);

// 2. Schema da Entidade Completa (Resposta da API / Banco / Estado Global)
export const BookSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Nome é obrigatório").max(45, "Máximo de 45 caracteres"),
	totalPages: z.coerce.number("Digite um valor").min(1, "Quantidade no mínimo 1"),
	currentPages: z.coerce.number().min(0).default(0),
	category: z.string().optional(),
	status: BookStatusSchema.default("to_read"),
	favorite: z.boolean().default(false),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;

// 3. Schema do Formulário (Validações de Input do Usuário)
export const BookFormSchema = z
	.object({
		name: BookSchema.shape.name,
		totalPages: BookSchema.shape.totalPages,
		category: BookSchema.shape.category,
		startDate: z
			.string()
			.optional()
			.refine((date) => !date || isValid(parseISO(date)), {
				message: "Data inválida",
			}),
		endDate: z
			.string()
			.optional()
			.refine(
				(date) => {
					if (!date) return true;
					const parsed = parseISO(date);
					const today = startOfDay(new Date());
					// Aceita hoje ou qualquer data futura
					return isAfter(parsed, today) || isSameDay(parsed, today);
				},
				{ message: "A data deve ser igual ou posterior a hoje" }
			),
	})
	.refine(
		(fields) => {
			if (!fields.startDate || !fields.endDate) return true;
			const start = parseISO(fields.startDate);
			const end = parseISO(fields.endDate);
			return isAfter(end, start) || isSameDay(end, start);
		},
		{
			path: ["endDate"],
			message: "A data de término não pode ser anterior à data de início",
		}
	);

export type BookFormData = z.infer<typeof BookFormSchema>;
