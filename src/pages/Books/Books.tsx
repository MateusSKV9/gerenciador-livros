import { useState } from "react";
import styles from "./Books.module.css";
import { Book } from "../../features/books/components/Book/Book";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import { Button } from "../../shared/components/Button/Button";

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
			<HeaderSection title="Livros">
				<div className={`${styles.container_buttons}`}>
					<Button>Adicionar</Button>
					<Button icon="filter">Filtrar</Button>
				</div>
			</HeaderSection>

			<ContainerUI variant="books">
				{books.map((book) => (
					<Book
						key={book.id}
						name={book.name}
						category={book.category}
						status={book.status}
						startDate={book.startDate}
						endDate={book.endDate}
						favorite={book.favorite}
						pagesQuantity={book.pagesQuantity}
					/>
				))}
			</ContainerUI>
		</section>
	);
};
