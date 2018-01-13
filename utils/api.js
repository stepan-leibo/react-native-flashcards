import { AsyncStorage } from 'react-native'
import {formatDeckResults, uuidv4} from "./utils";

export const UDACI_DECKS_KEY = 'UdaciCards:decks';

export function getDecks() {
    return AsyncStorage.getItem(UDACI_DECKS_KEY)
        .then(formatDeckResults);
}

export function getDeck(title) {
    return AsyncStorage.getItem(UDACI_DECKS_KEY)
        .then(results => {
            let data = JSON.parse(results);

            return data[title];
        })

}

export function saveDeckTitle(title) {
    let deck = {
        title,
        questions: []
    };
    return AsyncStorage.mergeItem(UDACI_DECKS_KEY, JSON.stringify({
        [title]: deck
    }))

}

export function addCardToDeck(deckTitle, question) {
    return AsyncStorage.getItem(UDACI_DECKS_KEY)
        .then(results => {
            let data = JSON.parse(results);

            let questions = data[deckTitle].questions || [];
            questions.push(question);

            data[deckTitle].questions = questions;

            return AsyncStorage.setItem(UDACI_DECKS_KEY, JSON.stringify(data));
        })
}