import React from "react";
import {View,Text} from 'react-native';

import DatePicker from "react-native-datepicker";
export default class ApplyLeave extends React.Component{
    
    render(){
        return(
            <View style={{alignItems:'center',justifyContent:'center',flex:1,flexDirection:'row',marginHorizontal:4}}>
                <Text>
                    From Date:
                </Text>
               <DatePicker style={{width:300}}
                placeholder="Select Date"
                confirmBtnTestID="Date"
                format="DD-MM-YYYY"
               customStyles={{
                   dateInput:{
                       marginLeft:10
                   }
               }}
               />

               
            </View>
        )
    }
}