import { useEffect, useState } from "react";
import type { BookType } from "../types/book";

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

export const UseBook = () => {
	const [books, setBooks] = useState<BookType[]>(() => {
		const stored = localStorage.getItem("books");
		return stored ? JSON.parse(stored) : initialBooks;
	});

	const create = (book: BookType) => {
		setBooks((prev) => [...prev, book]);
	};

	useEffect(() => {
		localStorage.setItem("books", JSON.stringify(books));
	}, [books]);

	return {
		books,
		create,
	};
};
