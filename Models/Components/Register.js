import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, 
    ScrollView,Image ,AsyncStorage} from 'react-native';
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';

import { connect } from 'react-redux' // redux
import { UserRegister } from './../Actions' //redux

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword:'',
            mobile: '',
            email: '',
            username2: '',
            password2: '',
            confirmPassword2:'',
            mobile2: '',
            email2: '',
            checked:false,
            radioSelected:1,
            specializationId:null,
            specializations: [
                {
                    label: 'متحكم فى التأتأة',
                    value: 1,
                },
                {
                    label: 'أخصائى نفسى',
                    value: 2,
                },
                {
                    label: 'أخصائى نطق وتخاطب',
                    value: 3,
                },
                {
                    label: 'متعاون فى مجال أخر',
                    value: 4,
                },
            ], 
            specializationsEN: [
                {
                    label: 'Stutter control',
                    value: 1,
                },
                {
                    label: 'Psychologist',
                    value: 2,
                },
                {
                    label: 'Speech and speech specialist',
                    value: 3,
                },
                {
                    label: 'Cooperative in another field',
                    value: 4,
                },
            ], 
            color:'#919191'
        };
    }

    emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
           
            if(nextProps.Message=='Register Done'){
                this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ],
               }))
            }else{
                alert(nextProps.Message)
            }
        }
        // if (nextProps.User) {
        //     this.props.navigation.dispatch(StackActions.reset({
        //         index: 0,
        //         actions: [
        //             NavigationActions.navigate({ routeName: 'HomeRoutes' })
        //         ],
        //     }))
        // }
    }

    Register() {
        const { username, password, mobile, email , confirmPassword , checked } = this.state
                if( username.length >= 1 ){
                    if( mobile.length >= 6 ){
                        if( this.emailIsValid(email)){
                            if( password.length >= 6 ){
                                if(password === confirmPassword){
                                   if(checked){
                                    this.props.UserRegister(username, mobile, email, password , 1)
                            }else{
                                if(this.props.Language=='AR'){
                                    alert("يجب الموافقة على الشروط والاحكام")
                                }else{
                                    alert("You must accept terms and condition")
                                }
                            }
                        }else{
                            if(this.props.Language=='AR'){
                                alert("الرقم السرى غير متطابق")
                            }else{
                                alert("You must enter match password")
                            }
                        }
                    }else{
                        if(this.props.Language=='AR'){
                            alert("الرقم السرى ضعيف ")
                        }else{
                            alert("password must be more than 8 letters or numbers")
                        }
                    }
                    }else{
                        if(this.props.Language=='AR'){
                            alert("البريد الألكتروني غير صالح")
                        }else{
                            alert("Email is not valid")
                        }
                    }
                    }else{
                        if(this.props.Language=='AR'){
                            alert("يجب ادخال رقم الموبايل")
                        }else{
                            alert("You must enter a mobile number")
                        }
                    }
                }else{
                    if(this.props.Language=='AR'){
                        alert("يجب أدخال أسم المستخدم")
                    }else{
                        alert("You must enter a username")
                    }
                }
    } 

    next() {
        const {username2 , mobile2 , email2 , password2 , specializationId ,checked} = this.state
        if(username2 && mobile2 && email2 && password2 && specializationId){
            if( this.emailIsValid(email2)){
            if(checked){
                const obj ={
                    name: username2,
                    mobile: mobile2,
                    email: email2,
                    password: password2,
                    type: specializationId
                }
                AsyncStorage.setItem('Special', JSON.stringify(obj))
            if(this.state.specializationId === 1){
                this.props.navigation.navigate('StutterControl',{chechBack:1})
               }else if(this.state.specializationId === 2){
                this.props.navigation.navigate('Psychologist',{chechBack:1})
               }else if(this.state.specializationId === 3){
                this.props.navigation.navigate('SpeechSpecialist',{chechBack:1})
               }else{
                this.props.navigation.navigate('AnotherArea',{chechBack:1})
               }
            }else{
                if(this.props.Language=='AR'){
                    alert('وافق على الشروط والاحكام')
                }else{
                    alert('Accept terms and condition')
                }
            }  
            }else{
                if(this.props.Language=='AR'){
                    alert('الايميل غير صحيح')
                }else{
                    alert("Email is not valid")
                }
            }
        }else{
           if(this.props.Language=='AR'){
               alert('أدخل جميع البيانات')
           }else{
               alert('Enter all data')
           }
        }
      
    }


    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#000', fontSize: 22,fontFamily:'adobe' }}>Create Account</Text>
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
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>أنشاء حساب</Text>
                    <View></View>
                </View>
            )
        }
    } 

    renderRadio(clicked){
        return(
         <TouchableOpacity
         style={[styles.shadow,{width:20,height:20,borderRadius:20/2,backgroundColor:'#E4E4E4',margin:3,justifyContent:'center',alignItems:'center'}]}
         onPress={()=>{
            this.setState({radioSelected:clicked})
         }}>
           {this.state.radioSelected === clicked?
           <LinearGradient colors={['#47D9D3', '#3D7371']} style={{width:15 ,height:15 ,borderRadius:15/2,}}>
           {/* <Icon name="circle" size={20} color="#28B5AF" style={{}} />  */}
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
                color='#28B5AF'
                    visible={this.props.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#28B5AF' }}
                />
                {this.renderHeader(this.props.Language)}
                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 18 }} >
                    <View style={{alignItems:'center',justifyContent:'center',paddingTop:20}}>
                    <View style={[this.props.Language == "AR"?styles.row:styles.row_res, {width: width - (36 * 2) ,justifyContent: 'space-around', alignItems: 'center' }]} >
                        <View style ={[this.props.Language == "AR"?styles.row:styles.row_res,{flex:1,alignItems:'center',justifyContent:'center',borderColor:'#28B5AF',borderWidth:1,borderRadius:20}]}>
                            <Text style={{ alignSelf: 'center', color: '#707070', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'متخصص' : 'Speacialist'}
                            </Text>
                            {this.renderRadio(2)}
                        </View>
                        <View style={{width:'3%'}}></View>
                        <View style ={[this.props.Language == "AR"?styles.row:styles.row_res,{flex:1,alignItems:'center',justifyContent:'center',borderColor:'#28B5AF',borderWidth:1,borderRadius:20}]}>
                            <Text style={{ alignSelf: 'center', color: '#707070', fontSize: 18 ,fontFamily:'adobe',margin:7 }}>
                                {this.props.Language == "AR" ? 'عضو جديد' : 'New member'}
                            </Text>
                            {this.renderRadio(1)}
                        </View>   
                    </View>
                    </View>
                      {this.state.radioSelected === 1 ?
                       <View style={{alignItems:'center',justifyContent:'center'}}>
                         <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 18 }]}>
                                <Input
                                    placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'الأسم بالكامل' : 'Username'}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ username: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'رقم الجوال' : 'Mobile number'}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ mobile: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'البريد الالكترونى' : 'Email address'}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'كلمه المرور' : 'Password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'تأكيد كلمة المرور' : 'Confirm password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { marginTop: 16, justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ alignSelf: 'center', color: '#323232', fontSize: 16,fontFamily:'adobe' }}>
                                {this.props.Language == "AR" ? 'موافق على الشروط و الاحكام' : 'I agree to the terms and conditions'}
                            </Text>
                            <CheckBox
                             checkedIcon={<Image style={{width:30,height:30,}} source={require('./../../img/checked.png')} />}
                             uncheckedIcon={<Image style={{width:30,height:30,}} source={require('./../../img/unchecked.png')} />}
                             checked={this.state.checked}
                             onPress={() =>{
                              this.setState({checked: !this.state.checked});
                              }}
                            />
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',marginTop:height*0.2}]}>
                        <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,]}>
                            <TouchableOpacity onPress={() => { this.Register() }} style={[styles.shadow, {width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                                <Text style={{ color: '#FFF', fontSize: 22, fontFamily:'adobe' }}>
                                    {this.props.Language == "AR" ? 'انشاء حساب' : 'Create Account'}
                                </Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>

                       </View>
                      
                      :
                      <View style={{alignItems:'center',justifyContent:'center'}}>
                           <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 18 }]}>
                                <Input
                                    placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'الأسم بالكامل' : 'Username'}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ username2: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'رقم الجوال' : 'Mobile number'}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({ mobile2: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'البريد الالكترونى' : 'Email address'}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ email2: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'كلمه المرور' : 'Password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password2: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#919191'
                                    placeholder={this.props.Language == "AR" ? 'تأكيد كلمة المرور' : 'Confirm password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontSize:20,fontFamily:'adobe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ confirmPassword2: text })}
                                />
                            </Item>
                        </View>

                    <View style={[this.props.Language == "AR"?styles.row:styles.row_res,styles.shadow,styles.picker,{}]}>
                   <Icon name="caret-down" size={17} color="#707070" style={{margin:10}} />
                   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.props.Language=='AR'?this.state.specializations:this.state.specializationsEN} // data
                   defaultValue={this.props.Language == "AR"?'مجال التخصص ':'Specialization'}
                   onSelect={(index, value) => { 
                     this.setState({ specializationId: value.value , color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.maEnd:styles.maStart,{fontSize: 18, color: this.state.color,fontFamily:'adobe',textAlign:'center',}]}
                  dropdownStyle={[styles.shadow,{ width: '60%', height:140,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
             </View>

             <View style={[styles.row, { marginTop: 3, justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ alignSelf: 'center', color: '#323232', fontSize: 18,fontFamily:'adobe' }}>
                                {this.props.Language == "AR" ? 'موافق على الشروط و الاحكام' : 'I agree to the terms and conditions'}
                            </Text>
                            <CheckBox
                             checkedIcon={<Image style={{width:35,height:35,}} source={require('./../../img/checked.png')} />}
                             uncheckedIcon={<Image style={{width:35,height:35,}} source={require('./../../img/unchecked.png')} />}
                             checked={this.state.checked}
                             onPress={() =>{
                              this.setState({checked: !this.state.checked});
                              }}
                            />
                        </View>
                        <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',marginTop:height*0.2}]}>
                        <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.Button,styles.shadow,]}>
                            <TouchableOpacity onPress={() => { this.next() }} style={[styles.shadow, {width:width*0.8,alignItems:'center',justifyContent:'center'}]} >
                                <Text style={{ color: '#FFF', fontSize: 19, fontFamily:'adobe' }}>
                                    {this.props.Language == "AR" ? 'التالى' : 'Next'}
                                </Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>

                      </View>
                      }
                        

                    </ScrollView>

                </KeyboardAvoidingView>
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
export default connect(mapStateToProps, { UserRegister })(Register)

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
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputFields: {
        borderBottomColor: '#FFF',
        width: width - (36 * 2),
        height:50,
        borderRadius: 7,
        backgroundColor: '#FFF',
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    Button: {
        width: width - (36 * 2) + 10,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 18,
        marginHorizontal: 10
    },
    image: {
        width: 170,
        height: 170
    },
    picker:{
        width: width - (36 * 2),height:45,
        borderRadius: 5,marginTop:10,
        alignItems:'center',justifyContent:'center',
        backgroundColor:'#FAFAFA'
    },
    maStart:{
        marginStart:'10%'
    },
    maEnd:{
        marginEnd:'10%'
    }
});