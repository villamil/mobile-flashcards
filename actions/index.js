import api from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}


export const createDeck = (deckId) => dispatch => (
    api.createDeck(deckId)
        .then((deck) => dispatch(addDeck(deck)))
)

export const getDecks = () => dispatch => (
    api.getDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
)

export const addCardToDeck = (deckId, card) => dispatch => (
    api.addCardToDeck(deckId, card)
        .then(decks => dispatch(receiveDecks(decks)))
)