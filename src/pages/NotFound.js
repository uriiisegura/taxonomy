import { Component } from "react";

class NotFound extends Component {
	render() {
		document.title = 'Not Found';

		return (<>
			<section className="error-page">
				<h1>404</h1>
				<h3>Page Not Found</h3>
			</section>
		</>);
	}
}

export default NotFound;
