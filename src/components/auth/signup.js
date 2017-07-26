import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

// maybe after strong is whats there or user
class Signup extends Component {
	handleFormSubmit(formProps){
		// call action crator to sign up the user
		this.props.signupUser(formProps)
	}
	renderAlert(){
		if(this.props.errorMessage){
			// signup error handleing
			return(
				<div className="alert alert-danger">
					<strong>Sorry, </strong>{this.props.errorMessage}
				</div>
			);
		}
	}
	render(){
		const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Email</label>
					<input className="form-control" {...email} />
					{email.touched && email.error && <div className="error">{email.error}</div>}
				</fieldset>
				<fieldset className="form-group">
					<label>Password</label>
					<input className="form-control" {...password} type="password" />
					{password.error}
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm Password</label>
					<input className="form-control" {...passwordConfirm} type="password" />
					{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign Up</button>
			</form>
		);
	}
}

function validate(formProps){
	const errors = {};
	if(!formProps.email){
		errors.email = 'Please enter an email';
	}
	if(!formProps.password){
		errors.password = 'Please enter a password';
	}
	if (!formProps.passwordConfirm){
		errors.passwordConfirm = 'Please reenter a password';
	}
	if (formProps.password !== formProps.passwordConfirm){
		errors.password = 'Passwords must match';
	}
	console.log(formProps)
	return errors;
}

function mapStateToProps(state){
	return {errorMessage: state.auth.error};
}
export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate: validate
}, mapStateToProps, actions)(Signup);