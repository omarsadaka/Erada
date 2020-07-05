import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'


import { connect } from 'react-redux' // redux
import { SetLoading , getProgram } from './../../../Actions' //redux


class Sp_program extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[],
            userId:'',
            userData:{},
            isVisible:false,
            isVisible2:false,
            eventId:''
        };
     }

     componentWillMount(){
        this.props.getProgram()
     }

      joinRequest (id){
         this.props.SetLoading(true)
      NetInfo.fetch().then(state =>{
          if (state.isConnected){
          try {
             axios.post('http://68.183.39.113/api/user/eventUser',{
              userID: this.props.User._id,
              eventID: id
             }).then((response)=> {
               this.props.SetLoading(false)
               // this.setState({isVisible:true})
               this.setState({isVisible2:true})
             }).catch( (error)=> {
               this.props.SetLoading(false)
                   alert(error.Message)
             }).finally(function () {
                 // always executed
             });
         } catch (error) {
            this.props.SetLoading(false)
            if(this.props.Language='AR'){
               alert('حدث خطأ ما حاول مجددا')
            }else{
               alert('Error happen try again')
            }
         }
         
       } else {
         if(this.props.Language='AR'){
            alert('لا يوجد أتصال بالانترنت')
         }else{
            alert('No internet connection')
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
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>برنامج نادى أرادة</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Arada Club Program</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderItem(item){
        return (
        <View style={{ width: width * 0.6, height:height*0.55,}}>
          <TouchableOpacity
         //  onPress={()=>{
         //    //  this.joinRequest(item.id)
         //    this.setState({eventId: item.id})
         //    this.setState({isVisible:true})
         //   }}
          style={[styles.viewItem,styles.shadow,{margin:5}]}>
              <View style={[{width: '100%',height:'100%',alignItems:'center'}]}>
                <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:'80%',color: '#5E5E5E', marginTop:5,fontSize: 20,fontFamily:'adobe'}]}>
                     {this.props.Language == "AR" ? 'برنامج نادى أرادة' : 'Arada Club Program'}
                 </Text>
                 <View style={{width:'80%',height:'50%',alignItems:'center',justifyContent:'center',backgroundColor:'#F5F5F5'}}>
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../../img/logo.png')}
                   style={{  width: '70%',height:'70%',alignItems: 'center',}}/>
                 </View>

                 <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'80%',marginTop:5,alignItems:'center',justifyContent:'center',}]}>
                      <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{width:'95%',paddingHorizontal:7,color: '#707070', fontSize: 12,fontFamily:'adobe',fontWeight:'bold'}]}>
                      {this.props.Language == "AR" ? item.zoneAr + ' - ' + item.cityAr : item.zoneEN + ' - ' + item.cityEN}
                      </Text>
                     <Icon name="map-marker" style={{ color: '#79E5E1', fontSize: 20,margin:3 }} />
                   </View>
                 <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'80%',alignItems:'center',justifyContent:'center',}]}>
                      <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{width:'95%',paddingHorizontal:7,color: '#707070', fontSize: 15,fontFamily:'adobe'}]}>
                       {this.props.Language == "AR" ? 'الأحد:28-3-2020' : 'Sun:28-3-2020'}
                      </Text>
                      <Icon name="calendar" style={{ color: '#79E5E1', fontSize: 15,margin:3 }} />
                   </View>
                   <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'80%',alignItems:'center',justifyContent:'center',}]}>
                      <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{width:'95%',paddingHorizontal:7,color: '#707070', fontSize: 15,fontFamily:'adobe'}]}>
                      {this.props.Language == "AR" ? '2:00 م - 5:00 م' : '2:00 Pm - 5:00 Pm'}
                      </Text>
                      <Icon name="clock-o" style={{ color: '#79E5E1', fontSize: 18,margin:3 }} />
                   </View>

                   <View style={[{ justifyContent: 'center',position:'absolute',bottom:7}]}>
                 <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { 
                     this.setState({eventId: item.id})
                     this.setState({isVisible:true})
                  }}
                  style={styles.shadow,{width:'100%',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                     {this.props.Language == "AR" ? "طلب أنضمام" : "Join request"}
                  </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>
                  
                 
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
              visible={this.state.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#FFF'}}
            />
            {this.renderHeader(this.props.Language)}
            <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
            <FlatList style={{marginTop:5,marginBottom:'10%'}}
                        data={this.props.Program}
                        numColumns={1}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        />
            </View>
            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
               {this.props.Language == "AR" ? "تأكيد الأنضمام" : "Confirm join"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'هل انت متأكد انك تريد الأنضمام للبرنامج كمدرب ؟' : 'Are you sure you want to join the program as a coach?'}
            </Text>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center',justifyContent:'space-evenly'}]}>
            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '45%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible:false})
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'ألغاء' : 'Cancel'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '45%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                  this.setState({isVisible:false})
                  this.joinRequest(this.state.eventId)
                  // this.setState({isVisible2:true})
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'تأكيد الأنضمام' : 'Confirm join'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>

            </View>
         </View>
          </Modal>
          <Modal
             isVisible={this.state.isVisible2}
             onBackdropPress={() => this.setState({ isVisible2: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible2:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "رسالة تأكيد" : "Confirm message"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'سيتم أرسال أشعار فور الموافقة على طلب الانضمام للبرنامج' : 'Notifications will be sent upon approval of the application to join the program'}
            </Text>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible2:false})
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حسنا' : 'Done'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
           
         </View>
         
          </Modal>
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
        Program: state.AuthReducer.Program
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading , getProgram})(Sp_program)
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
     borderRadius:8,
     justifyContent:'center',
     alignItems:'center'
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   },
   button: {
   backgroundColor: '#28B5AF',
   justifyContent: 'center',
   alignItems: 'center',
   paddingHorizontal: 60,
   borderRadius: 60,
 },
modal:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:8,
  },
   
 });
