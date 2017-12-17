import {combineReducers} from 'redux';
import cardReducers from './cardReducers';
import deckReducers from './deckReducers';

export default combineReducers({
    card: cardReducers,
    deck: deckReducers
})