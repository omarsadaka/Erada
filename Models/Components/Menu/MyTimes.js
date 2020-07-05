import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,ScrollView,
    FlatList,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import {TextInput, Input, Item } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import moment from "moment";
import PropTypes from 'prop-types';

import { ModalProvider } from '@cawfree/react-native-modal-provider';
import MaterialMenuModal from '@cawfree/react-native-modal-provider/RNModalProvider/src/components/MaterialMenuModal';
import SimpleDatePicker from '../SimpleDatePicker';

import CalendarPicker from 'react-native-calendar-picker';

import { connect } from 'react-redux' // redux
import { SetLoading , getTimes } from './../../Actions' //redux


const daysEn = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = ["الأحد","الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعه", "السبت"];


class MyTimes extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            times:[],
            bg1:'#FFFFFF',
            bg2:'#F6F6F6',
            arrowCount: 0,
            weekObject: [],
            selectedDate: {
              day: null,
              date: null
            },
            isVisible:false,
            isVisible2:false,
            isVisible3:false,
            startTime:'',
            endTime:'',
            newEndTime:'',
            newStartTime:'',
            flag:0,
            id:'',
            selectedStartDate: null,
            date:'',
            timeType:2

            
        };
     }

     componentDidMount() {
       this.setState({date: new Date()})
      this.dateCreator();
      this.getTime(2)

       let today = new Date();
       let date= today.getFullYear()+ "-"+ parseInt(today.getMonth()+1)+"-"+today.getDate() ;
       this.setState({date})
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   return (
    //     this.state.weekObject != nextState.weekObject ||
    //     this.state.selectedDate != nextState.selectedDate
    //   );
    // }

    onDateChange(date) {
      this.setState({
        selectedStartDate: date,
      });
    }

    dateCreator = () => {
      const daysArray = days;
      let weekObject = [...this.state.weekObject];
      weekObject[this.state.arrowCount] = [];
      let todaysDateIndex = daysArray.indexOf(moment().format("ddd"));
      for (let day in daysArray) {
        let selectedWeekDaySet =
          day - todaysDateIndex + this.state.arrowCount * 7;
        let calenderDay = daysArray[day];
        let dateObject = {
          day: calenderDay,
          date: moment()
            .add(selectedWeekDaySet, "day")
            .format(this.props.dateFormat),
          monthYear: moment()
            .add(selectedWeekDaySet, "day")
            .format("MMMM YYYY")
        };
        weekObject[this.state.arrowCount][day] = dateObject;
      }
      this.setState({ weekObject });
    };

    handlePress = date => {
      if (
        this.state.selectedDate.day == date.day &&
        this.state.selectedDate.date == date.date
      ) {
        this.setState({ selectedDate: { day: null, date: null } });
      } else{
        let dates = {
          day: date.day,
          date: date.date
        }
        this.setState({
          selectedDate: {
            day: date.day,
            date: date.date
          }
        }, this.props.selected(dates));
      }
    };
    
      handleArrowChange = time => {
        this.setState({ arrowCount: this.state.arrowCount - time }, () => {
          this.dateCreator();
        });
      };
    
      handleMonthYearComponent = () => {
        if(this.state.weekObject.length > 0)
        return <Text  style={[styles.dateComponentYearText,styles.shadow,{marginTop:20}]}>{this.state.weekObject[this.state.arrowCount][3].monthYear}</Text>
      }

    
      handleDateComponentDisplay = () => {
        
        return this.state.weekObject[this.state.arrowCount].map((date, index) => {
            var omarDate = date.date.split('-')[2]
            let isPressed =
            this.state.selectedDate.day == date.day &&
            this.state.selectedDate.date == date.date;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.handlePress.bind(date)}
              style={styles.dateComponentDateTouchable}
              >
             <Text style={[styles.text,styles.shadow,isPressed  ? styles.pressed : styles.unPressed,{ }]}>
                {date.date}
              </Text>
              <Text style={{fontFamily:'adobe',fontSize:16,color:'#707070'}}>
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        });
      };
     

    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>أوقاتى</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>My time</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7}}/>
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderItem(item ,index){
         return(
          <View style={[styles.shadow,{width:'98%',alignItems:'center',backgroundColor:'#FCFCFC',borderRadius:5,padding:5,marginBottom:10,margin:3}]}>
          <View style={[this.props.Language == "AR" ? styles.strat : styles.end,{width:'90%'}]}>
           <TouchableOpacity
           onPress={() => {
             if (this.state.id === item.id){
              this.setState({id: '' });
            } else {
              this.setState({id:item.id });
            }
           }}> 
          <Icon name="ellipsis-h" style={{color: '#707070', fontSize: 18}}/>
           </TouchableOpacity>
          </View>
        <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center',justifyContent:'center',}]}>
          <Text style={{ flex:1,color: '#BDBDBD', fontSize: 18,fontFamily:'adobe',textAlign:'center',
          backgroundColor:'#fff',borderRadius:5,borderColor:'#F5F5F5',borderWidth:1}}>{item.endTime} </Text>

          <Text style={{color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center',margin:7}}>
                  {this.props.Language == "AR" ? "الى" : "To"}
          </Text>

          <Text style={{ flex:1,color: '#BDBDBD', fontSize: 18,fontFamily:'adobe',textAlign:'center',
          backgroundColor:'#fff',borderRadius:5,borderColor:'#F5F5F5',borderWidth:1}}>{item.startTime} </Text>
       </View>
        {this.state.id != item.id?
        <View style={{display:'none'}}></View>
        :
        <View style={[styles.shadow,this.props.Language == "AR" ? styles.posLeft : styles.posRight,{width:70,alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'#fff',borderRadius:5}]}>
        <TouchableOpacity
        onPress={() => {
          this.setState({ isVisible3: true })
        }}>
        <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{alignItems:'center',justifyContent:'center',}]}>
        <Text style={{width:40,color: '#707070', fontSize: 16,fontFamily:'adobe',textAlign:'center',margin:1}}>
                {this.props.Language == "AR" ? "تعديل" : "Edit"}
        </Text>
        <Icon name="pencil" style={{color: '#A5A5A5', fontSize: 14,margin:1,}} />
        </View>
        </TouchableOpacity>
        <View style={{width:'90%',height:1,backgroundColor:'#F6F6F6'}}></View>
        <TouchableOpacity
        onPress={() => {
          this.setState({ isVisible2: true })
        }}>
        <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{alignItems:'center',justifyContent:'center',}]}>
        <Text style={{width:40,color: '#707070', fontSize: 16,fontFamily:'adobe',textAlign:'center',margin:1}}>
                {this.props.Language == "AR" ? "مسح" : "Delete"}
        </Text>
        <Icon name="trash" style={{color: '#A5A5A5', fontSize: 14,margin:1,}} />
        </View>
        </TouchableOpacity>
     </View>
        }
        
        <Modal
             isVisible={this.state.isVisible2}
             onBackdropPress={() => this.setState({ isVisible2: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible2:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
               {this.props.Language == "AR" ? "تنبيه" : "Alert"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'هل انت متأكد أنك تريد مسح الوقت ؟' : 'Are you sure you want to delete this time ?'}
            </Text>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center',justifyContent:'space-evenly'}]}>
            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '45%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible2:false})
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
                  // var array = [...this.state.times]; // make a separate copy of the array
                  // array.splice(index, 1);
                  // this.setState({times: array});
                  this.setState({
                    times: this.state.times.filter(item => item.id != this.state.id)
                  });
                  this.setState({isVisible2:false})
                  this.deleteTime(this.state.id)
                  
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'تأكيد المسح' : 'Confirm Delete'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>

            </View>
         </View>
          </Modal>
        
          <Modal
             isVisible={this.state.isVisible3}
             onBackdropPress={() => this.setState({ isVisible3: false })}
             swipeDirection="left"
             >
           <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible3:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:3}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "تعديل الوقت" : "Edit time"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>

            <Icon name="clock-o" style={{ color: '#47D9D3', fontSize: 70,margin:5 }} />
            
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'85%',alignItems:'center'}]}>
              <View style={[styles.row,styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',borderRadius:3 }]} >
                        <DatePicker
                          style={{ width:'100%',}}
                           date={this.state.newEndTime}
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
                             onDateChange={(newEndTime) => {this.setState({newEndTime})}}
                        />
                  </View>
                  <Text style={{color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center',margin:7}}>
                  {this.props.Language == "AR" ? "الى" : "To"}
                 </Text>
                  <View style={[styles.row,styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',borderRadius:3 }]} >
                        <DatePicker
                          style={{ width:'100%',}}
                           date={this.state.newStartTime}
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
                             onDateChange={(newStartTime) => {this.setState({newStartTime})}}
                        />
                  </View>
            </View>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                  this.state.times[index].startTime = this.state.newStartTime
                  this.state.times[index].endTime = this.state.newEndTime
                  this.setState({isVisible3:false})
                  this.editTime(this.state.id)
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حفظ' : 'Save'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
         </View>
          </Modal>

       </View>
         )
     }

     getTime(type){
      NetInfo.fetch().then(state =>{
        if (state.isConnected){
          this.props.SetLoading(true)
        try {
           axios.get('http://68.183.39.113/api/user/userTimeByDate',{
            params: {
              id: this.props.User._id,
              date: this.state.date,
              timeType: type
             }
           }).then((response)=> {
            this.props.SetLoading(false)
            const Data = response.data;
            const time = []
            for (let index = 0; index < Data.length; index++) {
              var obj = {
                   id:Data[index]._id,
                   startTime:Data[index].timeFrom,
                   endTime:Data[index].timeTo,
                   date: Data[index].date
              }
           
              time.push(obj)
            }
             this.setState({times:time})
           }).catch((error)=> {
            this.props.SetLoading(false)
               alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        this.props.SetLoading(false)
         alert('حدث خطأ ما حاول مرة أخرى')
       }
       
     } else {
       alert('No Internet connection')
       }
     });
     }
     
     addTime(){
      NetInfo.fetch().then(state =>{
        if (state.isConnected){
          this.props.SetLoading(true)
        try {
           axios.post('http://68.183.39.113/api/user/userTime',{
             userID: this.props.User._id,
             date: this.state.date,
             timeFrom: this.state.startTime,
             timeTo: this.state.endTime,
             timeType: this.state.timeType
           }).then((response)=> {
             if(response.data._id){
              this.props.SetLoading(false)
                if(this.props.Language=='AR'){
                  alert('تم أضافة الوقت')
                }else{
                  alert('time added')
                }

                // var _id = Math.floor(Math.random() * 100) + 1 ;
                // this.setState({isVisible:false})
                // const obj ={
                //   id:_id,
                //   startTime:this.state.startTime,
                //   endTime:this.state.endTime
                // }
                // this.state.times.push(obj)

             }
           }).catch((error)=> {
            this.props.SetLoading(false)
               alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        this.props.SetLoading(false)
         alert('حدث خطأ ما حاول مرة أخرى')
       }
       
     } else {
       alert('No Internet connection')
       }
     });
     }
     deleteTime(id){
      NetInfo.fetch().then(state =>{
        if (state.isConnected){
          this.props.SetLoading(true)
        try {
           axios.put('http://68.183.39.113/api/user/userTime/'+ id,{
            status: 3
           }).then((response)=> {
             if(response.data._id){
              this.props.SetLoading(false)
                alert('time deleted')
             }
           }).catch((error)=> {
            this.props.SetLoading(false)
               alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        this.props.SetLoading(false)
         alert('حدث خطأ ما حاول مرة أخرى')
       }
       
     } else {
       alert('No Internet connection')
       }
     });
     }

     editTime(id){
      NetInfo.fetch().then(state =>{
        if (state.isConnected){
          this.props.SetLoading(true)
        try {
           axios.put('http://68.183.39.113/api/user/userTime/'+id,{
            userID: this.props.User._id,
            date: this.state.date,
            timeFrom: this.state.newStartTime,
            timeTo: this.state.newEndTime,
            timeType: this.state.timeType
           }).then((response)=> {
             if(response.data._id){
              this.props.SetLoading(false)
                alert('time updated')
             }
           }).catch((error)=> {
            this.props.SetLoading(false)
               alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        this.props.SetLoading(false)
         alert('حدث خطأ ما حاول مرة أخرى')
       }
       
     } else {
       alert('No Internet connection')
       }
     });
     }

    render(){

    //  const renderListItem = this.state.times.map((item , index) =>(
      
    //  ))

    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        return(
            <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#28B5AF" barStyle="light-content"
             />
            <Spinner
              visible={this.props.Processing}
              textContent={this.props.Language == "AR" ? 'تحميل...' : 'Loading...'}
              textStyle={{color: '#FFF'}}
            />
            {this.renderHeader(this.props.Language)}
            <View style={{width:'100%',height:height,alignItems:'center',}}>
              <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
              <TouchableOpacity 
                onPress={() => {
                  this.setState({bg1:'#FFFFFF'})
                  this.setState({bg2:'#F6F6F6'})
                  this.setState({timeType:2})
                  this.getTime(2)
                }}
                   style={[styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg1 }]} >
                 <Text style={{fontSize: 20,color:'#707070',fontFamily:'adobe',textAlign:'center',padding:3}}>
                   {this.props.Language == "AR" ? 'الجلسات' : 'Sessions'}</Text>
               </TouchableOpacity>
               <View style={{width:'2%'}}></View>
               <TouchableOpacity 
                onPress={() => {
                  this.setState({bg1:'#F6F6F6'})
                  this.setState({bg2:'#FFFFFF'})
                  this.setState({timeType:1})
                  this.getTime(1)
                }}
                   style={[styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg2 }]} >
                 <Text style={{fontSize: 20,color:'#707070',fontFamily:'adobe',textAlign:'center',padding:3}}>
                   {this.props.Language == "AR" ? 'الأستشارات' : 'Consulting'}</Text>
               </TouchableOpacity>
              </View>
             
              {/* {this.handleMonthYearComponent()} */}
              <View 
              style={[styles.dateComponentView,{marginTop:10}]}
              // style={{width:'95%',marginTop:5,}}
              >
                     <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,styles.date,styles.shadow, {width:'85%',height: 45, alignItems: 'center' }]}>
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
                           onDateChange={(date) => {
                             this.setState({date})
                             this.getTime(this.state.timeType)
                            }}
                        />
                     </View>

              {/* <View style={styles.dateComponentDateView}>
               <TouchableOpacity 
               onPress={() => this.handleArrowChange(1) }>
               <Icon name="chevron-left" style={{color: '#28B5AF', fontSize: 14,margin:5,}} />
               </TouchableOpacity>
                 {this.state.weekObject.length != 0 &&
                  this.handleDateComponentDisplay()}
              <TouchableOpacity onPress={() => this.handleArrowChange(-1)}>
              <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 14,margin:5 }} />
           </TouchableOpacity>
            </View> */}

            {/* *************************************** */}

           {/* <ModalProvider
          ModalComponent={MaterialMenuModal}
          position={({ x, y, width, height }) => ({
          position: 'absolute',
          left: 10,
         // XXX: Apply some additional padding.
          top: 10,
         })}
        >
    
        <SimpleDatePicker
       />
       </ModalProvider> */}

       {/* ********************************************* */}

       {/* <CalendarPicker
        todayBackgroundColor="#79E5E1"
        selectedDayColor="#000"
        selectedDayTextColor="#fff"
        textStyle={{
          fontFamily: 'adobe',
          color: '#707070',
        }}
       
          onDateChange={this.onDateChange.bind(this)}
        /> */}
         </View>

          {this.state.times.length === 0?
           <View style={{width:'50%',alignItems:'center',justifyContent:'center',marginTop:height*0.1,}}>
           <Icon name="clock-o" style={{ color: '#E4E4E4', fontSize: 100,margin:10 }} />
           <Text style={{ width:'50%',color: '#D9D7D7', fontSize: 18,fontFamily:'adobe',alignItems:'center'}}>
                  {this.props.Language == "AR" ? 'لم يتم أضافة وقت متاح فى هذا اليوم' :'No time was available on this day' }
             </Text>
         </View>
          :
          <View style={{width:'100%',height:height*0.6,alignItems:'center',justifyContent:'center',marginTop:'7%'}}>
            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} > */}
          <FlatList style={{width:'85%',}}
                      data={this.state.times}
                      numColumns={1}
                      renderItem={({item,index})=>this.renderItem(item,index)}
                      keyExtractor={(item, index) => index.toString()}
                      />
                      {/* {renderListItem}
            </ScrollView>        */}
          </View>
          }
         

              <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'90%',alignItems:'center',position:'absolute',bottom:'13%'}]}>
              <TouchableOpacity
              onPress={() => {this.setState({isVisible:true}) }}>
              <Icon name="plus-circle" style={{ color: '#28B5AF', fontSize: 30,margin:10 }} />
              </TouchableOpacity>
              <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'80%',height:35,alignItems:'center',backgroundColor:'#EFEEEE'}]}>
              <Text style={{ color: '#707070', fontSize: 18,fontFamily:'adobe',paddingHorizontal:15 }}>
                   {this.props.Language == "AR" ? '0  ساعة /شهر' :'0  Hour/Month' }
              </Text>
                 <View style={{height:25,width:1,backgroundColor:'#C1C1C1'}}></View>
              <Text style={[{ color: '#28B5AF', fontSize: 20,fontFamily:'adobe',paddingHorizontal:15}]}>
                   {this.props.Language == "AR" ? this.state.timeType==1?'وقت الأستشارات':'وقت الجلسات' :this.state.timeType==1?'Consulting time':'Session time'}
              </Text>
              <Icon name="clock-o" style={{ color: '#28B5AF', fontSize: 30,margin:10 }} />
              </View>
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
               <Icon name="close" size={15} color="#000" style={{margin:3}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "أضافة وقت" : "Add time"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>

            <Icon name="clock-o" style={{ color: '#47D9D3', fontSize: 70,margin:5 }} />
            
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'85%',alignItems:'center'}]}>
              <View style={[styles.row,styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',borderRadius:3 }]} >
                        <DatePicker
                          style={{ width:'100%',}}
                           date={this.state.endTime}
                           placeholder={ this.props.Language == "AR" ? "النهاية" : "End"}
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
                             onDateChange={(endTime) => {this.setState({endTime})}}
                        />
                  </View>
                  <Text style={{color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center',margin:7}}>
                  {this.props.Language == "AR" ? "الى" : "To"}
                 </Text>
                  <View style={[styles.row,styles.shadow, { flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff',borderRadius:3 }]} >
                        <DatePicker
                          style={{ width:'100%',}}
                           date={this.state.startTime}
                           placeholder={ this.props.Language == "AR" ? "البداية" : "Start"}
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
                             onDateChange={(startTime) => {this.setState({startTime})}}
                        />
                  </View>
            </View>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                  if(this.state.startTime){
                      if(this.state.endTime){
                        var _id = Math.floor(Math.random() * 100) + 1 ;
                        this.setState({isVisible:false})
                        const obj ={
                          id:_id,
                          startTime:this.state.startTime,
                          endTime:this.state.endTime
                        }
                        this.state.times.push(obj)
     
                        this.addTime()
                      }else{
                        if(this.props.Language=='AR'){
                          alert('أدخل نهاية الوقت')
                        }else{
                          alert('Enter end time')
                        }
                      }
                  }else{
                    if(this.props.Language=='AR'){
                      alert('أدخل بداية الوقت')
                    }else{
                      alert('Enter start time')
                    }
                  }
                 
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حفظ' : 'Save'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
         </View>
          </Modal>

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
       Times: state.AuthReducer.Times
    }
 }
 // redux

 MyTimes.defaultProps = {
    iconSize: 30,
    dateFormat: "D",
    pressedColor: "#fff",
    depressedColor: "#7d7c7b",
}
 MyTimes.PropTypes = {
    iconSize: PropTypes.number,
    dateFormat: PropTypes.string,
    pressedColor: PropTypes.string,
    depressedColor: PropTypes.string,
    selected: PropTypes.func
  }
 export default connect(mapStateToProps, {SetLoading , getTimes})(MyTimes)

 const styles = StyleSheet.create({
   container: {
     width: width,
     alignItems: 'center',
     backgroundColor:'#F6F6F6'
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
     alignItems:'center',
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   },
   view:{
     width:width*0.85,
     backgroundColor:'#FFFFFF',
     borderRadius:60,
     alignItems:'center',
   },
   dateComponentView: {
    width:'95%', 
    flexDirection: "row" , 
    alignItems: 'center',
    justifyContent:'center'
  },
  dateComponentYearText: {
    color: '#707070', fontSize: 20,
    backgroundColor:'#fff',padding:7,
    borderRadius:5
  },
  dateComponentDateTouchable: {
    flex: 1,
    flexDirection: "column",
    color: "#7d7c7b",
    alignItems: "center"
  },
  dateComponentDateView: {
    flex: 1, flexDirection: "row", marginTop: 10
  },
  pressed:{
    backgroundColor:'#79E5E1'
  },
  unPressed:{
    backgroundColor:'#fff',
  },
  text:{
      width:30,
      height:30,
      borderRadius:30/2,textAlign:'center',textAlignVertical:'center',
      color:'#707070',
      fontFamily:'adobe',
      fontSize:18
  },
  modal:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:8,
  },
  strat:{
    alignItems:'flex-start'
  },
  end:{
    alignItems:'flex-end'
  },
  posLeft:{
    top:20,left:0
  },
  posRight:{
    top:20,right:0
  },
  date:{
    borderRadius: 5,
    backgroundColor: '#FFF',
    textAlign: 'center',
  }
 });
