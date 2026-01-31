import { UseModal } from "../../hooks/UseModal";
import { Button } from "../../shared/components/Button/Button";
import { ContainerUI } from "../../shared/components/ContainerUI/ContainerUI";
import { HeaderSection } from "../../shared/components/HeaderSection/HeaderSection";
import styles from "./Categories.module.css";

export const Categories = () => {
	const { showModal } = UseModal();

	return (
		<section className={styles.section}>
			<HeaderSection title="Categorias">
				<Button handleClick={showModal}>Adicionar</Button>
			</HeaderSection>

			<ContainerUI variant="categories">a</ContainerUI>
		</section>
	);
};
