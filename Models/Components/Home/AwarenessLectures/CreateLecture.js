import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, AsyncStorage, ScrollView, BackHandler } from 'react-native';
import { Input, Item } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'


import { connect } from 'react-redux' // redux
import { UpdateUser, SetLoading , getZone , getCity , createLecture } from './../../../Actions' //redux

class CreateLecture extends Component{

    constructor(props) {
        super(props);
        this.state = {
         name: '',
         name2: '',
         mobile: '',
         email: '',
         date:'',
         time:'',
         price:null,
         zoneID:'',
         cityID:'',
         zoneName:'',
         cityName:'',
         zoneColor:'#d3d3d3',
         cityColor:'#d3d3d3',
         isVisible:false,
          
        };
     }

     componentWillMount() {
      this.props.getZone()
      this.getData()
   } 
   componentWillReceiveProps=(nextProps)=> {
      if (nextProps.Message != null) {
         if(nextProps.Message=='Lecture created successfully'){
            this.setState({isVisible:true})
            this.setState({name:'',name2:'',mobile:'',email:'',date:'',time:''})
         }else{
            alert('Error try again')
         }
         
      }
  }
   getCity(zoneId){
      if(zoneId != null){
         this.props.getCity(zoneId)
      }else{
         alert('Enter Zone first')
      }
   } 

   emailIsValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
             if(element.key === 'LecturePrice'){
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
     this.props.SetLoading(false)
        console.log(error);
        alert(error)
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
   
  create() {
   const {name , name2 , mobile , email , date , time ,zoneID , cityID ,price} = this.state
   if(name && name2 && mobile && email &&  date && time && zoneID && cityID){
      if( this.emailIsValid(email)){
      this.props.createLecture(this.props.User._id,name, name2 , mobile,  email, zoneID , cityID , date , time ,price)
   }else{
      if(this.props.Language=='AR'){
         alert('أدخل الايميل بطريقة صحيحة')
      }else{
         alert('Enter valid email')
      }
   }
   }else{
      if(this.props.Language=='AR'){
         alert('جميع البيانات مطلوبة')
      }else{
         alert('All data required')
      }
   }
   
} 
     renderHeader(lang) {
        if (lang == "EN") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <View></View>
                 <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Create awareness lecture</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }}/>
                 </TouchableOpacity>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#F6F6F6', fontSize: 22 ,fontFamily:'adobe'}}>أنشاء محاضرة توعية</Text>
                 <View></View>
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }} >
               <View style={{width:width*0.9,alignItems:'center',paddingTop:20}}>
               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center',marginBottom: 5 ,marginTop:10 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center',width:'30%'  }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "أسم الجهة" : "Entity name"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                          placeholder={this.props.Language == "AR" ? "أسم الجهة" : "Name of the entity"}
                          placeholderTextColor='#d3d3d3'
                          underlineColorAndroid='transparent'
                           defaultValue={this.state.name}
                           style={{ color: '#000',fontSize:20,height:45,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ name: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center',  marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "أسم منسق الجهة" : " Entity name"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                         placeholder={this.props.Language == "AR" ? " أسم منسق الجهة" : "Name of the entity"}
                         placeholderTextColor='#d3d3d3'
                         underlineColorAndroid='transparent'
                           defaultValue={this.state.name2}
                           style={{ color: '#000',fontSize:20,height:45,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ name2: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{width:'100%', color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "رقم الجوال" : "Mobile number"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                        placeholder={this.props.Language == "AR" ? "رقم الجوال" : "Mobile number"}
                        placeholderTextColor='#d3d3d3'
                        underlineColorAndroid='transparent'
                           defaultValue={this.state.mobile}
                           keyboardType='numeric'
                           style={{ color: '#000',fontSize:20 ,height:45,fontFamily:'adobe'}}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ mobile: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "البريد الالكترونى" : "Email"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <Item style={[styles.inputFields, styles.shadow]}>
                        <Input
                        placeholder={this.props.Language == "AR" ? "البريد الالكترونى" : "Email"}
                        placeholderTextColor='#d3d3d3'
                        underlineColorAndroid='transparent'
                           defaultValue={this.state.email}
                           style={{ color: '#000',fontSize:20,height:45,fontFamily:'adobe' }}
                           textAlign={'center'}
                           onChangeText={(text) => this.setState({ email: text })}
                        />
                     </Item>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5,margin:1 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "التاريخ" : "Date"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%',height: 45, alignItems: 'center' }]}>
                     <Icon name="calendar" style={{ fontSize: 25,color: '#E3E3E3',margin:5 }} />
                        <DatePicker
                         style={{ width:'80%',}}
                            date={this.state.date}
                           placeholder={ this.props.Language == "AR" ? " التاريخ" : " Date" }
                           textStyle={{ color: "#000" }}
                           placeHolderTextStyle={{ color: "#d3d3d3" }}
                           mode="date"
                           format="YYYY-MM-DD"
                           minDate={new Date()}
                           confirmBtnText="Confirm"
                           cancelBtnText="Cancel"
                           customStyles={{
                             dateIcon: {
                               display:'none'
                             },
                           dateInput: {
                            
                             borderWidth: 0,borderColor: '#707070',fontSize:20
                           }
                           // ... You can check the source to find the other keys.
                           }}
                           onDateChange={(date) => {this.setState({date})}}
                        />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}
               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5,margin:1 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{width:'100%', color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "الوقـت" : "Time"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%', height: 45, alignItems: 'center', }]}>
                     <Icon name="clock-o" style={{ fontSize: 25,color: '#E3E3E3',margin:5 }} />
                        <DatePicker
                          style={{ width:'80%',}}
                           date={this.state.time}
                           placeholder={ this.props.Language == "AR" ? "الوقـت" : "Time"}
                           mode="time"
                           format="HH:mm"
                           textStyle={{ color: "#000" }}
                           placeHolderTextStyle={{ color: "#d3d3d3" }}
                           mode="time"
                           format="HH:mm"
                           confirmBtnText="Confirm"
                           cancelBtnText="Cancel"
                           customStyles={{
                             dateIcon: {
                               display:'none'
                             },
                             dateInput: {
                               borderWidth: 0,borderColor: '#fff',fontSize:14
                             }
                             }}
                             onDateChange={(time) => {this.setState({time})}}
                        />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}


               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5,margin:1 }]}>
                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{width:'100%', color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "المنطقة" : "Zone"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 0, backgroundColor: 'white',  height: 45 }]}>
                        <AntDesign name="caretdown" size={12} style={{ color: '#707070' }} />
                        <ModalDropdown
                      options={this.props.Zones} // data
                      defaultValue={this.props.Language == "AR" ? "أختر المنطقه" : "Choose zone"}
                     onSelect={(index, value) => { 
                      this.setState({ zoneID: value.id ,zoneColor:'#000'}) 
                      if(this.props.Language=='AR'){
                        this.setState({zoneName:value.titleAr})
                     }else{
                       this.setState({zoneName:value.titleEN})
                     }
                      this.getCity(value.id)
                     }}
                     renderButtonText={(rowData) => this.props.Language == "AR" ? (rowData.titleAr):(rowData.titleEN)} // ba3d ma t5tar
                     style={{ width:'90%',}} // abl ma t5tar
                     textStyle={{fontSize: 20, color: this.state.zoneColor,fontFamily:'adobe',textAlign:'center' }}
                     dropdownStyle={[styles.shadow,{ width: '50%', height:150,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                     renderRow={function (rowData, rowID, highlighted) {
                     return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 20, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                     {this.props.Language == "AR" ? rowData.titleAr:rowData.titleEN}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5,margin:1 }]}>
                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "المدينة" : "City"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%', justifyContent: 'center', alignItems: 'center', marginLeft: 0, backgroundColor: 'white', height: 45 }]}>
                        <AntDesign name="caretdown" size={12} style={{ color: '#707070' }} />
                        <ModalDropdown
                      options={this.props.Cities} // data
                      defaultValue={this.props.Language == "AR" ? "أختر المدينة" : "Choose city"}
                     onSelect={(index, value) => { 
                      this.setState({ cityID: value.id,cityColor:'#000' }) 
                      if(this.props.Language=='AR'){
                        this.setState({cityName:value.titleAr})
                     }else{
                       this.setState({cityName:value.titleEN})
                     }
                     }}
                     renderButtonText={(rowData) =>this.props.Language == "AR" ? (rowData.titleAr):(rowData.titleEN)} // ba3d ma t5tar
                     style={{ width:'90%',}} // abl ma t5tar
                     textStyle={{fontSize: 18, color: this.state.cityColor,fontFamily:'adobe',textAlign:'center' }}
                     dropdownStyle={[styles.shadow,{ width: '50%', height:150,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                     renderRow={function (rowData, rowID, highlighted) {
                     return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                     {this.props.Language == "AR" ? rowData.titleAr:rowData.titleEN}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                     </View>
                  </View>

               </View>

               {/***************************************************************************************/}
              

               <View style={[styles.row, { justifyContent: 'center' }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,{}]}>
                  <TouchableOpacity 
                   onPress={() => {
                     this.create()
                     // const {name , name2 , mobile , email , date , time ,zoneID , cityID} = this.state
                     // if(name && name2 && mobile && email &&  date && time && zoneID && cityID){
                     //    if( this.emailIsValid(email)){
                     //   const obj ={
                     //      name: name,
                     //      name2: name2,
                     //      mobile: mobile,
                     //      email: email,
                     //      date: date,
                     //      time: time,
                     //      zoneID: zoneID,
                     //      cityID: cityID,
                     //      zoneName: this.state.zoneName,
                     //      cityName: this.state.cityName,
                     //   }
                     //   AsyncStorage.setItem('Lecture', JSON.stringify(obj))
                     //   this.setState({ isVisible: true })
                     // }else{
                     //    if(this.props.Language=='AR'){
                     //       alert('أدخل الايميل بطريقة صحيحة')
                     //    }else{
                     //       alert('Enter valid email')
                     //    }
                     // }
                     // }else{
                     //    if(this.props.Language=='AR'){
                     //       alert('جميع البيانات مطلوبة')
                     //    }else{
                     //       alert('All data required')
                     //    }
                     // }
                     }} 
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "أرسل الطلب" : "Save request"}
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
            {this.props.Language == "AR" ? 'تم أرسال طلبك بنجاح' : 'Your request send successfully'}
            </Text>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible:false})
                  // this.props.navigation.navigate('ConfirmRequest')
                }}
            style={{ width: '40%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حسنا' : 'Done'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
           
         </View>
         
          </Modal>
               </View>
            </ScrollView>
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
       Zones : state.AuthReducer.Zones,
       Cities: state.AuthReducer.Cities,
    }
 }
 // redux
 export default connect(mapStateToProps, { UpdateUser, SetLoading , getZone , getCity , createLecture})(CreateLecture)
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
       shadowOpacity: 0.05,
       shadowRadius: 10,
       elevation: 3,
    },
    container: {
       flex: 1,
       width:width,
       alignItems: 'center',
    },
    inputFields: {
       borderRadius: 3,
       backgroundColor: '#FFF',
       textAlign: 'center',
       paddingTop:3
    },
    button: {
        width:width*0.9,
       backgroundColor: '#28B5AF',
       justifyContent: 'center',
       alignItems: 'center',
       paddingVertical:8,
       borderRadius: 60,
       marginTop: height*0.2,
       marginBottom:20
    },
    modal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
      },
    
 });