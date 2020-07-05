import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Slider,Image,TouchableHighlight , FlatList,AsyncStorage } from 'react-native';
import { Input, Item, Right } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import DocumentPicker from 'react-native-document-picker';
import NetInfo from '@react-native-community/netinfo';
import io from "socket.io-client";

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import StarRating from 'react-native-star-rating';

import { Actions } from 'react-native-router-flux';
import requestCameraAndAudioPermission from './../../permission';


import { connect } from 'react-redux' // redux
import { SetLoading , getConsultingById } from './../../../Actions' //redux


class SpecialistChat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            chatMsgs:[],
            progress: 0,
            isVisible:false,
            indeterminate: false,
            flag_loading:1,
            flag_input:1,
            user:{},
            type: null,
            name:'',
            message:'',
            chatID:'',
            currentTime: 0.0,
            recording: false,
            paused: false,
            stoppedRecording: false,
            finished: false,
            audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
            hasPermission: undefined,
            starCount:0,
            AppID: '8cb1630568844eb8b83d9e068fe553f3',                    //Set your APPID here
            ChannelName: 'omar',                                 //Set a default channel or leave blank
            voiceID:'',  
            isPlay: false,
        };
        
        if (Platform.OS === 'android') {                    //Request required permissions from Android
          requestCameraAndAudioPermission().then(_ => {
            console.log('requested!');
          });
        }
     }
     componentDidMount= async() => {
       this.props.SetLoading(false)

       setTimeout(() => {
         this.setState({flag_input:2})
       }, 30000);

        this.animate();
        const { navigation } = this.props;
        const obj = navigation.getParam('UserChat', 'NO-ID');
        const data = JSON.parse(obj);
        this.setState({type: obj.type})
        this.setState({user:data})
        this.getChatHistory()
        // if(data.key==1){
        //   alert(data.consultingID)
        //   this.getChatHistory1(data.consultingID)
        // }else{
        //   this.getChatHistory2(data.sessionID)
        // }
        this.socket = io("http://68.183.39.113");
        this.socket.on("userReceive", (msg ,type ) => {
        const obj={
           msg: msg ,
           from: 1,
           type: type,
           imgPath: this.state.user.imgPath
        }
       this.state.chatMsgs.push(obj)
      });
      
      AudioRecorder.requestAuthorization().then((isAuthorised) => {
        this.setState({ hasPermission: isAuthorised });
        if (!isAuthorised) return;

        this.prepareRecordingPath(this.state.audioPath);

        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };

        AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
          }
        };
      });

      }

      handleSubmit(){
         let AppID = this.state.AppID;
         let ChannelName = this.state.ChannelName;
         if (AppID !== '' && ChannelName !== '') {
           // Actions.video({ AppID, ChannelName });
           this.props.navigation.navigate('VideoScreen')
         }
       }

       prepareRecordingPath(audioPath){
         AudioRecorder.prepareRecordingAtPath(audioPath, {
           SampleRate: 22050,
           Channels: 1,
           AudioQuality: "Low",
           AudioEncoding: "aac",
           AudioEncodingBitRate: 32000
         });
       }

     animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
        //   this.setState({ indeterminate: false });
          setInterval(() => {
            progress += Math.random() / 5;
            if (progress > 1) {
              progress = 1;
              this.setState({flag_loading:0})
            }
            this.setState({ progress });
            
          }, 500);
        }, 1000);
       
      }

      uploadFile= async()=>{
         this.props.SetLoading(true)
         try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            console.log(
              res.uri,
              res.type, // mime type
              res.name,
              res.size
            );
            this.setState({fileName: res.name})
            // data = new FormData();
            //        data.append('resource', {
            //            name: res.fileName,
            //            uri: res.uri,
            //            type: res.type
            //        });
            const source = { uri: res.uri, fileName: res.name , type: res.type }
            // alert(JSON.stringify(source))
            this.postFile(source)
                   
          } catch (err) {
            this.props.SetLoading(false)
            if (DocumentPicker.isCancel(err)) {
               alert('User cancelled the picker')
            } else {
              throw err;
            }
          }
           
        }
   
        postFile = (file) => new Promise((resolve, reject) => {
         const data = new FormData();
         data.append('resource', { uri: file.uri, name: file.fileName, type: file.type });
         return axios.post(
            "http://68.183.39.113/api/user/uploadFile", data
         ).then(response => {
            resolve(response)
            console.log(response)
            this.setState({
               filePath: response.data.toString()
            });
            if(this.props.Language == 'AR'){
               alert('تم تحميل الملف')
             }else{
               alert('File uploaded')
             }
            this.props.SetLoading(false)
            this.socket.emit('startChat' ,this.state.chatID, response.data.toString() , 2);
            this.setState({message: ''});
            const obj={
               msg: response.data.toString() ,
               from:2,
               type: 2,
               imgPath: this.props.User.imgPath
            }
            this.state.chatMsgs.push(obj)
            this.flatList.scrollToEnd({animated: true})
         }).catch(error => {
            reject(error)
            alert(error)
            this.props.SetLoading(false)
           
         });
      });
    //   onSend(){
    //      const { message  , chatMsgs} = this.state
    //      if(message ){
    //       this.props.SetLoading(true)
    //       NetInfo.fetch().then(state =>{
    //         if (state.isConnected){
    //            this.props.SetLoading(false)
    //             this.socket.emit('clientSend' , message , 1);
    //             this.setState({message: ''});
    //                const obj={
    //                   msg: message ,
    //                   from: 2,
    //                   type: 1,
    //                   imgPath: this.props.User.imgPath
    //                   }
    //                     chatMsgs.push(obj)
    //         } else {
    //          this.props.SetLoading(false)
    //           if (this.props.Language === 'AR'){
    //             alert('لا يوجد أتصال بالانترنت');
    //           } else {
    //             alert('No internet connection');
    //           }
    //         }
    //       });
    //      }else{
    //       if (this.props.Language === 'AR'){
    //          alert('أدخل نص الرسالة');
    //        } else {
    //          alert('Enter your message');
    //        }
    //      }
       
    //  } 

     onSend(){
      const { message ,chatID ,chatMsgs} = this.state
      if(message ){
       this.props.SetLoading(true)
       NetInfo.fetch().then(state =>{
         if (state.isConnected){
            if(chatID){
             this.props.SetLoading(false)
             this.socket.emit('startChat',chatID , message , 1);
             this.setState({message: ''});
             const obj={
              msg: message ,
              from: 2,
              type: 1,
              imgPath: this.props.User.imgPath
              }
                chatMsgs.push(obj)
                this.flatList.scrollToEnd({animated: true})
            }else{
                 try {
                   axios.post('http://68.183.39.113/api/user/makeChatID',{
                       speicalistID: this.props.User._id,
                       userID: this.state.user.userID,
                   }).then((response)=> {
                      this.props.SetLoading(false)
                      if(response.data._id){
                        this.setState({chatID: response.data._id})
                        var chat_ID = response.data._id
                      //   AsyncStorage.setItem('ChatID' , chat_ID )
                        this.socket.emit('startChat', chat_ID , message , 1);
                        this.setState({message: ''});
                        const obj={
                           msg: message ,
                           from: 2,
                           type: 1,
                           imgPath: this.props.User.imgPath
                        }
                        chatMsgs.push(obj)
                        this.flatList.scrollToEnd({animated: true})
                      }
                   }).catch((error)=> {
                      this.props.SetLoading(false)
                      alert(error)
                   }).finally(function () {
                       // always executed
                   });
               } catch (error) {
                this.props.SetLoading(false)
                   alert(error)
               }
            }
         
         } else {
          this.props.SetLoading(false)
           if (this.props.Language === 'AR'){
             alert('لا يوجد أتصال بالانترنت');
           } else {
             alert('No internet connection');
           }
         }
       });
      }else{
       if (this.props.Language === 'AR'){
          alert('أدخل نص الرسالة');
        } else {
          alert('Enter your message');
        }
      }
    
  }

      
     getChatHistory =( )=>{
      this.props.SetLoading(true)
      NetInfo.fetch().then(state =>{
          if (state.isConnected){
          try {
             axios.get('http://68.183.39.113/api/user/getChatHistory',{
              params: {
                  userID: this.state.user.userID,
                  speicalistID: this.props.User._id,
              }
             })
             .then((response)=> {
               this.props.SetLoading(false)
              const Data = response.data;
              const arr = []
              if(Data.length > 0){
                 const chatID = Data[0].chatID._id
                 this.setState({chatID})
                 for (let index = 0; index < Data.length; index++) {
                    const key = Data[index].from
                    const image=''
                    if(key==2){
                        image=this.props.User.imgPath
                    }else{
                      image = this.state.user.imgPath
                    }
                  var obj = {
                     id: Data[index]._id,
                     msg: Data[index].msg,
                     from: Data[index].from,
                     type: Data[index].type,
                     imgPath: image
                  }
               
                  arr.push(obj)
                  this.setState({chatMsgs: arr})
                  // this.socket.emit("joinRoom", this.state.chatID , this.props.User._id );
              }
              }
             
             }).catch((error)=> {
               this.props.SetLoading(false)
                 alert(error)
             }).finally(function () {
                 // always executed
             });
         } catch (error) {
            this.props.SetLoading(false)
            alert(error)            
         }
         
       } else {
         this.props.SetLoading(false)
         if (this.props.Language === 'AR'){
            alert('أدخل نص الرسالة');
          } else {
            alert('Enter your message');
          }
         }
       });
   }

   getChatHistory2 =(sessionID )=>{
    this.props.SetLoading(true)
    NetInfo.fetch().then(state =>{
        if (state.isConnected){
        try {
           axios.get('http://68.183.39.113/api/user/getChatHistory',{
            params: {
                userID: this.state.user.userID,
                speicalistID: this.props.User._id,
                sessionID
            }
           })
           .then((response)=> {
             this.props.SetLoading(false)
            const Data = response.data;
            const arr = []
            if(Data.length > 0){
               const chatID = Data[0].chatID._id
               this.setState({chatID})
               for (let index = 0; index < Data.length; index++) {
                  const key = Data[index].from
                  const image=''
                  if(key==2){
                      image=this.props.User.imgPath
                  }else{
                    image = this.state.user.imgPath
                  }
                var obj = {
                   id: Data[index]._id,
                   msg: Data[index].msg,
                   from: Data[index].from,
                   type: Data[index].type,
                   imgPath: image
                }
             
                arr.push(obj)
                this.setState({chatMsgs: arr})

                this.socket.emit("joinRoom", this.state.chatID , this.props.User._id );
               
            }
           
            }
           
           }).catch((error)=> {
             this.props.SetLoading(false)
               alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
          this.props.SetLoading(false)
          alert(error)            
       }
       
     } else {
       this.props.SetLoading(false)
       if (this.props.Language === 'AR'){
          alert('أدخل نص الرسالة');
        } else {
          alert('Enter your message');
        }
       }
     });
 }
  
     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity 
                 style={{width:'25%',}}
                 onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{width:'50%', color: '#fff', fontSize: 22,fontFamily:'adobe',textAlign:'center' }}> {this.state.user.fullname}</Text>
                 <View style={[styles.flex, styles.row,{width:'25%',alignItems:'center',justifyContent:'space-evenly'}]}>
                 <Icon name="video-camera" style={{ color: '#ffffff', fontSize: 18, }}
                  onPress={()=>{
                     let AppID = this.state.AppID;
                     let ChannelName = this.state.ChannelName;
                     if (AppID !== '' && ChannelName !== '') {
                       this.props.navigation.navigate('VideoScreen')
                     }
                    }} />
                 <Icon name="phone" style={{ color: '#ffffff', fontSize: 18, }} 
                  onPress={()=>{
                    let AppID = this.state.AppID;
                    let ChannelName = this.state.ChannelName;
                    if (AppID !== '' && ChannelName !== '') {
                      this.props.navigation.navigate('VoiceScreen')
                    }
                   }}/>
                 </View>
              </View>
           )
        } else {
           return (
              <View style={[ styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View style={[ styles.row,{width:'15%',alignItems:'center',justifyContent:'space-evenly'}]}>
                 <Icon name="video-camera" style={{ color: '#ffffff', fontSize: 18,margin:3 }}
                 onPress={this.handleSubmit} />
                 <Icon name="phone" style={{ color: '#ffffff', fontSize: 18, margin:3}} 
                  onPress={()=>{
                    let AppID = this.state.AppID;
                    let ChannelName = this.state.ChannelName;
                    if (AppID !== '' && ChannelName !== '') {
                      this.props.navigation.navigate('VoiceScreen')
                    }
                   }}/>
                 </View>
                 <Text style={{flex:1, color: '#fff', textAlign:'center',fontSize: 22,fontFamily:'adobe' }}>  {this.state.user.fullname}</Text>
                 <TouchableOpacity 
                  style={{width:'15%',alignItems:'center',justifyContent:'center'}}
                 onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }
      
     renderMessage(msg){
      return(
      <Text style={{width:'100%',paddingHorizontal:10,textAlign:'right',fontSize:16,color:'#707070',fontFamily:'adobe',backgroundColor:'#FFFFFF',
         borderRadius:20,borderColor:'#E0E0E0',borderWidth:1,textAlignVertical:'center',padding:2}}>{msg}</Text>
      )

     }
     renderImage(img){
         <Image  style={{width:70, height: 70 ,}}source={{uri: img}}></Image>
     }
     renderVoice(voice, id){
      return(
    <View style={{width:'80%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
     {this.state.voiceID == id?
                <TouchableOpacity
                onPress={()=> {
                  this.setState({voiceID:''})
                    setTimeout(() => {
                      var sound = new Sound(voice,  null, (error) => {
                        if (error) {
                          alert('failed to load the sound', error);
                        }else{
                          sound.stop()
                        }
                      });
                    }, 100);
                  
                  }}>
               <Icon name="pause" size={20} color="#BABABA" style={{}}/>
                </TouchableOpacity>
               :
               <TouchableOpacity
               onPress={()=> {
                 this.setState({voiceID:id})
                //  if(this.state.voiceID == id){
                   setTimeout(() => {
                     var sound = new Sound(voice,  null, (error) => {
                       if (error) {
                         alert('failed to load the sound', error);
                       }else{
                        //  sound.play()
                         sound.play((success) => {
                          if (success) {
                            alert('successfully finished playing');
                            this.setState({voiceID:''})
                          } 
                        });
                       }
                     });
                   }, 100);
                //  }
                 }}>
              <Icon name="caret-right" size={35} color="#BABABA" style={{}}/>
               </TouchableOpacity>
               }
    
      {/* <TouchableOpacity
      onPress={()=> {
        this.setState({voiceID:id})
            if(id==this.state.voiceID){
              alert(voice)
              Sound.setCategory('Playback');
              setTimeout(() => {
                var sound = new Sound(voice,  null, (error) => {
                  if (error) {
                    alert('failed to load the sound', error);
                  }else{
                    sound.play()
                  }
                });
              }, 100);
            }
      }}>
      <Icon name="play" size={20} color="#BABABA" style={{}}/>
      </TouchableOpacity> */}
      <Slider
      step = { 1 }
      minimumValue = { 0 }
      maximumValue = { 1 }
      minimumTrackTintColor = "#009688"
      onValueChange={(ChangedValue) => this.setState({ SliderValue: ChangedValue })}
      style = {{ flex:1 }} 
      />
        </View>
      )
  }
  renderVoice2(voice , id){
    return(
  <View style={{width:'80%',alignItems:'center',justifyContent:'center',flexDirection:'row-reverse'}}>
    <TouchableOpacity
    onPress={()=> {
      this.setState({voiceID:id})
            if(id==this.state.voiceID){
              this._play(voice)
            }
    }}>
    <Icon name="play" size={20} color="#BABABA" style={{}}/>
    </TouchableOpacity>
    <Slider
    step = { 1 }
    minimumValue = { 0 }
    maximumValue = { 1 }
    minimumTrackTintColor = "#009688"
    onValueChange={(ChangedValue) => this.setState({ SliderValue: ChangedValue })}
    style = {{ flex:1 }} 
    />
      </View>
    )
}

  async _record() {
   if (this.state.recording) {
     alert('Already recording!');
     return;
   }

   if (!this.state.hasPermission) {
     alert('Can\'t record, no permission granted!');
     return;
   }

   if(this.state.stoppedRecording){
     this.prepareRecordingPath(this.state.audioPath);
   }

   this.setState({recording: true, paused: false});

   try {
     const filePath = await AudioRecorder.startRecording();
   } catch (error) {
     console.error(error);
   }
 }

 _finishRecording(didSucceed, filePath, fileSize) {
   this.setState({ finished: didSucceed });
  //  alert(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
 }

 _renderButton(title, onPress, active) {
   var style = (active) ? styles.activeButtonText : styles.buttonText;

   return (
     <TouchableHighlight style={styles.button} onPress={onPress}>
       <Text style={style}>
         {title}
       </Text>
     </TouchableHighlight>
   );
 }

 _renderPauseButton(onPress, active) {
   var style = (active) ? styles.activeButtonText : styles.buttonText;
   var title = this.state.paused ? "Resume" : "Pause";
   return (
     <TouchableHighlight style={styles.button} onPress={onPress}>
       <Text style={style}>
         {title}
       </Text>
     </TouchableHighlight>
   );
 }

 async _pause() {
   if (!this.state.recording) {
     alert('Can\'t pause, not recording!');
     return;
   }

   try {
     const filePath = await AudioRecorder.pauseRecording();
     this.setState({paused: true});
   } catch (error) {
     console.error(error);
   }
 }

 async _resume() {
   if (!this.state.paused) {
     alert('Can\'t resume, not paused!');
     return;
   }

   try {
     await AudioRecorder.resumeRecording();
     this.setState({paused: false});
   } catch (error) {
     console.error(error);
   }
 }

 async _stop() {
   if (!this.state.recording) {
     alert('Can\'t stop, not recording!');
     return;
   }

   this.setState({stoppedRecording: true, recording: false, paused: false});

   try {
     const filePath = await AudioRecorder.stopRecording();

     if (Platform.OS === 'android') {
       this._finishRecording(true, filePath);
     }
     return filePath;
   } catch (error) {
     console.error(error);
   }
 }

 async _play() {
   if (this.state.recording) {
     await this._stop();
   }

   // These timeouts are a hacky workaround for some issues with react-native-sound.
   // See https://github.com/zmxv/react-native-sound/issues/89.
   setTimeout(() => {
     var sound = new Sound(this.state.audioPath,  Sound.MAIN_BUNDLE, (error) => {
       if (error) {
         alert('failed to load the sound', error);
       }
     });

     setTimeout(() => {
       sound.play((success) => {
         if (success) {
           alert('successfully finished playing');
         } else {
           alert('playback failed due to audio decoding errors');
         }
       });
     }, 100);
   }, 100);
 }

   postVoice = async (fb) => {
  const formData = new FormData()
  formData.append("file", {
    uri: Platform.OS == 'android' ? 'file://' + fb:fb,
    name: 'test.aac',
    type: 'audio/aac'
  })
    // alert(JSON.stringify(formData))
   this.props.SetLoading(true)
  try {
     const response = await axios.post("http://68.183.39.113/api/user/uploadFile", formData);
     console.log(response);
     if (this.props.Language == 'AR') {
       alert('تم تحميل الملف');
     }
     else {
       alert('File uploaded');
     }
     this.props.SetLoading(false);
     this.socket.emit('startChat', this.state.chatID,response.data.toString(), 3);
     const obj = {
       msg: response.data.toString(),
       from: 2,
       type: 3,
       imgPath: this.props.User.imgPath
     };
     this.state.chatMsgs.push(obj);
     this.flatList.scrollToEnd({animated: true})
   }
   catch (error) {
     alert(error);
     this.props.SetLoading(false);
   }
  }


     renderItem(item){
        return(
            <View style={{ flex:1, width:'100%',alignItems:'center',justifyContent:'center'}}>
              {item.from == 1?
             <View style={{width:'95%',flexDirection:'row', alignItems:'center',margin:3}}>
              {item.imgPath?
              <Image style={{width:50, height: 50 ,borderRadius:50/2}}
              source={{uri: item.imgPath}}></Image>
             :
             <Image style={{width:50, height: 50 ,borderRadius:50/2}}
             source={require('./../../../../img/user.png')}></Image>
             }

          <View style={{width:'80%',height: '100%',paddingHorizontal:5,alignItems:'center',justifyContent:'center'}}>
           {item.type==1?
            this.renderMessage(item.msg)
           :
            item.type==2? 
            <Image  style={{width:100, height: 70 ,}}source={{uri: item.msg}}></Image>

            :this.renderVoice(item.msg ,item.id)
           }
         {/* <Text style={{width:'100%',paddingHorizontal:20,textAlign:'left',fontSize:13,color:'#707070',fontFamily:'adobe'}}> منذ ساعة</Text> */}
       </View>
         </View>
         :    
          <View style={{ width:'100%',}}>
           <View style={{width:'95%', flexDirection:'row-reverse', alignItems:'center', margin:3}}>
           {item.imgPath?
              <Image style={{width:60, height: 60 ,borderRadius:60/2}}
              source={{uri: item.imgPath}}></Image>
             :
             <Image style={{width:60, height: 60 ,borderRadius:60/2}}
             source={require('./../../../../img/user.png')}></Image>
             }
            <View style={{width:'80%',height: '100%',paddingHorizontal:5,alignItems:'center',justifyContent:'center'}}> 
            {item.type==1?
            this.renderMessage(item.msg)
           :
            item.type==2? 
            <Image  style={{width:100, height: 70 ,}}source={{uri: item.msg}}></Image>

            :this.renderVoice(item.msg,item.id)
           }
         {/* <Text style={{width:'100%',paddingHorizontal:20,textAlign:'right',fontSize:13,color:'#707070',fontFamily:'adobe'}}> منذ ساعة</Text> */}
       </View>
     </View>
      </View>
      }
       </View>        
         );
         }

    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
            <Spinner
               visible={this.props.Processing}
               textContent={'Loading...'}
               textStyle={{ color: '#FFF' }}
            />
            {this.renderHeader(this.props.Language)}
            
            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} > */}
            <View style={{width:width,height:'100%',alignItems:'center',}}>
                <View style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,styles.view,styles.shadow,{padding:3}]}>
                  {/* <View style={{width:'15%',alignItems:'center',marginTop:5}}>
                    <Icon  name="star" size={18} color="#FFE000"/>
                    <Text style={{color: '#707070', fontSize: 12,fontFamily:'adobe',textAlign:'center',fontWeight:'bold' }}>
                     {this.props.Language == "AR" ? '5.3' : '5.3'}
                    </Text>
                   </View> */}

                   <View style={{flex:1,justifyContent:'center'}}>
                     <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{color:'#707070', fontSize: 22,fontFamily:'adobe'}]}>
                     {this.state.user.fullname}
                    </Text>
                    <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{color:'#707070', fontSize: 20,fontFamily:'adobe'}]}>
                    {this.props.Language == "AR" ? this.state.type ==1?'متابع المريض ':'المريض' : this.state.type ==1?'Patient':'Patient follower'}
                   </Text>
                  </View>

                  <View style={{width:'27%',paddingHorizontal:10,alignItems:'center',justifyContent:'center'}}>
                    {this.state.user.imgPath?
                     <Image source={{uri: this.state.user.imgPath}}
                     style={{  width: 70,height:70,alignItems: 'center',borderRadius:70/2}}/>
                    :
                    <Image source={require('./../../../../img/user.png')}
                    style={{  width: 70,height:70,alignItems: 'center',borderRadius:70/2}}/>
                    }
                   
                    </View>
                </View>
                <View style={{width:width,height:height*0.6,alignItems:'center',marginTop:5, backgroundColor:'#F6F6F6'}}>
                <FlatList style={{ width: '95%',marginBottom:5 }}
                data={this.state.chatMsgs}
                numColumns={1}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                ref={ref => this.flatList = ref}
                onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                onLayout={() => this.flatList.scrollToEnd({animated: true})}
              />
              </View>
              {/* {this.state.flag_loading ===0?
              <View style={{display:'none'}}></View>
              :
              <View style={{width:'90%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:height*0.2}}>
                   <Text style={{color:'#4FC0BC', fontSize: 12,fontFamily:'adobe',textAlign:'center'}}>
                     {this.props.Language == "AR" ? 'جارى التحميل' : 'Loading'}
                   </Text>
               <Progress.Bar 
               progress={this.state.progress}
               indeterminate={this.state.indeterminate}
               width={width*0.8} color={'#47D9D3'}  unfilledColor={'#EBEFF2'} borderWidth={0}/> 
              </View>
              } */}
             
              {this.state.flag_input===1?
                  <View style={[{width:'90%',alignItems:'center', borderRadius:3,borderColor:'#DCDCDC',backgroundColor:'#fff',borderWidth:1,position:'absolute',bottom:'8%'}]}>
                  <View style={[this.props.Language == "AR"?styles.rowReversed:styles.row,{width:'95%'}]}>
                   <Item style={[styles.inputFields]}>
                      <Input
                       placeholder={this.props.Language == "AR" ? 'أكتب هنا ' : 'write here'} 
                       placeholderTextColor='#BDBDBD'
                       defaultValue={this.state.message}
                       style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color:'#000',fontSize:18,fontFamily:'adobe',textAlignVertical:'top',height:60,}]}
                        onChangeText={(text) => this.setState({ message: text })} />
                   </Item>
                <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center',marginTop:3}}
                    onPress={this.onSend.bind(this)}>
               {/* <Icon name="send" size={23} color="#79E5E1" style={{}}/> */}
               <Image source={require('./../../../../img/send.png')} style={{ width:20,height:20 }} />
              </TouchableOpacity>
              </View>
 
              <View style={[this.props.Language == "AR"?styles.start:styles.end,{width:'95%',marginTop:5}]}>
               <TouchableOpacity style={{width:'10%',alignItems:'center',justifyContent:'center'}}
                 onPress={this.uploadFile}
               >
               <Icon name="paperclip" size={20} color="#BABABA" style={{margin:3}}/>
              </TouchableOpacity>
              <TouchableOpacity style={{width:'10%',alignItems:'center',justifyContent:'center'}}
                 onPress={()=>this.setState({isVisible:true})}>
               <Icon name="microphone" size={20} color="#BABABA" style={{margin:3}}/>
              </TouchableOpacity>
              </View>
             </View>
              :
              <View style={{width:'90%' , alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#707070', fontSize: 20,fontFamily:'adobe',marginTop:7}}>
              {this.props.Language == "AR" ? 'تم أنهاء المحادثة' : 'Chat end'}
                </Text>
                    <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,{marginTop:10}]}>
                       {this.state.user.key==1?
                        <TouchableOpacity 
                        onPress={() => { this.props.navigation.navigate('ConsultingResult')}}
                         style={{width:width*0.7,alignItems:'center',justifyContent:'center',padding:7}} >
                            <Text style={{ color: '#FFF', fontSize: 20, fontFamily:'adobe' }}>
                                {this.props.Language == "AR" ? 'نتيجة الأستشارة' : 'Consulting result'}
                            </Text>
                        </TouchableOpacity>
                       :
                       <TouchableOpacity 
                         onPress={() => { this.props.navigation.navigate('SessionResult')}}
                        style={{width:width*0.7,alignItems:'center',justifyContent:'center',padding:7}} >
                           <Text style={{ color: '#FFF', fontSize: 20, fontFamily:'adobe' }}>
                               {this.props.Language == "AR" ? 'نتيجة الجلسة' : 'Session result'}
                           </Text>
                       </TouchableOpacity>
                       }
                       
                        </LinearGradient>
 
             </View>
              }
            

            {this.state.flag_loading ===0?
              <View style={{display:'none'}}></View>
              :
              <View style={{width:'90%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:height*0.35}}>
                   <Text style={{color:'#4FC0BC', fontSize: 12,fontFamily:'adobe',textAlign:'center'}}>
                     {this.props.Language == "AR" ? 'جارى التحميل' : 'Loading'}
                   </Text>
               <Progress.Bar 
               progress={this.state.progress}
               indeterminate={this.state.indeterminate}
               width={width*0.8} color={'#47D9D3'}  unfilledColor={'#EBEFF2'} borderWidth={0}/> 
              </View>
              }
               </View>

               <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={styles.modal}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            {this._renderButton("Record", () => {this._record()}, this.state.recording )}
            {this._renderButton("Play", () => {this._play(this.state.audioPath)})}
            {this._renderButton("Stop", () => {this._stop()})}
            {/* {this._renderButton("PAUSE", () => {this._pause()})} */}
            {this._renderPauseButton(() => {this.state.paused ? this._resume() : this._pause()})}
            <View style={{width:'70%',alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:10}}>
            <Text style={styles.progressText}>{this.state.currentTime}s</Text>
            <TouchableOpacity 
             onPress={() => { 
                this.setState({isVisible:false})
                this.postVoice(this.state.audioPath)
               }} 
             style={[styles.Button,{width:70}]} >
               <Text style={{ color: '#000', fontSize: 16,fontFamily:'adobe', }}>
               {this.props.Language == "AR" ? 'أرسال' : 'Send'}
                </Text>
                </TouchableOpacity>
            </View>
           
          </View>
           
         </View>
         
          </Modal>
            {/* </ScrollView> */}
            
            </View>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
       Processing: state.AuthReducer.Processing,
       Message: state.AuthReducer.Message,
       User: state.AuthReducer.User,
       ConsultingByID: state.AuthReducer.ConsultingByID
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading , getConsultingById})(SpecialistChat)
 const styles = StyleSheet.create({
    flex: {
       flex: 0
    },
    row: {
       flexDirection: 'row'
    },
    rowReversed: {
       flexDirection: 'row-reverse'
    },
    column: {
       flexDirection: 'column'
    },
    shadow: {
       shadowColor: '#000',
       shadowOffset: {
          width: 0,
          height: 6,
       },
       shadowOpacity: 0.2,
       shadowRadius: 10,
       elevation: 5,
    },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left',

    },
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor:'#fff',
    },
    button: {
      width:'90%',
      backgroundColor: '#28B5AF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
   
    },
    inputFields: {
        width:'90%',
        borderBottomColor: '#FFF',
        backgroundColor: '#FFF'
        
     },
    image: {
        width: 120,
        height: 120
    },
    view:{
        width:width,
        height:height/7,
        backgroundColor:'#FAFAFA',
        borderRadius:5
    },
    modal:{
      width:'100%',
      alignItems:'center',
      backgroundColor:'#fff',
      borderRadius:8,
    },
    start:{
        flexDirection:'row',
        alignItems:'flex-start'
    },
    end:{
        flexDirection:'row-reverse',
        alignItems:'flex-end'
    },
    text:{
      width:'100%',paddingHorizontal:10,
      fontSize:16,color:'#707070',
      fontFamily:'adobe',backgroundColor:'#FFFFFF',
      borderRadius:20,borderColor:'#E0E0E0',
      borderWidth:1,textAlignVertical:'center',
      padding:2
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    progressText: {
      fontSize: 30,
      color: "#000",
      paddingHorizontal:10
    },
    button: {
      padding: 5
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 18, fontFamily:'adobe',
      color: "#000"
    },
    activeButtonText: {
      fontSize: 20,
      color: "#B81F00"
    }
 });