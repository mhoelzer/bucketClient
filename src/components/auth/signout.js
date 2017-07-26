import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// maybe after strong is whats there or user
class Signout extends Component {
	componentWillMount(){
		this.props.signoutUser()
	}
	render(){
		return <div>Sorry to see you go...</div>
	}
}

export default connect(null, actions)(Signout);