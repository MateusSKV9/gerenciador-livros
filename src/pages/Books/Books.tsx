import styles from "./Books.module.css";
import { Book } from "../../features/books/components/Book/Book";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import { Button } from "../../shared/components/Button/Button";
import { useModal } from "../../hooks/useModal";
import { BookModal } from "../../features/books/components/BookModal/BookModal";
import { useBooks } from "../../hooks/useBook";
import { useCallback, useState } from "react";

export const Books = () => {
	const { books } = useBooks();
	const { modal, showModal, closeModal } = useModal();
	const [bookMenu, setBookMenu] = useState<string | null>(null);

	const toggleMenuBook = useCallback((id: string) => setBookMenu((prev) => (prev === id ? null : id)), []);
	const closeBookMenu = useCallback(() => setBookMenu(null), []);

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
					))}
				</ContainerUI>
			</section>

			{modal && <BookModal close={closeModal}></BookModal>}
		</>
	);
};
