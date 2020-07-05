import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios'


import { connect } from 'react-redux' // redux
import { SetLoading , getUserReservation} from './../../Actions' //redux


class MyReservation extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[],
            filterData:[],
            specialistData:[],
            filterSpecialistData:[],
            userId:'',
            userData:{},
            isVisible:false,
            selected:null
        };
     }
     
      componentWillMount(){
        // this.props.getUserReservation(this.props.User._id)
        if(this.props.User.loginType==1){
          this.getUserReservation()
        }else{
          this.getSpecialistReservation()
        }
      }
       
      componentWillReceiveProps= async(nextProps)=> {
        if (nextProps.Message != null) {
             alert(nextProps.Message)          
        }
    }

    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>حجوزاتى</Text>
                 {this.props.User.loginType==1?
                 <TouchableOpacity onPress={() => {this.setState({isVisible:true})}} >
                 <Icon name="filter" style={{ color: '#ffffff', fontSize: 25 }} />
                 </TouchableOpacity>
                 :
                 <View style={{width:14 ,}}></View>
                 }
                 
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 {this.props.User.loginType==1?
                 <TouchableOpacity onPress={() => {this.setState({isVisible:true})}} >
                 <Icon name="filter" style={{ color: '#ffffff', fontSize: 25 }} />
                 </TouchableOpacity>
                 :
                 <View style={{width:14}}></View>
                 }
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>My reservation</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     } 

     renderHeader2(lang) {
      if (lang == "EN") {
          return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                  <View></View>
                  <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Arrange by</Text>
                  <TouchableOpacity onPress={() => {this.setState({isVisible:false})}} >
                      <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 }} />
                  </TouchableOpacity>
              </View>
          )
      } else {
          return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                  
                  <TouchableOpacity onPress={() => {this.setState({isVisible:false})}} >
                      <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 }} />
                  </TouchableOpacity>
                  <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>ترتيب حسـب</Text>
                  <View></View>
              </View>
          )
      }
  } 
    
    renderRadio(clicked){
     return(
     <TouchableOpacity
     style={{ width:25 ,height:25 , borderRadius:5,backgroundColor:'#fff',elevation:5,justifyContent:'center',alignItems:'center',margin:5}}
     onPress={()=>{
       this.setState({selected:clicked})
     }}>
       {this.state.selected === clicked?
       <Icon name="check" style={{ color: '#037C5A', fontSize: 20 }} />
       :
       <View style={{display:'none'}}></View>
       }
     </TouchableOpacity>
    )
  }
   
   getUserReservation =()=>{
     this.props.SetLoading(true)
    NetInfo.fetch().then(state =>{
        if (state.isConnected){

        try {
           axios.get('http://68.183.39.113/api/user/getAllReservation',{
            params: {
                userID: this.props.User._id
            }
           })
           .then( (response)=> {
            this.props.SetLoading(false)
                var gData = [];
                var gDataBackup=[]
                console.log(response.data);
                response.data[0].session = response.data[0].session || [];
                response.data[0].session.forEach(element => {
                    const obj={
                        nameAr:'جلسة علاجية',
                        nameEn: 'Session',
                        specialist: element.speicalistID.fullname,
                        description: element.speicalistID.experiences,
                        imgPath: element.speicalistID.imgPath,
                        date: element.date,
                        time: element.time,
                        type:1,
                        status: element.status
                    }
                    gData.push(obj);
                    gDataBackup.push(obj)
                });
                response.data[1].request = response.data[1].request || [];
                response.data[1].request.forEach(element => {
                    const obj={
                        nameAr:'أستشارة',
                        nameEn: 'Consulting',
                        specialist: element.speicalistID.fullname,
                        description: element.speicalistID.experiences,
                        imgPath: element.speicalistID.imgPath,
                        date: element.date,
                        time: element.time,
                        type:1,
                        status: element.status
                    }
                    gData.push(obj);
                    gDataBackup.push(obj)
                });
                response.data[2].event = response.data[2].event || [];
                response.data[2].event.forEach(element => {
                    const obj={
                        id: element._id,
                        nameAr:'برنامج نادى أرادة',
                        nameEn: 'Erada program',
                        imgPath: null,
                        zoneAr: element.zoneID.titleAr,
                        zoneEN: element.zoneID.titleEN,
                        cityAr: element.cityID.titleAr,
                        cityEN: element.cityID.titleEN,
                        paymetStatus: element.paymetStatus,
                        price: element.amount,
                        type:2,
                        key:'Program'
                    }
                    gData.push(obj);
                    gDataBackup.push(obj)
                });
                response.data[3].awareness = response.data[3].awareness || [];
                response.data[3].awareness.forEach(element => {
                    const obj={
                        id: element._id,
                        nameAr:'محاضرة توعية',
                        nameEn: 'Awereness lecture ',
                        imgPath: null,
                        zoneAr: element.zoneID.titleAr,
                        zoneEN: element.zoneID.titleEN,
                        cityAr: element.cityID.titleAr,
                        cityEN: element.cityID.titleEN,
                        paymetStatus: element.paymetStatus,
                        date: element.date,
                        time: element.time,
                        price: element.amount,
                        type:2,
                        key:'Lecture'
                    }
                    gData.push(obj);
                    gDataBackup.push(obj)
                });
                
                this.setState({data: gData})
                this.setState({filterData: gDataBackup})
           }).catch((error)=> {
            this.props.SetLoading(false)
            alert(error)
           }).finally(function () {
               // always executed
           });
       } catch (error) {
        this.props.SetLoading(false)
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

  getSpecialistReservation =()=>{
    this.props.SetLoading(true)
   NetInfo.fetch().then(state =>{
       if (state.isConnected){

       try {
          axios.get('http://68.183.39.113/api/user/getSpecialistReservation',{
           params: {
               id: this.props.User._id
           }
          })
          .then( (response)=> {
           this.props.SetLoading(false)
               var gData = [];
               var gDataBackup=[]
               console.log(response.data);
               response.data[0].eventUser = response.data[0].eventUser || [];
               response.data[0].eventUser.forEach(element => {
                   const obj={
                       nameAr:'برنامج نادي أرادة',
                       nameEn: 'Erada program',
                       cityAr: element.eventID.cityID.titleAr,
                       cityEN: element.eventID.cityID.titleEN,
                       zoneAr: element.eventID.zoneID.titleAr,
                       zoneEN: element.eventID.zoneID.titleEN,                       
                       status: element.status,
                       type:2,
                   }
                   gData.push(obj);
                   gDataBackup.push(obj)
               });
               response.data[1].awarenessRequest = response.data[1].awarenessRequest || [];
               response.data[1].awarenessRequest.forEach(element => {
                   const obj={
                       nameAr:'مجاضرات توعية',
                       nameEn: 'Awareness lectures',
                       cityAr: element.awarenessID.cityID.titleAr,
                       cityEN: element.awarenessID.cityID.titleEN,
                       zoneAr: element.awarenessID.zoneID.titleAr,
                       zoneEN: element.awarenessID.zoneID.titleEN,                       
                       status: element.status,
                       type:2,
                   }
                   gData.push(obj);
                   gDataBackup.push(obj)
               });
               
               this.setState({specialistData: gData})
               this.setState({filterSpecialistData: gDataBackup})
          }).catch((error)=> {
           this.props.SetLoading(false)
           alert(error)
          }).finally(function () {
              // always executed
          });
      } catch (error) {
       this.props.SetLoading(false)
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
  
   filterData(){
      const { selected , filterData}= this.state
       const filterArray = []
      if(selected ==1){
        filterData.forEach(element=>{
          if(element.nameAr=='أستشارة' || element.nameEn=='Consulting'){
            filterArray.push(element)
            this.setState({data: filterArray})
          }
        })
      }else if(selected ==2){
        filterData.forEach(element=>{
          if(element.nameAr=='جلسة علاجية' || element.nameEn=='Session'){
            filterArray.push(element)
            this.setState({data: filterArray})
          }
        })
      }else if(selected ==3){
        filterData.forEach(element=>{
          if(element.nameAr=='محاضرة توعية' || element.nameEn=='Awereness lecture'){
            filterArray.push(element)
            this.setState({data: filterArray})
          }
        })
      }else if(selected ==4){
        filterData.forEach(element=>{
          if(element.nameAr=='برنامج نادى أرادة' || element.nameEn=='Erada program'){
            filterArray.push(element)
            this.setState({data: filterArray})
          }
        })
      }else{
        this.setState({data: this.state.filterData})
      }
   }
     renderItem(item){
        return (
          <TouchableOpacity
        //   onPress={()=>{
           
        //    }}
          style={[styles.viewItem,styles.shadow,{marginVertical:3}]}>
          {item.type==1?
          <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
             <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width: '100%',}]}>
                <View style={{flex:1,justifyContent:'center',paddingHorizontal:10}}>
                <Text style={[this.props.Language == "AR"?styles.right:styles.left,{color: '#707070', fontSize: 24,fontFamily:'adobe' }]}>
                     {this.props.Language == "AR" ? item.nameAr : item.nameEn}
                 </Text>
                 <Text style={[this.props.Language == "AR"?styles.right:styles.left,{color: '#707070', fontSize: 16,fontFamily:'adobe'}]}>
                     {item.specialist}
                 </Text>
                 <Text style={[this.props.Language == "AR"?styles.right:styles.left,{color: '#707070', fontSize: 16,fontFamily:'adobe'}]}>
                     {item.description}
                 </Text>
                </View>
                <View style={{justifyContent:'center',margin:'2%',paddingHorizontal:7}}>
                <Image source={{uri: item.imgPath}} style={{ width:70,height:70,borderRadius:70/2 }} />
                </View>
              </View>
              <View style={{width:'100%',marginTop:5,alignItems:'center',justifyContent:'center'}}>
              <View style={{width:'90%',height:2,backgroundColor:'#E4E4E4'}}/>
              </View>
              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width: '100%',justifyContent:'center',alignItems:'center',marginTop:'3%'}]}>
                <View style={{flex:1,height:'50%',justifyContent:'center',alignItems:'center',}}>
                <Text style={[{color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center'}]}>
                     {this.props.Language == "AR" ?item.status!=1?'منتهى ':'قيد التنفيذ' : item.status!=1?'Pending':'Finished'}
                 </Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="clock-o" style={{ color: '#28B5AF', fontSize: 25 }} />
                <Text style={[{flex:1,color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center'}]}>
                    {item.date.split('T')[0]}
                 </Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Icon name="calendar" style={{ color: '#28B5AF', fontSize: 25 }} />
                <Text style={[{flex:1,color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center'}]}>
                     {item.time}
                 </Text>
                </View>
              </View>
          </View>
          :
          <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
            <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width: '100%',height:'50%'}]}>
                <View style={{flex:1,justifyContent:'center',paddingHorizontal:10}}>
                <Text style={[this.props.Language == "AR"?styles.right:styles.left,{color: '#707070', fontSize: 24,fontFamily:'adobe' }]}>
                     {this.props.Language == "AR" ? item.nameAr : item.nameEn}
                 </Text>
                 <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
                 <Text style={[this.props.Language == "AR"?styles.right:styles.left,{flex:1,color: '#707070', fontSize: 16,fontFamily:'adobe',margin:5}]}>
                     {this.props.Language == "AR" ? item.zoneAr + ' - ' + item.cityAr  : item.zoneEN + ' - ' + item.cityEN }
                 </Text>
                 <Icon name="map-marker" style={{ color: '#9A9A9A', fontSize: 30,margin:5 }} />
                 </View>
                </View>
                <View style={{justifyContent:'center',margin:'3%'}}>
                <Image source={require('./../../../img/logo.png')} style={{ width:70,height:70 }} />
                </View>
              </View>
              <View style={{width:'100%',marginTop:5,alignItems:'center',justifyContent:'center'}}>
              <View style={{width:'90%',height:2,backgroundColor:'#E4E4E4'}}/>
              </View>
              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width: '100%',height:'40%',justifyContent:'center',alignItems:'center',marginTop:'3%'}]}>
              {item.paymetStatus ==1?
               <TouchableOpacity
               onPress={() => {
                 if(item.key=='Program'){
                   const obj={
                     id: item.id,
                     cityAr: item.cityAr,
                     cityEN: item.cityEN,
                     zoneAr: item.zoneAr,
                     zoneEN: item.zoneEN,
                     price: item.price
                   }
                  this.props.navigation.navigate('ProgramRequest2',{OBJ:JSON.stringify(obj)})
                 }else{
                  const obj={
                    id: item.id,
                    cityAr: item.cityAr,
                    cityEN: item.cityEN,
                    zoneAr: item.zoneAr,
                    zoneEN: item.zoneEN,
                    price: item.price,
                    date: item.date,
                    time: item.time
                  }
                  this.props.navigation.navigate('ConfirmRequest',{OBJ:JSON.stringify(obj)})
                 }
               
               }}
               >
               <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{flex:1,justifyContent:'center',alignItems:'center',}]}>
                {this.props.Language=='AR'?
                <Icon name="chevron-left" style={{ color: '#28B5AF', fontSize: 12,margin:7 }} />
                :
                <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 12,margin:7 }} />
                }
               
               <Text style={[{color: '#707070', fontSize: 14,fontFamily:'adobe',textAlign:'center'}]}>
                    {this.props.Language == "AR" ? 'دفع الأشتراك' : 'Pay practice'}
                </Text>
               </View>
               </TouchableOpacity>
              :
              <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
              <Icon name="check" style={{ color: '#28B5AF', fontSize: 25 }} />
              <Text style={[{flex:1,color: '#707070', fontSize: 14,fontFamily:'adobe',textAlign:'center'}]}>
                   {this.props.Language == "AR" ? 'تم الأشتراك' : 'Has practice'}
               </Text>
              </View>
              }
               

                <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                <Icon name="clock-o" style={{ color: '#28B5AF', fontSize: 25 }} />
                <Text style={[{flex:1,color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center'}]}>
                  { item.date?item.date.split('T')[0]:'No date'}
                 </Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                <Icon name="calendar" style={{ color: '#28B5AF', fontSize: 25 }} />
                <Text style={[{flex:1,color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center'}]}>
                    {item.time? item.time:'No time'}
                 </Text>
                </View>
              </View>
          </View>
          }
            
          </TouchableOpacity>
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
            <FlatList style={{width:'95%',marginTop:10,marginBottom:'7%'}}
                        data={this.props.User.loginType==1?this.state.data:this.state.specialistData}
                        numColumns={1}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        // ref={ref => this.flatList = ref}
                        // onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                        // onLayout={() => this.flatList.scrollToEnd({animated: true})}
                        />

           <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{height:'70%'}]}>
          {this.renderHeader2(this.props.Language)}
            <View style={[{ width:'100%',justifyContent: 'center', alignItems: 'center' }]} >
                 <View style={{width:'100%',height:1,backgroundColor:'#F5E5B6',marginTop:10}}></View>
                 <View style ={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
                     <Text style={{width:'77%',fontSize:20,fontFamily:'adobe',color:'#5A5A5A',margin:10,}}>{this.props.Language == "AR"?'أستشارات':'Advices'}</Text>
                    {this.renderRadio(1)}
                  </View>
                  <View style={{width:'100%',height:1,backgroundColor:'#F5E5B6'}}></View>
                 <View style ={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
                     <Text style={{width:'77%',fontSize:20,fontFamily:'adobe',color:'#5A5A5A',margin:10,}}>{this.props.Language == "AR"?'جلسات علاجية':'Therapeutic sessions'}</Text>
                    {this.renderRadio(2)}
                  </View>
                  <View style={{width:'100%',height:1,backgroundColor:'#F5E5B6'}}></View>
                 <View style ={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
                     <Text style={{width:'77%',fontSize:20,fontFamily:'adobe',color:'#5A5A5A',margin:10,}}>{this.props.Language == "AR"?'المحاضرات التوعية':'Awereness lectures'}</Text>
                    {this.renderRadio(3)}
                  </View>
                  <View style={{width:'100%',height:1,backgroundColor:'#F5E5B6'}}></View>
                 <View style ={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
                     <Text style={{width:'77%',fontSize:20,fontFamily:'adobe',color:'#5A5A5A',margin:10,}}>{this.props.Language == "AR"?'برامـج':'Programs'}</Text>
                    {this.renderRadio(4)}
                  </View>
                  <View style={{width:'100%',height:1,backgroundColor:'#F5E5B6'}}></View>
            </View>

            <View style={[{ justifyContent: 'center', alignItems: 'center',position:'absolute',bottom:7 }]}>
            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                <TouchableOpacity 
                onPress={() => { 
                  this.setState({isVisible:false})
                  this.filterData() 
                }} 
                style={[styles.shadow,{width:'90%',alignItems:'center'}]} >
                <Text style={{ color: '#FFF', fontSize: 22,fontFamily:'adobe' }}>
                {this.props.Language == "AR" ? 'تنفيذ ' : 'Apply filter'}
                </Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
           
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
      AllReservation: state.AuthReducer.AllReservation
      
    }
 }
 // redux
 export default connect(mapStateToProps, { SetLoading , getUserReservation})(MyReservation)
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
       height: 0,
     },
     shadowOpacity: 0.2,
     shadowRadius: 10,
     elevation: 3,
   },
   row: {
     flexDirection: 'row',
   },
   row_reserve: {
     flexDirection: 'row-reverse',
   },
   viewItem:{
     width:'100%',
     height:height*0.3,
     backgroundColor:'#FCFCFC',
     borderRadius:6,
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   },
   modal:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:5,
  },
  button: {
    width: width - (36 * 2) + 10,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
},
   
 });
