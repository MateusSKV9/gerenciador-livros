import { Route, Routes } from "react-router";
import "./App.css";
import { Footer } from "./shared/layout/Footer/Footer";
import { Header } from "./shared/layout/Header/Header";
import { Main } from "./shared/layout/Main/Main";
import { Books } from "./pages/Books/Books";
import { lazy, Suspense } from "react";

const Categories = lazy(() => import("./pages/Categories/Categories"));

function App() {
	return (
		<>
			<Header />
			<Main>
				<Suspense fallback={<p>Carregando...</p>}>
					<Routes>
						<Route path="/" element={<Books />} />
						<Route path="/categories" element={<Categories />} />
					</Routes>
				</Suspense>
			</Main>
			<Footer />
		</>
	);
}

export default App;
