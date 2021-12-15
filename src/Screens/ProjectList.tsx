import React, { Component } from 'react';
import { Container,  Text, View,  Spinner, NativeBaseProvider } from 'native-base';
import { FlatList, Alert, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ProjectService from '../APIManager/ProjectService';
import ProjectItem from './ProjectItem';
import Constants from '../Helpers/Constants';
import AppColors from './AppColors';
interface ProjectListState {
    isLoading: boolean,
    data: []
}

interface ProjectListProps {

}

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
const width = Dimensions.get('window').width;
export default class ProjectList extends Component<ProjectListProps, ProjectListState> {
    constructor(props: ProjectListProps) {
        super(props);
        this.state = {
            isLoading: false,
            data: []
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        let response = await ProjectService.fetchProjectss()
        if (response.success) {
            this.setState({
                isLoading: false,
                data: response.data
            });
            return;
        }
        Alert.alert('Task Error', response.errorMessage);
    }
    numberOfÇolumn = width > 375 ? 4 : 3
    render() {
        return (
            <NativeBaseProvider>
            <Container>
                {this.state.isLoading ?
                    <View style={{ height: Dimensions.get('window').height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><Spinner size='lg' color={AppColors.appThemeColor} animating={true} /></View>
                    </View> : null}

                {Constants.isManager && Constants.isProjectView ?
                    <View style={{ backgroundColor: AppColors.background, height: 230 ,width:400}}>
                        <View style={{ backgroundColor: AppColors.checkoutCellBackground, flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: 20, marginLeft: 10, marginRight: 10, borderRadius: 0, shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5 }}>
                            <View style={{ backgroundColor: AppColors.background, flex: 1, flexDirection: 'row', paddingLeft: 5 }}>
                                <View>
                                <Image source={{uri: Constants.TeamMateImage}} style={{resizeMode: 'contain',width: 100, height:100, borderRadius: 50}}/>
                                </View>
                                <View style={{ backgroundColor: AppColors.background, flex: 1, padding: 10 }}>
                                    <View style={{ marginTop: 10 }}><Text style={{ fontSize: 15, fontWeight: '500' }}>{Constants.TeamMateName}</Text></View>
                                    <View style={{ height: 20 }}><Text style={{ fontSize: 14, fontWeight: '500', color: AppColors.backgroundGray }}>{Constants.TeamMateDesignation}</Text></View>
                                    <View style={{ height: 20 }}><Text style={{ fontSize: 14, fontWeight: '500', color: AppColors.backgroundGray }}>{Constants.TeamMateEmail}</Text></View>
                                    <View style={{ marginTop: 5 }}>
                                        <View style={{ height: 20 }}><Text style={{ fontSize: 12, fontWeight: '600', color: AppColors.blackTitle }}>Teams :</Text></View>
                                        <View style={{ marginTop: 0 }}>
                                            <FlatList numColumns={this.numberOfÇolumn} style={{ paddingTop: 5 }}
                                                data={Constants.DATA}
                                                ItemSeparatorComponent = { () => <View style={ {  height: 2, backgroundColor: AppColors.background } } /> }
                                                renderItem={({ item }) => <Item title={item.title} />}
                                                keyExtractor={item => item.id} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: AppColors.background , height: 40, flexDirection: 'row', justifyContent: 'space-evenly',width:"100%" }}>
                                <TouchableOpacity style={{ backgroundColor: AppColors.pickerHeaderStyleColor, justifyContent: 'center', alignItems: 'center', flex: 1, marginRight: 1 }}
                                >
                                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
                                        <Image source={require('../assets/MS_Teams_Gateway_Logo_New.png')} resizeMode='contain' style={{ flex: .2, height: 20, width: 20,alignItems: 'flex-end' }} />
                                        <Text style={{ color: AppColors.whiteTitle, textAlign: 'left', fontSize: 12, fontWeight: '600', flex: .8 }}>Message in Teams</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: AppColors.pickerHeaderStyleColor, justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: 1, flexDirection: 'row' }}
                                >
                                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
                                        <Image source={require('../assets/Microsoft_Outlook-Logo.wine.png')} resizeMode='contain' style={{ flex: .2, height: 20, width: 20,  alignContent: 'flex-end' }} />
                                        <Text style={{ color: AppColors.whiteTitle, textAlign: 'left', fontSize: 12, fontWeight: '600', flex: .8,  }}>Write a Mail</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> :

                    null}

                
                
            </Container>
            </NativeBaseProvider>
        );
    }
}


const styles = StyleSheet.create({

    item: {
        backgroundColor: AppColors.projectItemBackgroundColor,
        height: 20,
        marginLeft: 5,
        width: 60,
        borderRadius: 3

    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: AppColors.whiteTitle
    },
});