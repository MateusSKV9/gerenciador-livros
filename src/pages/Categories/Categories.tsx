import { useState } from "react";
import { UseModal } from "../../hooks/UseModal";
import { Button } from "../../shared/components/Button/Button";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import styles from "./Categories.module.css";
import { Category } from "../../features/categories/components/Category/Category";

const initialCategories = [
	{ id: 1, name: "Cristão" },
	{ id: 2, name: "Bíblia" },
];

export const Categories = () => {
	const [categories] = useState(initialCategories);
	const { showModal } = UseModal();

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
