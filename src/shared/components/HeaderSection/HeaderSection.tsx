import styles from "./HeaderSection.module.css";
import type { ReactNode } from "react";

type HeaderSection = {
	children: ReactNode;
	title: string;
	quantity: number;
};

export const HeaderSection = ({ children, title, quantity }: HeaderSection) => {
	return (
		<div className={styles.header}>
			<h1>
				{title} - {quantity}
			</h1>
			{children}
		</div>
	);
};
