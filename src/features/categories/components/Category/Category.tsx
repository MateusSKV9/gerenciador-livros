import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { ItemMenu } from "@/shared";
import { useCategory } from "../../hooks/use-category";
import styles from "./Category.module.css";

type CategoryProps = {
	id: string;
	name: string;
	categoryMenu: boolean;
	toggleCategoryMenu: (id: string) => void;
	closeMenu: () => void;
	showModal: () => void;
};

export const Category = ({ id, name, categoryMenu, toggleCategoryMenu, closeMenu, showModal }: CategoryProps) => {
	const { deleteCategory } = useCategory();
	const [, setSearchParams] = useSearchParams();

	const menuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const clickOutside = (e: MouseEvent) => {
			if (menuRef.current && categoryMenu && !menuRef.current.contains(e.target as Node)) {
				closeMenu();
			}
		};

		document.addEventListener("click", clickOutside);

		return () => document.removeEventListener("click", clickOutside);
	}, [categoryMenu, closeMenu]);

	const handleDelete = () => {
		deleteCategory(id);
	};

	const handleEdit = () => {
		setSearchParams({ id: id });
		closeMenu();
		showModal();
	};

	return (
		<article className={styles.card}>
			<h2 className={styles.name}>{name}</h2>

			<button
				onClick={(e) => {
					e.stopPropagation();
					toggleCategoryMenu(id);
				}}
				className={styles.button}
				type="button"
				title="menu"
			>
				<svg width={28} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path
						fill="currentColor"
						d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"
					/>
				</svg>
			</button>

			{categoryMenu && (
				<ItemMenu refMenu={menuRef} handleEdit={handleEdit} handleDelete={handleDelete} variant="category" />
			)}
		</article>
	);
};
