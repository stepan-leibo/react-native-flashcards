import React, {Component} from 'react'
import {ScrollView} from "react-native";
import {Button, FormInput, FormLabel, FormValidationMessage, Header} from "react-native-elements";
import {HeaderButton} from "./Utils";
import {connect} from "react-redux";
import {addCardToDeck} from "../utils/api";
import {deckActionCreators} from "../actions/actions";

class AddCard extends Component {

    state = {
        question: '',
        questionValidationMessage: '',
        answer: '',
        answerValidationMessage: ''
    };

    save() {
        if (!this.state.answer || !this.state.question) {
            if (!this.state.answer) {
                this.setState({
                    answerValidationMessage: 'Answer must not be empty'
                })
            }
            if (!this.state.question) {
                this.setState({
                    questionValidationMessage: 'Question must not be empty'
                })
            }
        } else {
            let question = {
                question: this.state.question,
                answer: this.state.answer
            };
            let deckTitle = this.props.navigation.state.params.deckTitle;
            addCardToDeck(deckTitle, question);
            this.props.dispatch(deckActionCreators.questions.addOne(deckTitle, question));
            this.setState({
                question: '',
                answer: ''
            })
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Header
                    leftComponent={<HeaderButton icon='chevron-left' onPress={e => this.props.navigation.goBack()} />}
                    centerComponent={{ text: `ADD QUESTION TO ${this.props.navigation.state.params.deckTitle}`, style: { color: '#fff' } }}
                />
                <FormLabel>Question</FormLabel>
                <FormInput value={this.state.question} onChangeText={text => this.setState({question: text, questionValidationMessage: ''})} multiline = {true}/>
                <FormValidationMessage>{this.state.questionValidationMessage}</FormValidationMessage>
                <FormLabel>Answer</FormLabel>
                <FormInput value={this.state.answer} onChangeText={text => this.setState({answer: text, answerValidationMessage: ''}) } multiline = {true}/>
                <FormValidationMessage>{this.state.answerValidationMessage}</FormValidationMessage>
                <Button
                    raised
                    title='Save'
                    onPress={this.save.bind(this)}/>
            </ScrollView>
        )
    }
}

export default connect()(AddCard)