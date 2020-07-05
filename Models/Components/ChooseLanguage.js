import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, Dimensions, AsyncStorage, YellowBox } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux' // redux
import { SetLanguage, SaveUser } from '../Actions' //redux

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

class ChooseLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Processing: false
        };
    }

    componentDidMount() {
        this.setState({ Processing: true })
        setTimeout(() => {
            AsyncStorage.getItem('Lang').then((val) => {
                if (val) {
                    this.props.SetLanguage(val)
                    AsyncStorage.getItem('User').then((value) => {
                        if (value != null) {
                            const user = JSON.parse(value)
                            this.props.SaveUser(user)
                            this.setState({ Processing: false })
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'HomeRoutes' })
                                ],
                            }))
                        } else {
                            this.setState({ Processing: false })
                            this.props.navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: 'Login' })
                                ],
                            }))
                        }
                    })
                } else {
                    this.setState({ Processing: false })
                }
            })
        }, 1000)
    }

    setAppLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem('Lang', lang).then((value) => {
                AsyncStorage.getItem('Lang')
                    .then((val) => {
                        this.props.SetLanguage(val)
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login' })
                            ],
                        }))
                    })
            })

        } catch (error) {
            alert("error")
        }
    };

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
                <Image source={require('./../../img/logo.png')} style={styles.image} />
                <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                    <Text style={{ fontSize: 12,  color: '#414141', marginVertical: 21,fontFamily:'adobe',fontWeight:'bold' }} >{"اختر لغه التطبيق"}</Text>
                </View>
                <View style={[styles.column]} >

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 26 }]}>
                        <TouchableOpacity onPress={() => this.setAppLanguage("AR")} style={[styles.Button, styles.shadow, { backgroundColor: '#E4E4E4',borderColor: '#28B5AF', borderWidth: 3 }]} >
                            <Text style={{ color: '#323232', fontSize: 14, fontFamily:'adobe',fontWeight:'bold' }}>العربيه</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                        <TouchableOpacity onPress={() => this.setAppLanguage("EN")} style={[styles.Button, styles.shadow, { backgroundColor: '#E4E4E4', borderColor: '#28B5AF', borderWidth: 3 }]} >
                            <Text style={{ color: '#323232', fontSize: 14, fontFamily:'adobe',fontWeight:'bold' }}>English</Text>
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
export default connect(mapStateToProps, { SetLanguage, SaveUser })(ChooseLanguage)

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
        justifyContent: 'center',
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