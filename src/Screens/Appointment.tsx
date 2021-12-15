import React, { Component, useState } from 'react';
import { Container, Text, Button, NativeBaseProvider} from 'native-base';
import { View, Image, Dimensions,  TouchableOpacity,} from 'react-native';
import AppColors from './AppColors';
import Dialog, { DialogContent } from 'react-native-popup-dialog'
//import PushNotificationIOS from "@react-native-community/push-notification-ios";
//var PushNotification = require("react-native-push-notification");
//import call from 'react-native-phone-call';
//import { formatDate, getDay, getMonth, getDateSuffix } from '../Helpers/DateExtension';

interface AppointmentState {
    dialogVisible: boolean,
    confirmedScreening: boolean,
    screeningCompleted: boolean,
    proceedStatus: boolean,
    getAddedToQueueStatus: boolean,
    showTokenStatus: boolean,
    showDoneButtonStatus: boolean,
    showReSchedualDialog: boolean
    currentDate:String,
    time: String
}
interface AppointmentProps {
}

const args = {
  number: '7795312717', // String value with the number to call
  prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
}

export default class Appointment extends Component {
 async refreshScreeningData() {
     this.setState({proceedStatus: true, screeningCompleted: true, confirmedScreening: false})
  }


    constructor(props: AppointmentProps) {
    super(props);
    this.state = {
      isLoading: true,
      dialogVisible: false,
      confirmedScreening: true,
      screeningCompleted: false,
      proceedStatus: false,
      getAddedToQueueStatus: false,
      showTokenStatus: false,
      showDoneButtonStatus: false,
      cancelButtonStatus: false,
      showReSchedualDialog: false,
      currentDate: this.getDay(),
      time: this.getTime()
    }

     this.okayButtonAction = this.okayButtonAction.bind(this);
     this.proceedAction = this.proceedAction.bind(this);
     this.appointmentConfirmButtonAction = this.appointmentConfirmButtonAction.bind(this);
     this.appointmentCancelButtonAction = this.appointmentCancelButtonAction.bind(this);
     this.appointmentReSchedualButtonAction = this.appointmentReSchedualButtonAction.bind(this);
     this.confirmButtonAction = this.confirmButtonAction.bind(this);
     this.logoutButtonAction = this.logoutButtonAction.bind(this);
     this.callButtonAction = this.callButtonAction.bind(this);
  }

  callButtonAction() {
    this.setState({ showReSchedualDialog: false})
        // call(args).catch(console.error)
  }

  logoutButtonAction() {
    this.props.navigation.navigate('DemoProceed')
  }

  confirmButtonAction() {
    this.props.navigation.navigate('Screening',{
        refreshData: this.refreshScreeningData.bind(this)
       }) 
  }

  closeDialog() {
    this.props.navigation.goBack();
  }

  appointmentConfirmButtonAction() {
    this.closeDialog()
  }
  
   proceedAction() {
  //  if (!this.state.getAddedToQueueStatus)
  //  {
  //    this.sendNotification()
  //    this.setState({ getAddedToQueueStatus: true})
  //    return
  //   }
     this.sendNotification()
     this.setState({ getAddedToQueueStatus: true})
     this.setState({ showTokenStatus: true})
  // setTimeout(() => {
  //        this.setState({ showDoneButtonStatus: true})
  //     }, 2000);
 
}

//  sendNotification() {
//   PushNotification.localNotificationSchedule({
//   message: "Please go to the waiting room. A nurse will be assigned to you and will assist you further", // (required)
//   date: new Date(Date.now() + 10 * 1000),
//     });
//  }

  okayButtonAction() {
       this.setState({ dialogVisible: false });

  }

  appointmentCancelButtonAction() {
     this.setState({ getAddedToQueueStatus: true, cancelButtonStatus: true})
    
      //  Alert.alert("","Appoinment Canceled", [
      //   { text: "OK", onPress: () => this.closeDialog() }
      // ])
   }

  appointmentReSchedualButtonAction() {
   this.setState({ showReSchedualDialog: true})
   
    }

    getTime(): String {
      let date = new Date();  
      let options = {  
       hour: "2-digit", minute: "2-digit"  
      };  
      var d = new Date(); // get current date
      d.setHours(d.getHours(),d.getMinutes()+30,0,0);
      return date.toLocaleTimeString("en-us", options) + " - " + d.toLocaleTimeString("en-us", options)

    }

    getDay(): String {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var day = days[ today.getDay() ];
      return dd + '.' + mm + '.' + yyyy + " " +  day;
    }

     render() {
         return (
           <NativeBaseProvider>
             <Container>
             <View
          style={{ alignItems: 'center', height:100, justifyContent: 'center', backgroundColor:AppColors.appThemeColor }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: 'white',
              position: 'absolute',
              bottom:10
            }}>
            Appointment
          </Text>
         
        </View>

               <Dialog visible={this.state.dialogVisible || this.state.showReSchedualDialog} >
                    <DialogContent>
                    <View style={{ height: this.state.showReSchedualDialog ? 290 : 400, width: Dimensions.get('window').width - 95,  marginLeft:10, 
                                           marginRight:10}}>
                        <View
                            style={{ flex:1, marginTop:-10}}>
                            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{  marginTop: 20, marginLeft:20, marginRight:20, overflow: 'hidden' }}>
                                    <Image
                                        source={ this.state.showReSchedualDialog ? require('../assets/Call_Us_Image.png') : require('../assets/screening.png')}
                                        style={{
                                          resizeMode: 'contain',
                                          alignSelf: 'center',
                                          overflow: 'hidden',
                                         width: Dimensions.get('window').width - 95,
                                         marginTop: 20,
                                           backgroundColor:AppColors.appThemeColor,
                                           height: this.state.showReSchedualDialog ?  140: 200 ,
                                          
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop:10}}>
                            
                           { !this.state.showReSchedualDialog ?
                             <Text style={{ fontSize:  12, fontWeight: '400', color: AppColors.blackTitle, backgroundColor: AppColors.borderLightGrayColor, height: 60, textAlign:'center' }}> 
                             {"The System came into use to restrict the crowding and manage the waiting rooms at our hospital while avoiding the risk of patients getting infescted with COVID - 19"}
                                     </Text>
                                     :
                             <Text style={{ fontSize:  12, fontWeight: '400', color: AppColors.blackTitle, backgroundColor: AppColors.borderLightGrayColor, height: 60, textAlign:'center' }}> 
                             {"You need to call the hospital in-order to Re-Schedule your Appointment"}
                                     </Text> }
                             </View>
                        { !this.state.showReSchedualDialog ?
                             <View style={{flex:1}}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: AppColors.blackTitle, marginTop:10, justifyContent: 'center', alignSelf:'center' }}>{"PRESS *OKAY*"}
                                     </Text>
                                    
                                     <Text style={{ fontSize: 12, fontWeight: '400', color: AppColors.blackTitle, marginTop:10, justifyContent: 'center', alignSelf:'center'}}>{"To continue the Checking In and Screening process"}
                                     </Text>

                                     </View>
                                     : null }
                                     
                            
                           <Button style = {{backgroundColor: AppColors.appThemeColor,height: 40, width:140, justifyContent: 'center', alignSelf:'center', marginLeft:5,marginTop:15
                                         }} onPress = {this.state.showReSchedualDialog ? this.callButtonAction :this.okayButtonAction}>
                                         {this.state.showReSchedualDialog ? 
                              <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Call Us</Text>
                              :
                               <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Okay</Text>
                               }

                            </Button>
                        </View>
                         </View>
                    </DialogContent>
               </Dialog>
         {!this.state.cancelButtonStatus ?
                 <View style={{flex:1, marginLeft:15, marginRight:15, marginTop:15}}>
                    <View style={{backgroundColor:'white', height:  this.state.confirmedScreening ? 300 : 235 , shadowColor: "#000000", shadowOpacity: 0.5, shadowRadius: 0.6, shadowOffset: { height: 0.6, width: 0}}}>
                      <View style={{backgroundColor:'white',borderBottomColor: 'gray', borderBottomWidth: 0.5, marginLeft:5, marginRight:5 }}>
                           <View style={{flexDirection:'row', padding:20}}>
                               <View style = {{width: "30%", height: 60, width:60, borderRadius: 30, shadowOpacity: 0.25,shadowRadius: 3,elevation: 3,
                                 borderColor: AppColors.appThemeColor ,borderWidth:2,marginTop:10 }}> 
                                 {false ?
                                  <Image source={{uri: this.state.profileImage}} style={{resizeMode: 'contain', width: 60, height: 60, alignSelf: 'center'}}/> :
                                  <Image source={require('../assets/profileDefault.png')} style={{resizeMode: 'contain',width:60, height: 60, alignSelf: 'center'}}/> 
                                 }  
                               </View> 
                               <View style={{ backgroundColor: 'white' }}>
                                   <View style={{paddingLeft:20, paddingRight:5}}><Text style={{ fontSize: 14, fontWeight: '500' }}>{"Dr Karen"}</Text></View>
                                   <View style={{ height: 20,marginTop: 5, paddingLeft:20, paddingRight:5 }}><Text style={{ fontSize: 12, fontWeight: '300', color: AppColors.backgroundGray }}>{"General Dentistry"}</Text></View>
                                   <View style={{ height: 20, paddingLeft:20, paddingRight:5 }}><Text style={{ fontSize: 12, fontWeight: '300', color: AppColors.backgroundGray }}>{"Houston Methodist Hospital"}</Text></View>
                                   
                              </View>
                           </View>
                         </View>

                        <View style={{ marginTop: 10, flexDirection:'row', justifyContent: 'space-between', height: 30, backgroundColor:'white', paddingLeft:10,  paddingRight:10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', justifyContent: 'center', alignSelf:'flex-start' }}>Appointment Details</Text>
                             {/* <Button style = {{backgroundColor: AppColors.appThemeColor,height: 30, width:120, justifyContent: 'center', marginLeft:5}} onPress = {this.appointmentsAction}>
                             <Image source={require('../assets/Iconionic-ios-call.png')} style={{height:20, width:20, resizeMode: 'contain'}}/>
                              <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Call Us </Text>
                            </Button> */}
                        </View>
                        <View style={{ marginTop: 10, paddingLeft:10,  paddingRight:10, flexDirection:'row'  }}>
                            <Image source={require('../Images/calendar.png')} style={{height:20, width:20, resizeMode: 'contain'}}/>
                            <Text style={{ fontSize: 14, fontWeight: '400', color:'gray' }}>{this.state.currentDate}
                            </Text>
                            </View>
                        <View style={{ marginTop: 10, paddingLeft:10,  paddingRight:10, flexDirection:'row'   }}>
                        <Image source={require('../assets/clock.png')} style={{height:25, width:25, resizeMode: 'cover'}}/>
                        <Text style={{ fontSize: 14, fontWeight: '400', marginBottom:10, color:'gray' }}>{this.state.time}</Text>
                       
                        </View>
                     


                         { this.state.confirmedScreening ? 
                        <View style={{backgroundColor:'white', height:50}}>
                            <Button style = {{backgroundColor: AppColors.appThemeColor,height: 40, justifyContent: 'center', marginLeft:10,  marginRight:10 , marginTop: 10}} onPress = {this.confirmButtonAction}>
                             <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Confirm </Text>
                             </Button>
                          </View>  : null }
                          
                    </View>

                     { (!this.state.confirmedScreening && !this.state.showTokenStatus) ? 
                        <View style={{ height:250, width:200, paddingLeft:20, backgroundColor:'white', marginTop:20}}>
                         <View style={{ flexDirection:'row',  backgroundColor:'white'}}>
                            <View style={{backgroundColor:AppColors.appThemeColor, height:30, width:30,borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                             <Text style={{ color:'white', textAlign:'center', fontSize: 14, fontWeight: '400'}}>1.</Text>
                           </View>
                             <Text style={{ color:'black', textAlign:'center', backgroundColor:'white', alignItems:'center', alignSelf:'center', paddingLeft:20, fontSize: 14, fontWeight: '400'}}>Checked In</Text>
                          </View>

                           <View style={{ alignItems:'center', backgroundColor: 'white', width:50}}>
                               <Text style={{textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor : 'black'}}>-</Text>
                               <Text style={{textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor : 'black'}}>-</Text>
                               <Text style={{ textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor : 'black'}}>-</Text>
                               <Text style={{textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor : 'black'}}>-</Text>
                             </View>
                           <View style={{backgroundColor:'white', flexDirection:'row', paddingTop:5}}>
                              <View style={{backgroundColor: this.state.proceedStatus ? AppColors.appThemeColor :'black', height:30, width:30,borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                              <Text style={{ color:'white', textAlign:'center', fontSize: 14, fontWeight: '400'}}>2.</Text>
                              </View>
                              <Text style={{   color: 'black', textAlign:'center', backgroundColor:'white', alignItems:'center', alignSelf:'center', paddingLeft:20, fontSize: 14, fontWeight: '400'}}>COVID - 19 Screening</Text>
                          </View>
                          { this.state.getAddedToQueueStatus ? 
                            <View style={{  backgroundColor:'white'}}>
                             <View style={{ alignItems:'center', backgroundColor: 'white', width:50}}>
                               <Text style={{textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor :  'black'}}>-</Text>
                               <Text style={{textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor :  'black'}}>-</Text>
                               <Text style={{ textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor :  'black'}}>-</Text>
                               <Text style={{textAlign:'center',fontSize: 12, color: this.state.proceedStatus ? AppColors.appThemeColor :  'black'}}>-</Text>
                             </View>

                               <View style={{backgroundColor:'white', flexDirection:'row', paddingTop:5}}>
                                <View style={{backgroundColor: this.state.proceedStatus ? AppColors.appThemeColor :'black', height:30, width:30,borderRadius:15, justifyContent:'center', alignItems:'center'}}>
                                 <Text style={{ color:'white', textAlign:'center', fontSize: 14, fontWeight: '400'}}>3.</Text>
                                 </View>
                                 <Text style={{   color: 'black', textAlign:'center', backgroundColor:'white', alignItems:'center', alignSelf:'center', paddingLeft:20, fontSize: 14, fontWeight: '400'}}>Get Added to the Queue</Text>
                                </View>
                             </View>
                             : null }   
                      </View>
                      : null }

                      {(this.state.showTokenStatus &&  !this.state.showDoneButtonStatus) ? 
                        <View style={{ height:250, marginLeft:10,  marginRight:10, marginTop:10,  alignItems:'center'}}>
                        <Text style={{textAlign:'center', fontSize: 14, fontWeight: '400'}}> You have been added to the Queue </Text>
                         <View style={{ marginTop:30, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                          <Text style={{textAlign:'center', fontSize: 14, fontWeight: '500', marginBottom:10}}> Here is your Token Number </Text>
                          <View style={{backgroundColor: AppColors.appThemeColor , height:110, width:110,borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                              <Text style={{ color:'white', textAlign:'center', fontSize: 20, fontWeight: '700',  alignSelf: 'stretch'}}>4 / 7</Text>
                              </View>
                              <Text style={{textAlign:'center', fontSize: 14, fontWeight: '500', marginTop:10}}> You'll be Notified when your Number comes up. Please wait in your vehicle till then </Text>
                          </View>
                          
                        </View>

                         : 
                         (!this.state.confirmedScreening && this.state.showTokenStatus) ?
                          <Button style = {{backgroundColor: AppColors.appThemeColor,height: 40, width:140, justifyContent: 'center', alignSelf:'center',marginTop:50
                                         }} onPress = {this.appointmentConfirmButtonAction}>
                    <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Done</Text>
                    </Button>
                    : null}

                  </View>

                : <View style={{flex:1, background:'white', alignItems:'center', marginTop:150}}> 
                <View style={{height: 150, justifyContent: 'center', alignItems:'center', backgroundColor: AppColors.borderLightGrayColor, width:'100%'}}>
                 <Text style={{fontSize:  12, fontWeight: '400', color: AppColors.blackTitle }}> {"No Appoinments Scheduled"}
                             </Text>
                  </View>
                      <Button style = {{backgroundColor: AppColors.appThemeColor,height: 40, justifyContent: 'center', marginLeft:10,  marginRight:10 , marginTop: 100, width:'50%'}} onPress = {this.logoutButtonAction}>
                      <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Logout</Text>
                      </Button>
                </View> 
                }

                  { (!this.state.confirmedScreening &&  !this.state.showTokenStatus) ? 
                   <Button style = {{backgroundColor: AppColors.appThemeColor,height: 40, width:140, justifyContent: 'center', alignSelf:'center',marginTop:10, position: 'absolute',
                                         bottom:20}} onPress = {this.proceedAction}>
                    <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400'}}>Proceed</Text>
                    </Button>
                    : 
                    null 
                    }

                      { (this.state.confirmedScreening && !this.state.cancelButtonStatus) ?  
                   <View style={{flex:1, flexDirection:'row', position: 'absolute',
                                         bottom:15, marginLeft:15, marginRight:15}}>
                               <TouchableOpacity tranparent style = {{backgroundColor: AppColors.background ,height: 40,flex:1, justifyContent: 'center', marginRight:2, borderColor:'gray', borderWidth:1, padding:0}} onPress = {this.appointmentCancelButtonAction}>
                                <Text style = {{color: AppColors.lightgray, fontSize: 14, fontWeight: '400', textAlign:'center'}}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity tranparent style = {{backgroundColor: AppColors.backgroundGray,height: 40,flex:1, justifyContent: 'center', marginLeft:2}} onPress = {this.appointmentReSchedualButtonAction}>
                                 <Text style = {{color: AppColors.whiteTitle, fontSize: 14, fontWeight: '400', textAlign:'center'}}>Re-Schedule</Text>
                                </TouchableOpacity>
                           </View>
                    : 
                    null 
                    }
             </Container>
             </NativeBaseProvider>
         );
     }
}