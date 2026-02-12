import React, { useEffect, useRef } from "react";
import { Flag } from "../../../../shared/components/Flag/Flag";
import { BookButton } from "../BookButton/BookButton";
import styles from "./Book.module.css";
import { format, parseISO } from "date-fns";
import { type BookStatus } from "../../../../types/book-status";
import { ItemMenu } from "../../../../shared/components/ItemMenu/ItemMenu";
import { useActionsBook } from "../../../../hooks/useBook";
import { useCategory } from "../../../../hooks/useCategory";

type BookProps = {
	id: string;
	name: string;
	totalPages: number;
	currentPages: number;
	category: string;
	status: BookStatus;
	favorite: boolean;
	startDate: string;
	endDate: string;
	bookMenu: boolean;
	toggleMenuBook: (id: string) => void;
	closeBookMenu: () => void;
	showModal: () => void;
	handleEdit: (id: string) => void;
};

export const Book = React.memo(
	({
		id,
		name,
		category,
		status,
		startDate,
		endDate,
		totalPages,
		currentPages,
		favorite,
		bookMenu,
		toggleMenuBook,
		closeBookMenu,

		handleEdit,
	}: BookProps) => {
		const { getCategory } = useCategory();
		const { updateBook, deleteBook } = useActionsBook();

		const menuRef = useRef<HTMLUListElement>(null);
		const bookCategory = getCategory(category);

		const percentage = (currentPages / totalPages) * 100;
		const currentProgress = Math.min(100, Math.max(0, Math.floor(percentage)));

		useEffect(() => {
			if (!bookMenu) return;

			const clickOutside = (e: MouseEvent) => {
				if (menuRef.current && bookMenu && !menuRef.current.contains(e.target as Node)) {
					closeBookMenu();
				}
			};

			document.addEventListener("click", clickOutside);

			return () => document.removeEventListener("click", clickOutside);
		}, [bookMenu, closeBookMenu]);

		const handleIncrease = () => {
			const nextPage = Math.min(currentPages + 1, totalPages);
			updateBook(id, { currentPages: nextPage, status: nextPage === totalPages ? "completed" : "reading" });
		};

		const handleDecrease = () => {
			const nextPage = Math.max(currentPages - 1, 0);
			updateBook(id, { currentPages: nextPage, status: nextPage === 0 ? "to_read" : "reading" });
		};

		const handleClick = () => {
			if (status === "to_read") {
				updateBook(id, {
					status: "reading",
					currentPages: 0,
					startDate: format(new Date(), "yyyy-MM-dd"),
					endDate: "",
				});
				return;
			}

			if (status === "reading") {
				updateBook(id, { status: "completed", currentPages: totalPages });
				return;
			}

			updateBook(id, { status: "to_read", currentPages: 0 });
		};

		const handleFavorite = () => {
			updateBook(id, { favorite: !favorite });
		};

		const displayDate = (date: string) => (date ? format(parseISO(date), "dd/MM/yyyy") : "--/--/----");

		return (
			<article className={styles.book}>
				<header className={styles.header}>
					<div className={styles.wrapper_intro}>
						<button
							onClick={handleFavorite}
							className={`${styles.button} ${styles.favorite_button}`}
							type="button"
							title="favorite"
						>
							<svg
								className={`${styles.icon_favorite} ${favorite && styles.favorited}`}
								width={28}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 640 640"
							>
								<path
									fill="currentColor"
									d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
								/>
							</svg>
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								toggleMenuBook(id);
							}}
							className={styles.button}
							type="button"
							title="menu"
						>
							<svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
								<path
									fill="currentColor"
									d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"
								/>
							</svg>
						</button>
						{bookMenu && (
							<ItemMenu
								refMenu={menuRef}
								handleEdit={() => handleEdit(id)}
								handleDelete={() => deleteBook(id)}
								variant="book"
							/>
						)}
					</div>

					<div className={styles.wrapper_col}>
						<h2 className={styles.name}>{name}</h2>
						{bookCategory && <Flag text={bookCategory.name} />}
						<Flag text={status} variant={status} />
					</div>
				</header>

				<div className={styles.body}>
					<BookButton handleClick={handleClick} styleType={status} icon={status}>
						{`${status === "to_read" ? "Iniciar" : status === "reading" ? "Finalizar" : "Reiniciar"}  Leitura`}
					</BookButton>

					<div className={styles.container_dates}>
						<span>
							<strong>Início:</strong> {displayDate(startDate)}
						</span>
						<span>
							<strong>Término:</strong> {displayDate(endDate)}
						</span>
					</div>
				</div>

				<footer className={styles.footer}>
					<div className={styles.wrapper}>
						{status !== "to_read" && (
							<button
								onClick={handleDecrease}
								className={`${styles.progresss_button} ${styles.minus_button} button_behavior`}
								type="button"
								title="Adicionar Páginas"
								disabled={currentPages === 0}
							>
								<svg
									width={20}
									className={`${styles.progresss_icon}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 640"
								>
									<path
										fill="currentColor"
										d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"
									/>
								</svg>
							</button>
						)}

						<input
							className={styles.input}
							type="text"
							name="pagesQuantity"
							id={`${id}_pagesQuantity`}
							value={`${currentPages.toString()}/${totalPages.toString()}`}
							title="Quantidade de páginas"
							readOnly
						/>
						{status !== "to_read" && (
							<button
								onClick={handleIncrease}
								className={`${styles.progresss_button} ${styles.plus_button} button_behavior`}
								type="button"
								title="Adicionar Páginas"
								disabled={currentPages === totalPages}
							>
								<svg
									className={`${styles.progresss_icon}`}
									width={20}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 640"
								>
									<path
										fill="currentColor"
										d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
									/>
								</svg>
							</button>
						)}
					</div>

					{(status === "reading" || status === "completed") && (
						<progress value={currentProgress} max={100} className={styles.progress} />
					)}
				</footer>
			</article>
		);
	}
);
