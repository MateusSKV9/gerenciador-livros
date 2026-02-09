import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { BookProvider } from "./providers/BookProvider.tsx";
import { CategoryProvider } from "./providers/CategoryProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BookProvider>
			<CategoryProvider>
				<ThemeProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ThemeProvider>
			</CategoryProvider>
		</BookProvider>
	</StrictMode>
);
