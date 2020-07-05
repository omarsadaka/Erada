import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, AsyncStorage, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker } from 'native-base'
import { Overlay } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios'
// import NetInfo from '@react-native-community/netinfo';


import { connect } from 'react-redux' // redux
import { UpdateUser, SetLoading , ChangePwd} from './../../Actions' //redux

class ChangePass extends Component{
    constructor(props) {
        super(props);
        this.state = {
         password:'',
         newPwd:'',
         confirmPwd:'',
         processing:false
        };
     }


     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>تغـير كلمة المرور</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Change password</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 , padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

      ChangePassword = () => {
      const { password , newPwd , confirmPwd } = this.state
        if(password){
          if(password === this.props.User.password){
             if(newPwd){
                if(confirmPwd){
                   if(newPwd===confirmPwd){
                   this.props.ChangePwd(this.props.User._id,newPwd)
                   }else{
                      alert('Your password not match')
                   }
                }else{
                   alert('Enter new password again')
                }

             }else{
                alert('Enter new password')
             }

          }else{
             alert('Your current password incorrect')
          }
        }else{
          alert('Enter current password')
        }
       
  }
    render(){
        return(
            <View style={styles.container} >
            <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
            <Spinner
            color='#28B5AF'
               visible={this.state.processing}
               textContent={'Loading...'}
               textStyle={{ color: '#28B5AF' }}
            />
            {this.renderHeader(this.props.Language)}
            <View style={[styles.column, { flex: 1,justifyContent: 'center', paddingHorizontal: 24,alignItems:'center' }]}>
               
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { marginHorizontal: 0 }]}>
                     <Input
                     placeholder={this.props.Language == "AR" ? 'كلمه المرور السابقه' : 'Old Password'} 
                     placeholderTextColor='#70707070'
                     secureTextEntry={true} 
                     style={{ color: '#764c22',fontSize:14 }}
                     textAlign={'center'} 
                     onChangeText={(text) => this.setState({ password: text })} />
                  </Item>
               </View>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { marginTop: 20, marginHorizontal: 0 }]}>
                     <Input 
                     placeholder={this.props.Language == "AR" ? 'كلمه المرور الجديده' : 'New Password'} 
                     placeholderTextColor='#70707070'
                     secureTextEntry={true} style={{ color: '#764c22',fontSize:14 }} 
                     textAlign={'center'} 
                     onChangeText={(text) => this.setState({ newPwd: text })} />
                  </Item>
               </View>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { marginTop: 20, marginHorizontal: 0 }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'تاكيد كلمه المرور الجديده' : 'Confirm password'}
                      placeholderTextColor='#70707070'
                       secureTextEntry={true} 
                       style={{ color: '#764c22',fontSize:14 }}
                        textAlign={'center'} 
                        onChangeText={(text) => this.setState({ confirmPwd: text })} />
                  </Item>
               </View>
               <View style={[styles.row, { justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => this.ChangePassword()} 
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "حفظ التغيرات" : "Save changes"}
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
       Message: state.AuthReducer.Message,
       User: state.AuthReducer.User,
    }
 }
 // redux
 export default connect(mapStateToProps, { UpdateUser, SetLoading , ChangePwd })(ChangePass)
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
       elevation: 8,
    },
    container: {
       flex: 1,
       justifyContent: 'flex-start',
       alignItems: 'center',
       backgroundColor: '#F5F5F5',
    },
    inputFields: {
       borderBottomColor: '#FFF',
       borderRadius: 5,
       backgroundColor: '#FFF',
       marginHorizontal: 18,
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
    }
 });