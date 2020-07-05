import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';


import { connect } from 'react-redux' // redux
import { SetLoading } from './../../../Actions' //redux


class Lectures extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
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
                if(element.key === 'AwarenessLectures'){
                   this.setState({titleAr: element.valueAR ,
                  titleEN: element.value})
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
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>محاضرات توعية</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Awareness lectures</Text>
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
              
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "ما هى محاضرة التوعية ؟" : "What is awareness lecture"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070', fontSize: 20,fontFamily:'adobe',
                    width:width,paddingHorizontal: 24, }]}>
                  {this.props.Language == "AR" ? this.state.titleAr : this.state.titleEN } 
                 </Text>
              
               
               <View style={[{ justifyContent: 'center',position:'absolute',bottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('CreateLecture')}
                  style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,{width:width*0.8,alignItems:'center',justifyContent:'center'}]}>
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "أنشاء محاضرة توعية" : "Create awareness lecture"}
                     </Text>
                     <Icon name="plus-circle" style={{ color: '#ffffff', fontSize: 22,margin:5 }} />
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
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading})(Lectures)
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
    button: {
      width:width*0.9,
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
 });