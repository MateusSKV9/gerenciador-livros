import styles from "./ContainerUI.module.css";
import type { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
	variant: "books" | "categories";
};

export const ContainerUI = ({ children, variant }: ContainerProps) => {
	return <div className={`${styles.container} ${styles[variant]}`}>{children}</div>;
};
