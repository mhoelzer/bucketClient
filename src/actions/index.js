// axios, which is a promise-based http library that allows us to make AJAX requests. We can do GET, POST, UPDATE, & DELETE with it.
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POSTS, FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST } from './types';
import authReducer from '../reducers/auth_reducer';


// BANDS
// action constant names
// selectBand is an action creator. it returns an action that has to be object with a type property
// const SELECT_BAND = 'SELECT_BAND';
// export function selectBand(band){
// 	console.log("You have selected:", band.name)
// 	return{
// 		type: 'SELECT_BAND',
// 		payload: band
// 	}
// }


// NOT BANDS
// call out to a test api
// take out the learncode b/c the url might be too long. check by adding /posts at the end in the url thingy on internet
// const ROOT_URL = 'http//rest.learncode.academy/api/mh';
const ROOT_URL = 'http://localhost:3000';

var config = {
	headers: { authorization: localStorage.getItem('token') }
}

// action creator b/c returns an action
export function createPost(props){
	console.log(props);
	return function(dispatch){
		axios.post(`${ROOT_URL}/newitem`, { props }, config)
			.then(request => {
				dispatch({
					type: CREATE_POSTS,
					payload: request
				});
			browserHistory.push('/items');
			});
	};
}

export function fetchPosts(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/items`, config)
			.then( (response) => {
				console.log("Response", response)
				dispatch({
					type: FETCH_POSTS,
					payload: response
				});
			});
	}
}

export function fetchPost(id){
	return function(dispatch){
		axios.get(`${ROOT_URL}/items/${id}`, config)
			.then( (response) => {
				console.log("Response", response)
				dispatch({
					type: FETCH_POST,
					payload: response
				});
			});
	}
}

export function updatePost(props, id){
	return function(dispatch){
		axios.put(`${ROOT_URL}/items/${id}`, {props}, config)
			.then(response => {
				dispatch({
					type: UPDATE_POST,
					payload: response
				});
				browserHistory.push('/items');
			});
	}
}

export function deletePost(id){
	return function(dispatch){
		axios.delete(`${ROOT_URL}/items/${id}`, config)
			.then( (response) => {
				dispatch({
					type: DELETE_POST,
					payload: response
				});
				browserHistory.push('/items')
			});
	}
}

export function signupUser({email, password, passwordConfirm}){
	return function(dispatch){
		//submit email/password to the server 
		axios.post(`${ROOT_URL}/signup`, {email, password, passwordConfirm})
			.then(response => {
				dispatch({type: AUTH_USER});
				//update the token
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/newitem');
			})
			.catch(response => dispatch(authError(response.data.error)));
	}
}

export function signinUser({ email, password }){
	return function(dispatch){
		console.log("hello");
		axios.post(`${ROOT_URL}/signin`, {email, password})
			// this kickstarts if the response is good
			.then(response => {
				console.log(response);
				// update the state to indicate authenticated user
				dispatch({ type: AUTH_USER });
				// puts the token in localstroage. it's safe and doesnt have to be imported and can be called at any time. 
				// the sI saves something in localstroage. provide a toekn then data
				localStorage.setItem('token', response.data.token);
				// this sends us off to the /newitem veiw
				browserHistory.push('/newitem');
			})
			// Action Creator inside the Action Creator. We’ll call the error function below if there is an error in sign up.  Now if the user signs in and fails we will dispatch the method that says bad login info. Remember that redux-thunk let’s us dispatch the method
			.catch(response => dispatch(authError("Bad login info")));
	}
}

export function authError(error){
	return{
		type: AUTH_ERROR,
		payload: error
	};
}

// purpose of type is to catch unauth__user case. flips auth flag to false and there wont be any links associated w/ them. also get rid of token
export function signoutUser(){
	localStorage.removeItem('token');
	return {type: UNAUTH_USER};
}

export default function(state ={}, action){
	switch(action.type){
		case AUTH_USER:
			return { ... state, authenticated: true };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
	}
	return state;
}