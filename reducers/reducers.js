import {combineReducers} from 'redux';
import deckReducers from './deckReducers';

export default combineReducers({
    deck: deckReducers
})