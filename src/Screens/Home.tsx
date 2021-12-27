import React from 'react';
import { Button,  Spinner,} from 'native-base';
import {Image, AsyncStorage, Text, View,TouchableOpacity, Alert, Platform, FlatList, Dimensions, PermissionsAndroid } from 'react-native';
import AttendanceService from '../APIManager/AttendanceService';
import { MyAttendanceListRequest } from '../../src/Models/Request/MyAttendanceListRequest';
import { MyAttendanceRequest } from '../Models/Request';
import  {AttendanceType}  from '../Enums/AttendanceType';
import  Dialog,{ DialogFooter, DialogButton, DialogContent, } from 'react-native-popup-dialog'
import GeoLocation from '@react-native-community/geolocation'
import { getDay, getTime} from '../Helpers/DateExtension';
import { MyAttendanceListResponse } from '../Models/Response';
import Constants from '../Helpers/Constants'
import AppColors from './AppColors';
import {getDistance} from 'geolib'

interface HomeProps {
navigation:any

}
interface HomeState {
  profileImage: string
  isLoading: boolean
  dialogVisible: boolean,
  location: MyAttendanceRequest,
  datasource: Array<MyAttendanceListResponse>;
  currentLocation: string;

}

export default class Home extends React.Component<HomeProps, HomeState> {
    componentDidMount() {
     this.getLocation()
     this.myAttendaceSummary()
     this.getUserProfileImage()
  }

  async refreshDashboard() {
     this.myAttendaceSummary()
  }  

  constructor(props: HomeProps) {
    super(props)
    this.state =  {
        profileImage: '',
        dialogVisible: false,
        isLoading: false,
        location: {latitude: '', longitude: ''},
        datasource: Array<MyAttendanceListResponse>(),
        currentLocation: ''
    }
   
    this.checkoutButtonAction = this.checkoutButtonAction.bind(this)
    this.viewProjectList = this.viewProjectList.bind(this);
    this.viewTasksList = this.viewTasksList.bind(this);
  }
    render() {
   
      return (
      
          <View style = {{flex: 1,backgroundColor: AppColors.background,flexDirection: 'column'}}>
            <Dialog visible={this.state.dialogVisible}>
              <DialogContent>
               <View style = {{height: 250, width: Dimensions.get('window').width-75}}>
                 <View style = {{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={()=>this.setState({dialogVisible: false})}>
                      <Image source={require('../assets/close.png')}style = {{marginTop: 25,resizeMode:'contain', height: 35, width: 35}}/>
                    </TouchableOpacity>
                  </View>
                  <Text style = {{marginTop: 30, width: '100%', textAlign: 'center'}}> Are you sure you want to Check Out for the day ?</Text>
                  <View style = {{marginTop: 35, justifyContent: 'center', alignItems: 'center'}}>
                    <Button style = {{backgroundColor: AppColors.appThemeColor, width: '40%', justifyContent: 'center'}} onPress={() => this.checkoutButtonAction()}>
                      <Text style = {{color: AppColors.whiteTitle, fontSize: 20, textAlign: 'center'}}>YES</Text>
                    </Button>
                  </View> 
                </View>
              </DialogContent>
            </Dialog> 
            <View style={{ height: 175,backgroundColor: AppColors.appThemeColor,flexDirection: 'column', alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      marginBottom: 8,
                      color: AppColors.whiteTitle,
                      fontSize: 25,
                      textAlign: 'center',
                      fontWeight: '800',
                    }}>
                    Home
                  </Text>
               
                  <View
                    style={{
                      flexDirection: 'row',
                      width: Dimensions.get('window').width - 50,
                      backgroundColor: AppColors.whiteTitle,
                      marginLeft: 15,
                      alignItems: 'center',
                      marginBottom: 15,
                      borderRadius: 4,
                      marginRight:10
                    }}>
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                        marginLeft: 15,
                      }}
                      source={require('../assets/gps.png')}
                    />
                    <Text
                      style={{
                        marginLeft: 8,
                        marginBottom: 8,
                        color:'black',
                        padding: 6,
                        fontSize: 12,
                        borderRadius: 4,
                        fontWeight: '300',
                        width: '85%',
                        marginRight:20
                      }}>
                    Welcome
                    {console.log('location',this.state.currentLocation)}
                    </Text>
                  </View>
                  
                </View>
                        <View>
                            <FlatList
                                data = {this.state.datasource}
                                renderItem = {({item, index}) =>
                        <View>
                                      <View style={{flex:1, flexDirection:'row',shadowColor: AppColors.shadowColor ,shadowOpacity: 0.25,shadowRadius: 5,elevation: 5}}>
                                      <View style={{backgroundColor:AppColors.checkoutCellBackground ,height:165, width:90, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                          <View style={{backgroundColor:AppColors.dateBackground, height:40, width:40, justifyContent: 'center', alignItems: 'center'}}>
                                              <Text style={{color:AppColors.whiteTitle, textAlign:'center'}}> {new Date(item.date).getDate()}</Text>
                                          </View>
                                        <Text style={{fontSize:12, fontWeight:'bold', marginTop: 5}}> {getDay(item.dayOfWeek)} </Text>
                                      </View>
                                      <View style={{backgroundColor:AppColors.background,height:165, width:90, flex:1, flexDirection:'row', marginLeft:10}}>
                                       <View style={{backgroundColor:AppColors.background, flex:1}}>
                                           <Text style={{fontSize:15, fontWeight:'600', marginTop: 5}}>Checked In</Text>
                                           <Text style={{fontSize:12, fontWeight:'600', color:AppColors.grayTitle, marginTop:8}}>{getTime(item.inDate)}</Text>
                                        <Text style={{fontSize:10, fontWeight:'600', color:AppColors.grayTitle, marginTop:8, width: 125}}>{item.inLocation}</Text>
                                           <View style={{flex:1}}/> 
                                           {/* { index == 0 ?
                                           <Button style={{backgroundColor: AppColors.contentBackground, height:35, width:100, justifyContent:'center', alignItems:'center', marginBottom: 8}} onPress={ () => this.viewProjectList(item)}>
                                          <Title style={{color:AppColors.whiteTitle, textAlign:'center', fontSize:12, fontWeight:'500'}}> View Projects</Title>
                                          </Button> : null } */}
                                       </View> 
                                       <View style={{backgroundColor:AppColors.background, width:120, justifyContent:'center', alignItems:'center', flexDirection:'column', marginEnd: 4}}>
                                      <Text style={{fontSize:15, fontWeight:'600', marginTop: 5}}>{item.outDate != null ? 'Checked Out' : ''}</Text>
                                         <Text style={{fontSize:12, fontWeight:'600', color:AppColors.grayTitle, marginTop:8}}>{getTime(item.outDate)}</Text>
                                         <Text style={{fontSize:10, fontWeight:'600', color:AppColors.grayTitle, marginTop:8, width: item.outLocation == 'Unknown' ? 90 : 125}}>{item.outLocation}</Text>
                                       <View style={{flex:1}}/> 
                                       {index == 0 ?
                                          <Button style={{backgroundColor: AppColors.backgroundGray, height:35, width:100, justifyContent:'center', alignItems:'center', marginBottom: 8}} onPress={() => this.setState({dialogVisible: true})}>
                                              <Text style={{color:AppColors.whiteTitle, textAlign:'center', fontSize:12, fontWeight:'500'}}>Check Out</Text>
                                          </Button> : null }
                                       </View>
                                      </View>
                                      {/* { index !=0 ? 
                                      <View style = {{justifyContent: 'center',alignItems: 'center', position: 'absolute',bottom: 5, width: '100%', height: 20}}>
                                        <Button transparent style = {{justifyContent: 'center', alignItems: 'center'}} onPress={() => this.viewTasksList(item)}>
                                        <Text style = {{textAlign: 'center', textDecorationLine: 'underline', color: AppColors.blackTitle}}>View Tasks</Text>
                                        </Button>
                                        </View> : null } */}
                            </View>
                        </View>
                        }/>
                        {this.state.isLoading ?
                          <View  style={{position: 'absolute', left: 0, right: 0,top:0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}><Spinner size ='lg' color= {AppColors.appThemeColor} animating={true}/></View>
                           : null }
                    </View>
                  </View>
         
    );
  }
         async showUserProfile(){
            this.props.navigation.navigate('Profile')
         }

         async myAttendaceSummary() {
          this.setState({isLoading: true})
          let request: MyAttendanceListRequest = {fromDate: '', toDate: ''}
          let response = await AttendanceService.MyAttendanceSummary(request)
          this.setState({isLoading: false})
         
          if (response.success) {
            if (response.data.length == 0 || new Date(response.data[0].date).getDate() != new Date().getDate()) {
              return this.props.navigation.navigate('Attendance',{refreshData:this.refreshDashboard.bind(this)})
            }
            this.setState({datasource: response.data,currentLocation: response.data[0].inLocation})
             return
          }
          Alert.alert("Error", response.errorMessage);
        }  
        
          async getUserProfileImage() {
            await AsyncStorage.getItem('user').then((value) => {
            if (value != null) {
              let user = JSON.parse(value)
              this.setState({profileImage: user.profileImage})
            
            }
          })
        }

        async checkoutButtonAction() {
          this.setState({dialogVisible: false, isLoading: true})
          let response = await AttendanceService.TrackAttendance(this.state.location, AttendanceType.CheckOut)
          this.setState({isLoading: false})
          if (response.success) {
              this.props.navigation.navigate('CheckOut',  {address: response.data.address, refreshData: this.refreshDashboard.bind(this)})
             return
          }
          console.log(response.data.address)
          Alert.alert("Error", response.fieldErrors[0].errorMessage);
       }

      async viewProjectList(item: MyAttendanceListResponse) {
        Constants.isProjectView = false
        this.props.navigation.navigate('ProjectList', {date: item.date});
    }

    viewTasksList(item: MyAttendanceListResponse) {
      //navigate to view tasks list screen
      this.props.navigation.navigate('TaskList', { projectId: '', date: item.date});
    }

    async getLocation() {
      if (Platform.OS == 'ios') {
            GeoLocation.requestAuthorization();
            this.getCurrentLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Jade',
              'message': 'Jade App wants to access your location '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              this.getCurrentLocation();
              return
          }
        //  Alert.alert("Please allow access to your location"); 
        } catch (err) {
             Alert.alert("Something went wrong while accessing tour Location"); 
          }
      }
  }

  validateLocation() {
    let distance = getDistance({latitude: this.state.location.latitude, longitude: this.state.location.longitude},{latitude: 12.9094,longitude: 77.5210},1)
    Alert.alert(String(distance))
  }


getCurrentLocation() {
 this.setState({isLoading:true})
   GeoLocation.getCurrentPosition(
      (position) => {
        this.setState({location: {latitude: position.coords.latitude.toString(), longitude : position.coords.longitude.toString()},isLoading: false})
      },
     
      (error) => {
        this.setState({isLoading: false})
        console.log(error)  
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  //console.log('Location:',location)
} 

  }
const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column'
  }
}