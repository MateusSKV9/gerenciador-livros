import { useRef, type ReactNode } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

type ModalProps = {
	children: ReactNode;
	close: () => void;
};

export const Modal = ({ children, close }: ModalProps) => {
	const modal = document.querySelector("#root-modal");
	const modalRef = useRef(null);

	if (!modal) return null;

	return createPortal(
		<div onClick={close} className={styles.overlay}>
			<div onClick={(e) => e.stopPropagation()} ref={modalRef} className={styles.modal}>
				<header className={styles.header}>
					<h2>Adicionando Livro</h2>
					<button onClick={close} type="button">
						X
					</button>
				</header>
				<div>{children}</div>
			</div>
		</div>,
		modal
	);
};
