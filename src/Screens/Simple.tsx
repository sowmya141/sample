import React from "react";
import {Button, Input, Card, Spinner,Container,NativeBaseProvider} from 'native-base';
import {Image, Alert, TouchableWithoutFeedback,  Text, View,Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import Constants from '../Helpers/Constants'
import AppColors from "./AppColors";

class Simple extends React.Component{
  render(){
    return(
        <NativeBaseProvider>
     
      <KeyboardAvoidingView style={{flex:1, backgroundColor:AppColors.keyboardVoiding}} behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1,
  backgroundColor: AppColors.background,
  flexDirection: 'column'}}>
        <View style= {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={require('../assets/jadeLogo.png')}style = {{marginTop: 25,resizeMode:'contain', height: '50%', width: '50%'}}/>
         </View>  
         <View style = {{flex: 2,elevation: 5}}>
          {
              true && <Spinner size='lg' color={AppColors.appThemeColor} animating={true} />
            }
         <Card style = {{flex: 2, flexDirection: 'column', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
           <Text style = {{textAlign: 'center', color: AppColors.blackTitle, fontWeight : '500', marginTop: 20, fontSize: 20}}> Login </Text>
           <Text style = {{color: AppColors.blackTitle, marginLeft: '10%', marginTop: '15%'}}>{Constants.isAppoinmentAppSelected ? "Email ID/Phone Number" : "Email ID" } </Text>
           {/* <Card style = {{height: 50, marginTop:10, marginLeft: '10%', marginRight: '10%', elevation: 3}}>
             <Input  keyboardType = 'email-address' returnKeyType = 'next' style = {{color:AppColors.blackTitle, fontSize: 15, marginLeft: 10}} placeholder = {Constants.isAppoinmentAppSelected ?'Enter your Email Id/Phone Number' : 'Enter your Email Id'}   onChangeText={(text) => this.setState({email: text})}></Input>
           </Card> */}
           <View style = {{width: '100%',marginTop: 30,justifyContent: 'center',alignItems: 'center'}}>
                  <Button style = {{backgroundColor: AppColors.appThemeColor, width: '40%', justifyContent: 'center'}}  >
                      <Text style = {{color: AppColors.whiteTitle,  fontSize: Constants.isAppoinmentAppSelected ? 15 : 20}}>{Constants.isAppoinmentAppSelected ? "Get OTP" : "Proceed"}</Text>
                  </Button>
            </View>
           </Card>    
           </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </NativeBaseProvider>
       
    )
  }
}
export default Simple;