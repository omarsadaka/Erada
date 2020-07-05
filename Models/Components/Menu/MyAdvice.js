import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image} from 'react-native';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux' // redux
import { SetLoading , getUserChat , getSpecialistChat } from './../../Actions' //redux


class MyAdvice extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[],
            userId:'',
            userData:{},
        };
     }

     componentDidMount(){
       if(this.props.User.loginType==1){
         this.props.getUserChat(this.props.User._id)
       }else{
        this.props.getSpecialistChat(this.props.User._id)
       }
     }

    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 , padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>محادثاتى</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>My chat</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 ,padding:7}} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderItem(item){
        return (
          <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('ChatHistory',{id: item.id , fullname: item.fullname , imgPath: item.imgPath})
           }}
          style={[styles.viewItem,{marginVertical:3}]}>
              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width: '100%',height:'100%'}]}>
                <View style={{width:'25%'}}>
                <Text style={{ textAlign:'center',color: '#707070', fontSize: 15,fontFamily:'adobe',margin:7 }}>
                     {item.date.split('T')[0]}
                 </Text>
                </View>
                <View style={{width:'50%',justifyContent:'center'}}>
                <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{color: '#707070', fontSize: 24,fontFamily:'adobe',paddingHorizontal:10 }]}>
                     {item.fullname}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{color: '#707070', fontSize: 20,fontFamily:'adobe',paddingHorizontal:10}]}>
                     {this.props.Language == "AR" ? 'هل يمكنني مساعدتك في أمر أخر' : 'Can i help you'}
                 </Text>
                </View>
                <View style={{width:'25%',justifyContent:'center'}}>
                  {item.imgPath?
                   <Image  source={{uri: item.imgPath}} style={{ width:80,height:80 ,borderRadius:80/2}} />
                  :
                  <Image  source={require('./../../../img/user.png')} style={{ width:80,height:80 ,borderRadius:80/2}} />
                  }
                </View>
              </View>
          </TouchableOpacity>
        );
      }
    render(){
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
            <View style ={{width:width,height:height,alignItems:'center',justifyContent:'center',padding:3}} >
            <FlatList style={{width:'100%',marginTop:3,marginBottom:0}}
                        data={this.props.User.loginType==1 ?this.props.UserChat :this.props.SpecialistChat}
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
       UserChat: state.AuthReducer.UserChat,
       SpecialistChat: state.AuthReducer.SpecialistChat
    }
 }
 // redux
 export default connect(mapStateToProps, {SetLoading , getUserChat,getSpecialistChat})(MyAdvice)
 const styles = StyleSheet.create({
   container: {
     width: width,
     height:height,
     alignItems: 'center',
     backgroundColor: '#FFF',
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
     width:'100%',
     height:height/6,
     backgroundColor:'#E4E4E4'
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   }
   
 });
