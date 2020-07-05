import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Dimensions, KeyboardAvoidingView,SafeAreaView,
    FlatList,Image} from 'react-native';
    import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlipToggle from 'react-native-flip-toggle-button'
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { connect } from 'react-redux' // redux

class MyBalance extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            data:[1],
            userId:'',
            userData:{},
            isActive:true,
            flag_type:0,
            isVisible1:false,
            isVisible2:false,
            isVisible3:false,
        };
     }

    renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>رصـيدى</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>My balance</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 }} />
                 </TouchableOpacity>
              </View>
           )
        }
     }

     renderItem(item){
        return (
          <TouchableOpacity
        //   onPress={()=>{
           
        //    }}
          style={[styles.viewItem,{marginVertical:3}]}>
              <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width: '100%',height:'100%',}]}>
                <View style={{width:'25%',alignItems:'center'}}>
                <Text style={{ textAlign:'center',color: '#707070', fontSize: 15,fontFamily:'adobe',margin:7 }}>
                     {this.props.Language == "AR" ? '17-2-2020' : '17-2-2020'}
                 </Text>
                 <View style={[{width:'90%',height:30,alignItems:'center',justifyContent:'space-around',position:'absolute',
                 bottom:10,borderRadius:5,backgroundColor:'#fff'}]}>
                 <Text style={{ textAlign:'center',color: '#707070', fontSize: 15,fontFamily:'adobe'}}>
                     {this.props.Language == "AR" ? '50' : '50'}
                 </Text>
                 <Text style={{ textAlign:'center',color: '#707070', fontSize: 15,fontFamily:'adobe'}}>
                     {this.props.Language == "AR" ? 'ريال سعودى' : 'SAR'}
                 </Text>
                 </View>
                </View>
                <View style={{width:'50%',justifyContent:'center'}}>
                <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{color: '#707070', fontSize: 20,fontFamily:'adobe' }]}>
                     {this.props.Language == "AR" ? 'د/ سعد الغامدى' : 'D/ Saad El-ghamdy'}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{color: '#70707070', fontSize: 17,fontFamily:'adobe'}]}>
                     {this.props.Language == "AR" ? 'هل يمكنني مساعدتك في أمر أخر' : 'Can i help you'}
                 </Text>
                </View>
                <View style={{width:'25%',justifyContent:'center',alignItems:'center',}}>
                <Image resizeMode="contain" source={require('./../../../img/user.png')} style={{ width:'80%',height:'80%' }} />
                </View>
              </View>
          </TouchableOpacity>
        );
      }
    render(){
      const titleAr = 'يجب الوصول الى الحد الأدنى وهو 1000 ريال سعودى لتستطيع تحويل رصيدك الى حسابك البنكى'
      const titleEn = 'A minimum of SAR 1,000 must be reached in order to transfer your balance to your bank account'
      const titleAr2 = 'هل أنت متأكد أنك تريد أرسال طلب لتحويل رصيدك ألى حسابك بالبنك ؟'
      const titleEn2 = 'Are you sure you want to send a request to transfer your balance to your bank account ?'
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
            <View style={{width:width,height:height,alignItems:'center',justifyContent:'center'}}>
            <FlatList style={{width:'95%',marginTop:10,}}
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({item})=>this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        />
                       
            </View>
            {this.props.User.loginType ==1?
             <View style={[styles.shadow,styles.view,this.props.Language == "AR"?styles.row:styles.row_reserve,{}]}>
             <View style={{width:'70%',height:'100%',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                 <View style={[this.props.Language == "AR"?styles.row:styles.row_reserve,{width:'85%',}]}>
                 <FlipToggle
                value={this.state.isActive}
                buttonWidth={70}
                buttonHeight={30}
                buttonRadius={30}
                sliderWidth={25}
                sliderHeight={25}
                sliderRadius={50}
                buttonOnColor='#28B5AF'
                buttonOffColor='#707070'
                sliderOnColor='#fff'
                sliderOffColor='#fff'
                onToggle={(newState) => {this.setState({isActive:!this.state.isActive})}}
               />
               <Text style={{color: '#919191', textAlign:'center',fontSize: 18,fontFamily:'adobe',margin:10}}>
                     {this.props.Language == "AR" ? 'أستخدام الرصيد' : 'Use balance'}
                 </Text>
                 </View>
                 <View style={{width:'85%',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:7,padding:5}}>
                 <Text style={{color: '#919191', textAlign:'center',fontSize: 18,fontFamily:'adobe'}}>
                     {this.props.Language == "AR" ?this.props.User.userBalacne +'  ' +'ريال سعودى' :this.props.User.userBalacne +'  ' +'SAR' }
                 </Text>
                 </View>

            </View>
                <View style={{width:'30%',alignItems:'center',justifyContent:'center',marginBottom:10}}>
                <Image resizeMode='contain' source={require('./../../../img/bucket.png')} style={{width:70,height:70, }} />
                </View>
            </View> 
            :
            <View style={[styles.shadow,styles.view,this.props.Language == "AR"?styles.row:styles.row_reserve,{}]}>
            <View style={{width:'70%',alignItems:'center',justifyContent:'center'}}>
                <View style={{width:'70%',alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:7,padding:5}}>
                <Text style={{color: '#919191', textAlign:'center',fontSize: 18,fontFamily:'adobe'}}>
                   {this.props.Language == "AR" ?this.props.User.userBalacne +'  ' +'ريال سعودى' :this.props.User.userBalacne +'  ' +'SAR' }
                </Text>
                </View>
                
                <View style={[styles.row, { justifyContent: 'center',marginTop:10,marginBottom:10 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => {this.setState({isVisible1:true})}} 
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                     <Text style={{ color: '#FFF', fontSize: 18,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "تحويل رصيد" : "Balance transfer"}
                     </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>

           </View>
               <View style={{width:'30%',height:'100%',alignItems:'center',justifyContent:'center',}}>
               <Image resizeMode='contain' source={require('./../../../img/bucket.png')} style={{width:70,height:70 ,marginBottom:10}} />
               </View>
           </View> 
            
            }
           
           <Modal
             isVisible={this.state.isVisible1}
             onBackdropPress={() => this.setState({ isVisible1: false })}
             swipeDirection="left"
             >
          <View style={[styles.modal,{}]}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible1:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "تحويل الرصيد" : "Balance transfer"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? titleAr :titleEn}
            </Text>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible1:false})
                   this.setState({isVisible2:true})
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حسنا' : 'Done'}
            </Text>
            </TouchableOpacity>
            </LinearGradient>
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
               {this.props.Language == "AR" ? "تحويل الرصيد" : "Balance transfer"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:20}}>
            {this.props.Language == "AR" ? titleAr2 : titleEn2}
            </Text>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'80%',alignItems:'center',justifyContent:'space-evenly'}]}>
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
                  this.setState({isVisible2:false})
                   this.setState({isVisible3:true})
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'تحويل الرصيد' : 'Balance transfer'}
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
             <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible3:false})}>
               <Icon name="close" size={15} color="#000" style={{margin:5}} />
               </TouchableOpacity>
            </View>
            <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed,{width:'80%',alignItems:'center'}]}>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
               <Text style={{ width:'40%',color: '#28B5AF', fontSize: 22,fontFamily:'adobe',textAlign:'center'}}>
                {this.props.Language == "AR" ? "بيانات الحساب" : "Account data"}
               </Text>
               <View style={{flex:1 ,height:1,backgroundColor:'#707070'}}></View>
            </View>
            <Text style={{ width: '80%',textAlign:'center',alignItems:'center',color:'#707070', fontSize:20,fontFamily:'adobe',marginTop:10}}>
            {this.props.Language == "AR" ? 'برجاء أدخل بيانات الحساب البنكى' : 'Please enter your bank account information'}
            </Text>
            <View style={[styles.row, {width:'80%', justifyContent: 'center', alignItems: 'center',marginTop:10 }]} >
               <Item style={[styles.inputFields, styles.shadow]}>
              <Input
               placeholderTextColor='#919191'
               placeholder={this.props.Language == "AR" ? 'أسم البنك' : 'Bank name'}
               defaultValue={this.state.fullname}
               style={{ color: '#000',fontSize:16,fontFamily:'adobe',height:45 }}
               textAlign={'center'}
             onChangeText={(text) => this.setState({ fullname: text })}
            />
            </Item>
          </View>

          <View style={[styles.row, {width:'80%', justifyContent: 'center', alignItems: 'center',marginTop:5 }]} >
            <Item style={[styles.inputFields, styles.shadow]}>
           <Input
            placeholderTextColor='#919191'
            placeholder={this.props.Language == "AR" ? 'رقم الحساب البنكى' : 'Bank account number'}
            defaultValue={this.state.mobile}
            style={{ color: '#000',fontSize:16,fontFamily:'adobe',height:45 }}
            textAlign={'center'}
            onChangeText={(text) => this.setState({ mobile: text })}
            />
         </Item>
         </View>

            <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.shadow,{width: '40%',borderRadius: 20,marginTop:30,marginBottom:20,justifyContent: 'center', alignItems: 'center',}]}>
            <TouchableOpacity
                onPress={() => {
                   this.setState({isVisible3:false})
                }}
            style={{ width: '100%',justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ width: '100%',height: 30,textAlign:'center',alignItems:'center',color:'#FFFFFF', fontSize:20,fontFamily:'adobe', textAlignVertical: 'center',   }}>
            {this.props.Language == "AR" ? 'حفظ' : 'Save'}
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
    }
 }
 // redux
 export default connect(mapStateToProps, {})(MyBalance)
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
     elevation: 5,
   },
   row: {
     flexDirection: 'row',
   },
   row_reserve: {
     flexDirection: 'row-reverse',
   },
   viewItem:{
     width:'100%',
     height:height*0.15,
     backgroundColor:'#FCFCFC',
     borderWidth:1,
     borderColor:'#E8E8E8',
     borderRadius:5
   },
   view:{
    width:'100%',backgroundColor:'#E4E4E4',
    height:height*0.24,
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    position:'absolute',bottom:0,
    alignItems:'center',
    justifyContent:'center'
   },
   right:{
      textAlign:'right'
   },
   left:{
     textAlign:'left'
   },
   button: {
    width: '70%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  modal:{
    width:'100%',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:8,
  },
  inputFields: {
    borderRadius: 3,
    backgroundColor: '#FFF',
    textAlign: 'center',
    marginHorizontal:18
 },
   
 });
