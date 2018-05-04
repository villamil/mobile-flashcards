import api from './api'
import { Notifications, Permissions } from 'expo'

export const getDate = () => new Date().toJSON().slice(0, 10).replace(/-/g, '/')

// Used the same logic for notifications found in the project UdaciFitness, i just did a bit of refactoring

export function clearLocalNotification() {
    return api.removeNotifications()
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Time to study!',
        body: "👋🏻 Don't forget study your decks!",
        ios: {
            sound: true
        },
        andoid: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export const setLocalNotification = () => {
    api.getNotifications()
        .then((notifications) => {
            if (notifications === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllSchedualedNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            api.setNotification()
                        }
                    })
            }
        })
}