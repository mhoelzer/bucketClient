import { AUTH_USER, UNAUTH_USER } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case AUTH_USER:
		// Whenever a user successfully signs in, we reset the state of the error message
			return { ...state, error: 'Welcome', authenticated: true };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
	}
	return state;
}