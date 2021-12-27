import React, { Component } from 'react';
import { View, Text,  Card } from 'native-base';
import { getDay, getDateSuffix } from '../Helpers/DateExtension';
import AppColors from './AppColors';
export default class TaskItem extends Component {
    data: any;
    navigation: any;
    constructor(props) {
        super(props);
        this.data = props.data;
        this.navigation = props.navigation
    }

    render() {
        return (
            <Card style={{flex:1, flexDirection:'row',shadowColor: AppColors.shadowColor,shadowOpacity: 0.25,shadowRadius: 5,elevation: 5, marginBottom: 15}}>
            <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ backgroundColor: AppColors.taskNameCardBackgroundColor, flex: 1, height:45 }}>
                    <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                        {this.data.taskName}
                    </Text>
                </View>
                
                <View style={{ flex: 1,height:100,flexDirection:'row', shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    <View style={{ flex: 1, backgroundColor:AppColors.transparent, flexDirection:'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'  }}>
                                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'flex-start', alignItems: 'center', marginLeft:20 }}>
                                        <View style={{
                                            height: 50, width: 45, justifyContent: 'center', alignItems: 'center',
                                            backgroundColor: AppColors.pickerHeaderStyleColor, borderRadius: 5, borderWidth: 1, borderColor: AppColors.pickerHeaderStyleColor, marginRight: 2
                                        }}>
                                          
                                    <Text style={{ fontSize: 12, color: AppColors.whiteTitle, fontWeight: 'bold', textAlign: 'center' }}> {getDateSuffix((new Date(this.data.taskDate.toString())).getDate(),
                                     (new Date(this.data.taskDate.toString())).getMonth())}</Text>
                                        </View>
                                        <View style={{ height: 40, flex: 1, justifyContent: 'center', marginRight: 5 }}>
                                            <Text style={{ fontSize: 12 }}> Start Time</Text>
                                            <Text style={{ fontSize: 12, marginTop:5 }}> 10:00 AM</Text>
                                        </View>
                                         {/* <View style={{ height: 40, flex: 1, justifyContent: 'center', marginRight: 5, paddingLeft:20 }}>
                                            <Text style={{ fontSize: 12, fontWeight: '600' }}> Task Date</Text>
                                    <Text style={{ fontSize: 12, fontWeight: '600' }}> {getDateSuffix((new Date(this.data.taskDate.toString())).getDate(),
                                     (new Date(this.data.taskDate.toString())).getMonth())
                                     + " " + (new Date(this.data.taskDate.toString())).getFullYear()}
                                        
                                    </Text>
                                        </View> */}
                                    </View>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', alignItems: 'baseline', marginTop: 10, marginLeft:20 }}> {getDay(new Date(this.data.taskDate).getDay())}</Text>

                                </View>
                            </View>
                            {/* <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ height: 40, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EE7933', borderRadius: 5, borderWidth: 1, borderColor: '#EE7933', marginRight: 2 }}>
                                            <Text style={{ fontSize: 9, color: 'white', fontWeight: 'bold' }}> 6th</Text>
                                            <Text style={{ fontSize: 9, color: 'white', fontWeight: 'bold' }}> April</Text>
                                        </View>
                                        <View style={{ height: 40, flex: 1, justifyContent: 'center', marginRight: 5 }}>
                                            <Text style={{ fontSize: 9, fontWeight: 'bold' }}> End Time</Text>
                                            <Text style={{ fontSize: 9, fontWeight: 'bold' }}> 11:05 PM</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 9, fontWeight: 'bold', alignItems: 'baseline', marginTop: 5 }}> Tuesday</Text>
                                </View>
                            </View> */}
                            <View style={{width:90, backgroundColor: AppColors.pickerHeaderStyleColor, justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, fontWeight: '600' }}> No of Hours</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                        <Text style={{ color: AppColors.whiteTitle, fontSize: 12, fontWeight: '600' }}>{String(this.data.hour)} hrs</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
           </Card>
        );
    }
}