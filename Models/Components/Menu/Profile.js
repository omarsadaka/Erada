import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item } from 'native-base'
import { Overlay } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios'

import { connect } from 'react-redux' // redux
import { UpdateUser, SetLoading , getZone , getCity , getTitles } from './../../Actions' //redux

class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
         fullname: this.props.User.fullname,
          mobile: this.props.User.mobile,
          date: this.props.User.birthday,
         email: this.props.User.email,
         imgPath :  this.props.User.imgPath ? { uri: this.props.User.imgPath } : require('./../../../img/user.png'),
        loginType:this.props.User.loginType,
        zoneID:this.props.User.zoneID?this.props.User.zoneID:'' ,
        cityID:this.props.User.cityID?this.props.User.cityID:'',
        zoneColor:'#707070',
        cityColor:'#707070',
        gender:this.props.User.gender?this.props.User.gender:1,
        bankName:this.props.User.bankName?this.props.User.bankName:'',
        bankAccount:this.props.User.bankAccount?this.props.User.bankAccount:''
        };
     }

     componentWillMount() {
      this.props.getZone()
      this.props.getTitles(this.props.User._id)
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.Message != null) {
         //  alert(nextProps.Message)
      }
  }
      getCity(zoneId){
         if(zoneId != null){
            this.props.getCity(zoneId)
         }else{
            alert('Enter Zone first')
         }
      }
      pickImageFromPhone() {
         const options = {
            title: 'Select Avatar',
            storageOptions: {
               skipBackup: true,
               path: 'images',
            },
         };
         ImagePicker.showImagePicker(options, (response) => {
            this.props.SetLoading(true)
            console.log('Response = ', response);
   
            if (response.didCancel) {
               this.props.SetLoading(false)
               console.log('User cancelled image picker');
            } else if (response.error) {
               this.props.SetLoading(false)
               console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
               this.props.SetLoading(false)
               console.log('User tapped custom button: ', response.customButton);
            } else {
               const source = { uri: response.uri, fileName: response.fileName }
               this.editUserPhoto(source)
               // this.setState({  imgPath: source });
               // this.props.SetLoading(false)
            }
         });
      }
      editUserPhoto = (imagePicked) => new Promise((resolve, reject) => {
         const data = new FormData();
         data.append('personalImg', { uri: imagePicked.uri, name: imagePicked.fileName, type: 'image/jpeg' });
         return axios.post(
            "http://68.183.39.113/api/user/uploadFile", data
         ).then(response => {
            resolve(response)
            console.log(response)
            //alert(response.data)
            this.setState({
               imgPath: { uri: response.data.toString() },
            });
            this.props.SetLoading(false)
         }).catch(error => {
            reject(error)
            this.props.SetLoading(false)
         });
      });

      updateUser() {
         const { fullname , email , mobile } = this.state
         const usr = {
            _id:this.props.User._id,
            email: this.state.email,
            fullname: this.state.fullname,
            mobile: this.state.mobile,
            imgPath: this.state.imgPath.uri ? this.state.imgPath.uri : null,
            birthday: this.state.date ? this.state.date: null,
            zoneID:this.state.zoneID ? this.state.zoneID: null,
            cityID: this.state.cityID ? this.state.cityID: null,
            gender:this.state.gender,
            loginType: this.state.loginType,
            bankName: this.state.bankName ? this.state.bankName: null,
            bankAccount: this.state.bankAccount ? this.state.bankAccount: null
         }
         if(fullname && email && mobile){
            this.props.UpdateUser(usr)
         }else{
            alert('Complete your data')
         }
         
      }

     renderHeader(lang) {
        if (lang == "EN") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <View></View>
                 <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>My Profile</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#F6F6F6', fontSize: 22 ,fontFamily:'adobe'}}>حسابى</Text>
                 <View></View>
              </View>
           )
        }
     }

     renderRadio(clicked){
        return(
         <TouchableOpacity
         style={{ width:27 ,height:27 , borderRadius:27/2,backgroundColor:'#fff',elevation:5,justifyContent:'center',alignItems:'center',margin:5}}
         onPress={()=>{
           this.setState({gender:clicked})
         }}>
           {this.state.gender === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width: 23, height: 23,borderRadius:23/2,}}>
           {/* <View
           style={{  width: 23, height: 23, alignItems: 'center',backgroundColor:'#28B5AF',borderRadius:23/2,}}/> */}
           </LinearGradient>
           
           :
           <View style={{display:'none'}}></View>
           }
         </TouchableOpacity>
        )
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

            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,styles.shadow,{width:width,height:height/5,backgroundColor:'#FFFFFF'}]}>
                 <View style={{width:'30%'}}>
                 {/* <Icon name="bell" style={{ color: '#28B5AF', fontSize: 18 ,margin:12}} /> */}
                 </View>
                 <TouchableOpacity
                 onPress={() => this.pickImageFromPhone()}
                 style={[{ justifyContent: 'center', alignItems: 'center' }]}>
                   <Image source={this.state.imgPath} style={{ width:90,height:90 ,borderRadius:90/2}} />
                </TouchableOpacity>
                <Text style={{ textAlign:'center',textAlignVertical:'center',color: '#707070', fontSize: 22,fontFamily:'adobe',margin:7 }}>
                {this.props.User ? this.props.User.fullname : "اسم المستخدم"}
                 </Text>
              </View>
              

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10,marginTop:10,}]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "الاسم بالكامل" : "Full name"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'الأسم بالكامل' : 'Full name'}
                           defaultValue={this.state.fullname}
                           style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ fullname: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "رقم الجوال" : "Mobile number"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'رقم الجوال' : 'Mobile number'}
                           defaultValue={this.state.mobile}
                           style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ mobile: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "البريد الالكترونى" : "Email"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                           placeholderTextColor='#919191'
                           placeholder={this.props.Language == "AR" ? 'البريد الالكترونى' : 'Email'}
                           defaultValue={this.state.email}
                           style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ email: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "تاريخ الميلاد" : "Birthday"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[styles.row, styles.inputFields, styles.shadow, { flex: 1, marginLeft: 0, height: 50, alignItems: 'center' }]}>
                        <EvilIcons name="calendar" style={{ fontSize: 35,color: '#E3E3E3' }} />
                        <DatePicker
                         style={{
                            width:'100%'}}
                            date={this.state.date}
                           placeholder={!this.state.date ? this.props.Language == "AR" ? " التاريخ" : " Date" : null}
                           locale={"en"}
                           textStyle={{ color: "#000", }}
                           placeholderTextColor='#919191'
                           mode="date"
                           format="YYYY-MM-DD"
                        //    minDate={new Date()}
                           confirmBtnText="Confirm"
                           cancelBtnText="Cancel"
                           customStyles={{
                             dateIcon: {
                               display:'none',
                             },
                           dateInput: {
                             borderWidth: 0,borderColor: '#707070',fontSize:20,marginRight:'25%'
                           }
                           }}
                           onDateChange={(date) => {this.setState({date})}}
                        />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }]}>
                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "المنطقة" : "Zone"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                     <View style={[styles.row, styles.inputFields, styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 0, backgroundColor: 'white', paddingVertical: 10, height: 50 }]}>
                        <AntDesign name="caretdown" size={10} style={{ color: '#707070' }} />
                   <ModalDropdown
                   options={this.props.Zones} // data
                   defaultValue={this.props.Language == "AR"?this.props.Titles.zoneAr ?this.props.Titles.zoneAr:'أختر المنطقة':
                   this.props.Titles.zoneEN ?this.props.Titles.zoneEN:'Choose zone'}
                   onSelect={(index, value) => { 
                     this.setState({ zoneID: value.id , zoneColor:'#000'}) 
                     this.getCity(value.id)
                    }}
                   renderButtonText={(rowData) =>this.props.Language == "AR" ? (rowData.titleAr):(rowData.titleEN)} // ba3d ma t5tar
                   style={{ width:'90%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.maEnd:styles.maStart,{fontSize: 20, color: this.state.zoneColor,fontFamily:'adobe',textAlign:'center',}]}
                  dropdownStyle={[styles.shadow,{ width: '50%', height:150,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted){
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 20, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {this.props.Language == "AR" ? rowData.titleAr:rowData.titleEN}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }]}>
                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
                     <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
                        {this.props.Language == "AR" ? "المدينة" : "City"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]}>
                     <View style={[styles.row, styles.inputFields, styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 0, backgroundColor: 'white', paddingVertical: 10, height: 50 }]}>
                        <AntDesign name="caretdown" size={10} style={{ color: '#707070' }} />
                  <ModalDropdown
                   options={this.props.Cities} // data
                   defaultValue={this.props.Language == "AR"?this.props.Titles.cityAr ?this.props.Titles.cityAr:'أختر المدينة':
                   this.props.Titles.cityEN ?this.props.Titles.cityEN:'Choose city'}
                   onSelect={(index, value) => { 
                     this.setState({ cityID: value.id , cityColor:'#000'}) 
                    }}
                   renderButtonText={(rowData) => this.props.Language == "AR" ? (rowData.titleAr):(rowData.titleEN)}// ba3d ma t5tar
                   style={{ width:'90%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.maEnd:styles.maStart,{fontSize: 20, color: this.state.cityColor,fontFamily:'adobe',textAlign:'center',}]}
                  dropdownStyle={[styles.shadow,{ width: '50%', height:150,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 20, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                     {this.props.Language == "AR" ? rowData.titleAr:rowData.titleEN}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}
             
              {this.state.loginType === 1?
               <View style={{display:'none'}}></View>
              :
              <View style={{alignItems:'center',justifyContent:'center'}}>
             <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10,}]}>
             <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
             <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
             {this.props.Language == "AR" ? "أسم البنك" : "Bank name"}
            </Text>
            </View>

           <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]} >
               <Item style={[styles.inputFields, styles.shadow]}>
              <Input
               placeholderTextColor='#919191'
               placeholder={this.props.Language == "AR" ? 'أسم البنك' : 'Bank name'}
               defaultValue={this.state.bankName}
               style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
               textAlign={'center'}
             onChangeText={(text) => this.setState({ bankName: text })}
            />
         </Item>
      </View>
      </View>

             <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 }]}>
            <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', flex: 1 }]}>
           <Text style={[{ color: '#919191', fontSize: 18,fontFamily:'adobe' }]}>
            {this.props.Language == "AR" ? "رقم الحساب البنكى" : "Bank account number"}
          </Text>
          </View>

           <View style={[styles.row, { flex: 3, justifyContent: 'center', alignItems: 'center' }]} >
            <Item style={[styles.inputFields, styles.shadow]}>
           <Input
            placeholderTextColor='#919191'
            placeholder={this.props.Language == "AR" ? 'رقم الحساب البنكى' : 'Bank account number'}
            defaultValue={this.state.bankAccount}
            style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
            textAlign={'center'}
            onChangeText={(text) => this.setState({ bankAccount: text })}
            />
         </Item>
         </View>
         </View>
             </View>
              }

               <View style={{alignItems:'center',justifyContent:'center'}}>
               <View style ={[this.props.Language == "AR" ? styles.row : styles.rowReversed,styles.radioForm,{}]}>
                     <Text style={{fontSize:22,fontFamily:'adobe',color:'#39393B',margin:10,}}>{this.props.Language == "AR"?'أنثـى':'Female'}</Text>
                    {this.renderRadio(2)}
                    <View style ={{width:'20%'}}></View>
                    <Text style={{fontSize:22,fontFamily:'adobe',color:'#39393B',margin:10,}}>{this.props.Language == "AR"?'ذكـر':'Male'}</Text>
                    {this.renderRadio(1)}
                  </View>
               </View>

               <View style={[styles.row, { justifyContent: 'center',marginTop:height*0.1 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => this.updateUser()} 
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 18,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "حفظ التغيرات" : "Save changes"}
                     </Text>
                  </TouchableOpacity>
                  </LinearGradient>
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
       Zones : state.AuthReducer.Zones,
       Cities: state.AuthReducer.Cities,
       Titles: state.AuthReducer.Titles

    }
 }
 // redux
 export default connect(mapStateToProps, { UpdateUser, SetLoading , getZone , getCity ,getTitles })(Profile)
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
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#F7F7F7',
    },
    inputFields: {
       borderRadius: 3,
       backgroundColor: '#FFF',
       textAlign: 'center',
       marginHorizontal:18
    },
    button: {
      width: width - (36 * 2) + 10,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      marginBottom: 18,
      marginHorizontal: 36
    },
    radioForm:{
        width:'85%',
       marginTop:15,
       justifyContent:'center',
       alignItems:'center',
    },
 });