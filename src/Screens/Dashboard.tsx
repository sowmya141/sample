import React from 'react';
import { Button, Text, View, Card, Spinner, NativeBaseProvider } from 'native-base';
import {
  Image,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Platform,
  FlatList,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import AttendanceService from '../APIManager/AttendanceService';
import { MyAttendanceRequest} from '../../src/Models/Request';
import { JobRequest } from '../Models/Request/JobRequest';
import {JobCheckInOrOutRequest} from '../Models/Request/JobCheckInOrOutRequest'
import { AttendanceType } from '../Enums/AttendanceType';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import GeoLocation from '@react-native-community/geolocation';
import { getDay, getTime, getDateSuffix } from '../Helpers/DateExtension';
import { MyAttendanceListResponse, Job, JobCheckInResponse, JobCheckOutResponse } from '../Models/Response';
import Constants from '../Helpers/Constants';
import { FloatingAction } from "react-native-floating-action";
import DepartmentService from '../APIManager/DepartmentService';
import AppColors from './AppColors';
import { getDistance } from 'geolib';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { JobType } from '../Enums/JobType';
import JobServices from '../APIManager/JobServices'
import { JobStatus } from '../Enums/JobStatus';

interface DashboardState {
  profileName: string;
  isLoading: boolean;
  dialogVisible: boolean;
  location: MyAttendanceRequest;
  datasource: Array<MyAttendanceListResponse>;
  openJobs: Array<Job>;
  activeJob: Array<Job>;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  checkInData: JobCheckInResponse;
  checkOutData: JobCheckOutResponse;
  selectedActiveJobIndex: number;
}
interface DashboardProps {
  navigation: any;
}
export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  componentDidMount() {
    this.getLocation();
    this.getJobsData();
    this.getUserProfileImage();
  }

  async refreshDashboard() {
    this.getJobsData();
  }

  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      profileName: '',
      dialogVisible: false,
      isLoading: false,
      location: { latitude: '0', longitude: '0' },
      datasource: Array<MyAttendanceListResponse>(),
      openJobs: Array<Job>(),
      activeJob: Array<Job>(),
      isCheckedIn: false,
      isCheckedOut: false,
      checkInData: { id: '', projectId: '', checkInDate: new Date(), latitude: '', longitude: '', location: '' },
      checkOutData: { id: '', projectId: '', checkOutDate: new Date(), latitude: '', longitude: '', location: '' },
      selectedActiveJobIndex: 0
    };

    this.checkoutButtonAction = this.checkoutButtonAction.bind(this);
    this.viewProjectList = this.viewProjectList.bind(this);
    this.viewTasksList = this.viewTasksList.bind(this);
    this.acceptOrDeclineJob = this.acceptOrDeclineJob.bind(this);
    this.checkInJob = this.checkInJob.bind(this);
    this.checkOutJob = this.checkOutJob.bind(this)
    this.navigateToJobDetail = this.navigateToJobDetail.bind(this);
  }
  
  render() {
    const { viewStyle, headerStyle } = styles;
    console.log('jobs',this.state.openJobs)
    return (
    
      <NativeBaseProvider>
      <View style={viewStyle}>
        <View
          style={{
            height: 150,
            backgroundColor: AppColors.appThemeColor,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 8,
              color: AppColors.whiteTitle,
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Hi {this.state.profileName}
          </Text>
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 8,
              color: AppColors.whiteTitle,
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '800',
            }}>
            Welcome
          </Text>
        </View>
        <ScrollView>
        <View>
        
           {this.state.activeJob.length != 0 ?
            <View >
              <View style={{ backgroundColor: '#DEDEDE' }}>
               <Text style={{ margin: 15, fontSize: 20 ,color:'black',fontWeight:'900'}}>Your Job</Text>
                <FlatList 
                  horizontal={true}
                  data={this.state.activeJob}
                  onViewableItemsChanged={this.onViewableItemsChanged}
                  viewabilityConfig={{
                    itemVisiblePercentThreshold: 100
                  }}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.navigateToJobDetail(item)
                      }>
                      <View
                        style={{
                         
                          flexDirection: 'row',
                          shadowColor: AppColors.shadowColor,
                          shadowOpacity: 0.25,
                          shadowRadius: 5,
                          elevation: 5,
                          borderRadius: 5,
                          width: Dimensions.get('window').width - 24,
                          marginLeft: 12
                        }}>
                        <View
                          style={{
                            backgroundColor: AppColors.checkoutCellBackground,
                            width: 100,
                          }}>
                          <Image
                            source={require('../assets/jobBg.png')}
                            style={{
                              resizeMode: 'contain',
                              width: 75,
                              alignSelf: 'center',
                            }}
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                          <Text
                            style={{ fontSize: 16, marginTop: 8, fontWeight: '800' }}>
                            {item.name}
                          </Text>
                          <Text style={headerStyle}>{item.hospitalName + " Hospital"} </Text>
                          <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <Text style={{ fontWeight: '600', fontSize: 14 }}>
                              Supervisor:{' '}
                            </Text>
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: 14,
                                textDecorationLine: 'underline',
                                marginLeft: 5,
                              }}>
                              Admin
                        </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 8,
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{ width: 12, height: 12, resizeMode: 'contain' }}
                              source={require('../assets/calender_black.png')}
                            />
                            <Text style={{ fontSize: 11 }}>  From: </Text>
                            <Text style={{ fontSize: 11, textAlign: 'center' }}>
                              {getDateSuffix(
                                new Date(item.startDate).getDate(),
                                new Date().getMonth(),
                              )}{' '}
                              {new Date(item.startDate).getFullYear()}
                            </Text>
                            <Text style={{ fontSize: 11 }}> To: </Text>
                            <Text style={{ fontSize: 11, textAlign: 'center' }}>
                              {getDateSuffix(
                                new Date(item.endDate).getDate(),
                                new Date().getMonth(),
                              )}{' '}
                              {new Date(item.endDate).getFullYear()}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 8,
                              alignItems: 'center',
                              marginBottom: 8,
                            }}>
                            <Image
                              style={{ width: 12, height: 12, resizeMode: 'contain' }}
                              source={require('../assets/time_black.png')}
                            />
                            <Text style={{ fontSize: 11, textAlign: 'center' }}>
                              {' '}
                          10:30 AM to 06:30 PM{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 25,
                    marginBottom: 25,
                    marginLeft: 15,
                    marginRight: 15,
                  }}>
                  {this.state.isCheckedIn && !this.state.isCheckedOut ? (
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginRight: 12,
                        width: '100%',
                      }}>
                      <Button
                        style={{ backgroundColor: 'red', justifyContent: 'center' }}
                        onPress={() => this.checkOutJob()}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: '500',
                          }}>
                          Check Out
                    </Text>
                      </Button>
                    </View>
                  ) : null}
                  <View style={{ flexDirection: 'row', backgroundColor: 'clear' }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        backgroundColor: AppColors.whiteTitle,
                        height: 50,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: '700',
                          fontSize: 14,
                        }}>
                        {' '}
                        {new Date().getDate()}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          marginTop: 2,
                          textAlign: 'center',
                        }}>
                        {' '}
                        {String(getDay(new Date().getDay())).substring(0, 3)}{' '}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        {this.state.isCheckedIn ? (
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: 200,
                                backgroundColor: AppColors.whiteTitle,
                                height: 30,
                                marginTop: 12,
                                borderRadius: 4,
                              }}>
                              <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                Started Work
                          </Text>
                              <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                {getTime(this.state.checkInData.checkInDate)}
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: 12,
                                color: AppColors.blackTitle,
                                marginTop: 8,
                              }}>
                              {this.state.checkInData.location}
                            </Text>
                          </View>
                        ) : (
                            <View>
                              <Button
                                style={{
                                  backgroundColor: 'green',
                                  width: 125,
                                  justifyContent: 'center',
                                }}
                                onPress={() => this.checkInJob()}>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    fontWeight: '600',
                                    textAlign: 'center',
                                  }}>
                                  Check In
                          </Text>
                              </Button>
                            </View>
                          )}
                        {this.state.isCheckedOut ? (
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                width: 200,
                                backgroundColor: AppColors.whiteTitle,
                                height: 30,
                                marginTop: 12,
                                borderRadius: 4,
                              }}>
                              <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                Checked Out
                          </Text>
                              <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                {getTime(this.state.checkOutData.checkOutDate)}
                              </Text>
                            </View>
                            <Text style={{ fontSize: 12, marginTop: 8 }}>
                              {this.state.checkOutData.location}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              </View> : null}
       <View>
        <Text style={{ margin:15, fontSize: 20 }}>Open Jobs</Text>
        <FlatList
              data={this.state.openJobs}
              renderItem={({ item }) => (
                <Card
                  style={{
                    flex: 1,
                    width: Dimensions.get('window').width - 24,
                    marginLeft: 12,
                    flexDirection: 'row',
                    shadowColor: AppColors.shadowColor,
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 5,
                    borderRadius: 5,
                    marginBottom: 15,
                  }}>
                   
                  <View
                    style={{
                      backgroundColor: AppColors.checkoutCellBackground,
                      width: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/jobBg.png')}
                      style={{ resizeMode: 'contain', width: 75 }}
                    />
                  </View>
                   <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                      style={{ fontSize: 16, marginTop: 8, fontWeight: '800' }}>
                      {item.name}
                     </Text>
                     <Text style={headerStyle}>{item.hospitalName + " Hospital"}</Text>
                     <View style={{ flexDirection: 'row', marginTop: 8 }}>
                       <Text style={{ fontSize: 11 }}>From: </Text>
                       <Text style={{ fontSize: 11, textAlign: 'center' }}>
                        {getDateSuffix(
                          new Date(item.startDate).getDate(),
                          new Date().getMonth(),
                        )}{' '}
                        {new Date(item.startDate).getFullYear()}
                       </Text>
                       <Text style={{ fontSize: 11 }}> To: </Text>
                       <Text style={{ fontSize: 11, textAlign: 'center' }}>
                        {getDateSuffix(
                          new Date(item.endDate).getDate(),
                          new Date().getMonth(),
                        )}{' '}
                        {new Date(item.endDate).getFullYear()}
                       </Text>
                     </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 12,
                        marginBottom: 8,
                      }}>
                      <Button
                        style={{
                          backgroundColor: AppColors.appThemeColor,
                          height: 35,
                        }} onPress={() => this.acceptOrDeclineJob(JobStatus.Accept, item.id)}>
                        <Text> Accept </Text>
                      </Button>
                      <Button
                        style={{
                          marginLeft: 10,
                          backgroundColor: AppColors.backgroundGray,
                          height: 35,
                        }} onPress={() => this.acceptOrDeclineJob(JobStatus.Decline, item.id)}>
                        <Text> Decline </Text>
                      </Button>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: AppColors.appThemeColor,
                      width: 25,
                      borderTopRightRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Button
                      style={{
                        backgroundColor: 'clear',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('JobDetail', {
                          jobDetail: item,
                          jobType: JobType.Open,
                          refreshData: this.refreshDashboard.bind(this)
                        })
                      }>
                      <Image
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        source={require('../assets/arrowWhite.png')}
                      />
                    </Button>
                  </View>
                </Card>
              )}/>
             </View>
            
         </View>
        
         </ScrollView>
      </View>
      <View>
      {Constants.isManager ?
         <FloatingAction
            color={AppColors.appThemeColor}
            actions={actions}
            onPressItem={name => {
            if (name == 'job') {
            this.props.navigation.navigate('PostJob', { refreshData: this.refreshDashboard.bind(this)})
            return;
            }
            this.props.navigation.navigate('AddEmployee')
           }}/> : null }
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
              size='lg'
              color={AppColors.appThemeColor}
              animating={true}
            />
          </View>
        ) : null}
      </View>
      </NativeBaseProvider>
    );
  }

  navigateToJobDetail(item: Job) {
    Constants.projectId = item.id
    this.props.navigation.navigate('JobDetail', {
      jobDetail: item,
      jobType: JobType.Active,
      refreshData: this.refreshDashboard.bind(this)
    })
  }

  async showUserProfile() {
    this.props.navigation.navigate('Profile');
  }

  getJobsData() {
    this.getActiveJob()
    this.getOpenJobs()
  }

  async getOpenJobs() {
    this.setState({ isLoading: true })
    let response = await JobServices.getOpenJobs()
    this.setState({ isLoading: false })
    if (response.success) {
      this.setState({ openJobs: response.data })
      return
    }
    Alert.alert(response.errorMessage)
  }

  async getActiveJob() {
    this.setState({ isLoading: true, isCheckedIn: false, isCheckedOut: false })
    let response = await JobServices.getActiveJob()
    console.log('Job Response',response)
    this.setState({ isLoading: false })
    if (response.success) {
      this.setState({ activeJob: response.data })
      return
    }
    Alert.alert(response.errorMessage)
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0] != null) {
      this.setState({ selectedActiveJobIndex: viewableItems[0].index })
    }
  };

  async acceptOrDeclineJob(status: JobStatus, id: string) {
    this.setState({ isLoading: true })
    let request: JobRequest = { projectId: id, status: status }
    let response = await JobServices.allocateJob(request)
    this.setState({ isLoading: false })
    if (response.success) {
      this.getJobsData()
      return
    }
    Alert.alert(response.errorMessage)
  }

  async checkInJob() {
    this.setState({ isLoading: true })
    let request: JobCheckInOrOutRequest = { projectId: this.state.activeJob[this.state.selectedActiveJobIndex].id, latitude: this.state.location.latitude, longitude: this.state.location.longitude }
    let response = await AttendanceService.checkInJob(request)
    this.setState({ isLoading: false })
    if (response.success) {
      this.setState({ checkInData: response.data, isCheckedIn: true })
      return
    }
    //Alert.alert(response.errorMessage)
  }

  async checkOutJob() {
    this.setState({ isLoading: true })
    let request: JobCheckInOrOutRequest = { projectId: this.state.activeJob[this.state.selectedActiveJobIndex].id, latitude: this.state.location.latitude, longitude: this.state.location.longitude }
    let response = await AttendanceService.checkOutJob(request)
    this.setState({ isLoading: false })
    if (response.success) {
      this.setState({ checkOutData: response.data, isCheckedOut: true })
      return
    }
    //Alert.alert(response.errorMessage)
  }

  async getUserProfileImage() {
    await AsyncStorage.getItem('user').then((value) => {
      if (value != null) {
        let user: User = JSON.parse(value);
        this.setState({ profileName: user.firstName + ' ' + user.lastName });
      }
    });
  }

  async checkoutButtonAction() {
    this.setState({ dialogVisible: false, isLoading: true });
    let response = await AttendanceService.TrackAttendance(
      this.state.location,
      AttendanceType.CheckOut,
    );
    this.setState({ isLoading: false });
    if (response.success) {
      this.props.navigation.navigate('CheckOut', {
        address: response.data.address,
        refreshData: this.refreshDashboard.bind(this),
      });
      return;
    }
    Alert.alert('Error', response.fieldErrors[0].errorMessage);
  }

  async viewProjectList(item: MyAttendanceListResponse) {
    Constants.isProjectView = false;
    this.props.navigation.navigate('ProjectList', { date: item.date });
  }

  viewTasksList(item: MyAttendanceListResponse) {
    //navigate to view tasks list screen
    this.props.navigation.navigate('TaskList', {
      projectId: '',
      date: item.date,
    });
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
        //Alert.alert('Please allow access to your location');
      } catch (err) {
       // Alert.alert('Something went wrong while accessing tour Location');
      }
    }
  }

  validateLocation() {
    let distance = getDistance(
      {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
      },
      { latitude: 12.9094, longitude: 77.521 },
      1,
    );
    Alert.alert(String(distance));
  }

  getCurrentLocation() {
    // this.setState({ isLoading: true });
    GeoLocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          },
          // isLoading: false,
        });
      },
      (error) => {
        this.setState({ isLoading: false });
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column',
  },
  headerStyle: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
});

const actions = [
  {
    text: "Post a Job",
    icon: require("../assets/note.png"),
    name: "job",
    position: 1,
    color: AppColors.appThemeColor
  },
  {
    text: "Add Employee",
    icon: require("../assets/Group912.png"),
    name: "employee",
    position: 2,
    color: AppColors.appThemeColor
  }
];