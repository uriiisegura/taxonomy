import React, { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import SYMBOLS from "../components/Symbols";
import LANGUAGES from "../components/Languages";
import Tree from "../components/Tree";
import MakeURL from "./../functions/MakeURL";
import CapitalizeFirst from "./../functions/CapitalizeFirst";
import taxonomy from "./../data/taxonomy.json";
import articles from "./../data/articles.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

let ITEM = null;
const path = {};
let SLIDE_INDEX = 1;

class TaxonomyItem extends Component {
	componentWillUnmount() {
		window.location.reload();
	}
	componentDidUpdate() {
		window.location.reload();
	}
	filterItem(item, level, name) {
		const searchName = level === 'subspecies' ? item.species + ' ssp. ' + item.name : item.name;

		if (MakeURL(item.level) === level && MakeURL(searchName) === name) {
			ITEM = item;
			path[item.level] = [searchName, item.aka];
			return;
		}
		
		if (item.children === undefined) return;

		const iName = item.level === 'subspecies' ? item.species + ' ssp. ' + item.name : item.name;
		item.children.forEach(e => {
			this.filterItem(e, level, name);
			const eName = e.level === 'Subspecies' ? e.species + ' ssp. ' + e.name : e.name;
			if (e.level in path && path[e.level][0] === eName)
				path[item.level] = [iName, item.aka];
		});
	}
	linkToSlide(n) {
		this.currentSlide(n);
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
	plusSlides(n) {
		this.showSlide(SLIDE_INDEX += n);
	}
	currentSlide(n) {
		this.showSlide(SLIDE_INDEX = n);
	}
	showSlide(n) {
		let slides = document.getElementsByClassName('slide');
		let dots = document.getElementsByClassName('dot');

		if (n > slides.length) SLIDE_INDEX = 1;
		if (n < 1) SLIDE_INDEX = slides.length;

		for (let i = 0; i < slides.length; i++)
			slides[i].style.display = 'none';
		for (let i = 0; i < dots.length; i++)
			dots[i].className = dots[i].className.replace(' active', '');

		slides[SLIDE_INDEX-1].style.display = 'block';
		dots[SLIDE_INDEX-1].className += ' active';
	}
	setSlideshow(images) {
		return (<div id="slideshow" className="slideshow-container">
			<div className="slideshow">
				{
					images.map((e, i) => {
						return (<div key={i} className="slide" style={{display: i === 0 ? 'block' : 'none'}}>
							{
								images.length > 1 ? <div className="counter">{i+1} / {images.length}</div> : <></>
							}
							<img className="slide-img" src={`species/${e.link}`} alt={ITEM.name} />
							{
								e.caption ?
									<div className="caption">{
										Array.isArray(e.caption) ? e.caption.map((c, i) => {
											return this.renderComponent(c, i);
										}) : e.caption
									}</div>
								: <></>
							}
						</div>);
					})
				}
				{
					images.length > 1 ? <>
						<span className="prev" onClick={() => this.plusSlides(-1)}>❮</span>
						<span className="next" onClick={() => this.plusSlides(1)}>❯</span>
					</> : <></>
				}
			</div>
			<div className="slid-dot-container">
				{
					images.length > 1 ? images.map((_, i) => {
						return <span key={i} className={`dot ${i === 0 ? ' active' : ''}`} onClick={() => this.currentSlide(i+1)}>{i+1}</span>;
					}) : <></>
				}
			</div>
		</div>);
	}
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
	showCommonNames() {
		document.getElementsByClassName('common-expand')[0].classList.toggle('expand');
		document.getElementsByClassName('common-names')[0].classList.toggle('expand');
	}
	showPath() {
		document.getElementsByClassName('path-expand')[0].classList.toggle('expand');
		document.getElementsByClassName('tax-item-path')[0].classList.toggle('expand');
	}
	render() {
		const { level, name } = this.props.params;
		taxonomy.forEach(e => {
			this.filterItem(e, level, name);
		});

		if (ITEM === null)
			return <NotFound />;
		
		delete path[Object.keys(path)[0]];

		document.title = `Taxonomy | ${ITEM.name}`;

		const extinct = ITEM.extinct !== undefined && ITEM.extinct;

		return (<>
			<section>
				<div className="tax-item-title">
					<h3>{ITEM.level}</h3>
					<h1>{extinct && <span className="extinct"></span>}{ITEM.level === 'Subspecies' ? <>{ITEM.species} <span className="ssp-var">ssp.</span> {ITEM.name}</> : ITEM.name}</h1>
					{ITEM.aka && /* !ITEM.common && */ <h5>{CapitalizeFirst(ITEM.aka)}</h5>}

					<div className="details-wrap">
						{ITEM.common && <><span className="common-expand" onClick={this.showCommonNames}>Common names...</span><ul className="common-names">
								{
									Object.entries(ITEM.common).map(([l, c], i) => {
										return <li key={`common-${i}`}><img src={`flags/${l}.png`} title={LANGUAGES[l]} alt={l} />{Array.isArray(c) ? c.join(', ') : c}</li>;
									})
								}
							</ul></>
						}

						{Object.entries(path).length > 0 && <>
							<span className="path-expand" onClick={this.showPath}>Taxonomic path...</span>
							<ul className="tax-item-path">
									{
										Object.entries(path).reverse().map(([k, v], i) => {
											return <li key={`tax-path-${i}`}>{SYMBOLS[k]}<NavLink to={`/taxonomy/${MakeURL(k)}/${MakeURL(v[0])}`}>{v[0]}{v[1] && <span className="aka">{v[1]}</span>}</NavLink></li>;
										})
									}
							</ul>
						</>}
					</div>
				</div>

				<div className="tax-item-content">
					{
						ITEM.images ?
							this.setSlideshow(ITEM.images)
						: <></>
					}

					<div className="tax-item-information">
						{
							ITEM.text ? ITEM.text.map((c, i) => {
								return this.renderComponent(c, i);
							})
							: <></>
						}
						{
							ITEM.articles && <>
								<h2 style={{marginBottom: '0.5rem'}}>Related articles</h2>

								<ul className="articles-wrap">
									{
										ITEM.articles.map((a, i) => {
											return <li key={`article-${i}`}><NavLink to={`/articles/${a}`}>{articles[a].title}</NavLink></li>;
										})
									}
								</ul>
							</>
						}
					</div>
				</div>
			</section>
			{
				ITEM.children ? <>
					<section>
						<h2 style={{textTransform: 'none'}}>Children items</h2>

						<Tree
							children={ITEM.children}
							collapsed={true}
							/>
					</section>
				</> : <></>
			}
		</>);
	}
}

export default withParams(TaxonomyItem);
