import React from 'react';
import {View, Image, Text } from 'react-native';
import { NativeBaseProvider,} from 'native-base';
import {getDay, getDateSuffix, getTime} from '../Helpers/DateExtension';
import AppColors from './AppColors';

interface navPage{
  navigation:any;
  route:any;
}
export default class CheckInConfirmation extends React.Component <navPage>{
  componentDidMount() {
    setTimeout(() => {
      this.navigateToDashboard();
    }, 200);
  }

  render() {
    return (
       
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.appThemeColor,
            justifyContent: 'flex-end',
           alignSelf:'stretch'
          }}>
            <View>
          <Text
            style={{
              color: AppColors.whiteTitle,
              fontSize: 30,
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: '600',
              
            }}>
            My Attendance
          </Text>
        </View>
        <View style={{flex: 4, backgroundColor: AppColors.background}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                marginTop: '15%',
                color: AppColors.grayTitle,
                fontSize: 20,
              }}>
              Checked In
            </Text>
            <View
              style={{
                marginTop: 20,
                width: '55%',
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
                {getDateSuffix(new Date().getDate(), new Date().getMonth())}
              </Text>
            </View>
            <Text style={{marginTop: 20, fontSize: 30}}>
              {getDay(new Date().getDay())}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 120,
              width: '100%',
              marginTop: 25,
              marginLeft: 25,
            }}>
            <Image
              source={require('../assets/checkintime.png')}
              style={{
                marginTop: 20,
                marginLeft: 10,
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                color: AppColors.grayTitle,
                width: '25%',
                
              }}>
             
              At {getTime(new Date())}
            </Text>
            <Image
              source={require('../assets/checkinaddress.png')}
              style={{
                marginTop: 20,
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                marginTop: 20,
                fontSize: 16,
                color: AppColors.grayTitle,
                width: '50%',
              }}>
             
              {this.props.route.params.address}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 20,}}>
            <Image
              source={require('../assets/whiteTick.png')}
              style={{
                backgroundColor: AppColors.appThemeColor,
                borderRadius: 35,
                width: 70,
                height: 70,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          </View>
        </View>
      
     
    );
  }

  navigateToDashboard() {
    this.props.navigation.navigate('Home');
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: AppColors.background,
    flexDirection: 'column',
  },
};
