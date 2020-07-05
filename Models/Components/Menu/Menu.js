import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,ScrollView,
   AsyncStorage,Alert,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import NavigationServices from './../../NavigationServices';

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
          Processing: false,
          userData:{},
          userId:null,
          userName:'',
          userImg:'',
          loginType:'',
          seen:null,
          checkLogin:true
        };
      }
        
    UNSAFE_componentWillMount= async()=>{
       this.props.SetLoading(true)
      const logOut = await AsyncStorage.getItem('LogOut')
      if(logOut){
         if(logOut=='LogOut'){
            this.setState({checkLogin: true})
            this.props.SetLoading(false)
        }else{
           this.setState({checkLogin: false})
           this.props.SetLoading(false)
        }
      }
       if(this.props.User){
         this.props.SetLoading(false)
         if(this.props.User.loginType==1){
            this.getUserSeen()
         }else{
            this.getSpecialistSeen()
         }
       }else{
         this.props.SetLoading(false)
       }
     
    }  

     getUserSeen(){
         try {
             axios.get('http://68.183.39.113/api/user/notifyByUserSeen',{
               params: {
                  userID: this.props.User._id
               }
           })
             .then((response)=> {
                if(response.data){
                   this.setState({seen:response.data.data})
                }
             }).catch(function (error) {
                alert(error)
             }).finally(function () {
                 // always executed
             });
         } catch (error) {
             alert(error)
         }
     }
     getSpecialistSeen(){
      try {
          axios.get('http://68.183.39.113/api/user/notifyBySpecialistSeen',{
            params: {
               specialistID: this.props.User._id
            }
        })
          .then((response)=> {
             if(response.data){
                this.setState({seen:response.data.data})
             }
          }).catch(function (error) {
             alert(error)
          }).finally(function () {
              // always executed
          });
      } catch (error) {
          alert(error)
      }
  }
      signOut =() =>{
         Alert.alert(
           this.props.Language == "AR"?'أرادة':'Erada' ,
           this.props.Language == "AR"?'هل أنت متأكد من تسجيل الخروج':'Are you sure want to logout',
           [
             {text: this.props.Language == "AR"?'ألغاء':'Cancel' ,
             onPress: () => this.dismiss, style: 'cancel'},
             {text:this.props.Language == "AR"?'نـعم':'Yes' ,  onPress: async() => {
               try{
               await AsyncStorage.removeItem('User');
               AsyncStorage.setItem('LogOut','LogOut')
               await AsyncStorage.removeItem('Lang');
               this.props.navigation.navigate('ChooseLanguage')
               }catch(e){}
              }
            },
           ],
           { cancelable: true }
         )
          return true;
          }

      renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity 
                 onPress={() =>this.props.navigation.navigate('Home')} >
                    <Icon name="chevron-left" style={{ color: '#fff', fontSize: 18,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>القائمة</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                <View></View>
                <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Menu</Text>
                 <TouchableOpacity 
                 onPress={() =>this.props.navigation.navigate('Home')} >
                    <Icon name="chevron-right" style={{ color: '#fff', fontSize: 18,padding:7 }} />
                 </TouchableOpacity>
                
                 
              </View>
           )
        }
     }
    render(){
        return(
            <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#28B5AF" barStyle="light-content"/>
            <Spinner
            color='#28B5AF'
              visible={this.props.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#28B5AF'}}
            />
            {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style ={{width:width,alignItems:'center',justifyContent:'center'}} >
             
              <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,styles.shadow,{width:width,height:height/5,backgroundColor:'#FFFFFF'}]}>
                 <View style={[this.props.Language == "AR" ? styles.start : styles.end,{width:'40%',paddingHorizontal:'5%'}]}>
                 <TouchableOpacity onPress={() => {
                    if(!this.state.checkLogin){
                     this.props.navigation.navigate('Notification')
                    }else{
                       if(this.props.Language=='AR'){
                          alert('يجب تسجيل الدخول أولا')
                       }else{
                          alert('You must login first')
                       }
                    }
                   
                    }} >
                 <Icon name="bell" style={{ color: '#28B5AF', fontSize: 27 ,margin:15}} />
                 </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => {
                     if(!this.state.checkLogin){
                      this.props.navigation.navigate('Notification')
                     }else{
                        if(this.props.Language=='AR'){
                           alert('يجب تسجيل الدخول أولا')
                        }else{
                           alert('You must login first')
                        }
                     }
                    
                     }}
                  style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,styles.shadow,{width:23,height:23,borderRadius:23/2,backgroundColor:'#FFE000',
                  alignItems:'center',justifyContent:'center',position:'absolute',top:'3%'}]}>
                   <Text style={{color:'#283168',fontSize:12,}}>{this.state.seen}</Text>
                  </TouchableOpacity>
                
                 </View>
                 <Text style={{ textAlign:'center',textAlignVertical:'center',color: '#707070', fontSize: 22,fontFamily:'adobe',margin:7 }}>
                 {this.props.User ? this.props.User.fullname : this.props.Language=='AR'?'أسم المستخدم':'User name'}
                 </Text>
                 <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
                   <Image source={this.props.User ? this.props.User.imgPath ? { uri: this.props.User.imgPath } :  require('./../../../img/user.png') : require('./../../../img/user.png')} style={{ width:90,height:90,borderRadius:90/2 }} />
                </View>
              </View>
              {!this.state.checkLogin?
               <View>
             <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'حسابى' : 'My profile'}</Text>
           <Image source={require('./../../../img/profile.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyAdvice')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'محادثاتى' : 'My chat'}</Text>
           <Image source={require('./../../../img/chat.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyBalance')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'رصيدى' : 'My balance'}</Text>
           <Image source={require('./../../../img/balance.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            {this.props.User.loginType == 1?
            <View style={{display:'none'}}></View>
            :
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyTimes')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'أوقاتى' : 'My time'}</Text>
           <Image source={require('./../../../img/times.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            }
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyReservation')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'حجوزاتى' : 'My reservation'}</Text>
           <Image source={require('./../../../img/reserv.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            {this.props.User.loginType == 1?
             <TouchableOpacity
             onPress={() => this.props.navigation.navigate('JoinOrder')}>
             <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
             <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
                {this.props.Language == "AR" ? 'طلب أنضمام كمتعاون' : 'Request to join as a collaborator'}</Text>
            <Image source={require('./../../../img/join.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
             </View>
             </TouchableOpacity>
            :
            <View style={{display:'none'}}></View>
            }
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChangePass')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'تغير كلمة المرور' : 'Change password'}</Text>
           <Image source={require('./../../../img/pass.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ContactUs')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'تواصل معنا' : 'Contact us'}</Text>
           <Image source={require('./../../../img/contact.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
               </View>
               :
            <View style={{display:'none'}}></View>
            }
          
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ChangeLang')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'اللغه' : 'Language'}</Text>
           <Image source={require('./../../../img/lang.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
           
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AboutApp')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'عن التطبيق' : 'About app'}</Text>
           <Image source={require('./../../../img/about.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Terms')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'الشروط والأحكام' : 'Terms and condition'}</Text>
           <Image source={require('./../../../img/terms.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            {!this.state.checkLogin?
             <TouchableOpacity
             onPress={this.signOut.bind(this)}>
             <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
             <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
                {this.props.Language == "AR" ? 'تسجيل الخروج' : 'LogOut'}</Text>
            <Image source={require('./../../../img/logout.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
             </View>
             </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <View style={[this.props.Language == "AR"? styles.row:styles.row_reserve,styles.view,{marginTop:7}]}>
            <Text style={[this.props.Language == "AR" ? styles.right : styles.left,styles.text,{fontSize:22}]}>
               {this.props.Language == "AR" ? 'تسجيل الدخول' : 'LogIn'}</Text>
           <Image source={require('./../../../img/logout.png')} style={{width:25,height:25,margin:'5%'}} resizeMode="contain" />
            </View>
            </TouchableOpacity>
            }
           
            </View>
        </ScrollView>
          </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    return {
       Language: state.LanguageReducer.Language,
       User: state.AuthReducer.User,
       Processing: state.AuthReducer.Processing,
      }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading})(Menu)
 const styles = StyleSheet.create({
    flex: {
       flex: 0,
  },
    row: {
       flexDirection: 'row',
    },
    row_reserve: {
      flexDirection: 'row-reverse',
   },
    column: {
       flexDirection: 'column',
    },
    right:{
      textAlign:'right',
    },
    left:{
      textAlign:'left',
    },
    start:{
       alignItems:'flex-start'
    },
    end:{
       alignItems:'flex-end'
    },
    view:{
      width:width ,
      padding:3,
      height:height*0.06,
      alignItems:'center',
      justifyContent:'center',
    },
    view2:{
      width:width*0.95 ,
      height:45,
      alignItems:'center',
      justifyContent:'center',
    },
    text:{
      flex:1,
      color:'#707070',
      margin:7,
      textAlignVertical:'center',
      fontFamily:'adobe',
    },
    shadow: {
       shadowColor: '#000',
       shadowOffset: {
          width: 0,
          height: 6,
       },
       shadowOpacity: 0.05,
       shadowRadius: 10,
       elevation: 5,
    },
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor: '#FFF',
    },
    posRight:{
       right:'22%'
    },
    posLeft:{
       left:'22%'
    }
 });