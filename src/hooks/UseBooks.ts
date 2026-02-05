import { createContext, useContext } from "react";
import type { BookType } from "../types/book";

type BookContextType = {
	books: BookType[];
	getBook: (id: string) => BookType | undefined;
	create: (book: BookType) => void;
	update: (id: string, data: Partial<BookType>) => void;
	deleteBook: (id: string) => void;
};

export const BookContext = createContext<BookContextType | null>(null);

export const UseBook = () => {
	const context = useContext(BookContext);

	if (!context) throw new Error("useBook deve ser usado dentro de BookProvider");

	return context;
};
