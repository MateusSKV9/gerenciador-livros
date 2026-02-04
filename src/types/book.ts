import type { BookStatus } from "../utils/book.types";

export type BookType = {
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
