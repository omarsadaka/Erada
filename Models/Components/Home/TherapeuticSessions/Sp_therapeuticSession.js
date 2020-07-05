import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, FlatList, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux' // redux
import { SetLoading , getSession } from './../../../Actions' //redux


class Sp_therapeuticSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag_lang:0,
            flag_notify:0,
            consultings:[]
        };
    }

    componentWillMount() {
       this.props.getSession(this.props.User._id)
    }

    // componentWillReceiveProps= async(nextProps)=> {
    //     if (nextProps.Message != null) {
         
    //       alert(nextProps.Message)
    //     }
    // }

    
    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>Therapeutic session</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-right" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 55, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#28B5AF', paddingHorizontal: 18 }]} >
                    
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon name="chevron-left" style={{ color: '#ffffff', fontSize: 14,padding:7 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#F6F6F6', fontSize: 22,fontFamily:'adobe' }}>جلسات علاجية</Text>
                    <View></View>
                </View>
            )
        }
    } 

    renderItem(item){
        return (
          <TouchableOpacity
          onPress={() => { 
              this.props.navigation.navigate('Sp_sessionDetail',{ID: item.id})
              AsyncStorage.setItem('SessionID', item.id)
              }}>  
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <View style={[this.props.Language == "AR"?styles.row:styles.rowReverse,styles.view]}>
                <View style={{ width: '25%', height:'100%', alignItems: 'center'}}>
                  <Text style={{width:'100%',fontSize: 13,textAlign:'center',color:'#343434',fontFamily:'adobe',position:'absolute',top:10,}}>{item.time.split('T')[0]}</Text>
                </View>
    
                <View style={{ width: '50%', height:'100%',justifyContent:'center',}}>
                  <Text style={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 14,color: '#707070',fontWeight:'bold',fontFamily:'adobe',margin:3,paddingHorizontal:10 }]}>
                  {item.fullname}
                  </Text>
                  <Text style={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 18,color: '#707070',fontFamily:'adobe',paddingHorizontal:10}]}>
                  {this.props.Language == "AR" ? item.type==1?'متابع المريض':'المريض ' : item.type==1?'Patient':'Patient follower'}
                  </Text>
                </View>
                <View style={{ width: '25%', height:'100%', alignItems: 'center',justifyContent:'center'}}>
                <Image
                    source={{uri: item.imgPath}} style={{ width: 70, height: 70, borderRadius:70/2 }}>
                  </Image>
                </View>
              </View>
          </View>
          </TouchableOpacity>
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
               textStyle={{ color: '#28B5AF'}}
            />
                {this.renderHeader(this.props.Language)}
               
           <View>
             {this.props.Session.length == 0 ?
             <View style={{width:'100%',flex:1,alignItems:'center',justifyContent:'center'}}>
               <Icon name="calendar" style={{ color: '#E4E4E4', fontSize: 120 }} />
               <Text style={{  fontSize: 22, textAlign: 'center', color: '#E4E4E4',fontFamily:'adobe',}}>
                  {this.props.Language == "AR" ? 'لا يوجد جلسات علاجية' : 'No therapeuticSession'}
                  </Text>
             </View>
              
              :
              <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
              <FlatList style={{ width: '93%',marginBottom:5 }}
                data={this.props.Session}
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
        Session: state.AuthReducer.Session
    }
}
// redux
export default connect(mapStateToProps, {SetLoading , getSession})(Sp_therapeuticSession)

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
        backgroundColor:'#fff',
        borderRadius:8,
        marginVertical:3
    },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left'
    }
});
