import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, FlatList, ScrollView, BackHandler } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'
import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class Terms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            data:[],
            titleEN:'This section is dedicated to stuttering consulting that answers your inquiries from a group of stuttering specialists and controllers',
            titleAr:'هذا القسم مخصص للاستشارات حول التأتأة يجيب على أستفساراتكم نخبة من المتخصصين والمتحكمين فى التأتأة'
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
            axios.get('http://68.183.39.113/api/user/terms',{
            }).then(response => {
               this.props.SetLoading(false)
              const data = response.data;
             this.setState({ data });
            }).catch(function (error) {
               this.props.SetLoading(false)
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
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>الشروط والاحكام</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Terms and condition</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderText(item) {
        if (this.props.Language == "EN") {
           return (
              <Text style={{color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'left',margin:3,paddingHorizontal:7}}>{item.titleEN}</Text>
           )
        } else {
           return (
              <Text style={{color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'right',margin:3,paddingHorizontal:7}}>{item.titleAr}</Text>
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
           
            <View style={[{flex: 1,alignItems:'center',}]}>
               
               <View style={[styles.shadow,styles.view,{ marginTop:10,marginBottom:5}]}>
               <FlatList style={{width:'98%',marginTop:5,marginBottom:3}}
                data={this.state.data}
                numColumns={1}
                renderItem={({item})=>this.renderText(item)}
                keyExtractor={(item, index) => index.toString()}
                />
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
 export default connect(mapStateToProps,{ SetLoading})(Terms)
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
    view:{
        width:width*0.95, height:height*0.84,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius:7,

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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
   
 });