import { useState } from "react";

export const UseModal = () => {
	const [modal, setModal] = useState(false);

	const showModal = () => setModal(true);
	const CloseModal = () => setModal(false);

	return { modal, showModal, CloseModal };
};
