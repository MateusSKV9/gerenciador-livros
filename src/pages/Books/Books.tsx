import { useState } from "react";
import styles from "./Books.module.css";
import { Book } from "../../features/books/components/Book/Book";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import { Button } from "../../shared/components/Button/Button";
import type { BookStatus } from "../../utils/book.types";
import { Modal } from "../../shared/components/Modal/Modal";
import { UseModal } from "../../hooks/UseModal";

type BookType = {
	id: number;
	name: string;
	totalPages: number;
	currentPages: number;
	category: string;
	status: BookStatus;
	favorite: boolean;
	startDate: string;
	endDate: string;
};

const initialBooks: BookType[] = [
	{
		id: 1,
		name: "Cartas de um diabo a seu aprendiz",
		totalPages: 206,
		currentPages: 0,
		category: "Cristão",
		status: "to_read",
		favorite: false,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
	{
		id: 2,
		name: "Bíblia",
		totalPages: 1363,
		currentPages: 0,
		category: "Bíblia",
		status: "to_read",
		favorite: true,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
	{
		id: 3,
		name: "A Pirâmide da Sabedoria",
		totalPages: 203,
		currentPages: 0,
		category: "Cristão",
		status: "to_read",
		favorite: true,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
	{
		id: 4,
		name: "Princípios Elementares",
		totalPages: 10,
		currentPages: 0,
		category: "Cristão",
		status: "to_read",
		favorite: true,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
];

export const Books = () => {
	const [books] = useState(initialBooks);
	const { modal, showModal, CloseModal } = UseModal();

	return (
		<>
			<section className={styles.section}>
				<HeaderSection title="Livros">
					<div className={`${styles.container_buttons}`}>
						<Button handleClick={showModal}>Adicionar</Button>
						<Button handleClick={() => console.log("Filtro")} icon="filter">
							Filtrar
						</Button>
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
							totalPages={book.totalPages}
							currentPages={book.currentPages}
						/>
					))}
				</ContainerUI>
			</section>

			{modal && <Modal close={CloseModal}>a</Modal>}
		</>
	);
};
