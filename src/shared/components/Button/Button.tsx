import styles from "./Button.module.css";
import type { ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
	handleClick: () => void;
};

export const Button = ({ children, handleClick }: ButtonProps) => {
	return (
		<button onClick={handleClick} className={`${styles.button} button_behavior`} type="button">
			{children}
		</button>
	);
};
