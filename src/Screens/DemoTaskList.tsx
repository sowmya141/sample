import React, { Component } from 'react';
import { Container,  Text,  View, Spinner } from 'native-base';
import {  Alert, FlatList, Dimensions, Image } from 'react-native';
import TaskService from '../APIManager/TaskService'
import { GetTaskListRequest } from '../Models/Request';
import TaskItem from './TaskItem';
import { TimeSheet } from '../../src/Models/Response/TimeSheet';
import Constants from '../Helpers/Constants';
import AppColors from './AppColors';

interface DemoTaskListState {
    data: Array<TimeSheet>,
    isLoading: boolean,
    dialogVisible: boolean
}

interface DemoTaskListProps {
    navigation:any
}
var taskListArray: Array<TimeSheet>
var dates = Array<string>()
var selectedIndex = 0
export default class DemoTaskList extends Component<DemoTaskListProps, DemoTaskListState>  {
    constructor(props: DemoTaskListProps) {
        super(props);
        this.state = {
            isLoading: false,
            data: Array<TimeSheet>(),
            dialogVisible: false,
        }
    }

    componentWillReceiveProps() {
        this.fetchTaskList('');
    }

    componentWillMount() {
        this.fetchTaskList('');
    }

    render() {
        return (
            <Container>
                {this.state.isLoading ?
                    <View style={{ height: Dimensions.get('window').height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><Spinner size='lg' color={AppColors.appThemeColor} animating={true} /></View>
                    </View> : null}
                <View  style={{ marginTop: 14, shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    {this.state.data.length != 0 ? <View style={{ marginBottom: 300 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => {
                                return <TaskItem navigation={this.props.navigation} 
                                data={item} />
                            }
                            } />
                    </View> :
                        <View style={{ height: Dimensions.get('window').height, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: AppColors.designationHealthBackgroundColor }}>
                            <Image source={require('../assets/timesheet.png')} style={{ marginTop: '25%', resizeMode: 'contain', height: 100, width: 100 }} />
                            <Text style={{ textAlign: 'center', color: AppColors.grayTitle, marginTop: 35, marginLeft: 25, marginRight: 25, fontSize: 16 }}> Add the Daily tasks and Record the nummber of hours spent on each Task </Text>
                        </View>
                    }
                </View>
            </Container >
        );
    }

    async fetchTaskList(date: string) {
        this.setState({ isLoading: true, data: []})
        let request: GetTaskListRequest = { fromDate: date }
        let response = await TaskService.fetchTasks(request)
        this.setState({ isLoading: false })
        if (response.success) {
            // set state here
            var filteredTaskArray =  response.data.timeSheets.filter(function (value) {
                return value.project.id == Constants.projectId //filter  tasks based on projects
            })
            this.setState({data: filteredTaskArray})
            return;
        }
        Alert.alert('Error', response.errorMessage);
    }

    refreshTaskList() {
        this.fetchTaskList(''); //Refresh task list when a new task is added
    }
}