import React from 'react';
import { View, Text, Dimensions, Image, Alert } from 'react-native';
import AppColors from './AppColors';
import { Job } from '../Models/Response';
import { Button, NativeBaseProvider, Tabs,  } from 'native-base';
import { JobType } from '../Enums/JobType';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Card, Spinner } from 'native-base';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { getDateSuffix } from '../Helpers/DateExtension';
import JobServices from '../APIManager/JobServices'
import { JobRequest } from '../../src/Models/Request/JobRequest';
import { JobStatus } from '../Enums/JobStatus';
import TaskList from './TaskList';
import DemoTaskList from './DemoTaskList';
import DemoActiveJobSummary from './DemoActiveJobSummary';
import Constants from '../Helpers/Constants';

interface JobDetailState {
    jobDetail: Job;
    type: JobType;
    openJobs: Array<Job>;
    dialogVisible: boolean;
    updateMap: boolean;
    isLoading: boolean;
}

interface JobDetailProps {
    navigation: any
    route: any
}

export default class JobDetail extends React.Component<
    JobDetailProps,
    JobDetailState
    > {
    constructor(props: JobDetailProps) {
        super(props);
        this.state = {
            jobDetail: this.props.route.params.jobDetail,
            type: this.props.route.params.jobType,
            openJobs: Array<Job>(),
            dialogVisible: false,
            updateMap: false,
            isLoading: false
        };
        this.completeOrAcceptJobButtonAction = this.completeOrAcceptJobButtonAction.bind(
            this,
        );
        this.navigateToDashboard = this.navigateToDashboard.bind(this);
    }

    componentDidMount() {
        this.setState({type: this.state.type == JobType.Active ? JobType.Edit : JobType.Open})
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({ updateMap: true });
        }, 1000);
    }

    render() {
        return (
            <NativeBaseProvider>
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <Dialog visible={this.state.dialogVisible}>
                    <DialogContent>
                        <View
                            style={{ height: 200, width: Dimensions.get('window').width - 75 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '100%', marginTop: 30 }}>
                                    <Image
                                        source={require('../assets/whiteTick.png')}
                                        style={{
                                            backgroundColor: AppColors.pickerHeaderStyleColor,
                                            borderRadius: 35,
                                            width: 70,
                                            height: 70,
                                            resizeMode: 'contain',
                                            alignSelf: 'center',
                                        }}
                                    />
                                </View>
                            </View>
                            <Text
                                style={{
                                    marginTop: 30,
                                    width: '100%',
                                    textAlign: 'center',
                                    fontSize: 20,
                                }}>
                                {' '}
                                {this.state.type == JobType.Active
                                    ? 'Job Completed'
                                    : 'Job Alloted'}
                            </Text>
                        </View>
                    </DialogContent>
                </Dialog>
                {this.state.type == JobType.Open ? (
                    <View>
                        <ScrollView>
                            <View
                                style={{
                                    marginTop: 20,
                                    marginBottom: 100,
                                    marginLeft: 20,
                                    marginRight: 20,
                                }}>
                                <Text
                                    style={{
                                        marginTop: 12,
                                        fontSize: 20,
                                        fontWeight: '800',
                                        textDecorationLine: 'underline',
                                    }}>
                                    {this.state.jobDetail.name}
                                </Text>
                                <Text style={{ marginTop: 4, fontSize: 16 }}>
                                    {this.state.jobDetail.hospitalName + " Hospitals"}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 8,
                                        alignItems: 'center',
                                        height: 40,
                                    }}>
                                    <Image
                                        style={{
                                            width: 35,
                                            height: 35,
                                            resizeMode: 'contain',
                                            marginLeft: -5,
                                        }}
                                        source={require('../Images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {' '}
                    From :{' '}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {getDateSuffix(
                                            new Date(this.state.jobDetail.startDate).getDate(),
                                            new Date().getMonth(),
                                        )}{' '}
                                        {new Date(this.state.jobDetail.startDate).getFullYear()}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {' '}
                    To :{' '}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {getDateSuffix(
                                            new Date(this.state.jobDetail.endDate).getDate(),
                                            new Date().getMonth(),
                                        )}{' '}
                                        {new Date(this.state.jobDetail.endDate).getFullYear()}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 8
                                    }}>
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain',
                                            alignSelf: 'center',
                                        }}
                                        source={require('../assets/addressPin.png')}
                                    />
                                    <Text style={{ fontSize: 14, marginLeft: 8 }}>
                                        {this.state.jobDetail.location}
                                    </Text>
                                </View>
                                <Text style={{ marginTop: 20, fontSize: 18 }}>Details</Text>
                                <View style={{ margin: 20, backgroundColor: 'white' }}>
                                    <Text style={{ padding: 12 }}>
                                        {this.state.jobDetail.description}
                  </Text>
                                </View>
                                <Text style={{ marginTop: 20, fontSize: 18 }}>Location</Text>
                                {this.state.updateMap ? (
                                    <View
                                        style={{
                                            backgroundColor: 'clear',
                                            width: '100%',
                                            height: 250,
                                            marginTop: 20,
                                        }}>
                                        <MapView
                                            style={{ width: '100%', height: '100%', borderRadius: 5 }}
                                            initialRegion={{
                                                latitude: Number(
                                                    this.state.jobDetail.lat,
                                                ),
                                                longitude: Number(
                                                    this.state.jobDetail.lon,
                                                ),
                                                latitudeDelta: 0.009,
                                                longitudeDelta:
                                                    0.009 *
                                                    (Dimensions.get('window').width /
                                                        Dimensions.get('window').height),
                                            }}>
                                            <Marker
                                                coordinate={{
                                                    latitude: Number(
                                                        this.state.jobDetail.lat,
                                                    ),
                                                    longitude: Number(
                                                        this.state.jobDetail.lon,
                                                    ),
                                                }}
                                                title={''}
                                                description={''}
                                            />
                                        </MapView>
                                    </View>
                                ) : null}
                            </View>
                        </ScrollView>
                    </View>
                ) : (
                        <View>
                            <ScrollView>
                                <View style={{ backgroundColor: 'clear' }}>
                                    <Card>
                                        <Text
                                            style={{
                                                marginLeft: 20,
                                                marginTop: 12,
                                                fontSize: 20,
                                                fontWeight: '800',
                                                textDecorationLine: 'underline',
                                            }}>
                                            {this.state.jobDetail.name}
                                        </Text>
                                        <Text style={{ marginLeft: 20, marginTop: 2, fontSize: 16 }}>
                                        {this.state.jobDetail.hospitalName + " Hospitals"}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 8,
                                                marginLeft: 20,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: AppColors.pickerHeaderStyleColor,
                                                }}>
                                                Supervisor:{' '}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    textDecorationLine: 'underline',
                                                    marginLeft: 5,
                                                    color: AppColors.pickerHeaderStyleColor,
                                                }}>
                                                Admin
                    </Text>
                                        </View>
                                        <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginLeft: 20

                                    }}>
                                    <Image
                                        style={{
                                            width: 30,
                                            height: 30,
                                            resizeMode: 'contain',
                                            marginLeft: -5,
                                            alignSelf: 'center',
                                            marginTop: 5
                                        }}
                                        source={require('../Images/calendar.png')}
                                    />
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {' '}
                    From :{' '}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {getDateSuffix(
                                            new Date(this.state.jobDetail.startDate).getDate(),
                                            new Date().getMonth(),
                                        )}{' '}
                                        {new Date(this.state.jobDetail.startDate).getFullYear()}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {' '}
                    To :{' '}
                                    </Text>
                                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                        {getDateSuffix(
                                            new Date(this.state.jobDetail.endDate).getDate(),
                                            new Date().getMonth(),
                                        )}{' '}
                                        {new Date(this.state.jobDetail.endDate).getFullYear()}
                                    </Text>
                                </View>
                                        <Text
                                            style={{
                                                marginLeft: 20,
                                                fontSize: 14,
                                                marginBottom: 12,
                                            }}>
                                            10:00 AM to 06:00 PM
                  </Text>
                                    </Card>
                                </View>
                               <View>
       
                                   </View>
                            </ScrollView>
                        </View>
                    )}
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: AppColors.whiteTitle,
                        width: '100%',
                        height: '10%',
                    }}>
                    <Button
                        style={{
                            backgroundColor: AppColors.pickerHeaderStyleColor,
                            justifyContent: 'center',
                            padding: 25,
                        }}
                        onPress={() =>
                            this.completeOrAcceptJobButtonAction(this.state.type)
                        }>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: AppColors.whiteTitle,
                                fontSize: 16,
                                fontWeight: '600',
                            }}>
                            {this.state.type == JobType.Active ? 'Complete Job' : this.state.type == JobType.Edit ? 'Add Task'
                                : 'Accept Job'}
                        </Text>
                    </Button>
                </View>
                { 
              this.state.isLoading && <View  style={{position: 'absolute', left: 0, right: 0,top:0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}><Spinner size = 'lg' color= {AppColors.appThemeColor} animating={true}/></View>
             }
            </View>
            </NativeBaseProvider>
        );
    }

    async completeOrAcceptJobButtonAction(type: JobType) {
        if (type == JobType.Edit) {
            //Navigate to add task screen
            this.navigateToAddTaskScreen()
            return
        }

        this.setState({isLoading: true})
        let request: JobRequest = { projectId: this.state.jobDetail.id, status: type == JobType.Active ? JobStatus.Completed : JobStatus.Accept }
        let response = await JobServices.allocateJob(request)
        this.setState({isLoading: false})
        if (response.success) {
            this.setState({ dialogVisible: true });
            setTimeout(() => {
                this.navigateToDashboard();
            }, 2000);
            return;
        }
        Alert.alert(response.errorMessage)
    }

    navigateToDashboard() {
        this.setState({ dialogVisible: false });
        this.props.route.params.refreshData();
        this.props.navigation.goBack();
    }

    navigateToAddTaskScreen() {
        Constants.isDemoAddTask = true
        this.props.navigation.navigate('AddTask', { projectId: this.state.jobDetail.id})
    }
}
