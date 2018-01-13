import React, {Component} from 'react'
import {View} from "react-native";
import {Button, FormInput, FormLabel, FormValidationMessage, Header} from "react-native-elements";
import {HomeButton} from "./Utils";
import {connect} from "react-redux";
import {saveDeckTitle} from "../utils/api";
import {deckActionCreators} from "../actions/actions";

class AddDeck extends Component {

    state = {
        title: '',
        titleValidationMessage: ''
    };

    titleOnChange(text) {
        this.setState({
            title: text,
            titleValidationMessage: ''
        })
    }

    save() {
        if (!this.state.title) {
            this.setState({
                titleValidationMessage: 'Title must not be empty.'
            })
        } else {
            saveDeckTitle(this.state.title);

            this.setState({
                title: ''
            })
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<HomeButton navigation={this.props.navigation} />}
                    centerComponent={{ text: 'ADD DECK', style: { color: '#fff' } }}
                />
                <FormLabel>Deck title</FormLabel>
                <FormInput value={this.state.title} onChangeText={text => this.titleOnChange(text)}/>
                <FormValidationMessage>{this.state.titleValidationMessage}</FormValidationMessage>
                <Button
                    raised
                    title='Save'
                    onPress={this.save.bind(this)}/>
            </View>
        )
    }
}

export default connect()(AddDeck)