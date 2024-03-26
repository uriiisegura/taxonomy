import { Component } from "react";
import { NavLink } from "react-router-dom";
import SYMBOLS from "./Symbols";
import MakeURL from "../functions/MakeURL";

const UNKNOWN_STRING = 'incertae sedis';

class Tree extends Component {
	componentDidMount() {
		const toggler = document.getElementsByClassName('caret');

		for (let i = 0; i < toggler.length; i++) {
			toggler[i].addEventListener('click', (e) => {
				e.target.parentElement.parentElement.querySelector('.nested').classList.toggle('active');
				e.target.classList.toggle('caret-down');
			});
		}

		if (document.getElementsByClassName('nested').length === 0)
			document.getElementById('tree-controller').style.display = 'none';

		if (!this.props.collapsed)
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
		const name = level.level === 'Subspecies' ? level.species + ' ssp. ' + level.name : level.name;

		if (level.children === undefined)
			return (
				<li key={key} className={`taxonomy-item ${unknown && 'idk'}`}>
					{level.complete && <img src="/complete.png" className="complete-badge" title="All species added to the database" />}
					{
						unknown ? UNKNOWN_STRING
						: <NavLink to={`/${this.props.collection}/${MakeURL(level.level)}/${MakeURL(name)}`}>{extinct && <span className="extinct"></span>}{name}{level.aka && <span className="aka">{level.aka}</span>}</NavLink>
					}
					{SYMBOLS[level.level]}
				</li>
			);
		return (
			<li key={key}>
				<span className={`taxomomy-item-wrap ${unknown && 'idk'}`}>
					<span className="caret"></span>
					<span className="taxonomy-item">
						{level.complete && <img src="/complete.png" className="complete-badge" title="All species added to the database" />}
						{
							unknown ? UNKNOWN_STRING
							: <NavLink to={`/${this.props.collection}/${MakeURL(level.level)}/${MakeURL(name)}`}>{extinct && <span className="extinct"></span>}{name}{level.aka && <span className="aka">{level.aka}</span>}</NavLink>
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
			<div className="taxonomy-tree-controller" id="tree-controller">
				<button className="btn" onClick={this.expandAll}>Expand all</button>
				<button className="btn" onClick={this.collapseAll}>Collapse all</button>
			</div>
			
			<div className="taxonomy-tree-scroll-wrapper">
				<ul className="taxonomy-tree">
					{
						this.props.children.map((e, i) => {
							return this.renderLevel(e, i);
						})
					}
				</ul>
			</div>
		</>);
	}
}

export default Tree;
