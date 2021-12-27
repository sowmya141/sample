import React from 'react';
import { Container,  Button, Card, NativeBaseProvider} from 'native-base';
import { Dimensions, Alert, Image, AsyncStorage,  Text, View, } from 'react-native';
import AppColors from './AppColors';
interface UserProps {
  navigation:any
}

interface UserState {
  email: string
  name: string
  profileImage: string
  designation: string
}
export default class Profile extends React.Component<UserProps, UserState> {
  componentDidMount() {    
    this.getUserProfileData()
  }
  constructor(props:UserProps) {
    super(props)
    this.state = {
      email: '',
      profileImage: '',
      name: '',
      designation: '',
    };
    this.showDashboard = this.showDashboard.bind(this);
    this.healthFeedbackButtonAction = this.healthFeedbackButtonAction.bind(this);
    this.appointmentsAction = this.appointmentsAction.bind(this);
  }
  render() {
    const {viewStyle} = styles
      return (
      
          <View style = {{ flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'}}>
             < View style= {{height: 150,backgroundColor: AppColors.appThemeColor, justifyContent: 'flex-end'}}>
              <Text style = {{color: AppColors.whiteTitle, fontSize: 30, marginBottom: 10, marginLeft: 10, fontWeight: '600'}}>My Profile</Text>
              </View>
              <View style = {{flex: 4,backgroundColor: AppColors.background}}>
              <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <Card style = {{width: 140, height: 140, borderRadius: 70, shadowOpacity: 0.25,shadowRadius: 3,elevation: 3}}>
              {this.state.profileImage ?
              <Image source={{uri: this.state.profileImage}} style={{resizeMode: 'contain', width: 130, height: 130, alignSelf: 'center'}}/> :
              <Image source={require('../assets/profileDefault.png')} style={{resizeMode: 'contain',width: 130, height: 130,bottom:19,right:12}}/> }  
             </Card>          
              <Text style = {{fontSize: 20, marginTop: 20}}>{this.state.name} </Text>
              </View>
              <View style = {{backgroundColor: AppColors.designationHealthBackgroundColor, alignItems: 'flex-start', marginTop: 20}}>
                  <Text style = {{fontWeight: 'bold', marginLeft: 20}}>Email</Text>
                  <Text style = {{marginTop: 20, marginLeft: 20}}>{this.state.email}</Text>
                  <Text style = {{marginTop: 20,fontWeight: 'bold', marginLeft: 20}}>Designation</Text>
                  <Text style = {{marginTop: 20, marginLeft: 20}}>{this.state.designation}</Text>
                  </View>
                  {/* <View style = {{width: '100%', marginTop: 25 ,justifyContent: 'center',alignItems: 'center'}}>
                    <Button style = {{backgroundColor: '#FF7200', justifyContent: 'center'}} onPress =  {this.resetPassword} >
                        <Text style = {{color: 'white', fontSize: 20}}>RESET PASSWORD</Text>
                    </Button>
              </View> */}
              <View style = {{width: '100%',position:'absolute', bottom: 0, justifyContent: 'center',alignItems: 'center', backgroundColor: AppColors.healthViewBackgroundColor}}>
                    <Text style = {{color: AppColors.blackTitle, fontSize: 15, marginBottom: 10, marginTop:10}}>Answer a couple of questions for your Health Update</Text>
                    <View style={{flex:1, flexDirection:'row', margin:10}}>
                    <Button style = {{backgroundColor: AppColors.appThemeColor,height: 50,flex:1, justifyContent: 'center', marginRight:5}} onPress = {this.healthFeedbackButtonAction}>
                        <Text style = {{color: AppColors.whiteTitle, fontSize: 16, fontWeight: '400'}}>Health Check Update</Text>
                    </Button>
                       {/* <Button style = {{backgroundColor: AppColors.appThemeColor,height: 50,flex:1, justifyContent: 'center', marginLeft:5}} onPress = {this.appointmentsAction}>
                        <Text style = {{color: AppColors.whiteTitle, fontSize: 16, fontWeight: '400'}}>Appointments</Text>
                      </Button> */}
                    </View>
                    </View>
              </View>
          </View>
      
    );
  }

  resetPassword() {

  }

  showDashboard() {
    this.props.navigation.goBack(null);
  }

  async getUserProfileData() {
    await AsyncStorage.getItem('user').then((value) => {
      if (value != null) {
        let user = JSON.parse(value)
        this.setState({email: user.email})
        this.setState({profileImage: user.profileImage})
        this.setState({name: user.firstName + " " + user.lastName })
        this.setState({designation: user.designation})
      }
    })
  }

  async healthFeedbackButtonAction() {
    this.props.navigation.navigate('Health')
  }

   async appointmentsAction() {
    this.props.navigation.navigate('Appointment')
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'
  }
}