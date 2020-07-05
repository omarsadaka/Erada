import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, BackHandler } from 'react-native';
import { Input, Item } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'

import { connect } from 'react-redux' // redux
import { SetLoading , lectureJoin} from './../../../Actions' //redux

class JoinRequest extends Component{

    constructor(props) {
        super(props);
        this.state = {
           date1:'',
           time1:'',
           date2:'',
           time2:'',
           date3:'',
           time3:'',
           isVisible:false,
           awarenessID:'',
           specialistID:this.props.User._id
        };
     }

     componentWillMount(){
      const { navigation } = this.props;
      const Id = navigation.getParam('awarenessID', 'NO-ID');
      this.setState({awarenessID:Id})
     }

     componentWillReceiveProps= async(nextProps)=> {
      if (nextProps.Message != null) {
         if(nextProps.Message=='Your join send successfully'){
            this.setState({ isVisible: true })
            this.setState({date1:'',time1:'',date2:'',time2:'',date3:'',time3:''})
         }else{
            alert(' Error try again')
         }
         
      }
  }
     renderHeader(lang) {
        if (lang == "EN") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <View></View>
                 <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Join request</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }}/>
                 </TouchableOpacity>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#F6F6F6', fontSize: 22 ,fontFamily:'adobe'}}>طلب أنضمام</Text>
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
               visible={this.props.Processing}
               textContent={'Loading...'}
               textStyle={{ color: '#FFF' }}
            />
            {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }} >
               <View style={{width:width,alignItems:'center',}}>
                 <Text style={{ color: '#707070', fontSize: 22,fontFamily:'adobe',textAlign:'center',marginTop:15 }}>
                        {this.props.Language == "AR" ? "برجاء أدخال ثلاث أوقات مناسبة لك" : "Please enter three times as appropriate for you"}
                     </Text>
               
               
             
               <View style={{width:'90%',alignItems:'center',justifyContent:'center',backgroundColor:'#FAFAFA',borderRadius:3,padding:10,marginTop:20}}>
               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { width:'85%',justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "التاريخ" : "Date"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%',height: 40, alignItems: 'center' }]}>
                     <Icon name="calendar" style={{ fontSize: 22,color: '#79E5E1',margin:5 }} />
                        <DatePicker
                         style={{ width:'80%',}}
                            date={this.state.date1}
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
                            
                             borderWidth: 0,borderColor: '#707070',fontSize:14
                           }
                           // ... You can check the source to find the other keys.
                           }}
                           onDateChange={(date1) => {this.setState({date1})}}
                        />
                     </View>
                  </View>

               </View>

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { width:'85%',justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{width:'100%', color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "الوقـت" : "Time"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%', height: 40, alignItems: 'center', }]}>
                     <Icon name="clock-o" style={{ fontSize: 25,color: '#79E5E1',margin:5 }} />
                        <DatePicker
                          style={{ width:'80%',}}
                           date={this.state.time1}
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
                             onDateChange={(time1) => {this.setState({time1})}}
                        />
                     </View>
                  </View>

               </View>
               </View>
               <View style={{width:'90%',alignItems:'center',justifyContent:'center',backgroundColor:'#FAFAFA',borderRadius:3,padding:10,marginTop:10}}>
               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { width:'85%',justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "التاريخ" : "Date"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%',height: 40, alignItems: 'center' }]}>
                     <Icon name="calendar" style={{ fontSize: 22,color: '#79E5E1',margin:5 }} />
                        <DatePicker
                         style={{ width:'80%',}}
                            date={this.state.date2}
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
                            
                             borderWidth: 0,borderColor: '#707070',fontSize:14
                           }
                           // ... You can check the source to find the other keys.
                           }}
                           onDateChange={(date2) => {this.setState({date2})}}
                        />
                     </View>
                  </View>

               </View>

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { width:'85%',justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

               <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{width:'100%', color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "الوقـت" : "Time"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%', height: 40, alignItems: 'center', }]}>
                     <Icon name="clock-o" style={{ fontSize: 25,color: '#79E5E1',margin:5 }} />
                        <DatePicker
                          style={{ width:'80%',}}
                           date={this.state.time2}
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
                             onDateChange={(time2) => {this.setState({time2})}}
                        />
                     </View>
                  </View>

               </View>
               </View>
               <View style={{width:'90%',alignItems:'center',justifyContent:'center',backgroundColor:'#FAFAFA',borderRadius:3,padding:10,marginTop:10}}>
               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { width:'85%',justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{ width:'100%',color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "التاريخ" : "Date"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%',height: 40, alignItems: 'center' }]}>
                     <Icon name="calendar" style={{ fontSize: 22,color: '#79E5E1',margin:5 }} />
                        <DatePicker
                         style={{ width:'80%',}}
                            date={this.state.date3}
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
                            
                             borderWidth: 0,borderColor: '#707070',fontSize:14
                           }
                           // ... You can check the source to find the other keys.
                           }}
                           onDateChange={(date3) => {this.setState({date3})}}
                        />
                     </View>
                  </View>

               </View>

               <View style={[this.props.Language == "AR" ? styles.rowReversed : styles.row, { width:'85%',justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

                  <View style={[styles.row, this.props.Language == "AR" ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { alignItems: 'center', width:'30%' }]}>
                     <Text style={[{width:'100%', color: '#919191', fontSize: 18,fontFamily:'adobe',margin:3 }]}>
                        {this.props.Language == "AR" ? "الوقـت" : "Time"}
                     </Text>
                  </View>

                  <View style={[styles.row, { flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.inputFields, styles.shadow, { width:'100%', height: 40, alignItems: 'center', }]}>
                     <Icon name="clock-o" style={{ fontSize: 25,color: '#79E5E1',margin:5 }} />
                        <DatePicker
                          style={{ width:'80%',}}
                           date={this.state.time3}
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
                             onDateChange={(time3) => {this.setState({time3})}}
                        />
                     </View>
                  </View>

               </View>
               </View>

              

               <View style={[styles.row, { justifyContent: 'center' }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                   onPress={() => {
                      
                      const {date1 , time1 , date2 , time2 , date3 , time3 ,awarenessID , specialistID} = this.state
                      if(date1 && time1 && date2 && time2 && date3 && time3){
                          const obj={
                           awarenessID: awarenessID,
                           specialistID: specialistID ,
                           dateOne:date1,
                           timeOne:time1,
                           dateTwo: date2,
                           timeTwo: time2,
                           dateThree: date3,
                           timeThree: time3
                          }
                          this.props.lectureJoin(obj)
                      }else{
                         if(this.props.Language=='AR'){
                            alert('كل البيانات مطلوبة')
                         }else{
                            alert('All data required')
                         }
                      }
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
             onBackdropPress={() => this.setState({ isVisible: false})}
             swipeDirection="left"
             >
           <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}}/>
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "رسالة تأكيد" : "Confirm SMS"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'سيتم التواصل معك من قبل أدارة التطبيق': 'You will be contacted by the application management'}
            </Text>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible:false})
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
    }
 }
 // redux
 export default connect(mapStateToProps, { SetLoading , lectureJoin })(JoinRequest)
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
       backgroundColor:'#F6F6F6'
    },
    inputFields: {
       borderBottomColor: '#FFF',
       borderRadius: 5,
       backgroundColor: '#FFF',
       textAlign: 'center',
    },
    button: {
        width:width*0.9,
       backgroundColor: '#28B5AF',
       justifyContent: 'center',
       alignItems: 'center',
       paddingVertical:8,
       borderRadius: 60,
       marginTop: 30,
       marginBottom:20
    },
    modal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
      },
    
 });