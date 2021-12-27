import 'react-native-gesture-handler';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Login,OTP,Password,Dashboard,Profile,MyAttendance,
  CheckInConfirmation,Home,DemoProceed,JobDetail,Appointment
  ,CheckOutConfirmation,AddTask,TaskList,ProjectList,HealthFeedback,TeamList,
  TaskSummary,AppColors,PostJob,AddEmployee,Screening,ApplyLeave
} from '../src/Screens'

import Constants from '../src/Helpers/Constants';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const StackApp = createStackNavigator()
const naviOptionsHandler = (bool: boolean, title: string) => ({
      headerShown: bool,
      title: title,
      headerBackTitle: 'black',
      headerStyle: {
        backgroundColor: AppColors.contentBackground,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '700',
        alignSelf: 'center',
      },
})



function TabNavigator() {
   return (
    <Tab.Navigator screenOptions={{headerShown:false}} 
    tabBarOptions={{activeTintColor: 'black',labelStyle: { fontSize: 14 },style: { },}} >
      <Tab.Screen name = "Home" component = {Home} options={{tabBarLabel: 'Home',
          tabBarIcon: ({focused }) => (
            <Image source ={focused ? require('../src/assets/homeIcon_focused.png') : require('../src/assets/homeIcon.png')} 
            style = {styles.imgcontent} />
          ),
        }}
        
        />
        <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({focused}) => (
            <Image source ={focused ? require('../src/assets/dashboardIcon_focused.png') : require('../src/assets/dashboardIcon.png')} 
                style={styles.imgcontent}
            />
          ),
        }}
      />
      {Constants.isManager? <Tab.Screen name = "Settings" component = {TeamList} 
      options={{
          tabBarLabel: 'Team',
          tabBarIcon: ({ focused }) => (
            <Image source ={focused ? require('../src/assets/teamsIcon_focused.png') : require('../src/assets/teamsIcon.png')}
              style = {styles.imgcontent} />
          ),
        }}/>:null}
     
        <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Image source ={focused ? require('../src/assets/profileIcon_focused.png') : require('../src/assets/profileIcon.png')}
              style={styles.imgcontent}
            />
          ),
        }}
      />
      </Tab.Navigator>
  )
}

class JadeNavigation extends React.Component {

render() {
    // console.disableYellowBox = true;
    return (
      <NavigationContainer >
      <StackApp.Navigator initialRouteName='DemoProceed' screenOptions={{headerShown:false}} >
      <StackApp.Screen name = 'DemoProceed' component = {DemoProceed}  />
      <StackApp.Screen name = 'Login' component = {Login} />
      <StackApp.Screen name = 'Password' component = {Password} />
      <StackApp.Screen name = 'OTP' component = {OTP} />
      <StackApp.Screen name = 'Home' component ={TabNavigator} options = {{headerShown:false}}/>  
      <StackApp.Screen name ='Leave' component={ApplyLeave}  options = {naviOptionsHandler(true, 'Apply Leave')}/>
      <Stack.Screen name = 'Attendance' component = {MyAttendance}/> 
      <Stack.Screen name = 'Health' component = {HealthFeedback}/>
      <Stack.Screen name = "Appointment" component = {Appointment}/>
      <Stack.Screen name = 'CheckIn' component = {CheckInConfirmation}/>
      <Stack.Screen name = 'ProjectList' component = {ProjectList} options = {naviOptionsHandler(true, 'Projects')}/>
      <Stack.Screen name = 'PostJob' component = {PostJob} options = {naviOptionsHandler(true, 'Post a Job')}/>
       <Stack.Screen name = 'AddEmployee' component = {AddEmployee} options = {naviOptionsHandler(true, 'Add Employee')} />
       <Stack.Screen name = 'TaskList' component = {TaskList} options = {naviOptionsHandler(true, 'View Task')}/>
       <Stack.Screen name="JobDetail" component={JobDetail} options={naviOptionsHandler(true, 'Job Details')}/>
       <Stack.Screen name = 'AddTask' component = {AddTask} options = {naviOptionsHandler(true, 'Add Task')}/>
       <Stack.Screen name = 'Summary' component = {TaskSummary} options = {naviOptionsHandler(true, 'Summary')}/>
       <Stack.Screen name = 'CheckOut' component = {CheckOutConfirmation} />
       <Stack.Screen name = "Screening" component = {Screening} options= {naviOptionsHandler(true, 'COVID - 19 Screening')}/>
       </StackApp.Navigator>
      </NavigationContainer>
    );
  }

  
}
const styles=StyleSheet.create({
  imgcontent:{
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  tabimg:{
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 8,
    marginTop: 8,
    color:'#fff'
  }
})

export default JadeNavigation;
