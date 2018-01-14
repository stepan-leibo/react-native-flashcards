import React, {Component} from 'react'
import {View, StyleSheet, Animated, TouchableWithoutFeedback} from "react-native";
import {HeaderButton} from "./Utils";
import {connect} from "react-redux";
import {Header, Text, Button} from "react-native-elements";

class Quiz extends Component {

    state = {
        questionNumber: 0,
        answers: [],
        opacityQuestion: new Animated.Value(1),
        opacityAnswer: new Animated.Value(0),
        showQuestion: true,
        showAnswer: false,
    };

    componentDidMount() {
        this.setState({
            answers: []
        });
    }

    incorrect() {
        let {answers} = this.state;
        answers.push(false);

        this.setState({
            answers: answers,
            questionNumber: this.state.questionNumber + 1
        });
    }

    correct() {
        let {answers} = this.state;
        answers.push(true);

        this.setState({
            answers: answers,
            questionNumber: this.state.questionNumber + 1
        });
    }

    flip() {
        if (this.state.showQuestion) {
            Animated.timing(
                this.state.opacityQuestion,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start(() => {
                this.setState({
                    showQuestion: false,
                    showAnswer: true
                });

                Animated.timing(
                    this.state.opacityAnswer,
                    {
                        toValue: 1,
                        duration: 500
                    }
                ).start()
            });
        } else {
            Animated.timing(
                this.state.opacityAnswer,
                {
                    toValue: 0,
                    duration: 500
                }
            ).start(() => {
                this.setState({
                    showQuestion: true,
                    showAnswer: false
                });

                Animated.timing(
                    this.state.opacityQuestion,
                    {
                        toValue: 1,
                        duration: 500
                    }
                ).start()
            });
        }
    }

    tryAgain() {
        this.setState({
            answers: [],
            questionNumber: 0
        })
    }

    quizView() {
        let {deck} = this.props;

        if (deck.questions.length <= this.state.questionNumber) {
            let correctAnswersPercent = Math.round(this.state.answers.filter(item => item).length / this.state.answers.length * 100);
            return (
                <View style={styles.content}>
                    <View style={styles.contentBlock}>
                        <Text h3>{`You have ${correctAnswersPercent}% correct answers!`}</Text>
                    </View>
                    <View>
                        <Button
                            style={styles.button}
                            backgroundColor={'yellow'}
                            disabled={!deck.questions.length}
                            color={'black'}
                            title='Restart Quiz'
                            onPress={() => this.tryAgain()}
                        />
                        <Button
                            style={styles.button}
                            color={'black'}
                            title='Back to Deck'
                            onPress={() => this.props.navigation.navigate(`Deck`, {deckTitle: deck.title})}
                        />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.content}>
                <Text h4 style={{alignSelf: 'center'}}>{`Question ${this.state.questionNumber + 1}/${deck.questions.length}`}</Text>
                <View style={styles.contentBlock}>
                    {this.state.showQuestion && (
                        <Animated.View style={{opacity: this.state.opacityQuestion}}>
                            <TouchableWithoutFeedback onPress={e => this.flip()} >
                                <Text h3>{`${deck.questions[this.state.questionNumber].question}`}</Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    )}
                    {this.state.showAnswer && (
                        <Animated.View style={{opacity: this.state.opacityAnswer}}>
                            <TouchableWithoutFeedback onPress={e => this.flip()} >
                                <Text h3>{`${deck.questions[this.state.questionNumber].answer}`}</Text>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    )}
                </View>
                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        backgroundColor={'green'}
                        color={'white'}
                        title='Correct'
                        onPress={() => this.correct()}
                    />
                    <Button
                        style={styles.button}
                        backgroundColor={'red'}
                        color={'white'}
                        title='Incorrect'
                        onPress={() => this.incorrect()}
                    />
                </View>
            </View>
        );
    }

    render() {
        let {deck} = this.props;

        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<HeaderButton icon='chevron-left' onPress={e => this.props.navigation.goBack()}/>}
                    centerComponent={{text: `QUIZ ${deck.title}`, style: {color: '#fff'}}}
                />
                {this.quizView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    contentBlock: {
        flex: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button: {
        marginBottom: 10
    }
});

function mapStateToProps(state, props) {
    return {
        deck: state.deck.decks.find(item => item.title === props.navigation.state.params.deckTitle)
    }
}

export default connect(mapStateToProps)(Quiz)