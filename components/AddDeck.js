import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createDeck, getDecks, addCardToDeck } from '../actions'
import { blue, white, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'


class AddDeck extends Component {

    state = {
        title: '',
        titleError: ''
    }

    isValidTitle = () => {
        if (this.state.title.trim() === '') {
            this.setState({
                titleError: 'Title is required.'
            })
            return false
        }
        this.setState({
            titleError: ''
        })
        return true
    }

    onSubmit = () => {
        const { title } = this.state
        if (this.isValidTitle()) {
            this.props.createDeck(title)
                .then(() => {
                    this.props.navigation.navigate('DeckList')
                })
            this.setState({
                title: ''
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.questionStyle}>
                    What is the title of your new deck?
                </Text>
                <View style={[styles.inputContainer, { borderColor: this.state.titleError ? red : blue  }]}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                    />
                </View>
                <Text style={{ color: red, marginTop: 5 }}>{this.state.titleError}</Text>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.onSubmit}>
                    <Text style={styles.btnText}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: white
    },
    submitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20
    },
    btnText: {
        color: white,
        textAlign: 'center',
        fontSize: 22
    },
    input: {
        fontSize: 16,
        padding: 10,
        width: 300
    },
    inputContainer: {
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 7
    },
    questionStyle: {
        fontSize: 38,
        padding: 20,
        textAlign: 'center'
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
        createDeck: (deckId) => dispatch(createDeck(deckId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)