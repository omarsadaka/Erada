import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class ContactUs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            message:''
        };
     }
   
     _onSendPressed=()=>{
        const {message} = this.state
      if (message.length>1 && message !=' '){
        NetInfo.fetch().then(state => {
          if (state.isConnected){
            this.props.SetLoading(true)
            try {
              axios.post('http://68.183.39.113/api/user/contactU',{
                  userID :this.props.User._id,
                  msg :this.state.message,
              }).then(response => {
                this.props.SetLoading(false)
                if (response.data._id){
                  this.setState({message:''});
                  if (this.props.Language === 'AR'){
                    alert('تم أرسال الرساله , شكرا لك');
                  } else {
                    alert('Message send , thank you');
                  }
                } else {
                  if (this.props.Language === 'AR'){
                    alert('حدث خطأ ما حاول مرة أخرى');
                  } else {
                    alert('Opps , try again');
                  }
                }
              }).catch(function (error) {
                this.props.SetLoading(false)
                 console.log(error);
              }).finally(function () {
                 // always executed
              });
           } catch (error) {
            this.props.SetLoading(false)
              console.log(error);
           }
          } else {
            if (this.props.Language === 'AR'){
              alert('لا يوجد أتصال بالانترنت');
            } else {
              alert('No internet connection');
            }
          }
        });
      } else {
        if (this.props.Language === 'AR'){
          alert('ادخل نص الرساله');
        } else {
          alert('Enter message first');
        }
      }
    } 
     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>تواصل معنا</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Contact us</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }
    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
            <Spinner
            color='#28B5AF'
               visible={this.props.Processing}
               textContent={'Loading...'}
               textStyle={{ color: '#28B5AF' }}
            />
            {this.renderHeader(this.props.Language)}
           
            <View style={[{flex: 1,paddingHorizontal: 24,alignItems:'center' }]}>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                 <Image source={require('./../../../img/logo.png')} style={[styles.image, { marginTop: 40 }]} />
               </View>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 18,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "أكتب رسالتك" : "Write your message"}
                 </Text>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'أكتب هنا' : 'write here'} 
                      placeholderTextColor='#BDBDBD'
                      multiline
                      defaultValue={this.state.message}
                      style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color: '#764c22',fontSize:14,height:height*0.2,textAlignVertical:'top' }]}
                       onChangeText={(text) => this.setState({ message: text })} />
                  </Item>
               </View>
               

               <View style={[styles.row, { justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { this._onSendPressed() }}
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "أرسـل" : "Send"}
                     </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>
            </View>
            </View>
        )
    }
}
//redux
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
       Processing: state.AuthReducer.Processing,
       User: state.AuthReducer.User,
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading})(ContactUs)
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
    },
    inputFields: {
       borderBottomColor: '#FFF',
       borderRadius: 5,
       backgroundColor: '#FFF',
       paddingHorizontal: 10,
       textAlign: 'center',
    },
    button: {
       width:'100%',
       backgroundColor: '#28B5AF',
       justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal: 60,
       paddingVertical: 8,
       borderRadius: 60,
    },
    image: {
        width: 120,
        height: 120
    },
 });