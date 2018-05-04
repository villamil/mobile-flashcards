import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import thunk from 'redux-thunk'
import StatusBar from './components/StatusBar'
import { orange, white, blue } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor}/>
    }
  }
}, {
  backBehavior: 'none',
  navigationOptions: {
    header:null
  },
  tabBarOptions: {
    // activeTintColor: Platform.OS === 'ios' ? purple: white,
    style: {
      height: 56,
      //backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Decks'
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange
      }
    }
  }
}, {
  initialRouteName: 'Home',
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <KeyboardAvoidingView style={{ flex: 1}} behavior='padding'>
        <StatusBar backgroundColor={orange} barStyle='light-content' />
          <MainNavigator />
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}
