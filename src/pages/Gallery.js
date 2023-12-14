import { Component } from "react";
import { NavLink, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import MakeURL from "./../functions/MakeURL";
import taxonomy from "./../data/taxonomy.json";

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

let ITEM = null;
const ELEMENTS = [];

class Gallery extends Component {
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
			return;
		}
		
		if (item.children === undefined) return;

		item.children.forEach(e => {
			this.filterItem(e, level, name);
		});
	}
	filterSpecies(item) {
		if (item.level === 'Species' || item.level === 'Subspecies')
			ELEMENTS.push(item);
		if (item.children !== undefined)
			item.children.forEach(e => {
				this.filterSpecies(e);
			});
	}
	render() {
		const { level, name } = this.props.params;
		taxonomy.forEach(e => {
			this.filterItem(e, level, name);
		});

		if (ITEM === null)
			return <NotFound />;
		
		ITEM.children.forEach(e => {
			this.filterSpecies(e);
		});

		return (<>
			<section>
				<div className="gallery-header">
					<h1>{ITEM.name}</h1>
					<h5><NavLink to={`/taxonomy/${level}/${name}`}>Go to the taxon page</NavLink></h5>
				</div>

				<div className="gallery-wrap">
					{
						ELEMENTS.map((e, i) => {
							const name = e.level === 'Subspecies' ? `${e.species} ssp. ${e.name}` : e.name;
							let image = 'species/_null.png';
							if (e.images !== undefined) image = `species/${e.images[0].link}`;
							return (<div className="gallery-item" key={`gallery-${i}`}>
								<NavLink to={`/taxonomy/${MakeURL(e.level)}/${MakeURL(name)}`}>
									<img className={e.images === undefined ? 'null-img' : ''} src={image} alt={e.name} />
								</NavLink>
								<NavLink className="gallery-item-title" to={`/taxonomy/${MakeURL(e.level)}/${MakeURL(name)}`}>
									{e.extinct && <span className="extinct"></span>}
									{e.level === 'Subspecies' ? <>{e.species} <span className="ssp-var">ssp.</span> {e.name}</> : e.name}
								</NavLink>
							</div>);
						})
					}
					{
						[...Array(ELEMENTS.length > 19 ? 0 : 20 - ELEMENTS.length).keys()].map(i => {
							return <div className="gallery-item" key={`gallery-auxiliar-${i}`}></div>;
						})
					}
				</div>
			</section>
		</>);
	}
}

export default withParams(Gallery);
