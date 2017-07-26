import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
// from redux, has mult export 
import { createStore, applyMiddleware } from 'redux';
// app that used to be inside the provider. can just do <app /> to run
import App from './components/app';
import reducers from './reducers';
// bH has code behind it. 
import { Router, Route, IndexRoute, browserHistory} from 'react-router'
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import newItem from './components/list/new-list-item';
import ListShow from './components/list/list-items';
import ListsShow from './components/list/list-show';
import UpdateList from './components/list/update-list-item';
import RequireAuth from './components/auth/require_auth';
import Signout from './components/auth/signout';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// tells where to go. the .render tells class. want to placeprovuder comp
// the / doesnt change state, so property. you are going to send this comp to see root file
// not changing state, just passing down. the comp=app ia upating it
ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path="signin" component={Signin} />
				<Route path="signup" component={Signup} />
				<Route path="newitem" component={RequireAuth(newItem)} />
				<Route path="items" component={RequireAuth(ListShow)} />
				<Route path="items/:id" component={RequireAuth(ListsShow)} />
				<Route path="updateitem/:id" component={RequireAuth(UpdateList)} />
				<Route path="signout" component={Signout} />
			</Route>
		</Router>
	</Provider>
	, document.querySelector('.container')
);