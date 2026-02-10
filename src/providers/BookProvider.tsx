import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { BookType } from "../types/book";
import { BooksContext, BookActionsContext } from "../hooks/useBook";

const initialBooks: BookType[] = [
	{
		id: "1",
		name: "Bíblia",
		totalPages: 1363,
		currentPages: 559,
		category: "1",
		status: "reading",
		favorite: true,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
	{
		id: "2",
		name: "Cartas de um Diabo a seu Aprendiz",
		totalPages: 206,
		currentPages: 0,
		category: "2",
		status: "to_read",
		favorite: false,
		startDate: "2026-01-27",
		endDate: "2026-12-12",
	},
	{
		id: "3",
		name: "A Pirâmide da Sabedoria",
		totalPages: 203,
		currentPages: 0,
		category: "2",
		status: "to_read",
		favorite: false,
		startDate: "",
		endDate: "",
	},
	{
		id: "4",
		name: "Como Fazer Amigos e Influenciar Pessoas",
		totalPages: 223,
		currentPages: 223,
		category: "3",
		status: "completed",
		favorite: true,
		startDate: "2025-12-02",
		endDate: "2026-01-09",
	},
];

type BookProviderProps = {
	children: ReactNode;
};

export const BookProvider = ({ children }: BookProviderProps) => {
	const [books, setBooks] = useState<BookType[]>(() => {
		const stored = localStorage.getItem("books");
		return stored ? JSON.parse(stored) : initialBooks;
	});

	const getBook = useCallback((id: string) => books.find((book) => book.id === id), [books]);

	const createBook = useCallback((book: BookType) => {
		setBooks((prev) => [...prev, book]);
	}, []);

	const updateBook = useCallback((id: string, data: Partial<BookType>) => {
		setBooks((prev) => prev.map((book) => (book.id === id ? { ...book, ...data } : book)));
	}, []);

	const deleteBook = useCallback((id: string) => {
		setBooks((prev) => prev.filter((book) => book.id !== id));
	}, []);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			localStorage.setItem("books", JSON.stringify(books));
		}, 300);

		return () => clearTimeout(timeOut);
	}, [books]);

	const stateValue = useMemo(() => ({ books, createBook, getBook }), [books, createBook, getBook]);

	const actionsValue = useMemo(() => ({ updateBook, deleteBook }), [updateBook, deleteBook]);

	return (
		<BooksContext.Provider value={stateValue}>
			<BookActionsContext.Provider value={actionsValue}>{children}</BookActionsContext.Provider>
		</BooksContext.Provider>
	);
};
