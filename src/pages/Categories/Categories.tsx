import { useCallback, useState } from "react";
import { CategoryCard, CategoryModal, useCategory } from "@/features/categories";
import { useModal } from "@/hooks";
import { HeaderSection, Button, ContainerUI } from "@/shared";
import styles from "./Categories.module.css";

export default function Categories() {
	const { categories } = useCategory();
	const { modal, showModal, closeModal } = useModal();
	const [categoryMenu, setCategoryMenu] = useState<string | null>("");

	const toggleCategoryMenu = useCallback((id: string) => {
		setCategoryMenu((prev) => (prev === id ? null : id));
	}, []);

	const closeMenu = useCallback(() => {
		setCategoryMenu(null);
	}, []);

	return (
		<>
			<section className={styles.section}>
				<HeaderSection title="Categorias" quantity={categories.length}>
					<div className={styles.container_buttons}>
						<Button handleClick={showModal}>Adicionar</Button>
					</div>
				</HeaderSection>

				<ContainerUI variant="categories">
					{categories.map((category) => (
						<CategoryCard
							key={category.id}
							id={category.id}
							name={category.name}
							showModal={showModal}
							categoryMenu={categoryMenu === category.id}
							toggleCategoryMenu={toggleCategoryMenu}
							closeMenu={closeMenu}
						/>
					))}
				</ContainerUI>
			</section>
			{modal && <CategoryModal close={closeModal} />}
		</>
	);
}
