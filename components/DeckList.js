import React, { Component } from 'react'
import { View, Text, AsyncStorage, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../actions'
import { gray, blue, white } from '../utils/colors'

class DeckList extends Component {
    componentDidMount() {
        this.props.getDecks()
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.deckContainer} onPress={() => this.props.navigation.navigate(
                'DeckDetails',
                { deckId: item.info.title }
            )}>
                    <Text style={{ fontSize: 26 }}>{item.info.title}</Text>
                    <Text style={{ color: gray, textAlign: 'center' }}>{item.cardCount} Cards</Text>
            </TouchableOpacity>
        )
    }

    formatDecks = (decks) => Object.keys(decks).map((item) => {
        return {
            key: item,
            info: decks[item],
            cardCount: decks[item].questions.length
        }
    })

    render() {
        const { decks } = this.props

        return (
            <View style={{ flex: 1, backgroundColor: white }}>
                {Object.keys(this.props.decks).length === 0
                    ? <Text style={{ justifyContent:'center', alignItems: 'center', fontSize: 26, color: gray, textAlign: 'center'}}>No decks yet, add a new one!</Text>
                    : 
                        <FlatList
                        data={this.formatDecks(decks)}
                        renderItem={this.renderItem}
                        />
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: blue,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    }
})

function mapStateToProps(decks, { navigation }) {
    return {
        decks,
        navigation
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: () => dispatch(getDecks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)