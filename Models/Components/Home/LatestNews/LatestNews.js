import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'

import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { connect } from 'react-redux' // redux
import {  SetLoading  } from './../../../Actions' //redux


class LatestNews extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: true,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cover',
        };
     }
     componentWillMount() {
      this.getData()   
     }

     getData(){
      this.props.SetLoading(true)
     NetInfo.fetch().then(state =>{
       if (state.isConnected){
         try {
           axios.get('http://68.183.39.113/api/user/reventNews',{
           }).then(response => {
           this.props.SetLoading(false)
             const data = response.data;
            this.setState({ data });
           }).catch(function (error) {
              console.log(error);
           }).finally(function () {
              // always executed
           });
        } catch (error) {
        this.props.SetLoading(false)
           console.log(error);
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
   }

     onSeek = seek => {
      //Handler for change in seekbar
      this.videoPlayer.seek(seek);
    };
   
    onPaused = playerState => {
      //Handler for Video Pause
      this.setState({
        paused: !this.state.paused,
        playerState,
      });
    };
   
    onReplay = () => {
      //Handler for Replay
      this.setState({ playerState: PLAYER_STATES.PLAYING });
      this.videoPlayer.seek(0);
    };
   
    onProgress = data => {
      const { isLoading, playerState } = this.state;
      // Video Player will continue progress even if the video already ended
      if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        this.setState({ currentTime: data.currentTime });
      }
    };
    
    onLoad = data => this.setState({ duration: data.duration, isLoading: false });
    
    onLoadStart = data => this.setState({ isLoading: true });
    
    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    
    onError = () => alert('Oh! ', error);
    
    exitFullScreen = () => {
      alert('Exit full screen');
    };
    
    enterFullScreen = () => {};
    
    onFullScreen = () => {
      if (this.state.screenType == 'content')
        this.setState({ screenType: 'cover' });
      else this.setState({ screenType: 'content' });
    };
   
    
    onSeeking = currentTime => this.setState({ currentTime });
 

    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>أحدث الأخبار</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Latest news</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderItem(item){
        return (
        <View style={{ width: width * 0.8, padding: 2, flexDirection: 'row', }}>
          <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('LatestNewsDetail',{ID:item._id})
           }}
          style={[styles.viewItem,styles.shadow,{margin:5}]}>
              <View style={[{width: '100%',alignItems:'center',}]}>
                <Text style={{color: '#5E5E5E', fontSize: 22,fontFamily:'adobe',margin:3 }}>
                  {this.props.Language == "AR" ? item.titleAr : item.titleEN }
                 </Text>
                 {item.type===1?
                  <Image
                  resizeMode = 'stretch'
                  source={{uri:item.imgPath}}
                  style={{  width: '90%',height:150,alignItems: 'center',}}/>
                 :
                 <View style={[{width:'90%',height:150, justifyContent: 'center', alignItems: 'center',marginTop:10 }]}>
                 <Video source={{uri: item.videoLink}}   // Can be a URL or a local file.
                  ref={videoPlayer => (this.videoPlayer = videoPlayer)}   
                   onEnd={this.onEnd}
                   onLoad={this.onLoad}
                   onLoadStart={this.onLoadStart}
                   onProgress={this.onProgress}
                   paused={this.state.paused}  
                   resizeMode={this.state.screenType}
                   onFullScreen={this.state.isFullScreen}  
                  volume={20}                              
                  style={styles.backgroundVideo} />
  
               <MediaControls
                duration={this.state.duration}
                isLoading={this.state.isLoading}
                mainColor="#333"
                onFullScreen={this.onFullScreen}
                onPaused={this.onPaused}
                onReplay={this.onReplay}
                onSeek={this.onSeek}
                onSeeking={this.onSeeking}
                playerState={this.state.playerState}
                progress={this.state.currentTime}
               />
                 </View>
                 }
                 <Text style={{height:55,color: '#5E5E5E', fontSize: 20,fontFamily:'adobe',margin:3,textAlign:'center',paddingBottom:5 }}>
                     {this.props.Language == "AR" ? item.descriptionAr :item.descriptionEN }
                 </Text>
                 
              </View>
          </TouchableOpacity>
          </View>
        );
      }
    render(){
        return(
            <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#28B5AF" barStyle="light-content"
             />
            <Spinner
            color='#28B5AF'
              visible={this.props.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#28B5AF'}}
            />
            {this.renderHeader(this.props.Language)}
            <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
            <FlatList style={{marginTop:5,marginBottom:'12%'}}
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        />
            </View>
          </SafeAreaView>
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
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading})(LatestNews)
 const styles = StyleSheet.create({
   container: {
     width: width,
     height:height,
     alignItems: 'center',
   },
   shadow: {
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 6,
     },
     shadowOpacity: 0.2,
     shadowRadius: 10,
     elevation: 4,
   },
   row: {
     flexDirection: 'row',
   },
   row_reserve: {
     flexDirection: 'row-reverse',
   },
   viewItem:{
     flex:1,
     backgroundColor:'#fff',
     borderRadius:10,
     justifyContent:'center',
     alignItems:'center'
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   }
   
 });
