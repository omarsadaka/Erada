import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    ScrollView,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';

import { connect } from 'react-redux' // redux
import {  SetLoading , LatestNews } from './../../../Actions' //redux


class LatestNewsDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cover',
        };
     }
     componentWillMount() {
      const { navigation } = this.props;
      const Id = navigation.getParam('ID', 'NO-ID');
      this.props.LatestNews(Id) 
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
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }} >
            <View style={{width:width,height:height,alignItems:'center',}}>
            {this.props.News.type===1?
            <Image
            resizeMode = 'stretch'
            source={{uri: this.props.News.imgPath}}
            style={{  width: '90%',height:'30%',alignItems: 'center',marginTop:10}}/>
            :
            <View style={[{width:'90%',height:150, justifyContent: 'center', alignItems: 'center',marginTop:10 }]}>
            <Video source={{uri: this.props.News.videoLink}}   // Can be a URL or a local file.
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
            
             <Text style={{color: '#5E5E5E', fontSize: 22,fontFamily:'adobe',margin:3 }}>
                     {this.props.Language == "AR" ? this.props.News.titleAr: this.props.News.titleEN }
             </Text>
             <View style={[styles.shadow,styles.view,{ marginTop:5,marginBottom:5}]}>
             <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{color: '#707070', fontSize: 18,fontFamily:'adobe',}]}>
                     {this.props.Language == "AR" ? this.props.News.descriptionAr:this.props.News.descriptionEN }
             </Text>
               </View>   
            </View>
            </ScrollView>
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
       News: state.AuthReducer.News
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading , LatestNews})(LatestNewsDetail)
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
   view:{
    width:width*0.95, 
    padding:10,
    backgroundColor:'#fff',
    borderRadius:7,
},
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   }
   
 });
