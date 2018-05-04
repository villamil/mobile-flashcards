import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { white, blue, red, orange, green, gray } from '../utils/colors'
import api from '../utils/api'
import { getDate, clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {

    state = {
        counter: 0,
        correct: 0,
        incorrect: 0,
        viewAnswer: false,
        showResults: false
    }

    onAnswer = (response) => {
        if (this.props.deck.questions.length !== this.state.counter + 1) {
            return this.setState({
                counter: this.state.counter + 1,
                [response]: this.state[response] + 1,
                viewAnswer: false
            })
        }
        this.setState({
            showResults: true,
            counter: this.state.counter + 1,
            [response]: this.state[response] + 1,
            viewAnswer: false
        })
    }

    restartQuiz = () => {
        this.setState({
            counter: 0,
            correct: 0,
            incorrect: 0,
            viewAnswer: false,
            showResults: false
        })
    }

    showResult() {
        const percentage = ((this.state.correct * 100) / this.props.deck.questions.length).toFixed(0)
        
        clearLocalNotification()
            .then(setLocalNotification)

        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.resultMessage}>{percentage > 70 ? 'Congratulations you are doing great! 🎉🎊 ' : "Don't worry and keep studying! 💪🏻"}</Text>
                <Text style={styles.resultText}>{percentage}% Correct answers</Text>
                <TouchableOpacity
                    style={styles.restartQuizBtn}
                    onPress={this.restartQuiz}
                >
                    <Text style={styles.textBtn}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backToDeckBtn}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.textBtn}>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let card = {}
        if (!this.state.showResults) {
            card = this.props.deck.questions[this.state.counter]
        } else {
            card = {
                question: '',
                answer: ''
            }
        }

        if (this.props.deck.questions.length === 0) {
            card = {
                question: '',
                answer: ''
            }
        }

        return (
            <ScrollView style={styles.container}>
                {this.props.deck.questions.length === 0 ? <Text style={{ alignItems: 'center', textAlign: 'center', color: gray, fontSize: 26, marginTop: 10 }}>You don't have any cards on this deck</Text>
                    :
                    <View>
                        <Text style={{ padding: 10, fontSize: 16, color: green }}>{this.state.showResults ? this.state.counter : this.state.counter + 1} / {this.props.deck.questions.length}</Text>
                        {this.state.showResults ?
                            this.showResult()
                            : <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                {this.state.viewAnswer
                                    ? <Text style={styles.questionText}>{card.answer}</Text>
                                    : <Text style={styles.questionText}>{card.question}</Text>}
                                <TouchableOpacity onPress={() => this.setState({
                                    viewAnswer: !this.state.viewAnswer
                                })}
                                    style={{ marginBottom: 50 }}
                                >
                                    <Text style={{ color: orange }}>{this.state.viewAnswer ? 'Question' : 'Answer'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.onAnswer('correct')}
                                    style={styles.correctBtn}
                                >
                                    <Text style={styles.textBtn}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.onAnswer('incorrect')}
                                    style={styles.incorrectBtn}
                                >
                                    <Text style={styles.textBtn}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,

    },
    questionText: {
        marginTop: 100,
        fontSize: 46,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    correctBtn: {
        width: 200,
        backgroundColor: green,
        padding: 10,
        marginTop: 10,
        borderRadius: 7,
    },
    restartQuizBtn: {
        width: 200,
        backgroundColor: green,
        padding: 10,
        marginTop: 10,
        borderRadius: 7,
    },
    backToDeckBtn: {
        width: 200,
        backgroundColor: orange,
        padding: 10,
        marginTop: 10,
        borderRadius: 7,
    },
    incorrectBtn: {
        width: 200,
        backgroundColor: red,
        padding: 10,
        marginTop: 10,
        borderRadius: 7,
    },
    textBtn: {
        fontSize: 20,
        color: white,
        textAlign: 'center'
    },
    resultText: {
        color: green,
        textAlign: 'center',
        fontSize: 26,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    resultMessage: {
        color: blue,
        textAlign: 'center',
        fontSize: 26,
        marginTop: 50,
        alignItems: 'center'
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

export default connect(mapStateToProps)(Quiz)
