import React, { Component } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import MakeURL from "./../functions/MakeURL";
import taxonomy from "./../data/taxonomy.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

let ITEM = null;
let SLIDE_INDEX = 1;

class TaxonomyItem extends Component {
	filterItem(item, level, name) {
		if (MakeURL(item.level) === level && MakeURL(item.name) === name) {
			ITEM = item;
			return;
		}
		if (item.children === undefined)
			return;
		item.children.forEach(e => {
			this.filterItem(e, level, name);
		});
	}
	linkToSlide(n) {
		this.currentSlide(n);
		// const slideshow = document.getElementById('slideshow');
		// slideshow.scrollIntoView();
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
							<div className="caption">{
								Array.isArray(e.caption) ? e.caption.map((c, i) => {
									return this.renderComponent(c, i);
								}) : e.caption
							}</div>
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
	render() {
		const { level, name } = this.props.params;
		taxonomy.forEach(e => {
			this.filterItem(e, level, name);
		});

		if (ITEM === null)
			return <NotFound />;
		
		document.title = `Taxonomy | ${ITEM.name}`;

		const extinct = ITEM.extinct !== undefined && ITEM.extinct;
		
		return (<>
			<section>
				<div className="tax-item-title">
					<h3>{ITEM.level}</h3>
					<h1>{extinct && <span className="extinct"></span>}{ITEM.name}</h1>
					{ITEM.common && <h5>{ITEM.common}</h5>}
					{ITEM.aka && <h5>{ITEM.aka}</h5>}
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
					</div>
				</div>
			</section>
		</>);
	}
}

export default withParams(TaxonomyItem);
