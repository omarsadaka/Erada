import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, AsyncStorage,Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
const { width, height } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import DocumentPicker from 'react-native-document-picker';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'
import { StackActions, NavigationActions } from 'react-navigation'

import { connect } from 'react-redux' // redux
import { SetLoading , UserRegister} from './../../../Actions' //redux


class Psychologist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            imagePicked:'',
            filePath:'',
            fileName:'',
            input:'',
            education:'',
            university:'',
            medicalLicence:'',
            specialize:'',
            chechBack:0,
            year:'',
            color:'#707070',
           years: [
               {
                   label: '2011',
                   value: '1',
               },
               {
                   label: '2012',
                   value: '2',
               },
               {
                  label: '2013',
                  value: '3',
              },
              {
               label: '2014',
               value: '4',
             },
             {
              label: '2015',
              value: '5',
            },
           ], 
           special:{}
        };
     }

     componentWillMount=async()=>{
      this.props.SetLoading(false)
      const { navigation } = this.props;
      const id = navigation.getParam('chechBack', 'NO-ID');
      if(id){
        this.setState({chechBack:id})
      }
      const data = await AsyncStorage.getItem('Special');
      if (data) {
        const special = JSON.parse(data);
        this.setState({ special })
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
      }).catch(error => {
         reject(error)
         alert(error)
         this.props.SetLoading(false)
      });
   });
   
   validate=()=>{
      const errors ={};
    const {education , university , year , specialize , medicalLicence ,input , filePath} = this.state
      if(!education){
        if(this.props.Language==='AR' ){
          alert('يرجي إدخال المؤهل الدراسى' );
        }
        else {
          alert('Enter your education' );
        }
        this.props.SetLoading(false)
        errors.education ="Enter your education "; 
      }
      else if(!university){
        if(this.props.Language==='AR' ){
          alert('يرجى أدخال أسم الجامعة');
        }
        else {
          alert('Enter your university ');
        }
        this.props.SetLoading(false)
        errors.university ="Enter your university ";
       }
     
      else if(!year){
        if(this.props.Language==='AR' ){
          alert('يرجي ادخال سنة التخرج');
        }
        else {
          alert('Enter your graduation year');
        }
        this.props.SetLoading(false)
        errors.year ="Enter your graduation year";
      } 
      else if(!specialize){
        if(this.props.Language==='AR' ){
          alert(' يرجي ادخال التخصص');
        }
        else {
          alert('Enter your specialization');
        }
        this.props.SetLoading(false)
        errors.specialize ="Enter your specialization";
      } 
        else if(!medicalLicence){
          if(this.props.Language==='AR' ){
            alert('يرجي ادخال رقم الرخصة الطبية');
          }
          else {

            alert(' Plase Enter your medical licence number ');
          }
          this.props.SetLoading(false)
          errors.medicalLicence ="Enter your medical licence number";
        }
        else if(!input){
          if(this.props.Language==='AR' ){
            alert('يرجي ادخال نبذة عن الخبرات ');
          }
          else {

            alert(' Plase Enter  your experience ');
          }
          this.props.SetLoading(false)
          errors.input ="Enter  your experience";
        }
        else if(!filePath){
         if(this.props.Language==='AR' ){
           alert('يرجي أختيار ملف السيرة الذاتية  ');
         }
         else {

           alert(' Plase upload your cv ');
         }
         this.props.SetLoading(false)
         errors.filePath ="Plase upload your cv";
       }
      return errors;
      }

    onCreate=()=>{
            this.props.SetLoading(true)
            NetInfo.fetch().then(state =>{
               if (state.isConnected){
             const errors = this.validate();
            this.setState({errors});
          if (Object.keys(errors).length === 0){
            try {
               axios.put('http://68.183.39.113/api/user/user/'+this.props.User._id, {
                   userID : this.props.User._id,
                   type: 2, 
                   loginType: 2,
                   educationalQualification: this.state.education,
                   universityName: this.state.university,
                   graduationYear: this.state.year,
                   specialization: this.state.specialize,
                   medicalLicenseNumber: this.state.medicalLicence,
                   experiences: this.state.input, 
                   cv: this.state.filePath, 
                  }).then((response)=> {
                  this.props.SetLoading(false)
                   if(response.data){
                     
                      if(this.props.Language == 'AR'){
                        alert('تم أنشاء الحساب')
                      }else{
                        alert('Account created ')
                      }
                      this.setState({input:'' , fileName:'' , education:'' , university:'',medicalLicence:'',specialize:''})
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
                        educationalQualification: response.data.educationalQualification,
                        universityName: response.data.universityName,
                        graduationYear: response.data.graduationYear,
                        specialization: response.data.specialization,
                        medicalLicenseNumber: response.data.medicalLicenseNumber,
                        experiences: response.data.experiences,
                        cv: response.data.cv,
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
    }

    Register() {
      const username = this.state.special.name
      const mobile = this.state.special.mobile
      const email = this.state.special.email
      const password = this.state.special.password
      const type = this.state.special.type

      const{  education , university , year, specialize , medicalLicence , input , filePath  } = this.state
      const errors = this.validate();
      this.setState({errors});
     if (Object.keys(errors).length === 0){  
       this.props.UserRegister(username, mobile, email, password , 2 , type , input , filePath , education , university,
         year , specialize ,medicalLicence)
      }else {
         this.props.SetLoading(false)
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
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>أخصائى نفسى</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Psychologist</Text>
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style={[{flex: 1,alignItems:'center',justifyContent:'center'}]}>
                <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 16,marginTop:10 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "المؤهل الدراسى" : "Educational "}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 2, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'المؤهل الدراسى' : 'Educational Qualification'}
                           defaultValue={this.state.education}
                           style={{ color: '#000' ,fontSize:18 ,fontFamily:'adobe'}}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ education: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 16 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "أسم الجامعة" : "University name"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 2, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'أسم الجامعة' : 'University name'}
                           defaultValue={this.state.university}
                           style={{ color: '#000' ,fontSize:18 ,fontFamily:'adobe'}}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ university: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 16 }]}>
                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "سنة التخرج" : "Graduation year"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 2, justifyContent: 'center', alignItems: 'center' }]}>
                     <View style={[styles.row, styles.inputFields, styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 0, backgroundColor: 'white', paddingVertical: 10, height: 50 }]}>
                        <AntDesign name="caretdown" size={10} style={{ color: '#707070' }} />
                        <ModalDropdown
                      options={this.state.years} // data
                      defaultValue={this.props.Language == "AR" ? "أختر السنة" : "Choose year"}
                     onSelect={(index, value) => { 
                      this.setState({ year: value.label , color:'#000' }) 
                     }}
                     renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                     style={{ width:'90%',}} // abl ma t5tar
                     textStyle={{fontSize: 18, color:this.state.color,fontFamily:'adobe',textAlign:'center' }}
                     dropdownStyle={[styles.shadow,{ width: '70%', height:100,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                     renderRow={function (rowData, rowID, highlighted) {
                     return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#BDBDBD', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                     </View>
                  </View>

               </View>
               {/***************************************************************************************/}
               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 16 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "التخـصص" : "Specialization"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 2, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'أكتب التخصص' : 'Write specialization'}
                           defaultValue={this.state.specialize}
                           style={{ color: '#000',fontSize:18 ,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ specialize: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 16 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "رقم الرخصـة" : "Licence number"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 2, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'رقم الرخصة الطبية' : 'Licence number'}
                           defaultValue={this.state.medicalLicence}
                           style={{ color: '#000' ,fontSize:18 ,fontFamily:'adobe'}}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ medicalLicence: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}



                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 15, }]}>
                   {this.props.Language == "AR" ? "نبذة عامة عن الخبرات" : "An overview of experiences"}
                 </Text>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',paddingHorizontal: 15 }]}>
                  <Item style={[styles.inputFields, styles.shadow, { }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'أكتب هنا' : 'write here'} 
                      placeholderTextColor='#BDBDBD'
                      defaultValue={this.state.input}
                      style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color: '#764c22',fontSize:14,height:100,textAlignVertical:'top' }]}
                       onChangeText={(text) => this.setState({ input: text })} />
                  </Item>
               </View>
               <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 15, }]}>
                   {this.props.Language == "AR" ? "تحميل السيرة الذاتية" : "Upload CV"}
                 </Text>

                <View style={[this.props.Language == "AR"?styles.row:styles.rowReversed,styles.shadow,{width:'92%',height:45,alignItems:'center',borderRadius:5,backgroundColor:'#fff',}]}>
                <TouchableOpacity onPress={this.uploadFile}
                 style={{width: 30,height:30,margin:5,}}>
                 <Icon name="folder-open" style={{ color: '#8F8F8F', fontSize: 30 }} />
                 </TouchableOpacity>
                 <TouchableOpacity onPress={this.uploadFile}
                 style={{flex:1}}>
                  <Text style={[this.props.Language == "AR"?styles.right:styles.left,{color:'#BDBDBD',fontSize:17,fontFamily:'adobe',paddingHorizontal: 15}]}>
                  {this.props.Language == "AR"?this.state.fileName?this.state.fileName:'أختر ملـف' :this.state.fileName?this.state.fileName:'Upload file'}
                  </Text>
                 </TouchableOpacity>
                </View>
              
              
               <View style={[styles.row, { justifyContent: 'center',marginTop:height*0.1 }]}>
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
            </ScrollView>
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
 export default connect(mapStateToProps,{ SetLoading , UserRegister})(Psychologist)
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
       textAlign: 'center',
    },
    button: {
       width:'92%',
       backgroundColor: '#28B5AF',
       justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal: 60,
       paddingVertical: 8,
       borderRadius: 60,
    }
 });