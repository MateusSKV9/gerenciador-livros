import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CategoryProvider, BookProvider, ThemeProvider } from "./providers";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";

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
