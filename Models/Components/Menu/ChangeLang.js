import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, Dimensions, AsyncStorage, YellowBox,BackHandler } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux' // redux
import { SetLanguage} from '../../Actions' //redux
import Icon from 'react-native-vector-icons/FontAwesome';

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

class ChangeLang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Processing: false
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     }
  
     componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
     }
  
     handleBackButtonClick = () => {
        this.props.navigation.navigate('Home');
        return true;
     }

    setAppLanguage = (lang) => {
        this.setState({ Processing: true })
        setTimeout(() => {
           try {
              AsyncStorage.setItem('Lang', lang).then((value) => {
                 AsyncStorage.getItem('Lang')
                    .then((val) => {
                       this.props.SetLanguage(val)
                       this.setState({ Processing: false })
                       this.props.navigation.navigate('Home');
                    })
              })
  
           } catch (error) {
              this.setState({ Processing: false })
              alert(error)
           }
        }, 1000)
     };

     renderHeader(lang) {
        if (lang == "EN") {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 50, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
                 <View></View>
                 <Text style={{ color: '#fff', fontSize: 22,fontFamily:'adobe' }}>Language</Text>
                 <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                    <Icon name="chevron-right" style={{ color: '#fff', fontSize: 14 }} />
                 </TouchableOpacity>
              </View>
           )
        } else {
           return (
              <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: 50, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#28B5AF', paddingHorizontal: 12 }]} >
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} >
                    <Icon name="chevron-left" style={{ color: '#fff', fontSize: 14 }} />
                 </TouchableOpacity>
                 <Text style={{ color: '#fff', fontSize: 22 ,fontFamily:'adobe'}}>اللغه</Text>
                 <View></View>
              </View>
           )
        }
     }

    render() {
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
                <Spinner
                color='#28B5AF'
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#28B5AF' }}
                />
                {/* {this.renderHeader(this.props.Language)} */}
                <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',marginTop:20 }]} >
                <Image source={require('./../../../img/logo.png')} style={styles.image} />
                </View>
                <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                    <Text style={{ fontSize: 18,  color: '#414141', marginTop: height*0.15,fontFamily:'adobe' }} >{"اختر لغه التطبيق"}</Text>
                </View>
                <View style={[styles.column]} >

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 26 }]}>
                        <TouchableOpacity onPress={() => this.setAppLanguage("AR")} style={[styles.Button, styles.shadow, { backgroundColor: '#E4E4E4',borderColor: '#28B5AF', borderWidth: 3 }]} >
                            <Text style={{ color: '#323232', fontSize: 19, fontFamily:'adobe' }}>العربيه</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                        <TouchableOpacity onPress={() => this.setAppLanguage("EN")} style={[styles.Button, styles.shadow, { backgroundColor: '#E4E4E4', borderColor: '#28B5AF', borderWidth: 3 }]} >
                            <Text style={{ color: '#323232', fontSize: 19, fontFamily:'adobe' }}>English</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        );
    }
}

//redux
const mapStateToProps = state => {
    return {
        Language: state.LanguageReducer.Language,
    }
}
// redux
export default connect(mapStateToProps, { SetLanguage})(ChangeLang)

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
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    Button: {
        width: width - (36 * 2),
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginBottom: 18,
        marginHorizontal: 36
    },
    image: {
        width: 150,
        height: 150,
    },
});