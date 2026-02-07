import { useState } from "react";
import { useSearchParams } from "react-router";

export const useModal = () => {
	const [modal, setModal] = useState(false);
	const [, setSearchParams] = useSearchParams();

	const showModal = () => setModal(true);
	const closeModal = () => {
		setModal(false);
		setSearchParams("");
	};

	return { modal, showModal, closeModal };
};
