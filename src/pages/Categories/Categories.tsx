import { Button } from "../../shared/components/Button/Button";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import styles from "./Categories.module.css";
import { Category } from "../../features/categories/components/Category/Category";
import { useCategory } from "../../hooks/useCategory";
import { CategoryModal } from "../../features/categories/components/CategoryModal/CategoryModal";
import { useCallback, useState } from "react";
import { useModal } from "../../hooks/useModal";

export const Categories = () => {
	const { categories } = useCategory();
	const { modal, showModal, closeModal } = useModal();
	const [categoryMenu, setCategoryMenu] = useState<string | null>("");

	const toggleCategoyMenu = useCallback((id: string) => {
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
						<Category
							key={category.id}
							id={category.id}
							name={category.name}
							showModal={showModal}
							categoryMenu={categoryMenu === category.id}
							toggleCategoyMenu={toggleCategoyMenu}
							closeMenu={closeMenu}
						/>
					))}
				</ContainerUI>
			</section>
			{modal && <CategoryModal close={closeModal} />}
		</>
	);
};
