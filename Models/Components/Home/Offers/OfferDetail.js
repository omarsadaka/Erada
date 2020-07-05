import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    ScrollView,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux' // redux
import {  SetLoading , Offers } from './../../../Actions' //redux


class OfferDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[1],
            userId:'',
            userData:{},
        };
     }
   
     componentWillMount() {
      const { navigation } = this.props;
      const Id = navigation.getParam('ID', 'NO-ID');
      this.props.Offers(Id) 
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height*0.1 }} >
            <View style={{width:width,height:height,alignItems:'center',}}>
            <Image
                 resizeMode = 'stretch'
                 source={{uri: this.props.Offer.imgPath}}
                 style={{  width: '90%',height:height*0.4,alignItems: 'center',marginTop:10}}/>
             <Text style={{color: '#5E5E5E', fontSize: 17,fontFamily:'adobe',margin:3 ,fontWeight:'bold' }}>
                     {this.props.Language == "AR" ? this.props.Offer.titleAr : this.props.Offer.titleEN}
             </Text>
             <View style={[styles.shadow,styles.view,{ marginTop:5,marginBottom:10}]}>
             <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{color: '#707070', fontSize: 18,fontFamily:'adobe',}]}>
                     {this.props.Language == "AR" ? this.props.Offer.descriptionAr: this.props.Offer.descriptionEN}
             </Text>
               </View>   
            </View>
            </ScrollView>
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
       Offer: state.AuthReducer.Offer
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading , Offers})(OfferDetail)
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
   view:{
    width:width*0.95, 
    padding:10,
    backgroundColor:'#fff',
    borderRadius:7,
},
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   }
   
 });
