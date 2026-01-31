export const BOOK_STATUS = {
	to_read: "A ler",
	reading: "Lendo",
	completed: "Concluído",
};

export type BookStatus = keyof typeof BOOK_STATUS;
