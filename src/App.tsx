import { Route, Routes } from "react-router";
import "./App.css";
import { Footer } from "./shared/layout/Footer/Footer";
import { Header } from "./shared/layout/Header/Header";
import { Main } from "./shared/layout/Main/Main";
import { Books } from "./pages/Books/Books";
import { Categories } from "./pages/Categories/Categories";

function App() {
	return (
		<>
			<Header />
			<Main>
				<Routes>
					<Route path="/" element={<Books />} />
					<Route path="/categories" element={<Categories />} />
				</Routes>
			</Main>
			<Footer />
		</>
	);
}

export default App;
