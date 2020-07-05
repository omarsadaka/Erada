import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home/Home'
import Offer from './Home/Offers/Offer'
import OfferDetail from './Home/Offers/OfferDetail';
import LatestNews from './Home/LatestNews/LatestNews';
import LatestNewsDetail from './Home/LatestNews/LatestNewsDetail';
import Lectures from './Home/AwarenessLectures/Lectures';
import CreateLecture from './Home/AwarenessLectures/CreateLecture';
import ConfirmRequest from './Home/AwarenessLectures/ConfirmRequest';
import TherapeuticSessions from './Home/TherapeuticSessions/TherapeuticSessions';
import TherapeuticSessions2 from './Home/TherapeuticSessions/TherapeuticSessions2';
import Session from './Home/TherapeuticSessions/Session';
import SessionDetail from './Home/TherapeuticSessions/SessionDetail';
import Program from './Home/Program/Program';
import ProgramRequest from './Home/Program/ProgramRequest';
import ProgramRequest2 from './Home/Program/ProgramRequest2';
import Consulting from './Home/Consulting/Consulting';
import Consulting2 from './Home/Consulting/Consulting2';
import ReservationRequest from './Home/Consulting/ReservationRequest';
import ReservationRequest2 from './Home/Consulting/ReservationRequest2';
import ConsultationPay from './Home/Consulting/ConsultationPay';
import Sp_consulting from './Home/Consulting/Sp_consulting';
import ConsultingDetails from './Home/Consulting/ConsultingDetails';
import ConsultingResult from './Home/Consulting/ConsultingResult';
import Sp_program from './Home/Program/Sp_program';
import Sp_therapeuticSession from './Home/TherapeuticSessions/Sp_therapeuticSession';
import SessionResult from './Home/TherapeuticSessions/SessionResult';
import Sp_sessionDetail from './Home/TherapeuticSessions/Sp_sessionDetail';
import Sp_lectures from './Home/AwarenessLectures/Sp_lectures';
import JoinRequest from './Home/AwarenessLectures/JoinRequest';
import Chat from './Home/Consulting/Chat';
import SpecialistChat from './Home/Consulting/SpecialistChat'
import Video from './Home/Consulting/Video'
import VideoScreen from './Home/Consulting/VideoScreen'
import VoiceScreen from './Home/Consulting/VoiceScreen'


const HomeRoutes = createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Offer: {
        screen: Offer,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      OfferDetail: {
        screen: OfferDetail,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      LatestNews: {
        screen: LatestNews,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      LatestNewsDetail: {
        screen: LatestNewsDetail,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Lectures: {
        screen: Lectures,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      CreateLecture: {
        screen: CreateLecture,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ConfirmRequest: {
        screen: ConfirmRequest,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      TherapeuticSessions: {
        screen: TherapeuticSessions,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      TherapeuticSessions2: {
        screen: TherapeuticSessions2,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Session: {
        screen: Session,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      SessionDetail: {
        screen: SessionDetail,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Program: {
        screen: Program,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ProgramRequest: {
        screen: ProgramRequest,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ProgramRequest2: {
        screen: ProgramRequest2,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Consulting: {
        screen: Consulting,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Consulting2: {
        screen: Consulting2,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ReservationRequest: {
        screen: ReservationRequest,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ReservationRequest2: {
        screen: ReservationRequest2,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ConsultationPay: {
        screen: ConsultationPay,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Sp_consulting: {
        screen: Sp_consulting,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ConsultingDetails: {
        screen: ConsultingDetails,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      ConsultingResult: {
        screen: ConsultingResult,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Sp_program: {
        screen: Sp_program,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Sp_therapeuticSession: {
        screen: Sp_therapeuticSession,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      SessionResult: {
        screen: SessionResult,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Sp_sessionDetail: {
        screen: Sp_sessionDetail,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Sp_lectures: {
        screen: Sp_lectures,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      JoinRequest: {
        screen: JoinRequest,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Chat: {
        screen: Chat,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      SpecialistChat: {
        screen: SpecialistChat,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      Video: {
        screen: Video,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      VideoScreen: {
        screen: VideoScreen,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
      VoiceScreen: {
        screen: VoiceScreen,
        navigationOptions: ({navigation}) => ({
          header: null,
        }),
      },
     
     
    },
    {
      initialRouteName: 'Home',
    },
  );
  
  const AppContainer = createAppContainer(HomeRoutes);
  export default AppContainer;

