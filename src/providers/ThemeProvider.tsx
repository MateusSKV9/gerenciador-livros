import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "../hooks/useTheme";

type ThemeProviderProps = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

	const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

	useEffect(() => {
		localStorage.setItem("theme", theme);

		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const value = { theme, toggleTheme };

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
