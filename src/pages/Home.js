import { Component } from "react";
import { Navigate } from "react-router-dom";

class Home extends Component {
	render() {
		return (<>
			<section>
				<h1>Home</h1>

				<Navigate to="/taxonomy-tree" replace />
			</section>
		</>);
	}
}

export default Home;
