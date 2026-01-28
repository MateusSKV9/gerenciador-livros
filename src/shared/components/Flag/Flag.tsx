import styles from "./Flag.module.css";

type FlagProps = {
	text: string;
};

export const Flag = ({ text }: FlagProps) => {
	return <div className={styles.flag}>{text}</div>;
};
