import type { BookStatus } from "@/features/books";
import styles from "./Flag.module.css";
import { BOOK_STATUS } from "@/features/books/schemas/book-schema";

type FlagProps = {
	text: string;
	variant?: BookStatus;
};

const STYLE_STATUS: Record<BookStatus | string, string> = {
	to_read: styles.default,
	reading: styles.reading,
	completed: styles.completed,
};

export const Flag = ({ text, variant }: FlagProps) => {
	return (
		<div className={`${styles.flag} ${variant && STYLE_STATUS[variant]}`}>{variant ? BOOK_STATUS[variant] : text}</div>
	);
};
