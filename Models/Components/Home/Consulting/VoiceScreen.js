import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, NativeModules, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
const { width, height } = Dimensions.get('window')
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../../Actions' //redux
import { RtcEngine, AgoraView } from 'react-native-agora';


const { Agora } = NativeModules;                  //Define Agora object as a native module

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Adaptative,
} = Agora; 
class VoiceScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          peerIds: [],                                //Array for storing connected peers
          uid: Math.floor(Math.random() * 100),       //Generate a UID for local user
          appid: '8cb1630568844eb8b83d9e068fe553f3',                    //Enter the App ID generated from the Agora Website
          channelName: 'omar',        //Channel Name for the current session
          vidMute: false,                             //State variable for Video Mute
          audMute: false,                             //State variable for Audio Mute
          joinSucceed: false,                         //State variable for storing success
        };
        const config = {                            //Setting config of the app
          appid: this.state.appid,                  //App ID
          channelProfile: 0,                        //Set channel profile as 0 for RTC
          videoEncoderConfig: {                     //Set Video feed encoder settings
            width: 720,
            height: 1080,
            bitrate: 1,
            frameRate: FPS30,
            orientationMode: Adaptative,
          },
          audioProfile: AudioProfileDefault,
          audioScenario: AudioScenarioDefault,
        };
        RtcEngine.init(config);                     //Initialize the RTC engine
      }
      componentDidMount() {
        RtcEngine.on('userJoined', (data) => {
          const { peerIds } = this.state;             //Get currrent peer IDs
          if (peerIds.indexOf(data.uid) === -1) {     //If new user has joined
            this.setState({
              peerIds: [...peerIds, data.uid],        //add peer ID to state array
            });
          }
        });
        RtcEngine.on('userOffline', (data) => {       //If user leaves
          this.setState({
            peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
          });
        });
        RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
          RtcEngine.startPreview();                                      //Start RTC preview
          this.setState({
            joinSucceed: true,                                           //Set state variable to true
          });
        });
        RtcEngine.joinChannel(this.state.channelName, this.state.uid);  //Join Channel
        RtcEngine.enableAudio();                                        //Enable the audio
      }

      toggleAudio() {
        let mute = this.state.audMute;
        console.log('Audio toggle', mute);
        RtcEngine.muteLocalAudioStream(!mute);
        this.setState({
          audMute: !mute,
        });
      }

      endCall() {
        RtcEngine.destroy();
        // Actions.home();
        if(this.props.loginType==1){
            this.props.navigation.navigate('Chat')

        }else{
            this.props.navigation.navigate('SpecialistChat')

        }
    
      }

      toggleVideo() {
        let mute = this.state.vidMute;
        console.log('Video toggle', mute);
        this.setState({
          vidMute: !mute,
        });
        RtcEngine.muteLocalVideoStream(!this.state.vidMute);
      }

      peerClick(data) {
        let peerIdToSwap = this.state.peerIds.indexOf(data);
        this.setState(prevState => {
          let currentPeers = [...prevState.peerIds];
          let temp = currentPeers[peerIdToSwap];
          currentPeers[peerIdToSwap] = currentPeers[0];
          currentPeers[0] = temp;
          return { peerIds: currentPeers };
        });
      }

     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 18,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>مكالمة صوتية</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}> Voice Screen</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 18, padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     videoView() {
        return (
          <View style={{ flex: 1 }}>
              {this.renderHeader(this.props.Language)}
            {
              this.state.peerIds.length > 1
                ? <View style={{ flex: 1 }}>
                  <View style={{ height: dimensions.height * 3 / 4 - 50 }}>
                    <AgoraView style={{ flex: 1 }}
                      remoteUid={this.state.peerIds[0]} mode={1} key={this.state.peerIds[0]} />
                  </View>
                  <View style={{ height: dimensions.height / 4 }}>
                    <ScrollView horizontal={true} decelerationRate={0}
                      snapToInterval={dimensions.width / 2} snapToAlignment={'center'} style={{ width: dimensions.width, height: dimensions.height / 4 }}>
                      {
                        this.state.peerIds.slice(1).map((data) => (
                          <TouchableOpacity style={{ width: dimensions.width / 2, height: dimensions.height / 4 }}
                            onPress={() => this.peerClick(data)} key={data}>
                            <AgoraView style={{ width: dimensions.width / 2, height: dimensions.height / 4 }}
                              remoteUid={data} mode={1} key={data} />
                          </TouchableOpacity>
                        ))
                      }
                    </ScrollView>
                  </View>
                </View>
                : this.state.peerIds.length > 0
                  ? <View style={{ height: dimensions.height - 50 }}>
                    <AgoraView style={{ flex: 1 }}
                      remoteUid={this.state.peerIds[0]} mode={1} />
                  </View>
                  : <Text style={{paddingHorizontal:20}}>No users connected</Text>
            }
            {/* {
              !this.state.vidMute                                              //view for local video
                ? <AgoraView style={styles.localVideoStyle} zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
                : <View />
            } */}
            <View style={styles.buttonBar}>
              <Icon.Button style={styles.iconStyle}
                backgroundColor="#0093E9"
                name={this.state.audMute ? 'mic-off' : 'mic'}
                onPress={() => this.toggleAudio()}
              />
              <Icon.Button style={styles.iconStyle}
                backgroundColor="#0093E9"
                name="call-end"
                onPress={() => this.endCall()}
              />
              {/* <Icon.Button style={styles.iconStyle}
                backgroundColor="#0093E9"
                name={this.state.vidMute ? 'videocam-off' : 'videocam'}
                onPress={() => this.toggleVideo()}
              /> */}
            </View>
          </View>
        );
      }

     render() {
        return this.videoView();
        // return (
        //     <View style={styles.container}>
        //       {this.renderHeader(this.props.Language)}  
        //       {this.videoView()}
        //     </View>
           
        //     );
      }
}
let dimensions = {                                            //get dimensions of the device to use in view styles
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
       Processing: state.AuthReducer.Processing,
        Message: state.AuthReducer.Message,
       User: state.AuthReducer.User,
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading})(VoiceScreen)
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#F6F6F6',
     },
    buttonBar: {
      height: 50,
      backgroundColor: '#0093E9',
      display: 'flex',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
    },
    row: {
        flexDirection: 'row'
     },
     rowReversed: {
        flexDirection: 'row-reverse'
     },
    localVideoStyle: {
      width: 140,
      height: 160,
      position: 'absolute',
      top: 5,
      right: 5,
      zIndex: 100,
    },
    iconStyle: {
      fontSize: 34,
      paddingTop: 15,
      paddingLeft: 40,
      paddingRight: 40,
      paddingBottom: 15,
      borderRadius: 0,
    },
  });
  