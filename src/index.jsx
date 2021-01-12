// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import
{
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import { HashRouter, Route, Redirect, Switch }
  from 'react-router-dom';
import { createHistory as history } from 'history';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise'; // for fetch purposes
import messagesReducer from './reducers/messages_reducer';
// import selectedChannelReducer from './reducers/selected_channel_reducer';


// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
const identityReducer = (state = null) => state;

const initialState = {
  messages: [],
  channels: ['general', 'react', 'paris'],
  currentUser: prompt("What's your Username ?") || `anonymous${Math.floor(10 + (Math.random() * 90))}`,
  // selectedChannel: 'general'
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: identityReducer,
  // selectedChannel: selectedChannelReducer,
  currentUser: identityReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));
const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route path="/:channel" component={App} />
        <Redirect from="/" to="/general" />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
