import { useState } from "react";
import styles from "./Books.module.css";
import { Book } from "../../features/books/components/Book/Book";

const initialBooks = [
	{
		id: 1,
		name: "Cartas de um diabo a seu aprendiz",
		pagesQuantity: 343,
		category: "Cristão",
		status: "Concluído",
		favorite: false,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
	{
		id: 2,
		name: "Bíblia",
		pagesQuantity: 1453,
		category: "Bíblia",
		status: "Lendo",
		favorite: true,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
];

export const Books = () => {
	const [books] = useState(initialBooks);

	return (
		<section className={styles.section}>
			<h1>Categories</h1>

			<div className={styles.container_books}>
				{books.map((book) => (
					<Book key={book.id} name={book.name} />
				))}
			</div>
		</section>
	);
};
