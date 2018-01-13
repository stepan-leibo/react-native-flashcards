import {createActions} from 'redux-actions';

export const deckActionCreators = createActions({
    DECK: {
        ADD_MULTIPLE: decks => ({decks: decks}),
        ADD_ONE: deck => ({deck: deck})
    },
    QUESTIONS: {
        ADD_ONE: (deckId, question) => ({
            deckId: deckId,
            question: question
        })
    }
});
