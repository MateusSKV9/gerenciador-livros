import type { ReactNode } from "react";
import styles from "./Main.module.css";

type MainProps = {
	children: ReactNode;
};

export const Main = ({ children }: MainProps) => {
	return <main className={styles.main}>{children}</main>;
};
