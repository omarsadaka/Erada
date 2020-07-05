import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView,
    BackHandler,AsyncStorage } from 'react-native';
import { Input, Item, DatePicker, Right } from 'native-base'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import { SetLoading , MakeSession } from './../../../Actions' //redux


class SessionDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            bill:null,
            bills: [
                {
                    label: 'أستخدام رصيدى',
                    value: 1,
                },
                {
                    label: 'بطاقة الدفع الالكترونى',
                    value: 2,
                },
            ], 
            billsEN: [
               {
                   label: 'Use my balance',
                   value: 1,
               },
               {
                   label: 'Use credit card',
                   value: 2,
               },
           ], 
            isVisible:false,
            data:{},
            price:'' 
        };
     }

     componentWillMount = async()=>{
      const data = await AsyncStorage.getItem('MakeSessionRequest');
      if (data) {
        const obj = JSON.parse(data);
        this.setState({ data: obj })
      } else {
       alert('no MakeSessionRequest')
      }
      this.getData()
   }

   componentWillReceiveProps(nextProps){
      if (nextProps.Message != null) {
         if(nextProps.Message=='Your session created successfully'){
            // alert(nextProps.Message)
            //  AsyncStorage.removeItem('MakeSessionRequest')
            // AsyncStorage.removeItem('RequestID')
             this.setState({isVisible:true})
         }else{
            alert('Error try again')
         }
      }
  }
   
  getData(){
   
    NetInfo.fetch().then(state =>{
     if (state.isConnected){
       try {
        axios.get('http://68.183.39.113/api/user/setting',{
        }).then(response => {
        
          const data = response.data;
          data.forEach(element => {
             if(element.key === 'sessionPrice'){
                this.setState({price: element.valueAR })
             }
          });
        }).catch(function (error) {
           console.log(error);
           alert(error.Message)
        }).finally(function () {
           // always executed
        });
     } catch (error) {
     
        console.log(error);
        alert(error)
     }
    } else {
     
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
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>تفاصيل الجلسة</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}> Session detail</Text>
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
               visible={this.props.Processing}
               textContent={'Loading...'}
               textStyle={{ color: '#FFF' }}
            />
            {this.renderHeader(this.props.Language)}
            <View style={[{flex: 1,alignItems:'center', }]}>
              <View style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,{width:width*0.9,height:height*0.15,alignItems:'center',justifyContent:'center',}]}>
                 <View style={{width:'60%',height:'100%',paddingHorizontal:15}}>
                   <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#707070',marginTop:'10%',fontSize: 16,fontWeight:'bold',fontFamily:'adobe',margin:3}]}>
                     {this.state.data.name}
                   </Text>
                   <View style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,{alignItems:'center',justifyContent:'center',marginTop:10}]}>
                      <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{flex:1,paddingHorizontal:7,color: '#707070', fontSize: 15,fontFamily:'adobe'}]}>
                       {this.state.data.date}
                      </Text>
                      <Icon name="calendar" style={{ color: '#9A9A9A', fontSize: 20,margin:3 }} />
                   </View>
                   <View style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,{alignItems:'center',justifyContent:'center',}]}>
                      <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{flex:1,paddingHorizontal:7,color: '#707070', fontSize: 15,fontFamily:'adobe'}]}>
                     {this.state.data.timeName}
                      </Text>
                      <Icon name="clock-o" style={{ color: '#9A9A9A', fontSize: 20,margin:3 }} />
                   </View>
                 </View>
                 <View style={{width:'40%',height:'100%',alignItems:'center',justifyContent:'center',marginTop:'8%',}}>
                 {this.state.data.imgPath?
                      <Image
                      source={{uri: this.state.data.imgPath}}
                      style={{  width: 70,height:70,alignItems: 'center', borderRadius: 70/2}}/>
                     :
                     <Image
                     resizeMode = 'contain'
                     source={require('./../../../../img/user.png')}
                     style={{  width: '97%',height:'97%',alignItems: 'center',}}/>
                     }
                 </View>
              </View>
               <View style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,styles.view,{}]}>
                 <Text style={[{flex:1,color: '#707070', fontSize: 17,fontFamily:'adobe',textAlign:'center',fontWeight:'bold'}]}>
                 {this.props.Language == "AR" ? '200  ريال سعودى' : '200    SAR'}
                 </Text> 
                 <View style={{width:1,height:30,backgroundColor:'#CBCBCB'}}></View>
                 <Text style={[{flex:1,color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center'}]}>
                 {this.props.Language == "AR" ? 'قيمة الجلسة' : 'Session coast'}
                 </Text> 
                      
              </View>

              <View style={[styles.shadow,{width:width*0.8,marginTop:20,backgroundColor:'#FAFAFA',alignItems:'center',justifyContent:'center',borderRadius:5}]}>    
               
              <View style={{width:'90%',flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'25%',height:1,backgroundColor:'#CECECE',alignItems:'flex-start'}}></View>
                <Text style={{flex:1,textAlign:'center',fontSize:16,color:'#707070',fontFamily:'adobe' }}> 
                {this.props.Language == "AR" ? 'طريقه الدفع والسداد' : 'Payment method'}
               </Text>
               <View style={{width:'25%',height:1,backgroundColor:'#CECECE',alignItems:'flex-end'}}></View>
             </View>
                <Text style={[this.props.Language == "AR"?styles.right:styles.left,{width:'90%',color: '#707070', fontSize: 16,fontFamily:"adobe",marginTop:10}]}>
                   {this.props.Language == "AR"? 'أختر طريقه الدفع':'Choose your payment method'}</Text>

             <View style={[this.props.Language == "AR"?styles.row:styles.rowReversed,styles.shadow,styles.picker,{}]}>
              <Icon name="caret-down" size={15} color="#000" style={{margin:10}} />
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
             
               <ModalDropdown
                   options={this.props.Language=='AR'?this.state.bills:this.state.billsEN} // data
                   defaultValue={this.props.Language == "AR"?'أختـر ':'Choose'}
                   onSelect={(index, value) => { 
                     this.setState({ bill: value.value }) 
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 14, color: '#707070',paddingHorizontal:10,fontFamily:'adobe' }]}
                  dropdownStyle={[styles.shadow,{ width: '70%', height:100,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 14, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
             </View>

           </View>
           <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#BDBDBD', fontSize: 20,fontFamily:'adobe',
                        marginTop:10,width:width*0.8 }]}>
                   {this.props.Language == "AR" ? "ملحوظة" : "Note"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#BDBDBD', fontSize: 20,fontFamily:'adobe',
                        width:width*0.8 }]}>
                   {this.props.Language == "AR" ? "مدة الجلسة 40 دقيقة" : "Session time 40 minites"}
                 </Text>

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
            {this.props.Language == "AR" ? 'تم أرسال طلبك بنجاح' : 'Your request send successfully'}
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

                 
                
              
               
               <View style={[{ justifyContent: 'center',position:'absolute',bottom:10}]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => {
                     const{bill , price} = this.state
                     if(bill){
                        this.props.MakeSession(this.state.data,bill , price)
                     }else{
                        if(this.props.Language == 'AR'){
                           alert('أختر طريقة الدفع')
                        }else{
                           alert('Enter Payment method')
                        }
                     }
                  }}
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'} ]}>
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "تأكيد الطلب" : "Confirm request"}
                     </Text>
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
       Message: state.AuthReducer.Message,
       User: state.AuthReducer.User,
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading , MakeSession})(SessionDetail)
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
       elevation: 8,
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
       backgroundColor:'#F0F2F5'
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
        width: '80%',
        height: '80%',
    },
    view:{
        width:width,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#E4E4E4',
        borderRadius:10,
        marginTop:30
    },
    picker:{
        width:'90%',height:45,
        borderRadius: 5,marginTop:10,
        alignItems:'center',justifyContent:'center',
        backgroundColor:'#FAFAFA',marginBottom:20
    },
    modal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
      },
 });