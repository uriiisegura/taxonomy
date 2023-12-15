import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
	showHide(id) {
		const submenu = document.getElementById(id);
		if (submenu !== null)
			submenu.classList.toggle('active');
	}
	expandMobile() {
		const nav = document.getElementById('nav-links');
		nav.classList.toggle('show');
	}
	render() {
		return (<>
			<nav id="navbar">
				<div className="nav-center">
					<div className="nav-header">
						<NavLink to="/" className="nav-logo">
							<img src="logo.svg" alt="Taxonomy" />
						</NavLink>
					</div>
					<div className="nav-expand">
						<button onClick={this.expandMobile} title="expand">
							<img src="font-awesome/align-justify.svg" alt="" />
						</button>
					</div>
					<ul id="nav-links">
						<li onClick={() => this.showHide('galleries')} className="nav-link">
							<span><span>Galleries<img src="font-awesome/caret-down.svg" alt="caret-down.svg" /></span></span>
							<div id="galleries" className="sub-menus">
								<div className="sub-menu">
									<h4 className="sub-menu-title">Invertebrates</h4>
									<ul>
										<li><NavLink to="/galleries/superfamily/papilionoidea">Papilionoidea (butterflies)</NavLink></li>
									</ul>
								</div>
							</div>
						</li>
						<li className="nav-link">
							<NavLink to="/articles">Articles</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</>);
	}
}

export default Navbar;
