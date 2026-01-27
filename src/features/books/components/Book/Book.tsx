import styles from "./Book.module.css";

type BookProps = {
	name: string;
};

export const Book = ({ name }: BookProps) => {
	return <article className={styles.book}>{name}</article>;
};
