import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, FlatList, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';



import { connect } from 'react-redux' // redux
import { SetLoading , getUserNotify , getSpecialistNotify } from './../../Actions' //redux

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications:[],
            isVisible:false
        };
    }

    componentWillMount() {
      this.props.SetLoading(false)
      if(this.props.User.loginType==1){
        this.props.getUserNotify(this.props.User._id)
      }else{
        this.props.getSpecialistNotify(this.props.User._id)
      }
    }

    componentWillReceiveProps= async(nextProps)=> {
      if (nextProps.Message != null) {
       
        alert(nextProps.Message)
      }
  }

    componentWillUnmount() {
    }
   

    finish(id){
            NetInfo.fetch().then(state =>{
               if (state.isConnected){
            try {
               axios.put('http://68.183.39.113/api/user/notifyByUser/'+id,{
                  status: 2
                  }).then((response)=> {   
                   if(response.data._id){
                     alert('done')
                   }
               }).catch((error)=>{ 
                 alert(error)
               }).finally(function () {
                   // always executed
               });
           } catch (error) {
            alert('Error happen')
         }
      }else {
            if (this.props.Language === 'AR'){
               alert('لا يوجد أتصال بالانترنت');
             } else {
               alert('No internet connection');
             }
           }
         });
   }

   isSeen(id){
    NetInfo.fetch().then(state =>{
       if (state.isConnected){
    try {
       axios.put('http://68.183.39.113/api/user/notifyByUser/'+id,{
          seen: 2
          }).then((response)=> {   
           if(response.data._id){
             console.log('Done')
            // if(this.props.Language=='AR'){
            //   alert(' تم  ')
            // }else{
            //   alert('Done')
            // }
           }
       }).catch((error)=>{ 
         alert(error)
       }).finally(function () {
           // always executed
       });
   } catch (error) {
    alert('Error happen')
 }
}else {
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
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Notifications</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                    </TouchableOpacity>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>الأشعارات</Text>
                    <View></View>
                </View>
            )
        }
    } 

    renderItemUser(item) {
        return (
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center',marginVertical:3 }}>
              <View style={[this.props.Language == "AR"?styles.row:styles.rowReverse,styles.view,styles.shadow,{backgroundColor:item.seen==1?'#E4E4E4':'#fff',}]}>
                <View style={{ width: '25%', height:'100%', alignItems: 'center'}}>
                  <Text style={{width:'100%',fontSize: 13,textAlign:'center',color:'#343434',fontFamily:'adobe',position:'absolute',top:15,}}>{item.date.split('T')[0]}</Text>
                  {item.msg=='The appointment is now'||item.msg=='The session is now'?
                  <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                   {item.seen ==1?
                   <TouchableOpacity 
                   onPress={() => { 
                     this.isSeen(item._id)
                     this.setState({isVisible:true})
                     }}
                  style={[this.props.Language == "AR"?styles.row:styles.rowReverse,{width:'100%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:5}]}>
                  {this.props.Language=='AR'?
                    <Icon name="chevron-left" style={{ color: '#28B5AF', fontSize: 10 }} />
                  :
                    <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 10 }} />
                  }
                  <Text style={{  fontSize: 13, textAlign: 'center', color: '#28B5AF',fontFamily:'adobe',margin:5}}>
                  {this.props.Language == "AR" ? 'أبدأ المحادثة' : 'Start chat'}
                  </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity 
                  onPress={() => { 
                    // this.setState({isVisible:true})
                    if(this.props.Language=='AR'){
                      alert('لقد تم أنهاء المحادثة')
                    }else{
                      alert('Chat has been ended')
                    }
                   }}
                 style={[this.props.Language == "AR"?styles.row:styles.rowReverse,{width:'100%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:5}]}>
                 {this.props.Language=='AR'?
                   <Icon name="chevron-left" style={{ color: '#28B5AF', fontSize: 10 }} />
                 :
                   <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 10 }} />
                 }
                 <Text style={{  fontSize: 13, textAlign: 'center', color: '#28B5AF',fontFamily:'adobe',margin:5}}>
                 {this.props.Language == "AR" ? 'تم أنهاء المحادثة' : ' Chat ended'}</Text>
                 </TouchableOpacity>
                  }
                  </View>
                  :
                  <TouchableOpacity 
                  onPress={() => { 
                    this.isSeen(item._id)
                    if(this.props.Language=='AR'){
                    alert(' تم  ')
                    }else{
                      alert('Done')
                    }
                   }}
                 style={{width:'100%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:5}}>
                 <Text style={{  fontSize: 18, textAlign: 'center', color: '#28B5AF',fontFamily:'adobe',margin:5}}>
                 {this.props.Language == "AR" ? 'تـــم  ' : ' Done'}
                 </Text>
                 </TouchableOpacity>

                  }

                  
                 
                 
                </View>
    
                <View style={{ width:'55%', height:'100%', alignItems: 'center',paddingTop:5}}>
                  <Text style={{  fontSize: 14, textAlign: 'center', color: '#707070',fontWeight:'bold',fontFamily:'adobe',margin:3 }}>
                  {item.fullname}
                  </Text>
                  <Text style={{  fontSize: 18, textAlign: 'center', color: '#707070',fontFamily:'adobe',}}>
                  {this.props.Language == "AR" ? item.msgAR : item.msg}
                  </Text>
                </View>
                <View style={{ width: '20%', height:'100%', alignItems: 'center',justifyContent:'center'}}>
                   {item.imgPath?
                   <Image source={{uri: item.imgPath}} 
                   style={{ width: 60, height: 60, borderRadius:60/2 }}></Image>
                   :
                   <Image source={require('./../../../img/user.png')} 
                   style={{ width: 70, height: 70, borderRadius:70/2 }}></Image>
                   }
                   
                </View>
              </View>

              <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReverse,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReverse,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "ملحوظة" : "Note"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
             {item.type==1?
              <Text style={{ width: '70%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
              {this.props.Language == "AR" ? 'ستنتهي الأستشارة تلقائيا بعد 40 دقيقة' : 'Counseling will end automatically after 40 minutes'}
              </Text>
             :
             <Text style={{ width: '70%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
             {this.props.Language == "AR" ? 'ستنتهي الجلسة تلقائيا بعد 20 دقيقة' : 'Session will end automatically after 20 minutes'}
             </Text>
             }
           

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                    // this.finish(item._id)
                    // if(this.props.User.loginType==1){
                        const obj={
                           specialistID: item.id,
                           fullname: item.fullname,
                           imgPath: item.imgPath,
                           description: item.description,
                           key: item.type
                          }
                        this.props.navigation.navigate('Chat',{SpecialistChat:JSON.stringify(obj)})
                      // }else{
                      //   const obj={
                      //       userID: item.id,
                      //       fullname: item.fullname,
                      //       imgPath: item.imgPath,
                      //       key: item.type
                      //     }
                      //   this.props.navigation.navigate('SpecialistChat',{UserChat:JSON.stringify(obj)})
                      // }
                }}
            style={{ width: '40%', justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حسنا' : 'Done'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
          </Modal>
          </View>
        );
      }

    renderItemSpecialist(item) {
        return (
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center',marginVertical:3 }}>
              <View style={[this.props.Language == "AR"?styles.row:styles.rowReverse,styles.view,styles.shadow,{backgroundColor:item.seen==1?'#E4E4E4':'#fff',}]}>
                <View style={{ width: '25%', height:'100%', alignItems: 'center'}}>
                  <Text style={{width:'100%',fontSize: 13,textAlign:'center',color:'#343434',fontFamily:'adobe',position:'absolute',top:15,}}>{item.date.split('T')[0]}</Text>
                  {item.msg=='Counseling booked by'||item.msg=='Session booked by'?
                    <TouchableOpacity 
                    onPress={() => { 
                      this.isSeen(item._id)
                       if(item.msg=='Counseling booked by'){
                        this.props.navigation.navigate('Sp_consulting')
                       }else{
                        this.props.navigation.navigate('Sp_therapeuticSession')
                       }
                      
                      }}
                   style={[this.props.Language == "AR"?styles.row:styles.rowReverse,{width:'100%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:5}]}>
                   {this.props.Language=='AR'?
                     <Icon name="chevron-left" style={{ color: '#28B5AF', fontSize: 10 }} />
                   :
                     <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 10 }} />
                   }
                   <Text style={{  fontSize: 13, textAlign: 'center', color: '#28B5AF',fontFamily:'adobe',margin:5}}>
                   {this.props.Language == "AR" ? 'أذهب للحجز' : 'Go to reservation'}
                   </Text>
                   </TouchableOpacity>
                  :
                    <TouchableOpacity 
                    onPress={() => { 
                      this.isSeen(item._id)
                      this.setState({isVisible:true})
                      }}
                   style={[this.props.Language == "AR"?styles.row:styles.rowReverse,{width:'100%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:5}]}>
                   {this.props.Language=='AR'?
                     <Icon name="chevron-left" style={{ color: '#28B5AF', fontSize: 10 }} />
                   :
                     <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 10 }} />
                   }
                   <Text style={{  fontSize: 13, textAlign: 'center', color: '#28B5AF',fontFamily:'adobe',margin:5}}>
                   {this.props.Language == "AR" ? 'أبدأ المحادثة' : 'Start chat'}
                   </Text>
                   </TouchableOpacity>
                   }
                  
                 
                
                  {/* <TouchableOpacity 
                   onPress={() => { 
                    this.isSeen(item._id)
                     this.setState({isVisible:true})
                     }}
                  style={[this.props.Language == "AR"?styles.row:styles.rowReverse,{width:'100%',alignItems:'center',justifyContent:'center',position:'absolute',bottom:5}]}>
                   {this.props.Language=='AR'?
                    <Icon name="chevron-left" style={{ color: '#28B5AF', fontSize: 10 }} />
                  :
                    <Icon name="chevron-right" style={{ color: '#28B5AF', fontSize: 10 }} />
                  }
                  <Text style={{  fontSize: 14, textAlign: 'center', color: '#28B5AF',fontFamily:'adobe',margin:5}}>
                  {this.props.Language == "AR" ? 'أبدأ المحادثة' : 'Start chat'}
                  </Text>
                  </TouchableOpacity> */}
                </View>
    
                <View style={{ width: '50%', height:'100%', alignItems: 'center',paddingTop:15}}>
                  <Text style={{  fontSize: 14, textAlign: 'center', color: '#707070',fontWeight:'bold',fontFamily:'adobe',margin:3 }}>
                  {item.fullname}
                  </Text>
                  <Text style={{  fontSize: 18, textAlign: 'center', color: '#707070',fontFamily:'adobe',}}>
                  {this.props.Language == "AR" ? item.msgAR : item.msg}
                  </Text>
                </View>
                <View style={{ width: '25%', height:'100%', alignItems: 'center',justifyContent:'center'}}>
                {item.imgPath?
                   <Image source={{uri: item.imgPath}} 
                   style={{ width: 60, height: 60, borderRadius:60/2 }}></Image>
                   :
                   <Image source={require('./../../../img/user.png')} 
                   style={{ width: 70, height: 70, borderRadius:70/2 }}></Image>
                   }
                </View>
              </View>
              <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReverse,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReverse,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "ملحوظة" : "Note"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            {item.type==1?
              <Text style={{ width: '70%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
              {this.props.Language == "AR" ? 'ستنتهي الأستشارة تلقائيا بعد 40 دقيقة' : 'Counseling will end automatically after 40 minutes'}
              </Text>
             :
             <Text style={{ width: '70%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
             {this.props.Language == "AR" ? 'ستنتهي الجلسة تلقائيا بعد 20 دقيقة' : 'Session will end automatically after 20 minutes'}
             </Text>
             }

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                    
                    // if(this.props.User.loginType==1){
                    //     const obj={
                    //       specialistID: item.id,
                    //        fullname: item.fullname,
                    //        imgPath: item.imgPath,
                    //        description: item.description,
                    //        key: item.type,
                    //       }
                    //     this.props.navigation.navigate('Chat',{SpecialistChat:JSON.stringify(obj)})
                    //   }else{
                        const obj={
                            userID: item.id,
                            fullname: item.fullname,
                            imgPath: item.imgPath,
                            key: item.type,
                            type: 2,
                          }
                        this.props.navigation.navigate('SpecialistChat',{UserChat:JSON.stringify(obj)})
                      // }
                }}
            style={{ width: '40%', justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حسنا' : 'Done'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
           
         </View>
          </Modal>
          </View>
        );
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
           <View>
             {this.props.UserNotify.lenght == 0 ?
              <Text style={{
                width: '90%', alignSelf: "center", justifyContent: 'center', textAlign: 'center', margin: 7, color: '#000',
                borderRadius: 10, borderWidth: 1, borderColor: '#000', padding: 7, marginTop: 20, fontSize: 16,  
              }}>
                {this.props.Language=='AR' ? "  لا يوجد  أشعارات الأن " :
                  "  No notifications now"}
              </Text>
              :
              <View style={{width:'100%',alignItems:'center'}}>
               {this.props.User.loginType==1?
                <FlatList style={{ width: '95%',marginBottom:'8%' }}
                data={this.props.UserNotify}
                numColumns={1}
                inverted={true}
                renderItem={({ item }) => this.renderItemUser(item)}
                keyExtractor={(item, index) => index.toString()}
                 ref={ref => this.flatList = ref}
               onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
               onLayout={() => this.flatList.scrollToEnd({animated: true})}
              />
               :
               <FlatList style={{ width: '95%',marginBottom:'8%' }}
               data={this.props.SpecialistNotify}
               numColumns={1}
               inverted={true}
               renderItem={({ item }) => this.renderItemSpecialist(item)}
               keyExtractor={(item, index) => index.toString()}
               ref={ref => this.flatList = ref}
               onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
               onLayout={() => this.flatList.scrollToEnd({animated: true})}
             />
              }
              
              </View>
              
            }
          </View>
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
        UserNotify: state.AuthReducer.UserNotify,
        SpecialistNotify: state.AuthReducer.SpecialistNotify
    }
}
// redux
export default connect(mapStateToProps, {SetLoading , getUserNotify , getSpecialistNotify})(Notification)

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    rowReverse: {
        flexDirection: 'row-reverse'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    },
    view:{
        width:'100%',
        height:height/6,
        borderRadius:8
    },
    modal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
      },
});
