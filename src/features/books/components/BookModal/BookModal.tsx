import { useSearchParams } from "react-router";
import { Modal } from "../../../../shared/components/Modal/Modal";
import { BookForm } from "../BookForm/BookForm";
import { UseBook } from "../../../../hooks/UseBooks";
import { useEffect, useState } from "react";
import type { BookType } from "../../../../types/book";

type BookModalProps = {
	close: () => void;
};

export const BookModal = ({ close }: BookModalProps) => {
	const [searchParams] = useSearchParams();
	const { getBook } = UseBook();
	const id = searchParams.get("id") || undefined;
	const [bookData, setBookData] = useState<BookType | undefined>();

	useEffect(() => {
		if (id) {
			const data = getBook(id);
			setBookData(data);
		}
	}, [id, getBook]);

	return (
		<Modal close={close}>
			<BookForm key={id || "new"} bookData={bookData} close={close} />
		</Modal>
	);
};
