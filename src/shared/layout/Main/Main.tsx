import styles from "./Main.module.css";

export const Main = () => {
	return (
		<main className={styles.main}>
			<h1>Título</h1>
			<div className={styles.container}>Itens</div>
		</main>
	);
};
