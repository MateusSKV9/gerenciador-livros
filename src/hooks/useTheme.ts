import { createContext, useContext } from "react";

type ThemeContextType = {
	theme: string;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) throw new Error("useTheme deve ser usado dentro de ThemeProvider");

	return context;
};
