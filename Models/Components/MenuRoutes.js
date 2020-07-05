import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import Menu from './Menu/Menu'
import Profile from './Menu/Profile';
import MyAdvice from './Menu/MyAdvice';
import MyReservation from './Menu/MyReservation';
import MyBalance from './Menu/MyBalance';
import ChangeLang from './Menu/ChangeLang';
import ChangePass from './Menu/ChangePass';
import JoinOrder from './Menu/JoinOrder/JoinOrder';
import StutterControl from './Menu/JoinOrder/StutterControl';
import Psychologist from './Menu/JoinOrder/Psychologist';
import SpeechSpecialist from './Menu/JoinOrder/SpeechSpecialist';
import AnotherArea from './Menu/JoinOrder/AnotherArea';
import ContactUs from './Menu/ContactUs';
import AboutApp from './Menu/AboutApp';
import Terms from './Menu/Terms';
import Notification from './Menu/Notification';
import MyTimes from './Menu/MyTimes';
import ChatHistory from './Menu/ChatHistory'



const MenuRoutes = createStackNavigator(
    {
      Menu: {
        screen: Menu,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Profile: {
        screen: Profile,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      MyAdvice: {
        screen: MyAdvice,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      MyReservation: {
        screen: MyReservation,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      MyBalance: {
        screen: MyBalance,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ChangeLang: {
        screen: ChangeLang,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ChangePass: {
        screen: ChangePass,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      JoinOrder: {
        screen: JoinOrder,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      StutterControl: {
        screen: StutterControl,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Psychologist: {
        screen: Psychologist,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      SpeechSpecialist: {
        screen: SpeechSpecialist,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      AnotherArea: {
        screen: AnotherArea,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ContactUs: {
        screen: ContactUs,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      AboutApp: {
        screen: AboutApp,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Terms: {
        screen: Terms,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Notification: {
        screen: Notification,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      MyTimes: {
        screen: MyTimes,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ChatHistory: {
        screen: ChatHistory,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
     
     
    },
    {
      initialRouteName: 'Menu',
    },
  );
  
  const AppContainer = createAppContainer(MenuRoutes);
  export default AppContainer;

