import React, { Component } from 'react';
import { View, Text, CardItem, Button, Thumbnail, Title, Body, ListItem } from 'native-base';
import CompanyImage from '../Images/Company.png';
import { Alert, TouchableOpacity } from 'react-native';
import Constants from '../Helpers/Constants';
import AppColors from './AppColors';
export default class ProjectItem extends Component {
    data: any;
    navigation: any;
    date: any;
    constructor(props) {
        super(props);
        this.data = props.data;
        this.navigation = props.navigation
        this.date = props.date
        this.projectListSelected = this.projectListSelected.bind(this);
    }

    async projectListSelected(state: any) {
        this.navigation.navigate('TaskList', { projectId: this.data.id, date: this.date });
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', height: 120, borderRadius: 2, borderWidth: 1, borderColor: AppColors.borderLightGrayColor, shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20 }}>
                <Body style={{ flex: 1, height: 100, flexDirection: 'row', backgroundColor: AppColors.transparent }}>
                    <View style={{ backgroundColor: AppColors.checkoutCellBackground, height: 90, width: 70, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderColor: AppColors.backgroundGray, borderWidth: 0.5 }}>
                        <Thumbnail source={CompanyImage} style={{ height: 50, width: 50 }}>
                        </Thumbnail>
                    </View>
                    <View style={{ backgroundColor: AppColors.transparent, height: 90, width: 90, flex: 1, flexDirection: 'row', marginLeft: 5, marginTop: 5, marginRight: 5 }}>
                        <View style={{ backgroundColor: AppColors.transparent, flex: 1, marginLeft: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: '600', height: 20 }}>{this.data.name} </Text>
                            <Text style={{ fontSize: 9, fontWeight: '600', height: 20, color: AppColors.grayTitle, marginTop: 2 }}> Last Task Update: Yesterday 4:00PM</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ backgroundColor: AppColors.pickerHeaderStyleColor, height: 34, width: 105, justifyContent: 'center', alignItems: 'center', marginBottom: 0, marginTop: 10, borderRadius:3 }}
                                    onPress={() =>
                                        this.projectListSelected(this)
                                    }>
                                    <Title style={{ color: AppColors.whiteTitle, textAlign: 'center', fontSize: 11, fontWeight: '600' }}>View / Add Task</Title>
                                </TouchableOpacity>
                                {false ?
                                    <TouchableOpacity style={{ backgroundColor: AppColors.transparent, height: 34, width: 105, justifyContent: 'center', alignItems: 'center', marginBottom: 0, marginTop: 10 }}
                                        onPress={() =>
                                            Alert.alert('More')
                                        }>
                                        <Title style={{ color: AppColors.blackTitle, textAlign: 'center', fontSize: 11, fontWeight: '600' }}>3+ More</Title>
                                    </TouchableOpacity>
                                    : <View />}
                            </View>
                        </View>
                    </View>
                </Body>
            </View>
        );
    }
}