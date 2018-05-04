import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { white, blue, orange, gray } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: deckId,
        }
    }

    render() {
        return (
            <View style={styles.container} behavior='padding'>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{this.props.deck.title}</Text>
                    <Text style={{ color: gray, marginTop: 10 }}>{this.props.deck.questions.length} Cards</Text>
                </View>
                <View style={styles.btns}>
                    <TouchableOpacity
                        style={styles.addCardBtn}
                        onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { deckId: this.props.deck.title }
                        )}
                    >
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quizBtn}
                        onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            { deckId: this.props.deck.title }
                        )}
                    >
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    titleContainer: {
        marginTop: 60,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 36,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    btns: {
        alignItems: 'center',
        marginTop: 80
    },
    addCardBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        width: 200,
    },
    quizBtn: {
        marginTop: 14,
        backgroundColor: orange,
        padding: 10,
        width: 200,
        borderRadius: 7,
    },
    btnText: {
        fontSize: 20,
        color: white,
        textAlign: 'center'
    }
})

function mapStateToProps(decks, { navigation }) {
    const { deckId } = navigation.state.params
    const deck = decks[deckId]
    return {
        deck,
        navigation
    }
}

export default connect(mapStateToProps)(DeckDetails)
