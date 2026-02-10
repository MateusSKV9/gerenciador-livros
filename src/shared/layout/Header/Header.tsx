import { Link, useSearchParams } from "react-router";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../hooks/useTheme";

export const Header = () => {
	const { toggleTheme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const search = searchParams.get("search") ?? "";
	const [showMenu, setShowMenu] = useState(window.innerWidth > 600);
	const navRef = useRef<HTMLDivElement | null>(null);
	const btnMenuRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		const clickOutside = (e: MouseEvent) => {
			const target = e.target as Node;

			if (navRef.current && showMenu && !btnMenuRef.current?.contains(target) && !navRef.current.contains(target)) {
				setShowMenu(false);
			}
		};

		document.documentElement.addEventListener("click", clickOutside);

		return () => document.removeEventListener("click", clickOutside);
	}, [showMenu]);

	useEffect(() => {
		const time = setTimeout(() => {
			searchParams.set("search", search);
		}, 200);

		return () => clearTimeout(time);
	}, [search, searchParams]);

	const toggleMenu = () => setShowMenu((prev) => !prev);

	return (
		<header className={styles.header}>
			<Link className={styles.logo} to="/">
				<svg width={32} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path
						fill="currentColor"
						d="M320 205.3L320 514.6L320.5 514.4C375.1 491.7 433.7 480 492.8 480L512 480L512 160L492.8 160C450.6 160 408.7 168.4 369.7 184.6C352.9 191.6 336.3 198.5 320 205.3zM294.9 125.5L320 136L345.1 125.5C391.9 106 442.1 96 492.8 96L528 96C554.5 96 576 117.5 576 144L576 496C576 522.5 554.5 544 528 544L492.8 544C442.1 544 391.9 554 345.1 573.5L332.3 578.8C324.4 582.1 315.6 582.1 307.7 578.8L294.9 573.5C248.1 554 197.9 544 147.2 544L112 544C85.5 544 64 522.5 64 496L64 144C64 117.5 85.5 96 112 96L147.2 96C197.9 96 248.1 106 294.9 125.5z"
					/>
				</svg>
				<span className={styles.logo_text}>Gerenciador de Livros</span>
			</Link>

			<button ref={btnMenuRef} onClick={toggleMenu} type="button" title="Menu" className={styles.btnMenu}>
				<svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path
						fill="currentColor"
						d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"
					/>
				</svg>
			</button>

			<div ref={navRef} className={`${styles.wrapper} ${showMenu ? styles.showMenu : ""}`}>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<li className={styles.item}>
							<Link className={`${styles.link} button_behavior`} to="/">
								Início
							</Link>
						</li>
						<li className={styles.item}>
							<Link className={`${styles.link} button_behavior`} to="/categories">
								Categories
							</Link>
						</li>
					</ul>
				</nav>

				<div className={styles.search}>
					<svg className={styles.icon_search} xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 640 640">
						<path
							fill="currentColor"
							d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
						/>
					</svg>
					<input
						onChange={(e) => {
							const value = e.target.value;
							setSearchParams(value ? { search: value } : {});
						}}
						className={styles.input}
						type="text"
						name="search"
						id="search"
						placeholder="Pesquisar"
					/>
				</div>

				<button onClick={toggleTheme} className={`${styles.button_theme} button_behavior`} type="button" title="Tema">
					<svg className={styles.icon_theme} width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path
							fill="currentColor"
							d="M210.2 53.9C217.6 50.8 226 51.7 232.7 56.1L320.5 114.3L408.3 56.1C415 51.7 423.4 50.9 430.8 53.9C438.2 56.9 443.4 63.5 445 71.3L465.9 174.5L569.1 195.4C576.9 197 583.5 202.4 586.5 209.7C589.5 217 588.7 225.5 584.3 232.2L526.1 320L584.3 407.8C588.7 414.5 589.5 422.9 586.5 430.3C583.5 437.7 576.9 443.1 569.1 444.6L465.8 465.4L445 568.7C443.4 576.5 438 583.1 430.7 586.1C423.4 589.1 414.9 588.3 408.2 583.9L320.4 525.7L232.6 583.9C225.9 588.3 217.5 589.1 210.1 586.1C202.7 583.1 197.3 576.5 195.8 568.7L175 465.4L71.7 444.5C63.9 442.9 57.3 437.5 54.3 430.2C51.3 422.9 52.1 414.4 56.5 407.7L114.7 320L56.5 232.2C52.1 225.5 51.3 217.1 54.3 209.7C57.3 202.3 63.9 196.9 71.7 195.4L175 174.6L195.9 71.3C197.5 63.5 202.9 56.9 210.2 53.9zM239.6 320C239.6 275.6 275.6 239.6 320 239.6C364.4 239.6 400.4 275.6 400.4 320C400.4 364.4 364.4 400.4 320 400.4C275.6 400.4 239.6 364.4 239.6 320zM448.4 320C448.4 249.1 390.9 191.6 320 191.6C249.1 191.6 191.6 249.1 191.6 320C191.6 390.9 249.1 448.4 320 448.4C390.9 448.4 448.4 390.9 448.4 320z"
						/>
					</svg>
				</button>
			</div>
		</header>
	);
};
