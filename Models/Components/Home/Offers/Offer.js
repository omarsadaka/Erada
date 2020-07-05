import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'

import { connect } from 'react-redux' // redux
import {  SetLoading  } from './../../../Actions' //redux


class Offer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[],
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
           axios.get('http://68.183.39.113/api/user/offers',{
           }).then(response => {
           this.props.SetLoading(false)
             const data = response.data;
            this.setState({ data });
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
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>العروض</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Offers</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderItem(item){
        return (
        <View style={{ width: width * 0.8, height:height*0.45,padding: 2, flexDirection: 'row', }}>
          <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('OfferDetail',{ID: item._id})
           }}
          style={[styles.viewItem,styles.shadow,{margin:5}]}>
              <View style={[{width: '100%',height:'100%',alignItems:'center',}]}>
                <Text style={{color: '#5E5E5E', fontSize: 22,fontFamily:'adobe',margin:3 }}>
                     {this.props.Language == "AR" ? item.titleAr : item.titleEN}
                 </Text>
                 <Image
                 resizeMode = 'stretch'
                 source={{uri: item.imgPath}}
                 style={{  width: '90%',height:'80%',alignItems: 'center',}}/>
                 
              </View>
          </TouchableOpacity>
          </View>
        );
      }
    render(){
        return(
            <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#28B5AF" barStyle="light-content"
             />
            <Spinner
            color='#28B5AF'
              visible={this.props.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#28B5AF'}}
            />
            {this.renderHeader(this.props.Language)}
            <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
            <FlatList style={{marginTop:5,marginBottom:'13%'}}
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        />
            </View>
          </SafeAreaView>
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
 export default connect(mapStateToProps, {SetLoading})(Offer)
 const styles = StyleSheet.create({
   container: {
     width: width,
     height:height,
     alignItems: 'center',
   },
   shadow: {
     shadowColor: '#000',
     shadowOffset: {
       width: 0,
       height: 6,
     },
     shadowOpacity: 0.2,
     shadowRadius: 10,
     elevation: 4,
   },
   row: {
     flexDirection: 'row',
   },
   row_reserve: {
     flexDirection: 'row-reverse',
   },
   viewItem:{
     flex:1,
     backgroundColor:'#fff',
     borderRadius:10,
     justifyContent:'center',
     alignItems:'center'
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   }
   
 });
