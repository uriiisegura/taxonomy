import { Component } from "react";
import { NavLink } from "react-router-dom";
import MakeURL from "./../functions/MakeURL";
import taxonomy from "./../data/taxonomy.json";

const UNKNOWN_STRING = 'incertae sedis';
const SYMBOLS = {
	'Domain': <span className="level-symbol red"><span className="view">D</span><span className="full">Domain</span></span>,
	'Kingdom': <span className="level-symbol teal"><span className="view">K</span><span className="full">Kingdom</span></span>,
	'Phylum': <span className="level-symbol green"><span className="view">P</span><span className="full">Phylum</span></span>,
	'Class': <span className="level-symbol blue"><span className="view">C</span><span className="full">Class</span></span>,
	'Order': <span className="level-symbol purple"><span className="view">O</span><span className="full">Order</span></span>,
	'Family': <span className="level-symbol orange"><span className="view">F</span><span className="full">Family</span></span>,
	'Tribe': <span className="level-symbol caramel"><span className="view">T</span><span className="full">Tribe</span></span>,
	'Genus': <span className="level-symbol gold"><span className="view">G</span><span className="full">Genus</span></span>,
	'Species': <span className="level-symbol ocre"><span className="view">S</span><span className="full">Species</span></span>,
	'Subspecies': <span className="level-symbol sub"><span className="view">S</span><span className="full">Subspecies</span></span>,
	'Variety': <span className="level-symbol sub"><span className="view">V</span><span className="full">Variety</span></span>
}

class TaxonomyTree extends Component {
	componentDidMount() {
		const toggler = document.getElementsByClassName('caret');

		for (let i = 0; i < toggler.length; i++) {
			toggler[i].addEventListener('click', (e) => {
				e.target.parentElement.parentElement.querySelector('.nested').classList.toggle('active');
				e.target.classList.toggle('caret-down');
			});
		}

		this.expandAll();
	}
	expandAll() {
		const nested = document.getElementsByClassName('nested');
		const caret = document.getElementsByClassName('caret');

		for (let i = 0; i < nested.length; i++) {
			caret[i].classList.add('caret-down');
			nested[i].classList.add('active');
		}
	}
	collapseAll() {
		const nested = document.getElementsByClassName('nested');
		const caret = document.getElementsByClassName('caret');

		for (let i = 0; i < nested.length; i++) {
			caret[i].classList.remove('caret-down');
			nested[i].classList.remove('active');
		}
	}
	renderLevel(level, key) {
		const unknown = level.name === null;
		const extinct = level.extinct !== undefined && level.extinct;
		if (level.children === undefined)
			return (
				<li key={key} className={`taxonomy-item ${unknown ? 'idk' : ''}`}>
					{
						unknown ? UNKNOWN_STRING
						: <NavLink to={`/taxonomy/${MakeURL(level.level)}/${MakeURL(level.name)}`}>{extinct && <span className="extinct"></span>}{level.name}</NavLink>
					}
					{SYMBOLS[level.level]}
				</li>
			);
		return (
			<li key={key}>
				<span className={unknown ? 'idk' : ''}>
					<span className="caret"></span>
					<span className="taxonomy-item">
						{
							unknown ? UNKNOWN_STRING
							: <NavLink to={`/taxonomy/${MakeURL(level.level)}/${MakeURL(level.name)}`}>{extinct && <span className="extinct"></span>}{level.name}</NavLink>
						}
						{SYMBOLS[level.level]}
					</span>
				</span>
				<ul className="nested">
					{
						level.children.map((e, i) => {
							return this.renderLevel(e, i);
						})
					}
				</ul>
			</li>
		);
	}
	render() {
		return (<>
			<section>
				<h1>Taxonomy Tree</h1>

				<div className="taxonomy-tree-controller">
					<button className="btn" onClick={this.expandAll}>Expand all</button>
					<button className="btn" onClick={this.collapseAll}>Collapse all</button>
				</div>
				
				<ul className="taxonomy-tree">
					{
						taxonomy.map((e, i) => {
							return this.renderLevel(e, i);
						})
					}
				</ul>
			</section>
		</>);
	}
}

export default TaxonomyTree;
