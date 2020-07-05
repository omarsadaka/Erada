/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import { AsyncStorage } from 'react-native'
import NavigationServices from './Models/NavigationServices'
import Routes from './Models/Routes';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './Models/Reducers'

import firebase from 'react-native-firebase'

 class App extends Component {

//   async getToken() {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     //alert(fcmToken)
//     console.log(fcmToken)
//     if (!fcmToken) {
//        fcmToken = await firebase.messaging().getToken();
//        console.log(fcmToken)
//        if (fcmToken) {
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//        }
//     }
//  }

//  async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//        this.getToken();
//     } else {
//        this.requestPermission();
//     }
//  }

//  async requestPermission() {
//     try {
//        await firebase.messaging().requestPermission();
//        this.getToken();
//     } catch (error) {
//        console.log('permission rejected');
//     }
//  }

//  async createNotificationListeners() {
//     firebase.notifications().onNotification(notification => {
//        notification.android.setChannelId('insider').setSound('default')
//        firebase.notifications().displayNotification(notification)
//     });
//  }

//  componentDidMount() {

//    const ReactNative = require('react-native');
//     try{
//           ReactNative.I18nManager.allowRTL(false)
//     }catch(e){
//       alert('error'+e)
//     }
//     const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
//     firebase.notifications().android.createChannel(channel);
//     this.checkPermission();
//     this.createNotificationListeners();
//  }

async componentDidMount() {

   const ReactNative = require('react-native');
   try{
         ReactNative.I18nManager.allowRTL(false)
   }catch(e){
     alert('error'+e)
   }
   // this.checkPermission();
   const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
   if (notificationOpen) {
       const action = notificationOpen.action;
       const notification: Notification = notificationOpen.notification;
       var seen = [];
      //  alert('background'+JSON.stringify(notification.data));
   } 
   const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
           .setDescription('My apps test channel');
// Create the channel
   firebase.notifications().android.createChannel(channel);
   this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
       // Process your notification as required
       // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
   });
   this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
       // Process your notification as required
       notification
           .android.setChannelId('test-channel')
           .android.setSmallIcon('ic_launcher');
           notification.android.setAutoCancel(true);
       firebase.notifications()
           .displayNotification(notification);

   });
   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
       // Get the action triggered by the notification being opened
       const action = notificationOpen.action;
       // Get information about the notification that was opened
       const notification: Notification = notificationOpen.notification;
       var seen = [];
       const { title, body } = notificationOpen.notification;
       alert(title+ body);
       alert('helmi'+JSON.stringify(notification.data));
       // firebase.notifications().removeDeliveredNotification(notification.notificationId);
       firebase.notifications().removeAllDeliveredNotifications(notification.notificationId)
   });
}


componentWillUnmount() {
   this.notificationDisplayedListener();
   this.notificationListener();
   this.notificationOpenedListener();
}



 render() {
  return (
    <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))} >
    <Routes ref={navigatorRef => {
       NavigationServices.setTopLevelNavigator(navigatorRef);
    }} />
 </Provider>
  );
 }
};



export default App;
