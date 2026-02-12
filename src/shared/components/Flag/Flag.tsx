import { BOOK_STATUS, type BookStatus } from "../../../types/book-status";
import styles from "./Flag.module.css";

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
