import React from 'react';
import {Button, Text, View, Input, Card, Spinner, Container,NativeBaseProvider} from 'native-base';
import {Image, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform,TextInput} from 'react-native';
import Constants from '../Helpers/Constants'
import AppColors from './AppColors';
import OTPService from '../APIManager/OTPService';
import { OTPRequest } from '../Models/Request';

interface LoginState {
   email : string
   password: string
    isHidden: boolean
}

interface LoginProps {
  navigation:any
}

export default class Login extends React.Component<LoginProps,LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      email: 'admin@demo.com',
      password: 'admin@123',
       isHidden: true
    };
     this.submitButtonPressed = this.submitButtonPressed.bind(this);
       this.requestOTP = this.requestOTP.bind(this);
  }

  render() {
    const {viewStyle} = styles
      return (
      
        <KeyboardAvoidingView style={{flex:1, backgroundColor:AppColors.keyboardVoiding}} behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'}}>
          <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/jadeLogo.png')}style = {{marginTop: 25,resizeMode:'contain', height: '50%', width: '50%'}}/>
           </View>  
           <View style = {{flex: 2,shadowColor: AppColors.shadowColor,shadowOpacity: 0.25,shadowRadius: 5,elevation: 5}}>
            {
                !this.state.isHidden && <Spinner size='lg' color={AppColors.appThemeColor} animating={true} />
              }
           <Card style = {{flex: 2, flexDirection: 'column', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
             <Text style = {{textAlign: 'center', color: AppColors.blackTitle, fontWeight : '500', marginTop: 20, fontSize: 20}}> Login </Text>
             <Text style = {{color: AppColors.blackTitle, marginLeft: '10%', marginTop: '15%'}}>{Constants.isAppoinmentAppSelected ? "Email ID/Phone Number" : "Email ID" } </Text>
              <TextInput
              onSubmitEditing = {this.submitButtonPressed}
               keyboardType = 'email-address' returnKeyType = 'next'
                style = {{borderWidth:2,borderColor:'black',alignItems:'center',marginLeft:25,marginRight:20,paddingLeft:10,borderLeftWidth:3,borderRadius:25}}
                 placeholder = {Constants.isAppoinmentAppSelected ?'Enter your Email Id/Phone Number' : 'Enter your Email Id'} 
                value={this.state.email}
                 onChangeText={(text) => this.setState({email: text})}
              />
             <View style = {{width: '100%',marginTop: 30,justifyContent: 'center',alignItems: 'center'}}>
                    <Button style = {{backgroundColor: AppColors.appThemeColor, width: '40%', justifyContent: 'center'}} onPress =  {this.submitButtonPressed} >
                        <Text style = {{color: AppColors.whiteTitle,  fontSize: Constants.isAppoinmentAppSelected ? 15 : 20}}>{Constants.isAppoinmentAppSelected ? "Get OTP" : "Proceed"}</Text>
                    </Button>
              </View>
             </Card>    
             </View>
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        
    );
  }
        async submitButtonPressed() {
          if (this.state.email.length > 0) {
             if (Constants.isAppoinmentAppSelected){ 
                this.requestOTP()
                 return
             }

              this.props.navigation.navigate('Password', {email: this.state.email})
            return
          }
            Alert.alert('Error', Constants.emailAlertMessage)
        }

         async requestOTP() {
             this.setState({ isHidden: false })
            let request: OTPRequest = { email: this.state.email}
            let response = await OTPService.RequestOTP(request)
                  this.setState({ isHidden: true })
            if (response.success) {
                this.props.navigation.navigate('OTP', {requestId: response.data.otpRequestId})
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