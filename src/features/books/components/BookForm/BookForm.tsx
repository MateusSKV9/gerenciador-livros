import styles from "./BookForm.module.css";
import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import { Select } from "../../../../shared/components/Forms/Select/Select";
import type React from "react";
import { useState } from "react";
import type { BookType } from "../../../../types/book";
import { useActionsBook, useBooks } from "../../../../hooks/useBook";
import { useCategory } from "../../../../hooks/useCategory";

type BookFormProps = {
	close: () => void;
	bookData: BookType | undefined;
};

export const BookForm = ({ close, bookData }: BookFormProps) => {
	const [book, setBook] = useState<Partial<BookType>>(bookData || {});
	const { categories } = useCategory();
	const { createBook } = useBooks();
	const { updateBook } = useActionsBook();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (book.id) {
			updateBook(book.id, { ...book });
		} else {
			createBook({ id: crypto.randomUUID(), currentPages: 0, favorite: false, status: "to_read", ...book } as BookType);
		}
		close();
	};

	const handleOnChange = (name: keyof BookType, value: string | number) => {
		setBook((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input<BookType>
				onChange={handleOnChange}
				id="name"
				name="name"
				value={book.name ? book.name : ""}
				label="Nome"
				type="text"
				placeholder="Digite o nome do livro"
			/>
			<div className={styles.wrapper}>
				<Input
					onChange={handleOnChange}
					value={book.totalPages ? book.totalPages : ""}
					id="totalPages"
					label="Quantidade de Páginas"
					name="totalPages"
					type="number"
					placeholder="Digite a quantidade de páginas"
				/>
				<Select
					id="category"
					onChange={handleOnChange}
					options={categories}
					value={book.category ? book.category : ""}
					label="Categoria"
					name="category"
				>
					a
				</Select>
			</div>
			<div className={styles.wrapper}>
				<Input
					onChange={handleOnChange}
					value={book.startDate ? book.startDate : ""}
					id="startDate"
					label="Data Início"
					name="startDate"
					type="date"
				/>
				<Input
					onChange={handleOnChange}
					value={book.endDate ? book.endDate : ""}
					id="endDate"
					label="Data Fim"
					name="endDate"
					type="date"
				/>
			</div>
		</Form>
	);
};
