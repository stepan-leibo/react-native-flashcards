import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Utils from './utils/utils';
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/reducers'
import Decks from "./components/Decks";

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Decks/>
            </Provider>
        );
    }
}
