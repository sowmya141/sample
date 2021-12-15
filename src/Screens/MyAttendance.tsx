import React from 'react';
import {
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  AsyncStorage,
  Image,
  Text,
} from 'react-native';
import {Button, Spinner, NativeBaseProvider} from 'native-base';
import {MyAttendanceRequest} from '../Models/Request';
import AttendanceService from '../APIManager/AttendanceService';
import {AttendanceType} from '../Enums/AttendanceType';
import {getMonth, getDay} from '../Helpers/DateExtension';
import GeoLocation from '@react-native-community/geolocation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppColors from './AppColors';
interface MyAttendanceProps {}

interface MyAttendanceState {
  location: MyAttendanceRequest;
  isLoading: boolean;
  profileImage: string;
}

export default class MyAttendance extends React.Component<
  MyAttendanceProps,
  MyAttendanceState
> {
  constructor(props: MyAttendanceProps) {
    super(props);
    this.state = {
      location: {latitude: '27.2046', longitude: '77.4977'},
      isLoading: false,
      profileImage: '',
    };
    this.checkInButtonAction = this.checkInButtonAction.bind(this);
    this.healthFeedbackButtonAction =
      this.healthFeedbackButtonAction.bind(this);
  }

  componentDidMount() {
    this.getLocation();
    this.getUserProfileImage();
  }

  render() {
    const {viewStyle} = styles;
    return (
      <NativeBaseProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.background,
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: 100,
              backgroundColor: AppColors.contentBackground,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
              bottom: 4,
            }}>
            <View>
              <Text
                style={{
                  marginLeft: 8,
                  color: AppColors.whiteTitle,
                  fontSize: 30,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                My Attendance
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                {this.state.profileImage ? (
                  <Image
                    source={{uri: this.state.profileImage}}
                    style={{
                      backgroundColor: AppColors.background,
                      marginBottom: 5,
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      resizeMode: 'contain',
                      marginRight: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../assets/profileDefault.png')}
                    style={{
                      backgroundColor: AppColors.background,
                      marginBottom: 5,
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      resizeMode: 'contain',
                      marginRight: 20,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 4, backgroundColor: AppColors.background}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{marginTop: 20, fontSize: 25}}>
                {getMonth(new Date().getMonth())}
              </Text>
              <View
                style={{
                  marginTop: '15%',
                  width: 75,
                  height: 75,
                  backgroundColor: AppColors.appThemeColor,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: AppColors.whiteTitle,
                    fontSize: 30,
                  }}>
                  {new Date().getDate()}
                </Text>
              </View>
              <Text style={{textAlign: 'center', marginTop: 20, fontSize: 30}}>
                {getDay(new Date().getDay())}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 20,
                  color: AppColors.grayTitle,
                }}>
                Punch in Attendance
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                style={{
                  backgroundColor: AppColors.appThemeColor,
                  width: '40%',
                  justifyContent: 'center',
                }}
                onPress={this.checkInButtonAction}>
                <Text
                  style={{
                    color: AppColors.whiteTitle,
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                  Check In
                </Text>
              </Button>
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 20,
                height: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.healthViewBackgroundColor,
              }}>
              <Text
                style={{
                  color: AppColors.blackTitle,
                  fontSize: 15,
                  marginBottom: 10,
                }}>
                Answer a couple of questions for your Health Update
              </Text>
              <Button
                style={{
                  backgroundColor: AppColors.appThemeColor,
                  height: 60,
                  width: '90%',
                  justifyContent: 'center',
                }}
                onPress={()=>this.healthFeedbackButtonAction()}>
                  {/* */}
                <Text
                  style={{
                    color: AppColors.whiteTitle,
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  COVID - 19 Health Update
                </Text>
              </Button>
            </View>
          </View>
          {this.state.isLoading ? (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Spinner
                size="lg"
                color={AppColors.appThemeColor}
                animating={true}
              />
            </View>
          ) : null}
        </View>
      </NativeBaseProvider>
    );
  }

  async getUserProfileImage() {
    await AsyncStorage.getItem('user').then(value => {
      if (value != null) {
        let user = JSON.parse(value);
        this.setState({profileImage: user.profileImage});
      }
    });
  }

  async checkInButtonAction() {
    this.setState({isLoading: true});
    let response = await AttendanceService.TrackAttendance(
      this.state.location,
      AttendanceType.CheckIn,
    );
    console.log(this.state.location)
    this.setState({isLoading: false});
    if (!response.success) {
      this.props.route.params.refreshData();
      this.props.navigation.navigate('CheckIn', {
        address: response.data?.address ?? "",
      });
      return;
    }
    
    //Alert.alert('Error', response.fieldErrors[0].errorMessage);
  }

  healthFeedbackButtonAction() {
    this.props.navigation.navigate('Health');
  }

  async getLocation() {
    if (Platform.OS == 'ios') {
      GeoLocation.requestAuthorization();
      this.getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Jade',
            message: 'Jade App wants to access your location ',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getCurrentLocation();
          return;
        }
       // Alert.alert('Please allow access to your location');
      } catch (err) {
        //Alert.alert('Something went wrong while accessing tour Location');
      }
    }
  }

  getCurrentLocation() {
    this.setState({isLoading: true});
    GeoLocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          },
          isLoading: false,
        });
      },
      error => {
        this.setState({isLoading: false});
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column',
  },
};
