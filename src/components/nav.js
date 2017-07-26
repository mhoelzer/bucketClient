import React, { Component } from 'react';
// stuff from bootstrap. diff comp inside bootstrap
import { Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// takes the import comp from above/the ones in the {}
class NavBarHeader extends Component{
	renderLinks(){
		// if this true, return the signout option
		if(this.props.authenticated){
			return [
				<NavItem href="/signout">Sign Out</NavItem>,
				<NavDropdown key={3} title="Cool Stuff" id="basic-nav-dropdown">
					<MenuItem key={3.1} href="./newitem">Create a Post</MenuItem>
					<MenuItem key={3.2} href="./items">Posts List</MenuItem>
					<MenuItem divider />
					<MenuItem key={3.3} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Search Through Youtube ;)</MenuItem>
				</NavDropdown>
			];
		} else {
			// these are for the THIS.RENDERLINKS
			return [
				<NavItem key={1} href="./signin">Sign In</NavItem>,
				<NavItem key={2} href="./signup">Sign Up</NavItem>
			];
		}
	}
	render(){
		return(
			// should be one overarhing contrainer
			// sicne class is already a keyword
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Animal Extravaganza</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					{this.renderLinks()}
				</Nav>
			</Navbar>
		);
	}
}

function mapStateToProps(state){
	return{
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(NavBarHeader);