import React, {Component} from 'react'
import {Text, View, StyleSheet} from "react-native";
import {getDecks, setDummyData} from "../utils/api";
import {deckActionCreators} from "../actions/actions";
import {connect} from "react-redux";

class Decks extends Component {
    componentDidMount() {
        let {dispatch} = this.props;
        getDecks().then(data => dispatch(deckActionCreators.deck.addMultiple(data)));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Ope up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
    return {
        decks: state.deck.decks
    }
}

export default connect(mapStateToProps)(Decks)