import { Component } from "react";
import Tree from "../components/Tree";
import pokemon from "../data/pokemon.json";

class PokemonTree extends Component {
	render() {
		return (<>
			<section>
				<h1>Pokémon Tree</h1>

				<Tree
					children={pokemon}
					collection="pokemon"
					/>
			</section>
		</>);
	}
}

export default PokemonTree;
