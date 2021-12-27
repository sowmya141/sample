import React from 'react';
import {Button,Text, View,  Card, NativeBaseProvider, Spinner} from 'native-base';
import {Alert,  Image, AsyncStorage, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform ,TextInput} from 'react-native';
import Constants from '../Helpers/Constants'
import AuthService from '../APIManager/AuthService';
import { LoginRequest } from '../Models/Request'
import { OTPRequest } from '../Models/Request';
import OTPService from '../APIManager/OTPService';
import ProjectService from '../APIManager/ProjectService';
import AppColors from './AppColors';
import {DeviceTokenRequest} from '../Models/Request/DeviceTokenRequest'

interface PasswordState {
   email : string
   password: string
   isHidden: boolean
}

interface PasswordProps {
  navigation:any,
  route:any
}

export default class Password extends React.Component<PasswordProps,PasswordState> {
  componentDidMount() {
    this.setState({email: this.props.route.params.email})
  }
  constructor(props: PasswordProps){
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
          <View style = {{ flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'}}>
          <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/jadeLogo.png')}style = {{marginTop: 25,resizeMode:'contain', height: '50%', width: '50%'}}/>
           </View>  
           <View style = {{flex: 2,shadowColor: AppColors.shadowColor,shadowOpacity: 0.25,shadowRadius: 5,elevation: 5}}>
           <Card style = {{flex: 2, flexDirection: 'column', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
             <Text style = {{textAlign: 'center', color: AppColors.blackTitle, fontWeight : '500', marginTop: 20, fontSize: 20}}> Login </Text>
             <Text style = {{color: AppColors.blackTitle, marginLeft: '10%', marginTop: '15%'}}> Password </Text>
            
               <TextInput
              onSubmitEditing = {this.submitButtonPressed} 
              returnKeyType = 'done' style = {{borderWidth:2,borderColor:'black',alignItems:'center',marginLeft:25,marginRight:20,paddingLeft:10,borderLeftWidth:3,borderRadius:25}}
               placeholder = 'Enter your password'  secureTextEntry={true} 
               onChangeText={(text) => this.setState({password: text})}
              />
             {/* </Card> */}
             <View style = {{width: '100%',marginTop: 30,justifyContent: 'center',alignItems: 'center',paddingBottom:10}}>
                    <Button style = {{backgroundColor: AppColors.appThemeColor, width: '40%', justifyContent: 'center'}} onPress =  {this.submitButtonPressed} >
                        <Text style = {{color: AppColors.whiteTitle, fontSize: 20}}>Login</Text>
                    </Button>
              </View>
             <View style = {{width: '100%',height: '10%',justifyContent: 'center',alignItems: 'flex-end'}}>
             <View style={{flex:1,padding:2}}>
                   
                        <Text style = {{color: AppColors.appThemeColor, textDecorationLine: 'underline',fontSize: 15}}
                          onPress={this.submitButtonPressed}
                        >Forgot Password?</Text>
                   
              </View>
              
                   <View style={{flex:1,padding:2}}>
                        <Text style = {{color: AppColors.appThemeColor, textDecorationLine: 'underline',fontSize: 15}}
                         onPress =  {this.requestOTP}>Request OTP?</Text>
                   </View>
             
              </View>
            
             </Card>   
             </View>    
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        
    );
  }
        async submitButtonPressed() {
          if (this.state.password.length == 0) {
            Alert.alert('Error', Constants.passwordAlertMessage)
            return
          }
           this.setState({isHidden: false })
           let request: LoginRequest = { email: this.state.email, password: this.state.password}
           let response = await AuthService.Login(request)
           this.setState({isHidden: true })
           if (response.success) {
              AsyncStorage.setItem('token', response.data.token)
              AsyncStorage.setItem('user', JSON.stringify(response.data.user))
              Constants.authenticationToken = response.data.token
              if (Constants.token.length > 0){
                 setTimeout(() => { this.uploadDeviceFCMToken() }, 200);
            
              }
              
              // if (response.data.user.designation == 'Other') {
              //   Constants.isManager = true
              // }
              this.props.navigation.navigate('Home')
              return
           }
           //Alert.alert("Error", response.errorMessage);
        }

        async uploadDeviceFCMToken() {
          
         let request: DeviceTokenRequest = { deviceToken: Constants.token,  deviceOS: Platform.OS }
          let response = await ProjectService.uploadDeviceToken(request)
            if (response?.success) {
             Constants.token = ''
              return;
            }
        }

         async requestOTP() {
            this.setState({isHidden: false })
            let request: OTPRequest = { email: this.state.email}
            let response = await OTPService.RequestOTP(request)
            this.setState({isHidden: true })
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