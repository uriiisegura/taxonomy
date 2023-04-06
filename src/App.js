import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import TaxonomyItem from "./pages/TaxonomyItem";
import Palette from "./pages/Palette";
import NotFound from "./pages/NotFound";
import "./css/normalize.css";
import "./css/main.css";
import Home from "./pages/Home";
import TaxonomyTree from "./pages/TaxonomyTree";
import Footer from "./components/Footer";

function App() {
	return (<>
		<Router>
			<Navbar />
			<ScrollToTop />
			<main className="page">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/taxonomy-tree" element={<TaxonomyTree />} />
					<Route path="/palette" element={<Palette />} />
					<Route path="/taxonomy/:level/:name" element={<TaxonomyItem />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</Router>

		<Footer />
	</>);
}

export default App;
