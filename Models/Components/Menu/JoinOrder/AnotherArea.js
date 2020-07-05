import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, AsyncStorage,Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import { Overlay } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import DocumentPicker from 'react-native-document-picker';
import NetInfo from '@react-native-community/netinfo';
import { StackActions, NavigationActions } from 'react-navigation'

import { connect } from 'react-redux' // redux
import { SetLoading , UserRegister} from './../../../Actions' //redux


class AnotherArea extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            imagePicked:'',
            filePath:'',
            fileName:'',
            input:'',
            field:'',
            chechBack:0,
            special:{}
        };
     }

     componentWillMount= async()=>{
      const { navigation } = this.props;
      const id = navigation.getParam('chechBack', 'NO-ID');
      if(id){
        this.setState({chechBack:id})
      }
      const data = await AsyncStorage.getItem('Special');
      if (data) {
        const special = JSON.parse(data);
        this.setState({ special })
      } else {
       alert('no data')
      }
     }

     componentWillReceiveProps(nextProps) {
      if (nextProps.Message != null) {
          alert(nextProps.Message)
          if(nextProps.Message=='Register Done'){
            AsyncStorage.removeItem('Special')
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ],
            }))
          }
      }
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
      }).catch(error => {
         reject(error)
         alert(error)
         this.props.SetLoading(false)
      });
   });
 

    onCreate=()=>{
       const{ input , filePath , field} = this.state
       if(field){
        if(input){
          if(filePath){
            this.props.SetLoading(true)
            NetInfo.fetch().then(state =>{
               if (state.isConnected){
            try {
               axios.put('http://68.183.39.113/api/user/user/'+this.props.User._id, {
                   userID :this.props.User._id,
                   type: 4, 
                   loginType: 2,
                   experiences: input, 
                   cv: filePath, 
                   fieldOfCooperation: field
                  }).then((response)=> {
                  this.props.SetLoading(false)
                   if(response.data){
                     
                     if(this.props.Language == 'AR'){
                        alert('تم أنشاء الحساب')
                      }else{
                        alert('Account created ')
                      }
                      this.setState({input:'' , fileName:'' , field:''})
                      const usr = {
                        _id: response.data._id,
                        email: response.data.email,
                        fullname: response.data.fullname,
                        mobile: response.data.mobile,
                        imgPath: response.data.imgPath,
                        birthday: response.data.birthday,
                        zoneID: response.data.zoneID._id,
                        cityID: response.data.cityID._id,
                        gender: response.data.gender,
                        loginType: response.data.loginType,
                        type: response.data.type,
                        experiences: response.data.experiences,
                        cv: response.data.cv,
                        fieldOfCooperation: response.data.fieldOfCooperation

                    }
                    //console.log(usr)
                    AsyncStorage.setItem('User', JSON.stringify(usr))
                   }
               }).catch((error)=>{
                  this.props.SetLoading(false)
                 alert(error)
               }).finally(function () {
                   // always executed
               });
           } catch (error) {
            this.props.SetLoading(false)
            alert('Error happen')
         }
      }else {
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
               alert('أختر السيرة الذاتية');
             } else {
               alert('Upload your cv')
             }
            
          }
       }else{
         if (this.props.Language === 'AR'){
            alert('أدخل نبذة عن الخبرات السابقة');
          } else {
            alert('Enter your experience')
          }
          
       }
      }else{
         if (this.props.Language === 'AR'){
            alert('أدخل مجال التعاون');
          } else {
            alert('Enter your field of cooperation')
          }
         
      }
     
    }
   
    Register() {
       const username = this.state.special.name
       const mobile = this.state.special.mobile
       const email = this.state.special.email
       const password = this.state.special.password
       const type = this.state.special.type

      const{ input , filePath , field} = this.state
            if(field ){
                  if( input  ){
                      if( filePath){
                        this.props.UserRegister(username, mobile, email, password , 2 , type , input , filePath,field)
                  }else{
                      alert("Upload your cv")
                  }
                  
                  }else{
                      alert("Enter your experience")
                  }
              }else{
                  alert("Enter your field of cooperation")
              }
  } 

     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => {
                    if(this.state.chechBack === 1){
                     this.props.navigation.navigate('Register')
                    }else{
                     this.props.navigation.goBack()
                    }
                    }} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>متعاون فى مجال أخر</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Cooperative in another field</Text>
                 <TouchableOpacity onPress={() => {
                     if(this.state.chechBack === 1){
                        this.props.navigation.navigate('Register')
                       }else{
                        this.props.navigation.goBack()
                       }
                 }} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
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
            <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "مجال التخصص" : "Specialization"}
                 </Text>
                 <View style={[styles.row, {justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#BDBDBD'
                           placeholder={this.props.Language == "AR" ? 'مجال التعاون' : 'Field of cooperation'}
                           defaultValue={this.state.field}
                           style={[this.props.Language == "AR" ? styles.right :styles.left ,{color: '#000' ,fontSize:18 ,fontFamily:'adobe'}]}
                           onChangeText={(text) => this.setState({ field: text })}
                        />
                     </Item>
                  </View>

                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                    marginTop:10,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "نبذة عامة عن الخبرات" : "An overview of experiences"}
                 </Text>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'أكتب هنا' : 'write here'} 
                      placeholderTextColor='#BDBDBD'
                      defaultValue={this.state.input} 
                      style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color: '#764c22',fontSize:14,height:120,textAlignVertical:'top' }]}
                       onChangeText={(text) => this.setState({ input: text })} />
                  </Item>
               </View>
               <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                    marginTop:10,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "تحميل السيرة الذاتية" : "Upload CV"}
                 </Text>

                <View style={[this.props.Language == "AR"?styles.row:styles.rowReversed,styles.shadow,{width:'100%',height:45,alignItems:'center',borderRadius:5,backgroundColor:'#fff',}]}>
                <TouchableOpacity onPress={this.uploadFile}
                 style={{width: 30,height:30,margin:5,}}>
                 <Icon name="folder-open" style={{ color: '#8F8F8F', fontSize: 30 }} />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={this.uploadFile}
                 style={{flex:1}}>
                  <Text style={[this.props.Language == "AR"?styles.right:styles.left,{width:'100%',color:'#BDBDBD',fontSize:17,fontFamily:'adobe',paddingHorizontal: 15}]}>
                  {this.props.Language == "AR"?this.state.fileName?this.state.fileName:'أختر ملـف' :this.state.fileName?this.state.fileName:'Upload file'}
                  </Text>
                 </TouchableOpacity>
                </View>
              
              
               <View style={[styles.row, { justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { 
                     if(this.state.chechBack === 1){
                         this.Register()
                     }else{
                        this.onCreate()
                     }
                      
                  }}
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "أنشاء حسـاب" : "Create account"}
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
 export default connect(mapStateToProps,{ SetLoading , UserRegister})(AnotherArea)
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