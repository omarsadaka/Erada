import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Slider, Image, ScrollView, FlatList,
   AsyncStorage ,Platform,PermissionsAndroid,TouchableHighlight} from 'react-native';
import { Input, Item, Right } from 'native-base'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import io from "socket.io-client";
import DocumentPicker from 'react-native-document-picker';
import NetInfo from '@react-native-community/netinfo';
import StarRating from 'react-native-star-rating';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';





import { connect } from 'react-redux' // redux
import { SetLoading  , ReteChat} from './../../Actions' //redux


class ChatHistory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg_type:1,
            chatMsgs:[],
            flag:1,
            chatID:'',
            isVisible: false,
            flag_input:1,
            starCount:0,
            fullname:'',
            imgPath:'',
            voiceID:''

            
        };
     }
     componentDidMount() {
        this.props.SetLoading(false)
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        const fullname = navigation.getParam('fullname')
        const imgPath = navigation.getParam('imgPath')
        this.setState({fullname , imgPath})
        if(this.props.User.loginType==1){
            this.getChatHistory( this.props.User._id , id)
        }else{
            this.getChatHistory( id , this.props.User._id)
        }
     
      }

      componentWillReceiveProps= async(nextProps)=> {
        if (nextProps.Message != null) {
           if(nextProps.Message=='Rate Done'){
             if(this.props.Language=='AR'){
               alert('تم تقييم المحادثة')
             }else{
               alert('Conversation rated')
             }
           }else{
             alert(nextProps.Message)
              // alert(' Error try again')
           }
           
        }
    }

     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity 
                 style={{width:'7%',}}
                 onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 }} />
                 </TouchableOpacity>
                 <Text style={{flex:1, color: '#fff', fontSize: 22,fontFamily:'adobe',textAlign:'center' }}>{this.state.fullname}</Text>
                 <View style={[styles.flex, styles.row,{alignItems:'center',justifyContent:'space-evenly'}]}>
                
                 </View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View style={[styles.flex, styles.row,{alignItems:'center',justifyContent:'space-evenly'}]}>
                 </View>
                 <Text style={{flex:1, color: '#fff', textAlign:'center',fontSize: 22,fontFamily:'adobe' }}>{this.state.fullname}</Text>
                 <TouchableOpacity 
                  style={{width:'7%'}}
                 onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }
      
      renderMessage(msg){
       return(
       <Text style={[styles.text,this.props.Language=='AR'?styles.right:styles.left,{}]}>{msg}</Text>
       )

      }
      renderImage(msg){
         <Image  style={{width:70, height: 70 ,}}source={{uri: msg}}></Image>
      }
      renderVoice(voice , id){
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
        
         
        <Slider
        step = { 1 }
        minimumValue = { 0 }
        maximumValue = { this.state.value }
        value={this.state.value}
        minimumTrackTintColor = "#009688"
        onValueChange={(value) => this.setState({ value})}
        style = {{ flex:1 }} />
         </View>
        )
    }

     renderItem(item){
        return(
              <View style={{ flex:1, width:'100%',}}>
              {item.from == 1?
            <View style={{width:'80%',flexDirection:'row', alignItems:'center',margin:3}}>
            <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                {item.imgPath?
                   <Image  source={{uri: item.imgPath}} style={{ width:50,height:50 ,borderRadius:50/2}} />
                  :
                  <Image  source={require('./../../../img/user.png')} style={{ width:50,height:50 ,borderRadius:50/2}} />
                  }
          </View>
        <View style={{width:'90%',height: '100%',paddingHorizontal:5,alignItems:'center',justifyContent:'center'}}>
           {item.type==1?
            this.renderMessage(item.msg)
           :
            item.type==2?
            //  this.renderImage(item.msg)
            <Image  style={{width:100, height: 70 ,}}source={{uri: item.msg}}></Image>

             :this.renderVoice(item.msg, item.id)
           }
         {/* <Text style={[styles.text,this.props.Language=='AR'?styles.right:styles.left,{}]}>{item.msg}</Text> */}
         <Text style={{width:'100%',paddingHorizontal:20,textAlign:'left',fontSize:13,color:'#707070',fontFamily:'adobe'}}> منذ ساعة</Text>
       </View>
         </View>
         :    
          <View style={{flexDirection:'row-reverse', width:'100%',}}>
           <View style={{width:'80%', flexDirection:'row-reverse', alignItems:'center', margin:3}}>
           <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
            <Image resizeMode="cover" 
            style={{width:50, height: 50, borderRadius:50/2}}
            source={{uri: item.imgPath}}
            ></Image>
            </View>
            <View style={{width:'90%',height: '100%',paddingHorizontal:5,alignItems:'center',justifyContent:'center'}}>
            {item.type==1?
            this.renderMessage(item.msg)
           :
            item.type==2? 
            // this.renderImage(item.msg)
            <Image  style={{width:100, height: 70 ,}}source={{uri: item.msg}}></Image>

            :this.renderVoice(item.msg)
           }
         {/* <Text style={[styles.text,this.props.Language=='AR'?styles.right:styles.left,{}]}>{item.msg}</Text> */}
         <Text style={{width:'100%',paddingHorizontal:20,textAlign:'right',fontSize:13,color:'#707070',fontFamily:'adobe'}}> منذ ساعة</Text>
       </View>
     </View>
      </View>
      }
       </View>        
         );
         }
         

       getChatHistory =(userID , speicalistID )=>{

         this.props.SetLoading(true)
         NetInfo.fetch().then(state =>{
             if (state.isConnected){
             try {
                axios.get('http://68.183.39.113/api/user/getChatHistory',{
                 params: {
                     userID: userID,
                     speicalistID: speicalistID
                 }
                })
                .then((response)=> {
                  this.props.SetLoading(false)
                 const Data = response.data;
                 const arr = []
                 if(Data.length > 0){
                    const chatID = Data[0].chatID._id
                    const rate = Data[0].chatID.rate
                    this.setState({starCount:rate})
                    this.setState({chatID})
                    for (let index = 0; index < Data.length; index++) {
                       const key = Data[index].from
                       const image=''
                       const fullname=''
                       if(key==1){
                           image=Data[0].chatID.userID.imgPath
                           fullname = Data[0].chatID.userID.fullname
                       }else{
                        image=Data[0].chatID.speicalistID.imgPath
                        fullname = Data[0].chatID.speicalistID.fullname
                       }
                     var obj = {
                        id: Data[index]._id,
                        msg: Data[index].msg,
                        from: Data[index].from,
                        type: Data[index].type,
                        imgPath: image,
                        fullname: fullname,
                        Rate : Data[0].chatID.rate
                     }
                  
                     arr.push(obj)
                 }
                 this.setState({chatMsgs: arr})
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
      
      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
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
                  <View style={{width:'15%',alignItems:'center',marginTop:5}}>
                    <Icon  name="star" size={18} color="#FFE000"/>
                    <Text style={{color: '#707070', fontSize: 12,fontFamily:'adobe',textAlign:'center',fontWeight:'bold' }}>
                     {this.props.Language == "AR" ? '5.3' : '5.3'}
                    </Text>
                   </View>

                   <View style={{flex:1,justifyContent:'center'}}>
                     <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{color:'#707070', fontSize: 18,fontFamily:'adobe'}]}>
                    {this.state.fullname}
                    </Text>
                    {/* <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{color:'#707070', fontSize: 18,fontFamily:'adobe'}]}>
                     {this.state.chatMsgs[0].description}
                   </Text> */}
                  </View>

                  <View style={{width:'27%',alignItems:'center',justifyContent:'center',paddingHorizontal:10}}>
                    <Image
                     source={{uri: this.state.imgPath}}
                     style={{  width: 70,height:70,borderRadius:70/2,alignItems: 'center',}}/>
                    </View>
                </View>
                <View style={{width:width,height:height*0.5,alignItems:'center',marginTop:5}}>
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
        
             <View style={{width:'100%' , alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
               <Text style={{color:'#707070', fontSize: 20,fontFamily:'adobe'}}>
                  {this.props.Language == "AR" ? 'تم أنهاء المحادثة' : 'Chat end'}
               </Text>
             <View style={{width:'90%' , alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:5}}>
                <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,{margin:7}]}>
                       <TouchableOpacity 
                       onPress={() => {
                          // this.props.navigation.navigate('ConsultingResult')
                          if(this.state.starCount){
                            this.props.ReteChat(this.state.chatID , this.state.starCount)
                          }else{
                            alert('Enter ratting number')
                          }
                        }}
                        style={{width:70,alignItems:'center',justifyContent:'center',padding:0}} >
                           <Text style={{ color: '#FFF', fontSize: 20, fontFamily:'adobe' }}>
                               {this.props.Language == "AR" ? 'تم' : 'Done'}
                           </Text>
                       </TouchableOpacity>
                       </LinearGradient>
                 <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>      
                  <Text style={{width:'80%',color:'#707070',textAlign:'center' ,fontSize: 20,fontFamily:'adobe',marginTop:7}}>
                   {this.props.Language == "AR" ? 'تقييم المحادثة' : ' Conversation Rate'}
                 </Text>
                 <StarRating
                 disabled={false}
                 maxStars={5}
                 starSize={22}
                 rating={this.state.starCount}
                 fullStarColor={'#FFE109'}
                 halfStarColor={'#FFE109'}
                 halfStarEnabled={false}
                 starStyle={{margin:2,color:'#FFE109'}}
                 selectedStar={(rating) => this.onStarRatingPress(rating)}
               />
               </View>
            </View>
            </View>
             
   
               </View>
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
       chatID: state.AuthReducer.chatID,
       ChatHistory:state.AuthReducer.ChatHistory
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading , ReteChat})(ChatHistory)
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
       backgroundColor:'#F6F6F6',
    },
    Button: {
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
      justifyContent:'center'
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