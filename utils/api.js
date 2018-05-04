import { AsyncStorage } from 'react-native'
const DECKS_STORAGE_KEY = 'udacicards:decks'
const QUIZ_STORAGE_KEY = 'udacicards:quiz'
const NOTIFICATION_KEY = 'udacicards:notifications'

const getDecks = () => AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)

const getDeck = (deckId) => AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((strDecks) => {
        const decks = JSON.parse(strDecks);
        return { [deckId]: decks[deckId] } 
    })

const createDeck = (deckId) => 
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [deckId]: { title: deckId, questions: [] }}))
    .then(() => getDeck(deckId))

const addCardToDeck = async (deckId, card) => {
    const decks = await getDecks()
    decks[deckId].questions.push(card)
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
        .then(getDecks)
}

const getNotifications = () => AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)

const setNotification = () => AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

const removeNotifications = () => AsyncStorage.removeItem(NOTIFICATION_KEY)

export default {
    getDecks,
    getDeck,
    createDeck,
    addCardToDeck,
    getNotifications,
    setNotification,
    removeNotifications
}