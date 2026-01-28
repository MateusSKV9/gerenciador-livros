import { Flag } from "../../../../shared/components/Flag/Flag";
import { BookButton } from "../BookButton/BookButton";
import styles from "./Book.module.css";

type BookProps = {
	name: string;
	pagesQuantity: number;
	category: string;
	status: string;
	favorite: boolean;
	startDate: string;
	endDate: string;
};

export const Book = ({ name, category, status, startDate, endDate }: BookProps) => {
	return (
		<article className={styles.book}>
			<header className={styles.header}>
				<button type="button" title="favorite">
					<svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							fill="currentColor"
							d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z"
						/>
					</svg>
				</button>

				<button type="button" title="menu">
					<svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							fill="currentColor"
							d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"
						/>
					</svg>
				</button>
			</header>

			<div className={styles.body}>
				<div className={styles.wrapper_col}>
					<h2>{name}</h2>

					<div className={styles.container_flags}>
						<Flag text={category} />
						<Flag text={status} />
					</div>
				</div>

				<BookButton styleType="start" icon="start">
					Iniciar Leitura
				</BookButton>

				<div className={styles.container_dates}>
					<span>Início: {startDate}</span>
					<span>Término: {endDate}</span>
				</div>
			</div>
		</article>
	);
};
