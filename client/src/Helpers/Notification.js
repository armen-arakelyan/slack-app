import { Store } from 'react-notifications-component'

export const Notification = (title, type) => {
    Store.addNotification({
        title: title,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
    })
}