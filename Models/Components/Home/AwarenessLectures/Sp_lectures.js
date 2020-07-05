import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, FlatList, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux' // redux
import { SetLoading , getLecture} from './../../../Actions' //redux


class Sp_lectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag_lang:0,
            flag_notify:0,
            consultings:[]
        };
    }

    componentWillMount() {
        this.props.getLecture()
    }

    
    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Awareness lectures</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14 }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>محاضرات توعية</Text>
                    <View></View>
                </View>
            )
        }
    } 

    renderItem(item){
        return (
        <View style={{ width: width * 0.6, height:height*0.45,}}>
          <TouchableOpacity
        //   onPress={()=>{
        //     this.props.navigation.navigate('OfferDetail')
        //    }}
          style={[styles.viewItem,styles.shadow,{margin:5}]}>
              <View style={[{width: '100%',height:'100%',alignItems:'center'}]}>
                <Text style={[this.props.Language == "AR" ? styles.right : styles.left,{width:'80%',color: '#5E5E5E', marginTop:5,fontSize: 20,fontFamily:'adobe'}]}>
                     {this.props.Language == "AR" ? 'محاضرة توعية' : 'Awareness lectures'}
                 </Text>
                 <View style={{width:'80%',height:'50%',alignItems:'center',justifyContent:'center',backgroundColor:'#F5F5F5'}}>
                  <Image
                   resizeMode = 'contain'
                   source={require('./../../../../img/logo.png')}
                   style={{  width: '70%',height:'70%',alignItems: 'center',}}/>
                 </View>

                 <View style={[this.props.Language == "AR" ? styles.row :styles.rowReverse,{width:'80%',marginTop:5,alignItems:'center',justifyContent:'center',}]}>
                      <Text style={[this.props.Language == "AR" ? styles.right :styles.left,{width:'95%',paddingHorizontal:7,color: '#707070', fontSize: 12,fontFamily:'adobe',fontWeight:'bold'}]}>
                      {this.props.Language == "AR" ? item.zoneAr + ' - ' + item.cityAr : item.zoneEN + ' - ' + item.cityEN}
                      </Text>
                     <Icon name="map-marker" style={{ color: '#79E5E1', fontSize: 20,margin:3 }} />
                   </View>
                  
                   <View style={[{ justifyContent: 'center',position:'absolute',bottom:7}]}>
                 <LinearGradient colors={['#47D9D3', '#3D7371']} style={[styles.button,styles.shadow,]}>
                  <TouchableOpacity 
                  onPress={() => { this.props.navigation.navigate('JoinRequest',{awarenessID:item.id})}}
                  style={styles.shadow,{width:'100%',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{ color: '#FFF', fontSize: 20,fontFamily:'adobe' }}>
                     {this.props.Language == "AR" ? "طلب أنضمام" : "Join request"}
                  </Text>
                  </TouchableOpacity>
                  </LinearGradient>
               </View>
                  
                 
              </View>
          </TouchableOpacity>
          </View>
        );
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
           <View>
             {this.props.Lecture.length ===0 ?
             <View style={{width:'100%',flex:1,alignItems:'center',justifyContent:'center'}}>
               <Icon name="calendar" style={{ color: '#E4E4E4', fontSize: 120 }} />
               <Text style={{  fontSize: 22, textAlign: 'center', color: '#70707070',fontFamily:'adobe',}}>
                  {this.props.Language == "AR" ? 'لا يوجد برامج الأن' : 'No program now'}
                  </Text>
             </View>
              
              :
              <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
              <FlatList style={{ width: '93%',marginBottom:5 }}
                data={this.props.Lecture}
                numColumns={1}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
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
       Lecture: state.AuthReducer.Lecture
    }
}
// redux
export default connect(mapStateToProps, { SetLoading , getLecture})(Sp_lectures)

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
        elevation: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    },
    button: {
        backgroundColor: '#28B5AF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60,
        borderRadius: 60,
      },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left'
    },
     viewItem:{
        flex:1,
        backgroundColor:'#fff',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
      },
});
