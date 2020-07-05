import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView,
Image ,AsyncStorage} from 'react-native';
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux' // redux

class ReservationRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioSelected1:1,
            radioSelected2:1,
            radioSelected3:1,
            radioSelected4:1,
            radioSelected5:1,
            ID:'',
            userID: this.props.User._id
        };
    }


    componentWillMount(){
    }
   

    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Reservation request</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <FontAwesome name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <FontAwesome name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>طلب حجز</Text>
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
           {this.state.radioSelected1 === clicked?
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
           {this.state.radioSelected2 === clicked?
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
           {this.state.radioSelected3 === clicked?
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
           {this.state.radioSelected4 === clicked?
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
           {this.state.radioSelected5 === clicked?
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
                
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{  paddingBottom: 5 }} >
                    <View style={{alignItems:'center',justifyContent:'center',}}>
                    <View style={[this.props.Language == "AR"?styles.row:styles.row_res, {width: width - (36 * 2) ,justifyContent: 'space-around', alignItems: 'center' }]} >
                        <View style ={[this.props.Language == "AR"?styles.row:styles.row_res,styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:3}]}>
                            <Text style={{ alignSelf: 'center', color: '#707070', fontSize: 16 ,fontFamily:'adobe',padding:6,paddingHorizontal:10 }}>
                                {this.props.Language == "AR" ? 'متابع المريض' : 'Patient follower'}
                            </Text>
                            {this.renderRadio1(2)}
                        </View>
                        <View style={{width:'3%'}}></View>
                        <View style ={[this.props.Language == "AR"?styles.row:styles.row_res,styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:3}]}>
                            <Text style={{ alignSelf: 'center', color: '#707070', fontSize: 16 ,fontFamily:'adobe',padding:6,paddingHorizontal:10 }}>
                                {this.props.Language == "AR" ? 'المـريــض' : 'Patient'}
                            </Text>
                            {this.renderRadio1(1)}
                        </View>   
                    </View>
                    </View>
                     
                       <View style={{alignItems:'center',justifyContent:'center',marginTop:15,}}>
                       <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:width - (36 * 2),color:'#919191', fontSize: 20,fontFamily:'adobe'}]}>
                        {this.props.Language == "AR" ? 'كـم عـمرك ؟' : 'How old are you'}
                       </Text>
                         <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 3,marginBottom:3 }]}>
                                <Input
                                    style={{ color: '#000',fontSize:17,fontFamily:'adobe', }}
                                    textAlign={'center'}
                                    keyboardType='numeric'
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
                                    style={{ color: '#000',fontSize:17,fontFamily:'adobe' }}
                                    textAlign={'center'}
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
                                    style={{ color: '#000',fontSize:17,fontFamily:'adobe' }}
                                    textAlign={'center'}
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
                                    textAlign={this.props.Language == "AR" ?'right':'left'}
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
                                    style={{ color: '#000',fontSize:15,fontFamily:'adobe',textAlignVertical:'top' }}
                                    textAlign={this.props.Language == "AR" ?'right':'left'}
                                    onChangeText={(text) => this.setState({ feeling: text })}
                                />
                            </Item>
                        </View>   

                       

                       
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center'}]}>
                        <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,]}>
                            <TouchableOpacity 
                            onPress={() => { 
                    const { age , begin , reason , increase ,feeling , radioSelected1 , radioSelected2,radioSelected3,
                            radioSelected4,radioSelected5,examples } = this.state
                            if(age && begin ){
                                const obj={
                                    userID: this.state.userID,
                                    type: radioSelected1,
                                    age: age,
                                    begin: begin,
                                    reason: reason,
                                    level: radioSelected2,
                                    increase: increase,
                                    sides: radioSelected3,
                                    examples: examples,
                                    otherSpecialist: radioSelected4,
                                    family: radioSelected5,
                                    feeling: feeling
                                }
                                AsyncStorage.setItem('MakeRequest', JSON.stringify(obj))
                                this.setState({age:'' , begin:'' , reason:'' , increase:'' , feeling:'', examples:''})
                                this.props.navigation.navigate('ReservationRequest2') 
                            }else{
                                if(this.props.Language =='AR'){
                                    alert('أدخل البيانات المطلوبة')
                                }else{
                                    alert('Enter required data')
                                }
                            }
                               
                            }}
                             style={[styles.shadow, {width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                                <Text style={{ color: '#FFF', fontSize: 19, fontFamily:'adobe' }}>
                                    {this.props.Language == "AR" ? 'حفظ البيانات' : 'Save data'}
                                </Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>

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
    }
}
// redux
export default connect(mapStateToProps, { })(ReservationRequest)

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
});