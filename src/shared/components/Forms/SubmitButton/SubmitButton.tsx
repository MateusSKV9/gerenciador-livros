import styles from "./Submit.module.css";

type SubmitProps = {
	text: string;
};

export const SubmitButton = ({ text }: SubmitProps) => {
	return <input className={`${styles.submit} button_behavior`} type="submit" value={text} />;
};
