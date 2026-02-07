import { useModal } from "../../hooks/useModal";
import { Button } from "../../shared/components/Button/Button";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import styles from "./Categories.module.css";
import { Category } from "../../features/categories/components/Category/Category";
import { useCategory } from "../../hooks/useCategory";
import { CategoryModal } from "../../features/categories/components/CategoryModal/CategoryModal";

export const Categories = () => {
	const { categories } = useCategory();
	const { modal, showModal, closeModal } = useModal();

	return (
		<>
			<section className={styles.section}>
				<HeaderSection title="Categorias">
					<Button handleClick={showModal}>Adicionar</Button>
				</HeaderSection>

				<ContainerUI variant="categories">
					{categories.map((category) => (
						<Category
							key={category.id}
							id={category.id}
							name={category.name}
							showModal={showModal}
							close={closeModal}
						/>
					))}
				</ContainerUI>
			</section>
			{modal && <CategoryModal close={closeModal} />}
		</>
	);
};
