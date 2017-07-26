// axios, which is a promise-based http library that allows us to make AJAX requests. We can do GET, POST, UPDATE, & DELETE with it.
import axios from 'axios';

// call out to a test api
// take out the learncode b/c the url might be too long. check by adding /posts at the end in the url thingy on internet
// const ROOT_URL = 'http//rest.learncode.academy/api/mh';
const ROOT_URL = 'http//localhost:3000';
export const CREATE_POSTS = 'CREATE_POSTS';

// action creator b/c returns an action
export function createPost(props){
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return {
		type: CREATE_POSTS,
		payload: request
	};
}

export function signinUser({ email, password }){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
	}
}