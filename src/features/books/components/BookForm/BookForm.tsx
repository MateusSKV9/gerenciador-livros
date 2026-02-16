import styles from "./BookForm.module.css";
import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import { Select } from "../../../../shared/components/Forms/Select/Select";
import type { BookType } from "../../../../types/book";
import { useActionsBook, useBooks } from "../../../../hooks/useBook";
import { useCategory } from "../../../../hooks/useCategory";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookSchema } from "../../../../schemas/bookSchema";
import type { BookFormData } from "../../../../types/book-form-data";
import { format, parseISO, startOfDay } from "date-fns";

type BookFormProps = {
	close: () => void;
	bookData: BookType | undefined;
};

export const BookForm = ({ close, bookData }: BookFormProps) => {
	const { categories } = useCategory();
	const { createBook } = useBooks();
	const { updateBook } = useActionsBook();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(BookSchema),
		defaultValues: bookData
			? {
					...bookData,
					startDate: bookData.startDate ? format(startOfDay(parseISO(bookData.startDate)), "yyyy-MM-dd") : undefined,
					endDate: bookData.endDate ? format(startOfDay(parseISO(bookData.endDate)), "yyyy-MM-dd") : undefined,
			  }
			: {},
	});

	const handleOnSubmit: SubmitHandler<BookFormData> = (data) => {
		if (bookData?.id) {
			updateBook(bookData.id, { ...data });
		} else {
			createBook({ id: crypto.randomUUID(), currentPages: 0, favorite: false, status: "to_read", ...data });
		}
		close();
	};

	return (
		<Form onSubmit={handleSubmit(handleOnSubmit)}>
			<Input
				id="name"
				label="Nome"
				type="text"
				placeholder="Digite o nome do livro"
				error={errors.name?.message}
				{...register("name")}
			/>
			<div className={styles.wrapper}>
				<Input
					id="totalPages"
					label="Quantidade de Páginas"
					type="number"
					placeholder="Digite a quantidade de páginas"
					error={errors.totalPages?.message}
					{...register("totalPages")}
				/>
				<Select id="category" options={categories} label="Categoria" {...register("category")} />
			</div>

			<div className={styles.wrapper}>
				<Input
					id="startDate"
					label="Data Início"
					type="date"
					error={errors.startDate?.message}
					{...register("startDate")}
				/>
				<Input id="endDate" label="Data Fim" type="date" error={errors.endDate?.message} {...register("endDate")} />
			</div>
		</Form>
	);
};
