import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component{
	handleFormSubmit({email, password}){
		console.log(email, password);
		// neeed to do somehting to log user in
		console.log(this.props)
		this.props.signinUser({ email, password });
	}
	renderAlert(){
		// we can now use the errorMessage from the mapStateToProps as a prop now by calling this.props.errorMessage
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Sorry, buckaroo....</strong>
				</div>
			);
		}
	}
	render(){
		const{handleSubmit, fields: {email, password}}=this.props;
		return(
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} type="password" className="form-control" />
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign In</button>
			</form>
		);
	}
}

// this auth matches the auth key in the index.js in reducers and error in switch case
function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}
// First set of parens is for configuration. Second set is for components
export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
// mapStateToProps function as the second parameter. Take out the null. This allows us to use the returned errorMessage in React code.
}, mapStateToProps, actions)(Signin);