import {handleActions} from 'redux-actions';

export default handleActions({
    DECK: {
        ADD_MULTIPLE: (state, action) => {
            let decks = state.decks ? state.decks : [];
            let payload = Object.values(action.payload.decks);
            return {
                ...state,
                decks: [...decks, ...payload].unique("title")
            }
        },
        ADD_ONE: (state, action) => {
            let decks = state.decks ? state.decks : [];
            return {
                ...state,
                decks: [...decks, action.payload].unique("title")
            };
        },
    }
}, {});