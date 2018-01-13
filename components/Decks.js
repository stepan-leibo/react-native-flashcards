import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, TouchableOpacity, Text, ListView, FlatList} from "react-native";
import {getDecks, setDummyData} from "../utils/api";
import {deckActionCreators} from "../actions/actions";
import {connect} from "react-redux";
import {Header, Icon, List, ListItem} from 'react-native-elements'
import {HomeButton} from "./Utils";
import sortBy from 'sort-by';

class Decks extends Component {
    componentDidMount() {
        let {dispatch} = this.props;
        getDecks().then(data => dispatch(deckActionCreators.deck.addMultiple(data)));
    }

    renderListItem = ({item, i}) => (
        <ListItem
            key={item.title}
            title={item.title}
            subtitle={`${item.questions? item.questions.length : 0} card(s)`}
            onPressRightIcon={() => this.props.navigation.navigate(`Deck`, {deckTitle: item.title})}
        />
    );

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<HomeButton navigation={this.props.navigation}/>}
                    centerComponent={{ text: 'DECKS', style: { color: '#fff' } }}
                />
                <FlatList
                    data={this.props.decks}
                    renderItem={this.renderListItem.bind(this)}
                    keyExtractor={(item, index) => item.title}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

function mapStateToProps(state) {
    return {
        decks: state.deck.decks ? state.deck.decks.sort(sortBy('title')) : []
    }
}

export default connect(mapStateToProps)(Decks)