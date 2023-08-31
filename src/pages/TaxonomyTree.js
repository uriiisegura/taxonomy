import { Component } from "react";
import Tree from "../components/Tree";
import taxonomy from "./../data/taxonomy.json";

class TaxonomyTree extends Component {
	render() {
		return (<>
			<section>
				<h1>Taxonomy Tree</h1>

				<Tree
					children={taxonomy}
					/>
			</section>
		</>);
	}
}

export default TaxonomyTree;
