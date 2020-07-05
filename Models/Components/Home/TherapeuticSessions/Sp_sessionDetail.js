import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage, ScrollView,Image } from 'react-native';
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import { SetLoading , getSessionById , StartChat } from './../../../Actions' //redux


class Sp_sessionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioSelected1:this.props.SessionByID.type,
            radioSelected2:this.props.SessionByID.level,
            radioSelected3:this.props.SessionByID.stutteringSide,
            radioSelected4:this.props.SessionByID.anotherOne,
            radioSelected5:this.props.SessionByID.family,
            isVisible:false,
        };
    }

    componentWillMount(){
        const { navigation } = this.props;
        const id = navigation.getParam('ID', 'NO-ID');
        this.props.getSessionById(id)
    }

    componentWillReceiveProps= async(nextProps)=> {
        if (nextProps.Message != null) {
           if(nextProps.Message =='Start chat done'){
            const obj={
                userID: this.props.SessionByID.usrID,
                fullname: this.props.SessionByID.fullname,
                imgPath: this.props.SessionByID.imgPath,
                type: this.props.SessionByID.type,
                key:2,
                sessionID: this.props.SessionByID.id
              }
            this.props.navigation.navigate('SpecialistChat',{UserChat:JSON.stringify(obj)})
            AsyncStorage.setItem('sessionID', this.props.SessionByID.id)
           }else{
              alert(nextProps.Message)
           }
           
        }
    }

    apologize(){
        this.props.SetLoading(true)
       NetInfo.fetch().then(state =>{
         if (state.isConnected){
           try {
             axios.put('http://68.183.39.113/api/user/sessionApologise/'+this.props.SessionByID.id,{
                status: 2
             }).then(response => {
                 if(response.data._id){
                    this.props.SetLoading(false)
                    this.setState({isVisible:false})
                    if(this.props.Language=='AR'){
                       alert('تم')
                    }else{
                        alert('Done')
                    }
                 }
            
             }).catch((error)=> {
                console.log(error);
                alert(error)
             }).finally(function () {
                // always executed
                this.props.SetLoading(false)
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

    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>{this.props.SessionByID.fullname}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <FontAwesome name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <FontAwesome name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>{this.props.SessionByID.fullname}</Text>
                    <View></View>
                </View>
            )
        }
    } 

    renderRadio1(clicked){
        return(
         <TouchableOpacity
         style={[styles.shadow,{width:20,height:20,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
         onPress={()=>{
            this.setState({radioSelected1:clicked})
         }}>
           {this.props.SessionByID.type === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
           </LinearGradient>
           :
           <View style={{display:'none'}}></View>
           }
         </TouchableOpacity>
        )
      }
      renderRadio2(clicked){
        return(
         <TouchableOpacity
         style={[styles.shadow,{width:20,height:20,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
         onPress={()=>{
            this.setState({radioSelected2:clicked})
         }}>
           {this.props.SessionByID.level === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
           </LinearGradient>
           :
           <View style={{display:'none'}}></View>
           }
         </TouchableOpacity>
        )
      }
      renderRadio3(clicked){
        return(
         <TouchableOpacity
         style={[styles.shadow,{width:20,height:20,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
         onPress={()=>{
            this.setState({radioSelected3:clicked})
         }}>
           {this.props.SessionByID.stutteringSide === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
           </LinearGradient>
           :
           <View style={{display:'none'}}></View>
           }
         </TouchableOpacity>
        )
      }
      renderRadio4(clicked){
        return(
         <TouchableOpacity
         style={[styles.shadow,{width:20,height:20,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
         onPress={()=>{
            this.setState({radioSelected4:clicked})
         }}>
           {this.props.SessionByID.anotherOne === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
           </LinearGradient>
           :
           <View style={{display:'none'}}></View>
           }
         </TouchableOpacity>
        )
      }

      renderRadio5(clicked){
        return(
         <TouchableOpacity
         style={[styles.shadow,{width:20,height:20,borderRadius:20/2,backgroundColor:'#fff',margin:3,justifyContent:'center',alignItems:'center'}]}
         onPress={()=>{
            this.setState({radioSelected5:clicked})
         }}>
           {this.props.SessionByID.family === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
           </LinearGradient>
           :
           <View style={{display:'none'}}></View>
           }
         </TouchableOpacity>
        )
      }

    render() {
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
                <Spinner
                    visible={this.props.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                {this.renderHeader(this.props.Language)}
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{  paddingBottom: 5}}>
                <View style={[this.props.Language == "AR"?styles.row:styles.row_res,styles.view,styles.shadow]}>
                <View style={{ width: '25%', height:'100%', alignItems: 'center',}}>
                  <TouchableOpacity
                  onPress={()=>this.setState({isVisible:true})}
                  style={{width:'90%',alignItems:'center',justifyContent:'center',backgroundColor:'#F6F6F6',borderColor:'#28B5AF', borderRadius:5,borderWidth:1,
                  position:'absolute',top:10,}}>  
                  <Text style={{width:'100%',fontSize: 16,textAlign:'center',color:'#707070',fontFamily:'adobe'}}>
                  {this.props.Language == "AR" ? 'أعتذر' : 'Apologize'}
                  </Text>
                  </TouchableOpacity>
                </View>
    
                <View style={{ width: '50%', height:'100%',justifyContent:'center',}}>
                  <Text style={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 14,color: '#707070',fontWeight:'bold',fontFamily:'adobe',margin:3,paddingHorizontal:10 }]}>
                  {this.props.SessionByID.fullname}
                  </Text>
                  <Text style={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 18,color: '#707070',fontFamily:'adobe',paddingHorizontal:10}]}>
                  {this.props.Language == "AR" ? this.props.SessionByID.type===1?'المريض':'متابع المريض' : this.props.SessionByID.type===1?'Patient':'Patient follower'}
                  </Text>
                </View>
                <View style={{ width: '25%', height:'100%', alignItems: 'center',justifyContent:'center'}}>
                <Image
                    source={{uri: this.props.SessionByID.imgPath}} style={{ width: 70, height: 70, borderRadius:70/2 }}>
                  </Image>
                </View>
              </View>
                     
                       <View style={{alignItems:'center',justifyContent:'center',marginTop:15,}}>
                       <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'كـم عـمرك ؟' : 'How old are you'}
                       </Text>
                         <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    style={{ color: '#000',fontSize:18,fontFamily:'adobe', }}
                                    textAlign={'center'}
                                    defaultValue={this.props.SessionByID.age}
                                    onChangeText={(text) => this.setState({ age: text })}
                                />
                            </Item>
                        </View>
                        <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'متى بدأت معك التأتأة ؟' : 'When did stuttering begin with you ?'}
                       </Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    style={{ color: '#000',fontSize:18,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    defaultValue={this.props.SessionByID.begin}
                                    onChangeText={(text) => this.setState({ begin: text })}
                                />
                            </Item>
                        </View>
                        <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'من وجهه نظرك ما هو سبب التاتاة' : 'From your point of view, what is the cause of stuttering ?'}
                       </Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    style={{ color: '#000',fontSize:16,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    defaultValue={this.props.SessionByID.reason?this.props.SessionByID.reason:'No answer'}
                                    onChangeText={(text) => this.setState({ reason: text })}
                                />
                            </Item>
                        </View>
                        <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'مستوى التلعثم' : 'Level of stuttering'}
                       </Text>
                       <View style={[this.props.Language == "AR" ? styles.row : styles.row_res, { justifyContent: 'center', alignItems: 'center',marginTop:5 }]} >
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'متغير' : 'Infixed'}
                            </Text>
                            {this.renderRadio2(2)}
                            <View style={{width:'10%'}}></View>
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'ثابت' : 'Fixed'}
                            </Text>
                            {this.renderRadio2(1)}
                    </View>
                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    placeholder={this.props.Language == "AR" ? "برجاء كتابة أنة يزيد/ينقص فى الأيام/مواقف معينة..." : "Please write that it increases / decreases in days / certain situations ..."}
                                    placeholderTextColor='#919191'
                                    style={{ color: '#000',fontSize:15,fontFamily:'adobe',textAlignVertical:'top' }}
                                    textAlign={this.props.Language == "AR" ?'right':'left'}
                                    defaultValue={this.props.SessionByID.increase?this.props.SessionByID.increase:'No answer'}
                                    onChangeText={(text) => this.setState({ increase: text })}
                                />
                            </Item>
                        </View>

                        <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'هل لديك سلوكيات جانبية تابعة للتأتأة ؟' : 'Do you have stuttering side behaviors?'}
                       </Text>
                       <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 15,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'مثال: كثرة رمش العين. أضافو أصوات(أم , أة) أو أستبدال الكلمات ألخ' : 'Example: frequent eyelashes. Add sounds (mother, aa) or replace words etc.'}
                       </Text>
                       <View style={[this.props.Language == "AR" ? styles.row : styles.row_res, { justifyContent: 'center', alignItems: 'center',marginTop:5 }]} >
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'لا' : 'No'}
                            </Text>
                            {this.renderRadio3(2)}
                            <View style={{width:'10%'}}></View>
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'نعم' : 'Yes'}
                            </Text>
                            {this.renderRadio3(1)}
                    </View>
                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    placeholder={this.props.Language == "AR" ? "الأمثله الخاصة بالسلوكيات الجانبية..." : "Examples of side behaviors ..."}
                                    placeholderTextColor='#919191'
                                    style={{ color: '#000',fontSize:15,fontFamily:'adobe',textAlignVertical:'top' }}
                                    textAlign={'center'}
                                    defaultValue={this.props.SessionByID.examples?this.props.SessionByID.examples:'No answer'}
                                    onChangeText={(text) => this.setState({ examples: text })}
                                />
                            </Item>
                        </View>
                        <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'هل سبق وأن راجعت مع متخصصين نطق؟' : 'Have you ever checked with pronunciation specialists ?'}
                       </Text>
                       <View style={[this.props.Language == "AR" ? styles.row : styles.row_res, { justifyContent: 'center', alignItems: 'center',marginTop:5 }]} >
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'لا' : 'No'}
                            </Text>
                            {this.renderRadio4(2)}
                            <View style={{width:'10%'}}></View>
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'نعم' : 'Yes'}
                            </Text>
                            {this.renderRadio4(1)}
                    </View>
                    <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'هل يوجد في عائلتك أحد لدية تأتأة؟' : 'Does anyone in your family have stuttering ?'}
                       </Text>
                       <View style={[this.props.Language == "AR" ? styles.row : styles.row_res, { justifyContent: 'center', alignItems: 'center',marginTop:5 }]} >
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'لا' : 'No'}
                            </Text>
                            {this.renderRadio5(2)}
                            <View style={{width:'10%'}}></View>
                            <Text style={{ alignSelf: 'center', color: '#919191', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'نعم' : 'Yes'}
                            </Text>
                            {this.renderRadio5(1)}
                    </View>
                    <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'ما هى مشاعرك أتجاة التأتأة لديك؟' : 'What are your feelings about stuttering you ?'}
                       </Text>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    placeholder={this.props.Language == "AR" ? "برجاء كتابة أثرها على حياتك..." : "Please write down the impact on your life ..."}
                                    placeholderTextColor='#919191'
                                    style={{ color: '#000',fontSize:12,fontFamily:'adobe',textAlignVertical:'top' }}
                                    textAlign={this.props.Language == "AR" ?'right':'left'}
                                    defaultValue={this.props.SessionByID.feeling?this.props.SessionByID.feeling:'No answer'}
                                    onChangeText={(text) => this.setState({ feeling: text })}
                                />
                            </Item>
                        </View>   

                       

                       
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center'}]}>
                        <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,]}>
                            <TouchableOpacity 
                            onPress={() => { 
                                // this.props.navigation.navigate('SessionResult') 
                                this.props.StartChat(this.props.SessionByID.usrID,this.props.User._id,2)
                            }}
                             style={[styles.shadow, {width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                                <Text style={{ color: '#FFF', fontSize: 19, fontFamily:'adobe' }}>
                                    {this.props.Language == "AR" ? 'بدأ الجلسة' : 'Start Session'}
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
             <View style={[this.props.Language == "AR" ? styles.row : styles.row_res,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_res,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
               {this.props.Language == "AR" ? "تنبيه" : "Alert"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? 'هل انت متأكد من الأعتذار عن الأستشارة؟' : 'Are you sure to apologize for the advice?'}
            </Text>
            <View style={[this.props.Language == "AR" ? styles.row : styles.row_res,{width:'80%',alignItems:'center',justifyContent:'space-evenly'}]}>
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
                    this.apologize()
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'تأكيد الأعتذار' : 'Confirm apologize'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>

            </View>
         </View>
          </Modal>

                       </View>
                      
                    </ScrollView>

            </View>
        );
    }
}

//redux
const mapStateToProps = state => {
    return {
        Language: state.LanguageReducer.Language,
        Processing: state.AuthReducer.Processing,
        Message: state.AuthReducer.Message,
        User: state.AuthReducer.User,
        SessionByID: state.AuthReducer.SessionByID
    }
}
// redux
export default connect(mapStateToProps, {  SetLoading , getSessionById , StartChat})(Sp_sessionDetail)

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    row: {
        flexDirection: 'row'
    },
    row_res:{
        flexDirection:'row-reverse'
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
        elevation: 6,
    },
    container: {
        flex: 1,
        width:width,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    },
    inputFields: {
        borderBottomColor: '#FFF',
        width: width - (36 * 2),
        height:45,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    right:{
        textAlign:'right'
     },
     left:{
       textAlign:'left'
     },
    Button: {
        width: width - (36 * 2) + 10,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        marginTop:20,
        marginHorizontal: 10
    },
    image: {
        width: 170,
        height: 170
    },
    view:{
        width:'100%',
        height:height/6,
        backgroundColor:'#FAFAFA',
        borderRadius:5
    },
    modal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
      },
});