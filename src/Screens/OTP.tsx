import React from 'react';
import { Button, Text, View, Input, Card, Spinner, NativeBaseProvider } from 'native-base';
import Item from 'native-base';
import { Alert, Image, AsyncStorage, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from '../Helpers/Constants'
import { OTPLoginRequest } from '../Models/Request';
import OTPService from '../APIManager/OTPService';
import AppColors from './AppColors';
import { TextInput } from 'react-native-gesture-handler';
interface OTPState {
  otp: string
  requestId: string
  isHidden: boolean
}
interface OTPProps {
}
export default class OTP extends React.Component<OTPProps, OTPState> {
  componentDidMount() {
    this.setState({ requestId: this.props.route.params.requestId })
  }
  constructor(props: OTPProps) {
    super(props)
    this.state = {
      otp: '',
      requestId: '',
      isHidden: true
    };
    this.submitOTP = this.submitOTP.bind(this);
  }
   
  render() {
    const { viewStyle } = styles
    return (
      <NativeBaseProvider>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: AppColors.keyboardVoiding }} behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/jadeLogo.png')} style={{ marginTop: 25, resizeMode: 'contain', height: '50%', width: '50%' }} />
            </View>
            <View style={{ flex: 2, shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5 }}>
              {
                !this.state.isHidden && <Spinner size='lg' color={AppColors.appThemeColor} animating={true} />
              }
              <Card style={{ flex: 2, flexDirection: 'column', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                <Text style={{ textAlign: 'center', color: AppColors.blackTitle, fontWeight: '500', marginTop: 20, fontSize: 20 }}> Login </Text>
                <Text style={{ color: AppColors.blackTitle, textAlign: 'center', marginTop: 20 }}> Enter the OTP </Text>
              
                  <TextInput onSubmitEditing={this.submitOTP} 
                  keyboardType='number-pad' 
                  returnKeyType='done' 
                  style={{ textAlign: 'center', color: AppColors.blackTitle, fontSize: 18, marginLeft: 10, borderBottomColor: 'black', borderBottomWidth: 1 }} 
                  placeholder='OTP' 
                  onChangeText={(text) => this.setState({ otp: text })}>

                  </TextInput>
              
                <View style={{ width: '100%', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                  <Button style={{ backgroundColor: AppColors.appThemeColor, width: '40%', justifyContent: 'center' }} onPress={this.submitOTP} >
                    <Text style={{ color: AppColors.whiteTitle, fontSize: 20 }}>Login</Text>
                  </Button>
                </View>
              </Card>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
  }

  async submitOTP() {
    if (this.state.otp.length === 0) {
      Alert.alert('Error', Constants.otpAlertMessage)
      return
    }
    this.setState({ isHidden: false })
    let request: OTPLoginRequest = { otpRequestId: this.state.requestId, otp: this.state.otp }
    let response = await OTPService.LoginOTP(request)
    this.setState({ isHidden: true })
    if (response.success) {
      AsyncStorage.setItem('token', response.data.token)
      AsyncStorage.setItem('user', JSON.stringify(response.data.user))
      Constants.authenticationToken = response.data.token
      // if (response.data.user.designation == 'Other') {
      //   Constants.isManager = true
      // }
      if (Constants.isAppoinmentAppSelected){
          this.props.navigation.navigate('Appointment')
          return
      }
      this.props.navigation.navigate('Home')
      return
    }
    Alert.alert("Error", response.fieldErrors[0].errorMessage);
  }
}
const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'
  }
}