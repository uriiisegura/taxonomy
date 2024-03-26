import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./css/normalize.css";
import "./css/main.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaxonomyTree from "./pages/TaxonomyTree";
import TaxonomyItem from "./pages/TaxonomyItem";
import Gallery from "./pages/Gallery";
import PokemonTree from "./pages/PokemonTree";
import Articles from "./pages/Articles";
import SingleArticle from "./pages/SingleArticle";
import Palette from "./pages/Palette";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

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
					<Route path="/pokemon" element={<PokemonTree />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/articles/:id" element={<SingleArticle />} />
					<Route path="/galleries/:level/:name" element={<Gallery />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</Router>

		<Footer />
	</>);
}

export default App;
