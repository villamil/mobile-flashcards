import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { white, blue, red } from '../utils/colors'
import { addCardToDeck } from '../actions'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
        questionError: '',
        answerError: ''
    }

    isValidForm() {
        if (this.state.question.trim() === '') {
            this.setState({
                questionError: 'Question is required.'
            })
            return false
        }
        this.setState({
            questionError: ''
        })
        if (this.state.answer.trim() === '') {
            this.setState({
                answerError: 'Answer is required.'
            })
            return false
        }

        this.setState({
            questionError: '',
            answerError: ''
        })

        return true

    }

    onSubmit = () => {
        const { question, answer } = this.state
        if (this.isValidForm()) {
            this.props.addCardToDeck(this.props.deck.title, {
                question,
                answer
            })
            this.setState({
                question: '',
                answer: ''
            })
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                    <Text style={styles.questionStyle}>Question:</Text>
                    <View style={[styles.inputContainer, { borderColor: this.state.questionError ? red : blue }]}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(question) => this.setState({ question })}
                            value={this.state.question}
                        />
                    </View>
                    <Text style={styles.errorText}>{this.state.questionError}</Text>
                    <Text style={styles.questionStyle}>Answer:</Text>
                    <View style={[styles.inputContainer, { borderColor: this.state.answerError ? red : blue }]}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(answer) => this.setState({ answer })}
                            value={this.state.answer}
                        />
                    </View>
                    <Text style={styles.errorText}>{this.state.answerError}</Text>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.onSubmit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    questionStyle: {
        fontSize: 38,
        padding: 20,
        textAlign: 'center'
    },
    input: {
        fontSize: 16,
        padding: 10,
    },
    inputContainer: {
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 7,
        marginLeft: 10,
        marginRight: 10
    },
    submitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 20
    },
    btnText: {
        color: white,
        textAlign: 'center',
        fontSize: 22
    },
    errorText: {
        color: red,
        marginTop: 5,
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

function mapDispatchToProps(dispatch) {
    return {
        addCardToDeck: (deckId, card) => dispatch(addCardToDeck(deckId, card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)

