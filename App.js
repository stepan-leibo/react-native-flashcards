import React from 'react';
import {applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers/reducers'
import {Drawer} from "./utils/navigation";
import {setLocalNotification} from "./utils/notifications";

const loggerMiddleware = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <Drawer/>
            </Provider>
        );
    }
}
