import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";

export const useModal = () => {
	const [modal, setModal] = useState(false);
	const [, setSearchParams] = useSearchParams();

	const showModal = useCallback(() => setModal(true), []);

	const closeModal = useCallback(() => {
		setModal(false);
		setSearchParams("");
	}, [setSearchParams]);

	return { modal, showModal, closeModal };
};
