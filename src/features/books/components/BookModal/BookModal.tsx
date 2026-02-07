import { useSearchParams } from "react-router";
import { Modal } from "../../../../shared/components/Modal/Modal";
import { BookForm } from "../BookForm/BookForm";
import { useBooks } from "../../../../hooks/useBook";

type BookModalProps = {
	close: () => void;
};

export const BookModal = ({ close }: BookModalProps) => {
	const [searchParams] = useSearchParams();
	const { getBook } = useBooks();
	const id = searchParams.get("id") || undefined;
	const bookData = id ? getBook(id) : undefined;

	return (
		<Modal close={close}>
			{id && !bookData ? <h2>carregando...</h2> : <BookForm key={id || "new"} bookData={bookData} close={close} />}
		</Modal>
	);
};
