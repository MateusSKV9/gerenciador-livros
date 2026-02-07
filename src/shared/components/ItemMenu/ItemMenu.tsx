import styles from "./ItemMenu.module.css";

type ItemMenuProps = {
	handleEdit: () => void;
	handleDelete: () => void;
	variant: variantType;
	refMenu: React.Ref<HTMLUListElement>;
};

const STYLE_VARIANT = {
	book: styles.book,
	category: styles.category,
};

type variantType = keyof typeof STYLE_VARIANT;

export const ItemMenu = ({ handleEdit, handleDelete, variant, refMenu }: ItemMenuProps) => {
	return (
		<ul ref={refMenu} className={`${styles.list} ${STYLE_VARIANT[variant]}`}>
			<li className={styles.item}>
				<button className={`${styles.button} button`} onClick={handleEdit} type="button">
					Editar
				</button>
			</li>
			<li className={styles.item}>
				<button className={`${styles.button} button`} onClick={handleDelete} type="button">
					Excluir
				</button>
			</li>
		</ul>
	);
};
