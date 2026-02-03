import { Modal } from "../../../../shared/components/Modal/Modal";
import { BookForm } from "../BookForm/BookForm";

type BookModalProps = {
	close: () => void;
};

export const BookModal = ({ close }: BookModalProps) => {
	return (
		<Modal close={close}>
			<BookForm />
		</Modal>
	);
};
