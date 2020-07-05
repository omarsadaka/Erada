import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,ScrollView,
    FlatList,ImageBackground} from 'react-native';
const { width, height } = Dimensions.get('window')
import { StackActions, NavigationActions } from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux' // redux

class JoinOrder extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[1],
            userId:'',
            userData:{},
        };
     }

     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>طلب أنضمام كمتعاون</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Request to join as a collaborator</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
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
              visible={this.state.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#28B5AF'}}
            />
            {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }} >
            <View style ={{width:width,alignItems:'center',justifyContent:'center',marginTop:20}}>
            <TouchableOpacity
        onPress={() => this.props.navigation.navigate('StutterControl',{chechBack:2})}
          style={[styles.viewItem,{}]}>
             <ImageBackground
               resizeMode = 'cover'
               source={require('./../../../../img/bg.png')}
               style={{  width: '100%',height:'100%',alignItems: 'center',justifyContent:'center'}}/>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,]}>
               <Text style={{width: '100%',fontSize: 16,textAlign:'center',color:'#FFFFFF', fontFamily:'adobe',fontWeight:'bold' }}>
              {this.props.Language == "AR" ? 'متحكم فى التاتأة' : 'Stutter control'}</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Psychologist',{chechBack:2})}
          style={[styles.viewItem,{}]}>
             <ImageBackground
               resizeMode = 'cover'
               source={require('./../../../../img/bg.png')}
               style={{  width: '100%',height:'100%',alignItems: 'center',justifyContent:'center'}}/>
                <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,]}>
               <Text style={{width: '100%',fontSize: 16,textAlign:'center',color:'#FFFFFF',fontFamily:'segoe',fontWeight:'bold'}}>
              {this.props.Language == "AR" ? 'أخصائى نفسى' : 'Psychologist'}</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
        onPress={() => this.props.navigation.navigate('SpeechSpecialist',{chechBack:2})}
          style={[styles.viewItem,{}]}>
             <ImageBackground
               resizeMode = 'cover'
               source={require('./../../../../img/bg.png')}
               style={{  width: '100%',height:'100%',alignItems: 'center',justifyContent:'center'}}/>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,]}>
               <Text style={{width: '100%',fontSize: 15,textAlign:'center',color:'#FFFFFF', fontFamily:'segoe',fontWeight:'bold'}}>
              {this.props.Language == "AR" ? 'أخصائى نطق وتخاطب' : 'Speech and speech specialist'}</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
        onPress={() => this.props.navigation.navigate('AnotherArea',{chechBack:2})}
          style={[styles.viewItem,{}]}>
             <ImageBackground
               resizeMode = 'cover'
               source={require('./../../../../img/bg.png')}
               style={{width: '100%',height:'100%',alignItems: 'center',justifyContent:'center'}}/>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,]}>
               <Text style={{width: '100%',fontSize: 15,textAlign:'center',color:'#FFFFFF', fontFamily:'segoe',fontWeight:'bold'}}>
              {this.props.Language == "AR" ? 'متعاون فى مجال أخر' : 'Cooperative in another field'}</Text>
              </LinearGradient>
          </TouchableOpacity>
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
    }
 }
 // redux
 export default connect(mapStateToProps, {})(JoinOrder)
 const styles = StyleSheet.create({
   container: {
     width: width,
     alignItems: 'center',
     justifyContent:'center'
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
     height:height/5,
     marginTop:7,
     justifyContent:'center',
     alignItems:'center',
   },
   button:{
     width:'60%',
     position: 'absolute',
     alignItems:'center',
     justifyContent:'center',
     padding:7,borderRadius:20,
   }
   
 });
