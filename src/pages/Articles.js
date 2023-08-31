import React, { Component } from "react";
import articles from "./../data/articles.json";
import { NavLink } from "react-router-dom";

class Articles extends Component {
	render() {
		return (<>
			<section>
				<h1>Articles</h1>

				<ul className="articles-wrap">
					{
						Object.entries(articles).map(([k, v], i) => {
							return <li key={`article-${i}`}><NavLink to={`/articles/${k}`}>{v.title}</NavLink></li>;
						})
					}
				</ul>
			</section>
		</>);
	}
}

export default Articles;
