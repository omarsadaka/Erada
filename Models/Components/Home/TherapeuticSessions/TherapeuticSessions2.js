import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image,AsyncStorage} from 'react-native';
const { width, height } = Dimensions.get('window')
import {TextInput, Input, Item } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux' // redux
import { SetLoading , getSpecialist } from './../../../Actions' //redux


class TherapeuticSessions2 extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[],
            userId:'',
            userData:{},
            bg1:'#FFFFFF',
            bg2:'#F6F6F6'
        };
     }
     componentWillMount(){
      // this.props.getSpecialist(3)
      this.getData(3)
    }
    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>جلسات علاجية</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Therapeutic sessions</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     getData(type){
      NetInfo.fetch().then(state =>{
        if (state.isConnected){
          this.props.SetLoading(true)
        try {
           axios.get('http://68.183.39.113/api/user/getCollaboratorType',{
              params: {
                type: type
              }
           }).then((response)=> {
            this.props.SetLoading(false)
            const Data = response.data;
            const specialist = []
            if(Data.length >0){
                for (let index = 0; index < Data.length; index++) {
                    var obj = {
                        fullname:Data[index].fullname,
                        experiences: Data[index].experiences,
                        imgPath: Data[index].imgPath,
                        id:Data[index]._id
                    }
                    specialist.push(obj)
                }
                this.setState({data: specialist})
                this.setState({filterData: specialist})
            }else{
              if(this.props.Language=='AR'){
                alert('لا يوجد متخصصين')
              }else{
                alert('No specialists')
              }
                this.setState({data:[]})
            }
           }).catch((error)=> {
            this.props.SetLoading(false)
               alert(error.Message)
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

     search(word){
      const filterArray=[]
      if(word!=''){
       this.state.data.forEach(element => {
         if(element.fullname.includes(word)){
            filterArray.push(element)
             this.setState({data: filterArray})
         }
      });
      }else{
       this.setState({data: this.state.filterData})
      }
       
    }

     renderItem(item){
        return (
        <View style={{ width: width * 0.7,padding: 2, flexDirection: 'row', }}>
          <TouchableOpacity
          onPress={()=>{
            const obj = {
              fullname: item.fullname,
              experiences: item.experiences,
              imgPath: item.imgPath,
              id: item.id
          }
            AsyncStorage.setItem('SpecialistData', JSON.stringify(obj))
            this.props.navigation.navigate('Session')
           }}
          style={[styles.viewItem,styles.shadow,{margin:5}]}>
              <View style={[{width: '100%',justifyContent:'center',alignItems:'center'}]}>
                <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width: '100%',paddingTop:10}]}>
                  <View style={{margin:5}}>
                    <Icon  name="star" size={18} color="#FFE000"/>
                    <Text style={{color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center' }}>
                     {this.props.Language == "AR" ? '5.3' : '5.3'}
                   </Text>
                  </View>
                  <View style={{flex:1,alignItems:'center',marginEnd:'6%',}}>
                  {item.imgPath?
                   <Image
                   source={{uri: item.imgPath}}
                   style={{  width: 90,height:90,alignItems: 'center',borderRadius:90/2}}/>
                   :
                   <Image
                    resizeMode = 'contain'
                    source={require('./../../../../img/user.png')}
                    style={{  width: 100,height:100,alignItems: 'center',}}/>
                   }
                     <Text style={{width:'95%',color:'#262626', fontSize: 14,fontFamily:'adobe',textAlign:'center',fontWeight:'bold'}}>
                     {item.fullname}</Text>
                 <Text style={{width:'95%',color:'#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center'}}>
                 {item.experiences}</Text>
                  </View>
                </View>
                <View style={{width:'90%',height:1,backgroundColor:'#E4E4E4',marginTop:5,marginBottom:10}}/>
                 <Text style={{width:'100%',color:'#393939', fontSize: 13,fontFamily:'adobe',textAlign:'center',fontWeight:'bold'}}>
                     {this.props.Language == "AR" ? 'أقرب موعد' : 'The earliest date'}
                 </Text>
            
                 <View style={[this.props.Language == "AR" ? styles.row : styles.row_reserve,{width: '90%',height:60,alignItems:'center',justifyContent:'center',marginTop:5,marginBottom:5}]}>
                 <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Icon  name="clock-o" size={22} color="#79E5E1"/>
                    <Text style={{color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center' }}>
                     {this.props.Language == "AR" ? '2:00 - 2:20 م' : '2:00 - 2:20 Pm'}
                   </Text>
                  </View>
                  <View style={{width:1,height:45,backgroundColor:'#E4E4E4',}}/>
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Icon  name="calendar" size={22} color="#79E5E1"/>
                    <Text style={{color: '#707070', fontSize: 18,fontFamily:'adobe',textAlign:'center' }}>
                     {this.props.Language == "AR" ? '19-2-2020' : '19-2-2020'}
                   </Text>
                  </View>
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
            <View style={{width:'100%',height:height,alignItems:'center',justifyContent:'center'}}>
              <View style={[this.props.Language == "AR" ? styles.row :styles.row_reserve,{width:'100%',alignItems:'center',justifyContent:'center'}]}>
              <TouchableOpacity 
                onPress={() => {
                  this.setState({bg1:'#FFFFFF'})
                  this.setState({bg2:'#F6F6F6'})
                  // this.props.getSpecialist(3)
                  this.getData(3)
                }}
                   style={[styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg1 }]} >
                 <Text style={{fontSize: 20,color:'#707070',fontFamily:'adobe',textAlign:'center',padding:3}}>
                   {this.props.Language == "AR" ? 'نطق وتخاطب' : 'Speech specialist'}</Text>
               </TouchableOpacity>
               <View style={{width:'2%'}}></View>
               <TouchableOpacity 
                onPress={() => {
                  this.setState({bg1:'#F6F6F6'})
                  this.setState({bg2:'#FFFFFF'})
                  // this.props.getSpecialist(2)
                  this.getData(2)
                }}
                   style={[styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:this.state.bg2 }]} >
                 <Text style={{fontSize: 20,color:'#707070',fontFamily:'adobe',textAlign:'center',padding:3}}>
                   {this.props.Language == "AR" ? 'أخصائى نفسى' : 'Psychologist'}</Text>
               </TouchableOpacity>
              </View>

              <View style={[styles.view,this.props.Language == "AR" ? styles.row : styles.row_reserve,{marginTop:20,height:40}]}>
              <Icon style={{paddingHorizontal:10}} name="search" size={20} color="#79E5E1"/>
              <TextInput
                underlineColorAndroid= 'transparent'
                style={{ color:'#000',width:'80%',fontSize:20,fontFamily:'adobe',height:'100%',paddingVertical:'1%'}}
                textAlign={'center'}
                placeholder={this.props.Language == "AR" ? 'البحـث' : 'Search'}
                placeholderTextColor='#707070'
                onChangeText={(text) => {
                  this.search(text)
                }}
              />
              </View>
            <FlatList style={{marginTop:5,marginBottom:'21%'}}
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
       Specialist: state.AuthReducer.Specialist
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading, getSpecialist})(TherapeuticSessions2)
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
 });
