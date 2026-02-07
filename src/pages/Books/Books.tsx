import styles from "./Books.module.css";
import { Book } from "../../features/books/components/Book/Book";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import { Button } from "../../shared/components/Button/Button";

import { BookModal } from "../../features/books/components/BookModal/BookModal";
import { useBooks } from "../../hooks/useBook";
import { useCallback, useMemo, useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import type { BookType } from "../../types/book";
import { useModal } from "../../hooks/useModal";

const FILTERS = {
	favorites: { label: "Favoritos", compare: (book: BookType) => book.favorite },
	reading: { label: "Lendo", compare: (book: BookType) => book.status === "reading" },
	to_read: { label: "Não lidos", compare: (book: BookType) => book.status === "to_read" },
	completed: { label: "Lidos", compare: (book: BookType) => book.status === "completed" },
};

type SortersType = keyof typeof FILTERS;

export const Books = () => {
	const { books } = useBooks();
	const { categories } = useCategory();
	const { modal, showModal, closeModal } = useModal();
	const [bookMenu, setBookMenu] = useState<string | null>(null);

	const [filterSelected, setFilterSelected] = useState("all");

	const toggleMenuBook = useCallback((id: string) => setBookMenu((prev) => (prev === id ? null : id)), []);
	const closeBookMenu = useCallback(() => setBookMenu(null), []);

	const selectedBooks = useMemo(() => {
		if (!books) return [];
		if (filterSelected === "all") return books;
		if (filterSelected in FILTERS) {
			const filtred = FILTERS[filterSelected as SortersType];
			return books.filter(filtred.compare);
		}

		return books.filter((book) => book.category === filterSelected);
	}, [books, filterSelected]);

	return (
		<>
			<section className={styles.section}>
				<HeaderSection title="Livros">
					<div className={`${styles.container_buttons}`}>
						<Button handleClick={showModal}>Adicionar</Button>

						<select
							className={`${styles.filter} button_behavior`}
							value={filterSelected}
							onChange={(e) => setFilterSelected(e.target.value)}
							name="filter"
							id="filter"
							title="Filtro"
						>
							<option value="" selected disabled>
								🔍Filtrar
							</option>
							<option value="all">Todos</option>

							{Object.entries(FILTERS).map(([id, { label }]) => (
								<option key={id} value={id}>
									{label}
								</option>
							))}

							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
				</HeaderSection>

				<ContainerUI variant="books">
					{selectedBooks.length > 0 ? (
						selectedBooks.map((book) => (
							<Book
								id={book.id}
								key={book.id}
								name={book.name}
								category={book.category}
								status={book.status}
								startDate={book.startDate}
								endDate={book.endDate}
								favorite={book.favorite}
								totalPages={book.totalPages}
								currentPages={book.currentPages}
								bookMenu={bookMenu === book.id}
								toggleMenuBook={toggleMenuBook}
								closeBookMenu={closeBookMenu}
								showModal={showModal}
							/>
						))
					) : (
						<h2>Nenhum livro encontrado!</h2>
					)}
				</ContainerUI>
			</section>

			{modal && <BookModal close={closeModal}></BookModal>}
		</>
	);
};
