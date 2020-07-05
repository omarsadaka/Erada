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

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../../Actions' //redux


class ConsultingResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            input:'',
            chechBack:0,
            resultID: null,
            result1: [
                {
                    label: 'الأكتفاء بالاستشارة',
                    value: 1,
                },
            ],
            resultEn1: [
               {
                   label: 'Just Sufficiency consulting',
                   value: 1,
               },
           ],
            result2: [
               {
                   label: 'الأكتفاء بالاستشارة',
                   value: 1,
               },
               {
                   label: 'التحويل الى جلسة علاجية',
                   value: 2,
               },
               {
                   label: 'التحويل الى أخصائى نفسى',
                   value: 3,
               },
           ],
           resultEN2: [
            {
                label: 'Just Sufficiency consulting',
                value: 1,
            },
            {
                label: 'Switching to a treatment session',
                value: 2,
            },
            {
                label: 'Transfer to a psychologist',
                value: 3,
            },
        ],
           result3: [
            {
                label: 'الأكتفاء بالاستشارة',
                value: 1,
            },
            {
                label: 'التحويل الى جلسة علاجية',
                value: 2,
            },
            {
                label: 'التحويل الى جلسة تخاطب',
                value: 3,
            },
        ],
        resultEN3: [
         {
             label: 'Just Sufficiency consulting',
             value: 1,
         },
         {
             label: 'Switching to a treatment session',
             value: 2,
         },
         {
             label: 'Switching to a conversational session',
             value: 3,
         },
     ],
            isVisible:false, 
            consultingID:''
        };
     }

     componentWillMount= async()=>{
      this.props.SetLoading(false)
      const id = await AsyncStorage.getItem('RequestID');
      if (id) {
        this.setState({ consultingID: id })
      } 
     }
   
     result(){
      const{ resultID , input} = this.state
          if(resultID && input){
            this.props.SetLoading(true)
            NetInfo.fetch().then(state =>{
               if (state.isConnected){
            try {
               axios.put('http://68.183.39.113/api/user/request/'+this.state.consultingID,{
                  resultType: resultID, 
                  resultDescription: input,
                  status: 2
                  }).then((response)=> {
                  this.props.SetLoading(false)
                   if(response.data._id){
                     this.setState({isVisible:true})
                     this.setState({input:''})
                     AsyncStorage.setItem('RequestID',this.state.consultingID)
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
               alert(' أختار نتيجه الاستشارة أولا وأكتب وصف الأستشارة');
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
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>نتيجة الأستشارة</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Consulting result</Text>
                 <TouchableOpacity onPress={() => {
                     if(this.state.chechBack === 1){
                        this.props.navigation.navigate('Register')
                       }else{
                        this.props.navigation.goBack()
                       }
                 }} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }}/>
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
                    marginTop:height*0.08,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "نتيجة الأستشارة" : "Consulting result"}
                 </Text>
                <View style={[this.props.Language == "AR"?styles.row:styles.rowReversed,styles.shadow,styles.inputFields,{margin:1}]}>
                   <Icon name="caret-down" size={15} color="#707070" style={{margin:10}} />
                   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.props.Language=='AR'?
                   this.props.User.type==1?this.state.state.result1:this.props.User.type==2?this.state.result3:this.state.result2:
                   this.props.User.type==1?this.state.state.resultEN1:this.props.User.type==2?this.state.resultEN3:this.state.resultEN2} // data
                   defaultValue={this.props.Language == "AR"?'أختـر ':'Choose'}
                   onSelect={(index, value) => { 
                     this.setState({ resultID: value.value }) 
                     AsyncStorage.setItem('ConsultingResult',value.value)
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 18, color: '#707070',fontFamily:'adobe',paddingHorizontal:10}]}
                  dropdownStyle={{ width: '70%', height:100,backgroundColor:'#FFFFFF',}}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#777777', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
             </View>

                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 18,fontFamily:'adobe',
                    marginTop:height*0.2,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "الوصف" : "Description"}
                 </Text>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Item style={[styles.inputFields, styles.shadow, { }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'أكتب وصف نتيجة الأستشارة هنا' : 'Write a description of the consultation result here'} 
                      placeholderTextColor='#BDBDBD'
                      style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color: '#764c22',fontSize:18,height:120,textAlignVertical:'top',fontFamily:'adobe' }]}
                       onChangeText={(text) => this.setState({ input: text })} />
                  </Item>
               </View>
              

              
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
 export default connect(mapStateToProps,{ SetLoading})(ConsultingResult)
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