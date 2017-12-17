import {handleActions} from 'redux-actions';

export default handleActions({
    QUESTIONS: {
        ADD_ONE: (state, action) => {
            let deck = state.decks[action.payload.deckId];
            let questions = deck.questions || [];
            questions.push(action.payload.question);
            deck.questions = questions;

            return {
                ...state,
                decks: [...decks, deck].unique("title")
            };
        },
    }
}, {});