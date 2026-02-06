import { useState } from "react";
import { useSearchParams } from "react-router";

export const useModal = () => {
	const [modal, setModal] = useState(false);
	const [, setSearchParams] = useSearchParams();

	const showModal = () => setModal(true);
	const CloseModal = () => {
		setModal(false);
		setSearchParams("");
	};

	return { modal, showModal, CloseModal };
};
