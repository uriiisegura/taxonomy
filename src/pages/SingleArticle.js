import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import articles from "./../data/articles.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class SingleArticle extends Component {
	renderComponent(c, i) {
		let component;
		const props = c.props ? c.props : {};
		props.key = i;
		
		if (props.onClick)
			// eslint-disable-next-line
			props.onClick = eval(props.onClick)
		if (c.text) {
			component = React.createElement(c.type, props, c.text);
		} else {
			const children = c.components.map((e, j) => {
				return this.renderComponent(e, j);
			});
			component = React.createElement(c.type, props, children);
		}
		
		return component;
	}
	render() {
		const { id } = this.props.params;
		const article = articles[id];

		if (article === undefined)
			return <NotFound />;
		
		document.title = article.title;

		return (<>
			<section className="article">
				<h1>{article.title}</h1>

				{
					article.article ? article.article.map((c, i) => {
						return this.renderComponent(c, i);
					})
					: <></>
				}
			</section>
		</>);
	}
}

export default withParams(SingleArticle);
