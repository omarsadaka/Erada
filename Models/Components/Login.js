import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,
     ScrollView ,AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import firebase from 'react-native-firebase';


import { connect } from 'react-redux' // redux
import {SetLoading, UserLogin , UserGetPwd} from './../Actions' //redux

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            forgetEmail:null,
            isVisible:false,
            fcmToken:'',
            userKey:''
        };
    }

    componentDidMount() {
        this.checkPermission();
        this.props.SetLoading(false)
        // YellowBox.ignoreWarnings(['Remote debugger']);
    //     this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
    //     BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked)
    //   );
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
        if (nextProps.Message=='Login Done') {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeRoutes' })
                ],
            }))
        }else{
            alert(nextProps.Message)
        }
    }
    }
    async checkPermission() {
        firebase.messaging().hasPermission()
       .then(enabled => {
         if (enabled) {
        //  alert('Yes')
         this.getToken();
         } else {
          this.requestPermission();
       } 
      });
      }
        //3
      async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken', 0);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken){
                // user has a device token
                await AsyncStorage.setItem('fcmToken',fcmToken);
                this.setState({userKey:fcmToken})
               // alert(fcmToken)
            }
        }else{
          this.setState({userKey:fcmToken})
          console.log('key'+this.state.userKey);
        }
        // this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        //   console.log(notif)
        //   alert('noti' + notif)
        // });
       
        firebase.notifications().onNotification(notification => {
       
          const localNotification = new firebase.notifications.Notification({
             show_in_foreground: true,
             local_notification: true,
             soundName: 'sound.mp3',
             popInitialNotification: true,
            requestPermissions: true,
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setSound('default')
            .setBody(notification.body)
            .setData(notification.data)
            .android.setChannelId("channelId") // e.g. the id you chose above
             .android.setSmallIcon('./../../img/logo.png') // create this icon in Android Studio
            // .android.setColor("#000000") // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);
        
          firebase.notifications().displayNotification(localNotification);
         
        });
      
       
      }
      async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            alert('permission rejected');
        }
      }
    Login() {
       
        const { username, password , userKey } = this.state
        if(username && password ){
            this.props.UserLogin(username, password , userKey)
        }else{
            if(this.props.Language=='AR'){
                alert('أكمل البيانات المطلوبة')
            }else{
                alert('Complete your data')
            }
            
        }
    }

        getPwd=()=> {
               
                const { forgetEmail } = this.state
                if(forgetEmail){
                    this.props.UserGetPwd(forgetEmail)
                }else{
                    alert('Enter your email')
                }
            
        
    }

    goHome() {
        AsyncStorage.removeItem('User')
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeRoutes' })
            ],
        }))
    }

    goRegister() {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
                <Spinner
                    color="#28B5AF"
                    visible={this.props.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#28B5AF' }}
                />
                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image source={require('./../../img/logo.png')} style={[styles.image, { marginTop: 40 }]} />
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',marginTop:height*0.1 }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'البريد الألكتروني أو رقم الجوال' : 'Email or Username'}
                                    style={{ color: '#000',fontFamily:'adobe',fontSize:20 }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ username: text })}
                                />
                            </Item>
                        </View>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'كلمه المرور' : 'Password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontFamily:'adobe',fontSize:20 }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.1 }]}>
                        <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,]}>
                          <TouchableOpacity onPress={() => { this.Login() }} style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                                <Text style={{ color: '#FFF', fontSize: 16,fontFamily:'adobe',fontWeight:'bold' }}>
                                    {this.props.Language == "AR" ? 'تسجيل الدخول' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <TouchableOpacity
                            onPress={()=>{this.setState({isVisible:true})}}>
                            <Text style={{ fontSize: 18, color: '#343434',fontFamily:'adobe' }} >
                                {this.props.Language == "AR" ? 'فقدت كلمه المرور؟' : 'Forgot Password'}
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                            <TouchableOpacity onPress={() => this.goRegister()} style={[styles.Button, styles.shadow, { backgroundColor: '#E4E4E4', borderColor: '#28B5AF', borderWidth: 3, marginTop: height*0.1, borderRadius: 60 }]} >
                                <Text style={{ color: '#323232', fontSize: 16, fontFamily:'adobe',fontWeight:'bold' }}>
                                    {this.props.Language == "AR" ? 'انشاء حساب' : 'Create an Account'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 5 }]} >
                            <Text onPress={() => this.goHome()} style={{ fontSize: 20, color: '#323232',fontFamily:'adobe' }} >
                                {this.props.Language == "AR" ? 'تخطى التسجيل' : 'Skip Login'}
                            </Text>
                        </View>

            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={styles.modal}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.row_res,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={12} color="#000" style={{margin:7}} />
               </TouchableOpacity>
            </View>
            <Text style={{ width: '100%',textAlign:'center',alignItems:'center',color:'#000', fontSize:20,fontFamily:'adobe',}}>
            {this.props.Language == "AR" ? 'فقدت كلمة المرور؟' : 'Forget Password'}
            </Text>
            <Text style={{ width: '50%',textAlign:'center',alignItems:'center',color:'#343434', fontSize:16,fontFamily:'adobe',marginTop:10}}>
            {this.props.Language == "AR" ? 'الرجاء أدخال البريد الألكترونى لانشاء كلمة مرور جديدة' : 'Please Enter Your Email To Creat New Password'}
            </Text>
            <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                 <Item style={[styles.inputFields,{ marginTop: 12 }]}>
                    <Input
                    placeholderTextColor='#919191'
                    placeholder={this.props.Language == "AR" ? 'البريد الألكترونى' : 'Email'}
                    style={{ color: '#000',fontFamily:'adobe',fontSize:17,borderColor:'#E4E4E4',borderRadius:5,borderWidth:1 }} textAlign={'center'}
                    onChangeText={(text) => this.setState({ forgetEmail: text })} />
                 </Item>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }]}>
            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,]}>
                <TouchableOpacity 
                onPress={() => { this.getPwd() }} 
                style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'} ]} >
                <Text style={{ color: '#FFF', fontSize: 12,fontFamily:'adobe',fontWeight:'bold' }}>
                {this.props.Language == "AR" ? 'أنشاء كلمة مرور جديدة' : 'Create New Password'}
                </Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
           
         </View>
         
          </Modal>

                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
        );
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
export default connect(mapStateToProps, { SetLoading,UserLogin , UserGetPwd })(Login)

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    row: {
        flexDirection: 'row'
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
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
    },
    inputFields: {
        borderBottomColor: '#FFF',
        width: width - (36 * 2),
        borderRadius: 5,
        backgroundColor: '#FFF',
        textAlign: 'center',
    },
    Button: {
        width: width - (36 * 2) + 10,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 18,
        marginHorizontal: 36
    },
    image: {
        width: 130,
        height: 130
    },
    modal:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:5,
      },
      linearGradient: {
        width:'100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 60,
        paddingVertical: 10,
      },
});