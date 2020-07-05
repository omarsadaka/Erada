import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,ScrollView,
   Image,ImageBackground} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux' // redux
import { SetLoading  } from './../../Actions' //redux


class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[],
            userId:'',
            userData:{},
            flag_type:0
        };
     }

     componentWillMount(){
        this.props.SetLoading(false)
     }

    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>الرئيسيه</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('MenuRoutes')} >
                    <Icon name="ellipsis-v" style={{ color: '#fff', fontSize: 25,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('MenuRoutes')} >
                    <Icon name="ellipsis-v" style={{ color: '#fff', fontSize: 25 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Home</Text>
                 <View></View>
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
              color="#28B5AF"
              visible={this.state.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#28B5AF'}}
            />
            {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style ={{width:width,alignItems:'center',justifyContent:'center',}} >
              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,styles.viewItem,{marginTop:30}]}>
                  <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={[styles.linearGradient,styles.shadow,]}>
                  <TouchableOpacity onPress={() => {
                     if(this.props.User){
                        this.props.navigation.navigate('Program')
                     }else{
                        if(this.props.Language=='AR'){
                           alert('يجب تسجيل الدخول أولا')
                        }else{
                           alert('You must login first')
                        }
                     }
                  }}
                   style={{ alignItems:'center',justifyContent:'center'}} >
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../img/prog.png')}
                   style={{  width: '65%',height:'65%',alignItems: 'center',justifyContent:'center'}}/>
                 <Text style={[{fontSize: 20,color:'#427E7C',fontFamily:'adobe',textAlign:'center'}]}>
                 {this.props.Language == "AR" ? 'برنامج نادى أرادة' : 'Arada Club Program'}</Text>
                  </TouchableOpacity>
                  </LinearGradient>

                  <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={[styles.linearGradient,styles.shadow,]}>
                  <TouchableOpacity onPress={() => {
                     if(this.props.User){
                        this.props.navigation.navigate('Consulting')
                     }else{
                        if(this.props.Language=='AR'){
                           alert('يجب تسجيل الدخول أولا')
                        }else{
                           alert('You must login first')
                        }
                     }
                  }}
                   style={{alignItems:'center',justifyContent:'center' }} >
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../img/est.png')}
                   style={{  width: '65%',height:'65%',alignItems: 'center',justifyContent:'center'}}/>
                 <Text style={[{fontSize: 20,color:'#3D7D5D',fontFamily:'adobe',textAlign:'center'}]}>
                   {this.props.Language == "AR" ? 'الأستشارات' : 'Consulting'}</Text>
                  </TouchableOpacity>
                  </LinearGradient>
              </View>

              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,styles.viewItem,{}]}>
                  <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={[styles.linearGradient,styles.shadow,]}>
                  <TouchableOpacity onPress={() => {
                     if(this.props.User){
                        if(this.props.User.loginType === 1){
                           this.props.navigation.navigate('Lectures')
                        }else{
                           this.props.navigation.navigate('Sp_lectures')
                        }
                     }else{
                        if(this.props.Language=='AR'){
                           alert('يجب تسجيل الدخول أولا')
                        }else{
                           alert('You must login first')
                        }
                     }
                     
                     
                  }}
                   style={{ alignItems:'center',justifyContent:'center'}} >
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../img/moha.png')}
                   style={{  width: '65%',height:'65%',alignItems: 'center',justifyContent:'center'}}/>
                 <Text style={[{fontSize: 20,color:'#432E96',fontFamily:'adobe',textAlign:'center'}]}>
                 {this.props.Language == "AR" ? 'محاضرات توعية' : 'Awareness lectures'}</Text>
                  </TouchableOpacity>
                  </LinearGradient>

                  <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={[styles.linearGradient,styles.shadow,]}>
                  <TouchableOpacity onPress={() => {
                     if(this.props.User){
                        this.props.navigation.navigate('TherapeuticSessions')
                     }else{
                        if(this.props.Language=='AR'){
                           alert('يجب تسجيل الدخول أولا')
                        }else{
                           alert('You must login first')
                        }
                     }
                  }}
                   style={{alignItems:'center',justifyContent:'center' }} >
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../img/gala.png')}
                   style={{  width: '65%',height:'65%',alignItems: 'center',justifyContent:'center'}}/>
                 <Text style={[{fontSize: 20,color:'#7939A8',fontFamily:'adobe',textAlign:'center'}]}>
                 {this.props.Language == "AR" ? 'جلسات علاجية' : 'Therapeutic sessions'}</Text>
                  </TouchableOpacity>
                  </LinearGradient>
              </View>

              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,styles.viewItem,{}]}>
                  <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={[styles.linearGradient,styles.shadow,]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Offer')}
                   style={{ alignItems:'center',justifyContent:'center'}} >
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../img/offer.png')}
                   style={{  width: '65%',height:'65%',alignItems: 'center',justifyContent:'center'}}/>
                 <Text style={[{fontSize: 20,color:'#920600',fontFamily:'adobe',textAlign:'center'}]}>
                 {this.props.Language == "AR" ? 'العـروض' : 'Offers'}</Text>
                  </TouchableOpacity>
                  </LinearGradient>

                  <LinearGradient colors={['#FFFFFF', '#E2E2E2']} style={[styles.linearGradient,styles.shadow,]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('LatestNews')}
                  style={{alignItems:'center',justifyContent:'center' }} >
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../img/new.png')}
                   style={{  width: '65%',height:'65%',alignItems: 'center',justifyContent:'center'}}/>
                 <Text style={[{fontSize: 20,color:'#F78507',fontFamily:'adobe',textAlign:'center'}]}>
                 {this.props.Language == "AR" ? 'أحدث الأخبار' : 'latest news'}</Text>
                  </TouchableOpacity>
                  </LinearGradient>
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
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading})(Home)
 const styles = StyleSheet.create({
   container: {
     width: width,
     alignItems: 'center',
     justifyContent:'center',
   },
   shadow: {
     shadowColor: '#585858',
     shadowOffset: {
       width: 0,
       height: 6,
     },
     shadowOpacity: 0.2,
     shadowRadius: 10,
     elevation: 8,
   },
   row: {
     flexDirection: 'row',
   },
   row_reserve: {
     flexDirection: 'row-reverse',
   },
   viewItem:{
     width:'93%',
     height:height*0.25,
     marginTop:10,
     alignItems:'center',
     justifyContent:'center'
   },
   right:{
      right:0,
      borderTopLeftRadius:20,
      borderBottomLeftRadius:20,
      textAlign:'right'
   },
   left:{
      left:0,
      borderTopRightRadius:20,
      borderBottomRightRadius:20,
      textAlign:'left'
   },
   linearGradient:{
      flex:1,
      height:'100%',
      borderRadius:8,
      margin:5
   }
   
 });
