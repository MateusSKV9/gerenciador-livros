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
import { useSearchParams } from "react-router";

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

	const [filterSelected, setFilterSelected] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search");

	const toggleMenuBook = useCallback((id: string) => setBookMenu((prev) => (prev === id ? null : id)), []);
	const closeBookMenu = useCallback(() => setBookMenu(null), []);

	const handleEditClick = useCallback(
		(id: string) => {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);
				newParams.set("id", id);
				return newParams;
			});
			showModal();
			closeBookMenu();
		},
		[setSearchParams, showModal, closeBookMenu]
	);

	const selectedBooks = useMemo(() => {
		if (!books) return [];

		let result = books;

		if (search) {
			result = result.filter((book) => book.name.toLowerCase().includes(search.toLowerCase()));
		} else if (filterSelected && filterSelected !== "all") {
			if (filterSelected in FILTERS) {
				result = result.filter(FILTERS[filterSelected as SortersType].compare);
			} else {
				result = result.filter((book) => book.category === filterSelected);
			}
		}

		return [...result].sort((a, b) =>
			a.status === "reading" && b.status !== "reading" ? -1 : b.status === "reading" && a.status !== "reading" ? 1 : 0
		);
	}, [books, filterSelected, search]);

	return (
		<>
			<section className={styles.section}>
				<HeaderSection title="Livros">
					<div className={`${styles.container_buttons}`}>
						<Button handleClick={showModal}>Adicionar</Button>

						<select
							className={`${styles.filter} button_behavior`}
							value={filterSelected}
							onChange={(e) => {
								setSearchParams({ search: "" });
								setFilterSelected(e.target.value);
							}}
							name="filter"
							id="filter"
							title="Filtro"
						>
							<option value="" disabled>
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
								handleEdit={handleEditClick}
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
