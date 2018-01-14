import React, { Component } from 'react'
import {View, StyleSheet} from "react-native";
import {HeaderButton} from "./Utils";
import {connect} from "react-redux";
import {Header, Text, Button} from "react-native-elements";
import {clearLocalNotification, setLocalNotification} from "../utils/notifications";

class Deck extends Component {

    startQuiz() {
        clearLocalNotification()
            .then(setLocalNotification());

        this.props.navigation.navigate(`Quiz`, {deckTitle: this.props.deck.title})
    }

    render() {
        let {deck} = this.props;
        if (!deck) {
            return <View/>
        }

        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<HeaderButton icon='chevron-left' onPress={e => this.props.navigation.goBack()} />}
                    centerComponent={{ text: `${deck.title}`, style: { color: '#fff' } }}
                />
                <View style={styles.content}>
                    <Text h1>{deck.title}</Text>
                    <Text h2>{`${deck.questions.length} question${deck.questions.length !== 1 ?'s':''}`}</Text>
                </View>
                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        backgroundColor={'green'}
                        disabled={!deck.questions.length}
                        color={'black'}
                        title='Start QUIZ'
                        onPress={() => this.startQuiz()}
                    />
                    <Button
                        style={styles.button}
                        backgroundColor={'yellow'}
                        color={'black'}
                        title='Add question'
                        onPress={() => this.props.navigation.navigate(`AddCard`, {deckTitle: deck.title})}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        marginBottom: 10
    }
});

function mapStateToProps(state, props) {
    return {
        deck: state.deck.decks.find(item => item.title === props.navigation.state.params.deckTitle),
        // todo: why it doesn't update without it?
        random: Math.random()
    }
}

export default connect(mapStateToProps)(Deck)