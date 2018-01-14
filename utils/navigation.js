import Decks from "../components/Decks";
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation'
import AddDeck from "../components/AddDeck";
import Deck from "../components/Deck";
import AddCard from "../components/AddCard";
import Quiz from "../components/Quiz";

export const ModalStack = StackNavigator({
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

export const Drawer = DrawerNavigator({
    Decks: {
        screen: ModalStack
    },
    'Add new deck': {
        screen: AddDeck
    }
});