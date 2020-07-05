import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
//import { AsyncStorage } from 'react-native';

export default class SplashScreen extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      setTimeout(() => {
         this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
               NavigationActions.navigate({ routeName: 'ChooseLanguage' })
            ],
         }))
      }, 1500)
   }

   render() {
      return (
         <View style={styles.container} >
            <StatusBar backgroundColor='#28B5AF' barStyle="light-content" />
            <Image source={require('./../../img/logo.png')} style={[styles.image, { marginTop: 200 }]} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#FFF',
   },
   image: {
      width: 200,
      height: 200
   },
});