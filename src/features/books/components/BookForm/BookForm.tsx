import styles from "./BookForm.module.css";
import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import { Select } from "../../../../shared/components/Forms/Select/Select";
import type React from "react";
import { useState } from "react";
import type { BookType } from "../../../../types/book";
import { UseBook } from "../../../../hooks/UseBooks";

export const BookForm = () => {
	const [book, setBook] = useState<Partial<BookType>>({});
	const { create } = UseBook();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		create({ id: crypto.randomUUID(), currentPages: 0, favorite: false, status: "to_read", ...book } as BookType);
		console.log("criado");
	};

	const handleOnChange = (name: keyof BookType, value: string | number) => {
		setBook((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Input
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
