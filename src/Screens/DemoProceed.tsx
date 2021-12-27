import React, { Component, useState } from 'react';
import {  Button, Card,NativeBaseProvider } from 'native-base';
import { Dimensions, Alert, Image, AsyncStorage, TouchableOpacity, Text, View } from 'react-native';
import AppColors from './AppColors';
import Constants from '../Helpers/Constants';
import * as Animatable from 'react-native-animatable';

interface navPage{
  navigation:any
}

export default class DemoProceed extends Component<navPage> {
  constructor(props:navPage) {
    super(props);
    this.demoButtomPressed = this.demoButtomPressed.bind(this);
  }

  demoButtomPressed(title:string) {
    Constants.isManager = title === "Admin"
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
     
      <View style={{ flex: 1 }}>
         <View style={{marginTop:10,justifyContent:'center',alignItems:'center',marginBottom:17}}>
           <Animatable.Image 
            style={{resizeMode:'contain', height: '40%', width: '50%'}}
            animation='fadeInUp'
            delay={1200}
            source={require('../assets/jadeLogo.png')}
           >
            
         
           </Animatable.Image>
           </View>
         
        <View style={{ marginLeft: 70, marginRight: 70 ,bottom:80}}>
          <Text style={{ textAlign: 'center', color: AppColors.blackTitle,fontFamily:'Rubik-BoldItalic',fontSize:20 }}> How would you like to proceed? </Text>

          <Button style={{ backgroundColor: AppColors.appThemeColor, justifyContent: 'center', height: 50, width: "100%", marginTop: 45 }} onPress={() => this.demoButtomPressed("Admin")}>
            <Text style={{ color: AppColors.whiteTitle, fontSize: 15, fontWeight: '500' ,fontFamily:'Rubik-SemiBold'}}> Manager Login </Text>
          </Button>
          <Text style={{ textAlign: 'center', color: AppColors.blackTitle, marginTop: 50 ,fontFamily:'Rubik-BoldItalic'}}> or </Text>

          <Button style={{ backgroundColor: AppColors.appThemeColor, height: 50, justifyContent: 'center', marginTop: 50, width: "100%" }} onPress={() => this.demoButtomPressed("Employee")}>
            <Text style={{ color: AppColors.whiteTitle, fontSize: 15, fontWeight: '500',fontFamily:'Rubik-SemiBold' }}> Employee Login </Text>
          </Button>

        </View>
      </View>
     
    );
  }
}