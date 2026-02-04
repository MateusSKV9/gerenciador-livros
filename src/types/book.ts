import type { BookStatus } from "../utils/book.types";

export type BookType = {
	id: string;
	name: string;
	totalPages: number;
	currentPages: number;
	category: string;
	status: BookStatus;
	favorite: boolean;
	startDate: string;
	endDate: string;
};
