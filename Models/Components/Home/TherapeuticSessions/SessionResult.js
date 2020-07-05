import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, BackHandler,AsyncStorage } from 'react-native';
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
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import StarRating from 'react-native-star-rating';

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../../Actions' //redux


class SessionResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            imagePicked:'',
            chechBack:0,
            input:'',
            resultID: null,
           result1: [
              {
                  label: 'الأكتفاء بالجلسة',
                  value: 5,
              },
              {
                  label: 'التحويل الى جلسة نطق وتخاطب أخرى',
                  value: 4,
              },
          ],
          resultEN1: [
            {
                label: 'Just Sufficiency session',
                value: 5,
            },
            {
                label: 'Switching to another speech and speech session',
                value: 4,
            },
        ],
          result2: [
           {
               label: 'الأكتفاء بالجلسة',
               value: 5,
           },
           {
               label: 'التحويل الى جلسة علاجية نفسية أخرى',
               value: 2,
           },
           {
               label: 'التحويل الى جلسة تخاطب',
               value: 4,
           },
       ],
       resultEN2: [
         {
             label: 'Just Sufficiency session',
             value: 5,
         },
         {
             label: 'Transfer to another psychotherapy session',
             value: 2,
         },
         {
             label: 'Switching to another speech and speech session',
             value: 4,
         },
     ],
            isVisible:false, 
            starCount:0,
            SessionID:''
        };
     }

     componentWillMount= async()=>{
      this.props.SetLoading(false)
      const id = await AsyncStorage.getItem('SessionID');
      if (id) {
        this.setState({ SessionID: id })
      } else {
       alert('no id')
      }
     
     }

     onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }
   

    result(){
      const{ resultID , input} = this.state
          if(resultID && input){
            this.props.SetLoading(true)
            NetInfo.fetch().then(state =>{
               if (state.isConnected){
            try {
               axios.put('http://68.183.39.113/api/user/session/'+this.state.SessionID,{
                  resultType: resultID, 
                  resultDescription: input,
                  status:2
                  }).then((response)=> {
                  this.props.SetLoading(false)
                   if(response.data){
                     this.setState({isVisible:true})
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
               alert('أختار نتيجه الاستشارة أولا وأكتب وصف الجلسة');
             } else {
               alert('Choose consulting result first and write description');
             }
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
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>نتيجة الجلسة</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Session result</Text>
                 <TouchableOpacity onPress={() => {
                     if(this.state.chechBack === 1){
                        this.props.navigation.navigate('Register')
                       }else{
                        this.props.navigation.goBack()
                       }
                 }} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }}/>
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
               visible={this.props.Processing}
               textContent={'Loading...'}
               textStyle={{ color: '#FFF' }}
            />
            {this.renderHeader(this.props.Language)}
            <View style={[{flex: 1,paddingHorizontal: 24,alignItems:'center' }]}>
            <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 18,fontFamily:'adobe',
                    marginTop:height*0.05,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "نتيجة الأستشارة" : "Consulting result"}
                 </Text>
                <View style={[this.props.Language == "AR"?styles.row:styles.rowReversed,styles.shadow,styles.inputFields,{margin:1}]}>
                   <Icon name="caret-down" size={15} color="#707070" style={{margin:10}} />
                   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.props.Language=='AR'?this.props.User.type==3?this.state.result1:this.state.result2:
                   this.props.User.type==3?this.state.resultEN1:this.state.resultEN2} // data
                   defaultValue={this.props.Language == "AR"?'أختـر ':'Choose'}
                   onSelect={(index, value) => { 
                     this.setState({ resultID: value.value }) 
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 14, color: '#707070',fontFamily:'adobe',paddingHorizontal:10}]}
                  dropdownStyle={{ width: '70%', height:80,backgroundColor:'#FFFFFF',}}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 15, color: '#777777', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
             </View>

                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 18,fontFamily:'adobe',
                    marginTop:height*0.1,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "الوصف" : "Description"}
                 </Text>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'أكتب وصف نتيجة الأستشارة هنا' : 'Write a description of the consultation result here'} 
                      placeholderTextColor='#BDBDBD'
                      style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color: '#764c22',fontSize:14,height:120,textAlignVertical:'top',fontFamily:'adobe' }]}
                       onChangeText={(text) => this.setState({ input: text })} />
                  </Item>
               </View>

               {/* <View style={[styles.column, { justifyContent: 'center', alignItems: 'center',marginTop:height*0.08}]}>
                <Text style={{ color: '#707070', fontSize: 17,fontFamily:'adobe', width:width,textAlign:'center'}}>
                   {this.props.Language == "AR" ? "تقييم الجلسة" : "Rate session"}
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
               </View> */}
              

              
               <View style={[styles.row, { justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => {
                  //   this.setState({isVisible:true})
                  this.result()
                 }}
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe'}}>
                        {this.props.Language == "AR" ? "متابعة" : "Continue"}
                     </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>

               <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'85%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "رسالة تأكيد" : "Confirm SMS"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '100%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'تم حفظ نتيجة الجلسة' : 'Session score saved'}
            </Text>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible:false})
                }}
            style={{ width: '40%', justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حسنا' : 'Done'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
           
         </View>
         
          </Modal>
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
 export default connect(mapStateToProps,{ SetLoading})(SessionResult)
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
       borderRadius: 3,
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
    },
    modal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
      },
 });