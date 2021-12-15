import React, { Component, useState } from 'react';
import {  Button, Card,NativeBaseProvider } from 'native-base';
import { Dimensions, Alert, Image, AsyncStorage, TouchableOpacity, Text, View, } from 'react-native';
import AppColors from './AppColors';
import Constants from '../Helpers/Constants';

export default class DemoProceed extends Component {
  constructor(props) {
    super(props);
    this.demoButtomPressed = this.demoButtomPressed.bind(this);
  }

  demoButtomPressed(title) {
    Constants.isManager = title == "Admin"
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 70, marginRight: 70 }}>
          <Text style={{ textAlign: 'center', color: AppColors.blackTitle }}> How would you like to proceed? </Text>

          <Button style={{ backgroundColor: AppColors.appThemeColor, justifyContent: 'center', height: 50, width: "100%", marginTop: 45 }} onPress={() => this.demoButtomPressed("Admin")}>
            <Text style={{ color: AppColors.whiteTitle, fontSize: 15, fontWeight: '500' }}> Manager Login </Text>
          </Button>
          <Text style={{ textAlign: 'center', color: AppColors.blackTitle, marginTop: 50 }}> or </Text>

          <Button style={{ backgroundColor: AppColors.appThemeColor, height: 50, justifyContent: 'center', marginTop: 50, width: "100%" }} onPress={() => this.demoButtomPressed("Employee")}>
            <Text style={{ color: AppColors.whiteTitle, fontSize: 15, fontWeight: '500' }}> Employee Login </Text>
          </Button>

        </View>
      </View>
      </NativeBaseProvider>
    );
  }
}