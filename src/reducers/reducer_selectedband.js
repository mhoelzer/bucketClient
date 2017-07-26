// state argument isnt the entire app state rahter only the peice of state for which this reducer is responsible.
// if we boot uip the app and the user has not selected a band, this reducer wpuld return "undefined", whcih is illegal is redux, so we default the state arumnet to null
export default function(state = null, action){
	switch(action.type){
		case 'SELECT_BAND':
			return action.payload;
	}
	return state;
}