import styles from "./BookForm.module.css";
import { Form } from "../../../../shared/components/Forms/Form/Form";
import { Input } from "../../../../shared/components/Forms/Input/Input";
import { Select } from "../../../../shared/components/Forms/Select/Select";

export const BookForm = () => {
	return (
		<Form>
			<Input id="name" name="name" label="Nome" type="text" placeholder="Digite o nome do livro" />
			<div className={styles.wrapper}>
				<Input
					id="totalPages"
					label="Quantidade de Páginas"
					name="totalPages"
					type="number"
					placeholder="Digite a quantidade de páginas"
				/>
				<Select id="category" label="Categoria" name="category">
					a
				</Select>
			</div>
			<div className={styles.wrapper}>
				<Input id="startDate" label="Data Início" name="startDate" type="date" />
				<Input id="endDate" label="Data Fim" name="endDate" type="date" />
			</div>
		</Form>
	);
};
