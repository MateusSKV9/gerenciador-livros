import { useModal } from "../../hooks/useModal";
import { Button } from "../../shared/components/Button/Button";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import styles from "./Categories.module.css";
import { Category } from "../../features/categories/components/Category/Category";
import { useCategory } from "../../hooks/useCategory";

export const Categories = () => {
	const { categories } = useCategory();
	const { showModal } = useModal();

	return (
		<section className={styles.section}>
			<HeaderSection title="Categorias">
				<Button handleClick={showModal}>Adicionar</Button>
			</HeaderSection>

			<ContainerUI variant="categories">
				{categories.map((category) => (
					<Category key={category.id} name={category.name} />
				))}
			</ContainerUI>
		</section>
	);
};
