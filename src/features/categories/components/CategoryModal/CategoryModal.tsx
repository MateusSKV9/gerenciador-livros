import { useSearchParams } from "react-router";
import { useCategory } from "../../../../hooks/useCategory";
import { Modal } from "../../../../shared/components/Modal/Modal";
import { CategoryForm } from "../CategoryForm/CategoryForm";

type CategoryModalProps = {
	close: () => void;
};

export const CategoryModal = ({ close }: CategoryModalProps) => {
	const { getCategory } = useCategory();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const categoryData = id ? getCategory(id) : undefined;

	return (
		<Modal close={close} title={id ? "Editando Categoria" : "Adicionando Categoria"}>
			{id && !categoryData ? (
				<h2>Carregando...</h2>
			) : (
				<CategoryForm key={id || "new"} close={close} categoryData={categoryData} />
			)}
		</Modal>
	);
};
