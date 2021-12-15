import React, { Component } from "react";
import { View, Text,  NativeBaseProvider } from 'native-base';
import { ListView, Alert, TouchableOpacity, FlatList, Dimensions, Image, StyleSheet } from 'react-native';
//import AncientTownImage from '../Images/ancient-town.jpg';
import Right_Arrow from '../../src/assets/RightArrowWhite.png';
import Constants from '../Helpers/Constants';
import {formatDate} from '../Helpers/DateExtension'
import AppColors from './AppColors';

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const width = Dimensions.get('window').width;
export default class TeamItem extends Component {
    data: any;
    navigation: any;
    date: any;
    constructor(props) {
        super(props);
        this.data = props.data;
        this.navigation = props.navigation
        this.date = props.date
        this.teamItemSelected = this.teamItemSelected.bind(this);
    }

    async teamItemSelected(state: any) {
        Constants.isProjectView = true
        Constants.TeamMateName = this.data.name
        Constants.TeamMateDesignation = this.data.designation
        Constants.TeamMateEmail = this.data.email
        Constants.TeamMateImage = this.data.imageUrl
        this.navigation.navigate('ProjectList', {
            projectId: this.data.id, date: formatDate(new Date().toDateString(),0)
        });
    }

    numberOfÇolumn = width > 375 ? 4 : 3
    render() {
        return (
            <NativeBaseProvider>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                onPress={() =>
                    this.teamItemSelected(this)
                }>
                <View style={{ flexDirection: 'row', height: 120, borderRadius: 2, borderWidth: 1, borderColor: AppColors.borderLightGrayColor, shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginBottom: 20 }}>

                    <View style={{ flex: 1, backgroundColor: AppColors.background, flexDirection: 'row' }}>
                        {this.data.imageUrl===null?
                        <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10,width: 100, height:100, borderColor: AppColors.appThemeColor ,borderWidth:2, borderRadius: 50 }}>
                        <Image source={{uri: this.data.imageUrl}} style={{height:100,width:70,top:0,left:10}}/>
                    </View>:
                    <View style={{ marginRight:10 }}>
                    <Image source={{uri: this.data.imageUrl}} style={{height:100,width:70,top:0,left:10}}/>
                </View>
                    }
                        
                        <View style={{ backgroundColor: AppColors.background, flex: 1, padding: 5 }}>
                            <View style={{ flex: 1, backgroundColor: AppColors.background }}>
                                <View style={{ flex: 1 }}><Text style={{ fontSize: 15, fontWeight: '500' }}>{this.data.name}</Text></View>
                                <View style={{ flex: 1 }}><Text style={{ fontSize: 14, fontWeight: '500', color: AppColors.backgroundGray }}>{this.data.designation}</Text></View>
                            </View>
                            <View style={{ backgroundColor: AppColors.background, marginTop: 5, height: 50 }}>
                                <View style={{ height: 20, backgroundColor: AppColors.background }}><Text style={{ fontSize: 12, fontWeight: '500' }}>Teams:</Text></View>
                                <View style={{ marginTop: 0, paddingTop: 0, backgroundColor: AppColors.background, borderWidth: 0 }}>
                                    <FlatList style={{ margin: 0, padding: 0, borderWidth: 0 }} numColumns={this.numberOfÇolumn}
                                        data={Constants.DATA.slice(0, 3)}
                                        ItemSeparatorComponent={() => <View style={{ height: 2, backgroundColor: AppColors.background }} />}
                                        renderItem={({ item, index }) =>
                                            <Item title={item.title}
                                            />}
                                        keyExtractor={item => item.id} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: AppColors.pickerHeaderStyleColor, width: 35 }}>
                        <Image resizeMode='center' source={Right_Arrow} style={{ alignItems: 'center', justifyContent: 'center', flex: 1, alignSelf: 'center' }}>
                        </Image>
                    </View>
                </View>
            </TouchableOpacity>
            </NativeBaseProvider>
        );
    };
}

const styles = StyleSheet.create({

    item: {
        backgroundColor: AppColors.projectItemBackgroundColor,
        height: 20,
        marginLeft: 5,
        width: 50,
        borderRadius: 3

    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: AppColors.whiteTitle
    },
});

