import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Picker, Image, ScrollView, 
   BackHandler , AsyncStorage } from 'react-native';
import { Input, Item, Right } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import { connect } from 'react-redux' // redux
import { SetLoading , getTimes} from './../../../Actions' //redux


class Session extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Processing: false,
            time:'',
            timeName:'',
            date:'',
            color:'#d3d3d3',
            data:{},
            requestID:''
        };
     }

     componentWillMount = async()=>{
      const data = await AsyncStorage.getItem('SpecialistData');
      if (data) {
        const obj = JSON.parse(data);
        this.setState({ data: obj })
      } else {
       alert('no SpecialistData')
      }

      const id = await AsyncStorage.getItem('RequestID');
      if (id) {
        this.setState({ requestID: id })
      }
     
   }
   
  
     renderHeader(lang) {
        if (lang == "AR") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 ,padding:7 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>جلسة علاجية</Text>
                 <View></View>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}> Therapeutic session</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                 <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                 </TouchableOpacity>
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
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style={{width:width,height:height,alignItems:'center',}}>
                <View style={[this.props.Language == "AR" ? styles.row :styles.rowReversed,styles.view,styles.shadow,{padding:3}]}>
                  <View style={{width:'15%',alignItems:'center'}}>
                    <Icon  name="star" size={18} color="#FFE000"/>
                    <Text style={{color: '#707070', fontSize: 20,fontFamily:'adobe',textAlign:'center' }}>
                     {this.props.Language == "AR" ? '5.3' : '5.3'}
                    </Text>
                   </View>

                   <View style={{flex:1,justifyContent:'center'}}>
                     <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{color:'#707070', fontSize: 18,fontFamily:'adobe'}]}>
                     {this.state.data.fullname}
                    </Text>
                    <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{color:'#707070', fontSize: 18,fontFamily:'adobe'}]}>
                    {this.state.data.experiences}
                   </Text>
                  </View>

                  <View style={{width:'27%',paddingHorizontal:10 , alignItems:'center' ,justifyContent:'center'}}>
                  {this.state.data.imgPath?
                      <Image
                      source={{uri: this.state.data.imgPath}}
                      style={{  width: 70,height:70,alignItems: 'center', borderRadius: 70/2}}/>
                     :
                     <Image
                     resizeMode = 'contain'
                     source={require('./../../../../img/user.png')}
                     style={{  width: '97%',height:'97%',alignItems: 'center',}}/>
                     }
                    </View>

                </View>

                   <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                        marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "التاريخ" : "Date"}
                 </Text>
                  <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',paddingHorizontal: 24, }]} >
                  <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.shadow, { width:'100%',height: 40, alignItems: 'center',backgroundColor:'#fff',borderRadius:5 }]}>
                     <Icon name="sort-desc" style={{ fontSize: 15,color: '#707070',margin:10 }} />
                        <DatePicker
                         style={{ flex:1}}
                            date={this.state.date}
                            placeholder={this.props.Language == "AR" ? " أختر التاريخ" : "Choose Date" }
                           textStyle={{ color: "#000",textAlign:'right' }}
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
                            
                             borderWidth: 0,borderColor: '#707070',fontSize:14,marginStart:this.props.Language=='AR'?'55%':0
                           }
                           // ... You can check the source to find the other keys.
                           }}
                           onDateChange={(date) => {
                              this.setState({date})
                              this.props.getTimes(this.state.data.id , date , 2)
                           }}
                        />
                     </View>
                  </View>

                  <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                        marginTop:20,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "الوقت" : "Time"}
                 </Text>
                 <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',paddingHorizontal: 24, }]} >
                 <View style={[this.props.Language == "AR" ? styles.row : styles.rowReversed, styles.shadow, { width:'100%', height: 40, alignItems: 'center',backgroundColor:'#fff',borderRadius:5 }]}>
                     <Icon name="sort-desc" style={{ fontSize: 15,color: '#707070',margin:10 }} />
                     <ModalDropdown
                   options={this.props.Times} // data
                   defaultValue={this.props.Language == "AR"?'أختر الوقت ':'Choose time'}
                   onSelect={(index, value) => { 
                     this.setState({ time: value.id ,timeName:value.endTime+' - '+value.startTime , color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => ( rowData.endTime+ '-' + rowData.startTime)} // ba3d ma t5tar
                   style={{ width:'90%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 18, color: this.state.color,paddingHorizontal:'10%',fontFamily:'adobe' }]}
                  dropdownStyle={[styles.shadow,{ width: '70%', height:120,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted){
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 25,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                     {rowData.endTime}{' - '} {rowData.startTime}
                       </Text>
                     </View>
                      );
                      }.bind(this)}
                      />
                     </View>
                  </View>

                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#919191', fontSize: 18,fontFamily:'adobe',
                    marginTop:10,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "الوصـف" : "Description"}
                 </Text>
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',paddingHorizontal: 24, }]}>
                  <Item style={[styles.inputFields, styles.shadow, { }]}>
                     <Input
                      placeholder={this.props.Language == "AR" ? 'أكتب وصف الطلب هنا' : 'write description here'} 
                      placeholderTextColor='#BDBDBD'
                      style={[this.props.Language == "AR" ? styles.right :styles.left ,{ color: '#000',fontSize:17,fontFamily:'adobe',height:100,textAlignVertical:'top' }]}
                       onChangeText={(text) => this.setState({ description: text })} />
                  </Item>
               </View>
               <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#BDBDBD', fontSize: 20,fontFamily:'adobe',
                        marginTop:10,width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "ملحوظة" : "Note"}
                 </Text>
                 <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{ color: '#BDBDBD', fontSize: 20,fontFamily:'adobe',
                        width:width,paddingHorizontal: 24, }]}>
                   {this.props.Language == "AR" ? "مدة الجلسة 40 دقيقة" : "Session time 40 minites"}
                 </Text>

               <View style={[{ justifyContent: 'center',alignItems:'center',marginTop:30 }]}>
               <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { 
                     const { date , timeName , description , requestID  } = this.state
                     if(date && timeName && description ){
                        if(requestID){
                           const obj={
                              date: date,
                              time: timeName,
                              timeName: timeName,
                              description: description,
                              speicalistID: this.state.data.id,
                              requestID: requestID,
                              name: this.state.data.fullname,
                              imgPath: this.state.data.imgPath,
                              userID: this.props.User._id,
                              speicalistID: this.state.data.id
                          }
                          AsyncStorage.setItem('MakeSessionRequest', JSON.stringify(obj))
                          this.setState({date :'' , time:'' ,description:''})
                          this.props.navigation.navigate('SessionDetail')
                        }else{
                           if(this.props.Language =='AR'){
                               alert('لا يجوز حجز جلسة علاجية حاليا لم يتم تحويلك الي جلسة علاجية     ')
                           }else{
                               alert('Not allow to make session not transferred to a treatment session')
                           }
                       }
                     }else{
                         if(this.props.Language =='AR'){
                             alert('أدخل البيانات المطلوبة')
                         }else{
                             alert('Enter required data')
                         }
                     }
                   }}
                  style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center'}]}>
                     <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                        {this.props.Language == "AR" ? "أرسل الطلب" : "Send request"}
                     </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>
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
       Times: state.AuthReducer.Times
    }
 }
 // redux
 export default connect(mapStateToProps,{ SetLoading , getTimes})(Session)
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
       shadowOpacity: 0.2,
       shadowRadius: 10,
       elevation: 8,
    },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left',

    },
    container: {
       flex: 1,
       alignItems: 'center',
       backgroundColor:'#F0F2F5',
    },
    button: {
        width:width*0.8,
       backgroundColor: '#28B5AF',
       justifyContent: 'center',
       alignItems: 'center',
       paddingHorizontal: 60,
       paddingVertical: 5,
       borderRadius: 60,
    },
    inputFields: {
        borderBottomColor: '#FFF',
        borderRadius: 5,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
     },
    image: {
        width: 120,
        height: 120
    },
    view:{
        width:width,
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