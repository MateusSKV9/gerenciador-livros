import styles from "./HeaderSection.module.css";
import type { ReactNode } from "react";

type HeaderSection = {
	children: ReactNode;
	title: string;
};

export const HeaderSection = ({ children, title }: HeaderSection) => {
	return (
		<div className={styles.header}>
			<h1>{title}</h1>
			{children}
		</div>
	);
};
