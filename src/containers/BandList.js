import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBand } from '../actions/index';
import { bindActionCreators } from 'redux';

class BandList extends Component{
	renderList(){
		return this.props.bands.map((bands) => {
			return(
				<li key={bands.name} onClick={() => this.props.selectBand(bands)} className="list-group-item">{bands.name}</li>
			);
		});
	}

	render(){
		return(
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		);
	}
}

// takes app state as arg. whatever gets returned will show up as props inside of band list
function mapStateToProps(state){
	return{
		bands: state.bands
	};
}
// al things returned form this fucntion will end up as props on the bandlist container. 
// we need this so we can call the selectBand frunciotn above through this.props.selectBand
// that will start the action >> reducer >> state change process 
function mapDispatchToProps(dispatch){
	// whenever selectBand is called, this will pass the result to all of our reducers
	return bindActionCreators({selectBand: selectBand}, dispatch);
}

// export. just like with the matching of the stte to the porps, we need to attach the actions to the reducer
export default connect(mapStateToProps, mapDispatchToProps)(BandList);