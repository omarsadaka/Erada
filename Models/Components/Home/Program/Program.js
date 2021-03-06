import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../../Actions' //redux


class Program extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            isVisible:false,
            flag_type:0,
            titleAr:'',
            titleEN:'',
        };
     }
   
     componentWillMount() {
      this.getData()
   } 
  
   getData(){
      this.props.SetLoading(true)
     NetInfo.fetch().then(state =>{
       if (state.isConnected){
         try {
           axios.get('http://68.183.39.113/api/user/setting',{
           }).then(response => {
           this.props.SetLoading(false)
             const data = response.data;
             data.forEach(element => {
                if(element.key === 'Program'){
                   this.setState({titleAr: element.valueAR ,
                  titleEN: element.value})
                }else if(element.key === 'ProgramPrice'){
                   if(this.props.Language=='AR'){
                     this.setState({priceAr: element.valueAR +' '+ 'ريال سعودى' })
                   }else{
                     this.setState({priceEN: element.value +' '+ 'SAR'})
                   }
                  
                }
             });
           }).catch(function (error) {
              console.log(error);
           }).finally(function () {
              // always executed
           });
        } catch (error) {
        this.props.SetLoading(false)
           console.log(error);
        }
       } else {
        this.props.SetLoading(false)
         if (this.props.Language === 'AR'){
           alert('لا يوجد أتصال بالانترنت');
         } else {
           alert('No internet connection');
         }
       }
     });
   }

     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>برنامج نادى أرادة</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}> Arada Club Program</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
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
              {this.props.User.loginType ===1 ?
              <View style={[{flex: 1,paddingHorizontal: 24,alignItems:'center' }]}>
                  <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "ما هو برنامج نادى أرادة ؟" : "What is Arada Club Program"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    width:width,paddingHorizontal: 24, }]}>
                  {this.props.Language == "AR" ? this.state.titleAr : this.state.titleEN } 
                  </Text>

                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    marginTop:30,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "قيمة البرنامج/فـرد" : "Program coast /Individual"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 16,fontFamily:'adobe',
                    width:width,paddingHorizontal: 24, fontWeight:'bold'}]}>
                   {this.props.Language == "AR" ? this.state.priceAr : this.state.priceEN}
                 </Text>

              
               <View style={[{ justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { this.props.navigation.navigate('ProgramRequest')}}
                  style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]}>
                  <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                     {this.props.Language == "AR" ? "طلب برنامج فى مدينتك" : "Request a program in your city"}
                  </Text>
                  <Icon name="plus-circle" style={{ color: '#ffffff', fontSize: 22,margin:5 }} />
                  </TouchableOpacity>
                  </LinearGradient>
               </View>
              </View>
              :
              <View style={[{flex: 1,paddingHorizontal: 24,alignItems:'center' }]}>
                  <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "ما هو برنامج نادى أرادة ؟" : "What is Arada Club Program"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    width:width,paddingHorizontal: 24, }]}>
                  {this.props.Language == "AR" ? this.state.titleAr : this.state.titleEN } 
                 </Text>

                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    marginTop:30,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "عائد البرنامج /المتخصص" : "Return of the program / specialist"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 16,fontFamily:'adobe',
                    width:width,paddingHorizontal: 24, fontWeight:'bold'}]}>
                   {this.props.Language == "AR" ? this.state.priceAr : this.state.priceEN}
                 </Text>

              
               <View style={[{ justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { this.props.navigation.navigate('Sp_program')}}
                  style={styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                     {this.props.Language == "AR" ? "عرض البرامج المتاحة" : "View available programs"}
                  </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>
              </View>
              }
                

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
                {this.props.Language == "AR" ? "ملحوظة" : "Note"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '100%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'سيتم تحويلك الى حجز أستشارة مجانية' : 'You will be transferred to a free consultation reservation'}
            </Text>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible:false})
                   this.props.navigation.navigate('Program2')
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
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
 export default connect(mapStateToProps,{ SetLoading})(Program)
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
       backgroundColor:'#F6F6F6'
    },
    button: {
        width:width*0.8,
       backgroundColor: '#28B5AF',
       justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal: 60,
       paddingVertical: 5,
       borderRadius: 60,
    },
    image: {
        width: 120,
        height: 120
    },
    view:{
        width:width*0.8,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#EFEEEE',
        borderRadius:5
    },
    modal:{
      width:'100%',
      alignItems:'center',
      backgroundColor:'#fff',
      borderRadius:8,
    },
 });