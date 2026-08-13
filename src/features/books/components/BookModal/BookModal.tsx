import { useBooks } from "@/hooks";
import { useSearchParams } from "react-router";
import { BookForm } from "../BookForm/BookForm";
import { Modal } from "@/shared";

type BookModalProps = {
	close: () => void;
};

export function BookModal({ close }: BookModalProps) {
	const [searchParams] = useSearchParams();
	const { getBook } = useBooks();
	const id = searchParams.get("id") || undefined;
	const bookData = id ? getBook(id) : undefined;

	return (
		<Modal close={close} title={id ? "Editando Livro" : "Adicionando Livro"}>
			{id && !bookData ? <h2>carregando...</h2> : <BookForm key={id || "new"} bookData={bookData} close={close} />}
		</Modal>
	);
}
