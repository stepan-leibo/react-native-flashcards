import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import Utils from './utils/utils';
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/reducers'
import Decks from "./components/Decks";
import { Header} from "react-native-elements";
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const store = createStore(
    reducer,
    applyMiddleware(logger, thunk)
);

const ModalStack = StackNavigator({
    Decks: {
        screen: Decks,
    },
    Deck: {
        path: 'decks/:deckTitle',
        screen: Deck,
    },
    AddCard: {
        path: 'decks/:deckTitle/cards',
        screen: AddCard
    },
    Quiz: {
        path: 'quiz/:deckTitle',
        screen: Quiz
    }
}, {
    navigationOptions: {
        header: null
    }
});

const Drawer = DrawerNavigator({
    Decks: {
        screen: ModalStack
    },
    'Add new deck': {
        screen: AddDeck
    }
});

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Drawer/>
            </Provider>
        );
    }
}
