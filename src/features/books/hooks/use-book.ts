import { createContext, useContext } from "react";
import type { Book } from "../schemas/book-schema";

type BookContextType = {
	books: Book[];
	createBook: (book: Book) => void;
	getBook: (id: string) => Book | undefined;
};

type BookActionsContextProps = {
	updateBook: (id: string, data: Partial<Book>) => void;
	deleteBook: (id: string) => void;
};

export const BooksContext = createContext<BookContextType | null>(null);
export const BookActionsContext = createContext<BookActionsContextProps | null>(null);

export const useBooks = () => {
	const context = useContext(BooksContext);

	if (!context) throw new Error("useBooks deve ser usado dentro de BookProvider");

	return context;
};

export const useActionsBook = () => {
	const context = useContext(BookActionsContext);

	if (!context) throw new Error("useActionsBook deve ser usado dentro de BookProvider");

	return context;
};
