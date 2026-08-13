import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { Footer, Header, Main } from "./shared";
import { Books } from "./pages/Books/Books";

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
