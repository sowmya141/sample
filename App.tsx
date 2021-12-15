/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
 import Login from  './src/Screens/Login'
 import OTP from './src/Screens/OTP'
 import Password from './src/Screens/Password';
 import Dashboard from './src/Screens/Dashboard';
 import Profile from './src/Screens/Profile'
 import MyAttendance from './src/Screens/MyAttendance'
 import CheckInConfirmation from './src/Screens/CheckInConfirmation';
  import CheckOutConfirmation from './src/Screens/CheckOutConfirmation';
 import AddTask from './src/Screens/AddTask';
 import TaskList from './src/Screens/TaskList';
import ProjectList from './src/Screens/ProjectList';
 import HealthFeedback from './src/Screens/HealthFeedback';
 import TeamList from './src/Screens/TeamList'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Constants from './src/Helpers/Constants';
import TaskSummary from './src/Screens/TaskSummary';
import AppColors from './src/Screens/AppColors';
//import Simple from './src/Screens/Simple'
//import  Root  from "native-base";

import Home from './src/Screens/Home';
 import DemoProceed from './src/Screens/DemoProceed';
import JobDetail from './src/Screens/JobDetail';
 import Appointment from './src/Screens/Appointment';
 import PostJob from './src/Screens/PostJob';
import AddEmployee from './src/Screens/AddEmployee';
 import Screening from "./src/Screens/Screening";
//import NotifService from "./src/Helpers/NotifyService";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const StackApp = createStackNavigator()
const naviOptionsHandler = (bool: boolean, title: string) => ({
      headerShown: bool,
      title: title,
      headerBackTitle: 'Back',
      headerStyle: {
        backgroundColor: AppColors.contentBackground,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '700',
        alignSelf: 'center',
      },
})

function homeStack() {
  return(
 
  <Stack.Navigator initialRouteName = "Home">
  <Stack.Screen name = 'Home' component = {Home}
   options = {{headerShown:false}}/>
    </Stack.Navigator>
  
  )
}

function dashboardStack() {
  return (
    
  <Stack.Navigator initialRouteName = "Dashboard">
    <Stack.Screen name = 'Dashboard' component = {Dashboard} 
    options = {naviOptionsHandler(false, '' )}/>
    </Stack.Navigator>
    
  )
}

function teamStack() {
    return(
     
    <Stack.Navigator initialRouteName = "TeamList">
      <Stack.Screen name = 'TeamList' component = {TeamList} 
      options = {naviOptionsHandler(false, '' )}/>
      </Stack.Navigator>
     
    )
}

function profileStack() {
  return(
    
  <Stack.Navigator initialRouteName = "Profile" screenOptions={{headerShown:false}}>
    <Stack.Screen name = 'Profile'
      component = {Profile} 
      options = {naviOptionsHandler(false, '' )}/>
    </Stack.Navigator>
    
  )
}


function TabNavigator() {
  if (!Constants.isManager) {
    return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: { fontSize: 14 },
        style: { },
      }} screenOptions={{headerShown:false}}>
        <Tab.Screen name = "Home" component = {homeStack} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({}) => (
              <Image source ={require('./src/assets/homeIcon.png')} 
              style = {styles.tabimg} />
            ),
          }}/>
          <Tab.Screen
          name="Dashboard"
          component={dashboardStack}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: () => (
              <Image
                source={require('./src/assets/dashboardIcon.png')}
                style={styles.tabimg}
              />
            ),
          }}
        />
          <Tab.Screen
          name="Profile"
          component={profileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
              <Image
                source={require('./src/assets/profileIcon.png')}
                style={styles.tabimg}
              />
            ),
          }}
        />
        </Tab.Navigator>
    )
  }
  return (
    <Tab.Navigator screenOptions={{
    
        "tabBarActiveTintColor": "black",
        "tabBarLabelStyle": {
          "fontSize": 14
        },
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      
    }} >
      <Tab.Screen name = "Home" component = {homeStack} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused }) => (
            <Image source ={focused ? require('./src/assets/homeIcon_focused.png') : require('./src/assets/homeIcon.png')} 
            style = {styles.imgcontent} />
          ),
        }}/>
        <Tab.Screen
        name="Dashboard"
        component={dashboardStack}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({focused}) => (
            <Image source ={focused ? require('./src/assets/dashboardIcon_focused.png') : require('./src/assets/dashboardIcon.png')} 
                style={styles.imgcontent}
            />
          ),
        }}
      />
      <Tab.Screen name = "Settings" component = {teamStack} 
      options={{
          tabBarLabel: 'Team',
          tabBarIcon: ({ focused }) => (
            <Image source ={focused ? require('./src/assets/teamsIcon_focused.png') : require('./src/assets/teamsIcon.png')}
              style = {styles.imgcontent} />
          ),
        }}/>
        <Tab.Screen
        name="Profile"
        component={profileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Image
            source ={focused ? require('./src/assets/profileIcon_focused.png') : require('./src/assets/profileIcon.png')}
              style={styles.imgcontent}
            />
          ),
        }}
      />
      </Tab.Navigator>
  )
}


class App extends React.Component {

render() {
    // console.disableYellowBox = true;
    return (
      <NavigationContainer >
      <StackApp.Navigator initialRouteName='DemoProceed' screenOptions={{headerShown:false}} >
      <StackApp.Screen name = 'DemoProceed' component = {DemoProceed} options={naviOptionsHandler(false,'')} />
      <StackApp.Screen name = 'Login' component = {Login} options = {naviOptionsHandler(false, '')}/>
      <StackApp.Screen name = 'Password' component = {Password} options = {naviOptionsHandler(false, '',)}/>
      <StackApp.Screen name = 'OTP' component = {OTP} options = {naviOptionsHandler(false, '')}/>
      <StackApp.Screen name = 'Home' component ={TabNavigator} options = {{headerShown:false}}/>  
      <Stack.Screen name = 'Attendance' component = {MyAttendance} options = {naviOptionsHandler(false, '')}/> 
      <Stack.Screen name = 'Health' component = {HealthFeedback} options = {naviOptionsHandler(false, '')}/>
      <Stack.Screen name = "Appointment" component = {Appointment} options= {naviOptionsHandler(false, 'Appointments')}/>
      <Stack.Screen name = 'CheckIn' component = {CheckInConfirmation} options = {naviOptionsHandler(false, '')}/> 
      <Stack.Screen name = 'ProjectList' component = {ProjectList} options = {naviOptionsHandler(true, 'Projects')}/>
      <Stack.Screen name = 'PostJob' component = {PostJob} options = {naviOptionsHandler(true, 'Post a Job')}/>
       <Stack.Screen name = 'AddEmployee' component = {AddEmployee} options = {naviOptionsHandler(true, 'Add Employee')} />
       <Stack.Screen name = 'TaskList' component = {TaskList} options = {naviOptionsHandler(true, 'View Task')}/>
       <Stack.Screen name="JobDetail" component={JobDetail} options={naviOptionsHandler(true, 'Job Details')}/>
       <Stack.Screen name = 'AddTask' component = {AddTask} options = {naviOptionsHandler(true, 'Add Task')}/>
       <Stack.Screen name = 'Summary' component = {TaskSummary} options = {naviOptionsHandler(true, 'Summary')}/>
       <Stack.Screen name = 'CheckOut' component = {CheckOutConfirmation} options = {naviOptionsHandler(false, '')}/>
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
    marginTop: 8
  }
})

export default App;
