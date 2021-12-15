import React, { Component } from 'react';
import { Container,  Text,   Button,  Spinner, NativeBaseProvider } from 'native-base';
import { View, Alert, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import TaskService from '../APIManager/TaskService'
import { GetTaskListRequest } from '../Models/Request';
import TaskItem from './TaskItem';
import { TimeSheet } from '../../src/Models/Response/TimeSheet';
import { formatDate, getDay, getMonth, getDateSuffix } from '../Helpers/DateExtension';
import ProjectService from '../APIManager/ProjectService';
import { ProjectResponse, SummaryData } from '../Models/Response'
import { WeekType } from '../Enums/WeekType'
import Constants from '../Helpers/Constants';
import AppColors from './AppColors';

interface TaskListState {
    projectId: string
    selectedDate: string
    data: Array<TimeSheet>
    isLoading: boolean,
    previousWeekDate: Date
    nextWeekDate: Date
    weekInterval: string
    dialogVisible: boolean
    projectsList: Array<ProjectResponse>
    hideSubmitTasks: boolean
}

interface TaskListProps {
}
var taskListArray: Array<TimeSheet>
var dates = Array<string>()
var selectedIndex = 0
export default class TaskList extends Component<TaskListProps, TaskListState>  {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            projectId: this.props.route.params.projectId,
            selectedDate: this.props.route.params.date,
            isLoading: false,
            data: Array<TimeSheet>(),
            previousWeekDate: new Date(),
            nextWeekDate: new Date(),
            weekInterval: '',
            dialogVisible: false,
            projectsList: Array<ProjectResponse>(),
            hideSubmitTasks: true
        }
        this.getPrviousWeek = this.getPrviousWeek.bind(this)
        this.getNextWeek = this.getNextWeek.bind(this)
        this.getPrevOrNextDayTasks = this.getPrevOrNextDayTasks.bind(this)
        this.showProjectsList = this.showProjectsList.bind(this)
        this.closeButtonAction = this.closeButtonAction.bind(this)
        this.viewTasksButtonAction = this.viewTasksButtonAction.bind(this)
        this.navigateToAddTaskScreen = this.navigateToAddTaskScreen.bind(this)
        this.submitTaskButtonAction = this.submitTaskButtonAction.bind(this)
        this.navigateToTaskSummary = this.navigateToTaskSummary.bind(this)
    }

    componentWillReceiveProps() {
        this.refreshTaskList()
    }

    componentWillMount() {
        this.fetchTaskList(this.state.selectedDate);
        this.fetchProjects()
    }

    render() {
        return (
            <NativeBaseProvider>
                <Container>
                {this.state.isLoading ?
                    <View style={{ height: Dimensions.get('window').height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><Spinner size='lg' color={AppColors.appThemeColor} animating={true} /></View>
                    </View> : null}

                {Constants.isProjectView ?
                    <View style={{backgroundColor:AppColors.background, flexDirection: 'row', height: 125}}>
                         <View style={{backgroundColor:AppColors.blueColor, flex:1,  marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, borderRadius: 2, borderWidth: 1, borderColor: AppColors.borderLightGrayColor, shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, shadowOffset: { width: 0, height: 0 }}}> 
                        <View style={{ flex: 1, backgroundColor: AppColors.background, flexDirection: 'row', borderColor: AppColors.backgroundGray }}>
                            <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                                <Image source={{uri: Constants.TeamMateImage}} style={{resizeMode: 'contain',width: 80, height:80, borderRadius: 40}}/>
                            </View>

                            <View style={{ backgroundColor: AppColors.background, flex: 1, paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5, justifyContent: 'center' }}>
                                <View style={{ backgroundColor: AppColors.background, height: 40 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{Constants.TeamMateName}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}><Text style={{ fontSize: 16, fontWeight: '500', color: AppColors.backgroundGray }}>{Constants.TeamMateDesignation}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        </View>

                    </View> : null}

                <View style={{ backgroundColor: AppColors.addTaskBackgroundColor, height: 70 }}>
                    <View style={{ backgroundColor: AppColors.transparent, height: 30, justifyContent: 'center', alignItems: 'center', margin: 20, flexDirection: 'row' }}>
                        <View style={{ backgroundColor: AppColors.transparent, height: 30, width: 50 }}>
                            <TouchableOpacity style={{ flex: 1, backgroundColor: AppColors.background, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() =>
                                this.getPrviousWeek()
                            }>
                                <Text style={{ color: AppColors.blackTitle, fontSize: 12, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}> Prev</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, height: 30, marginLeft: 10, marginRight: 10, flexDirection: 'row' }}>
                            <View style={{ backgroundColor: AppColors.background, flex: 1 }}>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: AppColors.transparent, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: AppColors.blackTitle, fontSize: 12, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>{this.state.weekInterval}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ backgroundColor: AppColors.transparent, height: 30, width: 50 }}>
                            <TouchableOpacity style={{ flex: 1, backgroundColor: AppColors.background, justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                                this.getNextWeek()
                            }>
                                <Text style={{ color: AppColors.blackTitle, fontSize: 12, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center' }}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View  style={{ marginTop: 14, shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <View style={{ width: '100%', height: 50, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.getPrevOrNextDayTasks(WeekType.Prev)}>
                                <Image source={require('../assets/prev.png')} style={{ resizeMode: 'contain', height: 30, width: 30 }} />
                            </TouchableOpacity>
                            <View style={{ width: 50, height: 60, backgroundColor: AppColors.contentBackground, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{ textAlign: 'center', color: AppColors.whiteTitle, fontSize: 18, fontWeight: '800', marginBottom: 5 }}> {new Date(this.state.selectedDate).getDate()} </ Text>
                                <Text style={{ textAlign: 'center', color: AppColors.whiteTitle, fontSize: 16, fontWeight: '800' }}> {String(getDay(new Date(this.state.selectedDate).getDay())).substring(0, 3)} </ Text>
                            </View>
                            <TouchableOpacity onPress={() => this.getPrevOrNextDayTasks(WeekType.Next)}>
                                <Image source={require('../assets/next.png')} style={{ resizeMode: 'contain', height: 30, width: 30 }} />
                            </TouchableOpacity>
                        </View>
                        {!Constants.isProjectView && new Date(this.state.selectedDate).getDate() == new Date().getDate() ?
                            <Button  style={{ flex: 1, borderColor: AppColors.backgroundGray, backgroundColor: AppColors.background, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 15 }}
                                onPress={() => this.navigateToAddTaskScreen()}>
                                <Text style={{ color: AppColors.blackTitle, textAlign: 'center', fontSize: 15, fontWeight: '400' }}>+ Add Task</Text>
                            </Button> : null}
                    </View>
                    {this.state.data.length != 0 ? <View style={{ marginBottom: 75 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) => {
                                return <TaskItem navigation={this.props.navigation} data={item} />
                            }
                            } />
                    </View> :
                        <View style={{ height: Dimensions.get('window').height, width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: AppColors.designationHealthBackgroundColor }}>
                            <Image source={require('../assets/timesheet.png')} style={{ marginTop: '25%', resizeMode: 'contain', height: 100, width: 100 }} />
                            <Text style={{ textAlign: 'center', color: AppColors.grayTitle, marginTop: 35, marginLeft: 25, marginRight: 25, fontSize: 16 }}> Add the Daily tasks and Record the nummber of hours spent on each Task </Text>
                        </View>
                    }
                </View>
                {!this.state.isLoading ?
                    <View style={{ width: '100%', height: 100, justifyContent: this.state.hideSubmitTasks ? 'center' : 'space-between', alignItems: 'center', flexDirection: 'row', position: 'absolute', bottom: 0, shadowOpacity: 0.25, shadowRadius: 3, elevation: 3 }}>
                        <Button style={{ backgroundColor: AppColors.contentBackground, justifyContent: 'center', width: '49%' }} onPress={this.showProjectsList}>
                            <Text style={{ textAlign: 'center', fontWeight: '600' }}> Select a Project </Text>
                        </Button>
                        {!this.state.hideSubmitTasks ?
                        <Button style={{ backgroundColor: AppColors.contentBackground, justifyContent: 'center', width: '49%' }} onPress={this.submitTaskButtonAction}>
                            <Text style={{ textAlign: 'center', fontWeight: '600' }}> Submit </Text>
                        </Button> : null }
                    </ View> : null}
                {this.state.dialogVisible ?
                    <View style={{ backgroundColor: AppColors.dialogBackgroundColor, opacity: .5, height: '50%', width: '100%', position: 'absolute', top: 0 }}>
                    </View> : null}
                {this.state.dialogVisible ?
                    <View style={{ width: '100%', height: '50%', position: 'absolute', bottom: 0, backgroundColor: AppColors.background }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ marginTop: 30, marginLeft: 50, fontSize: 20, fontWeight: '600' }}>View Project Wise Tasks </Text>
                            <TouchableOpacity onPress={() => this.closeButtonAction()}>
                                <Image source={require('../assets/close.png')} style={{ marginTop: 25, marginRight: 40, resizeMode: 'contain', height: 35, width: 35 }} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={this.state.projectsList}
                            renderItem={({ item, index }) =>
                                <View style={{ flex: 1, flexDirection: 'row', shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginLeft: 20, marginRight: 20, marginTop: 15 }}>
                                    <View style={{ backgroundColor: AppColors.checkoutCellBackground, height: 130, width: 90, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', color: AppColors.contentBackground, fontSize: 50, fontWeight: 'bold' }}> {item.name.substring(0, 1)}</Text>
                                    </View>
                                    <View style={{ backgroundColor: AppColors.background, height: 120, width: 90, flex: 1, flexDirection: 'row', marginLeft: 10 }}>
                                        <View style={{ backgroundColor: AppColors.background, flex: 1 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '600', marginTop: 15 }}>{item.name}</Text>
                                            <View style={{ flex: 1 }} />
                                            <Button style={{ backgroundColor: AppColors.contentBackground, height: 35, width: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} onPress={() => this.viewTasksButtonAction(item)}>
                                                <Text style={{ color: AppColors.whiteTitle, textAlign: 'center', fontSize: 12, fontWeight: '500' }}> View Tasks</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            } />
                    </View> : null}
            </Container >
            </NativeBaseProvider>
        );
    }

    async fetchTaskList(date: string) {
        this.setState({ isLoading: true, data: [], weekInterval: '', hideSubmitTasks: true })
        let request: GetTaskListRequest = { fromDate: date }
        let response = await TaskService.fetchTasks(request)
        this.setState({ isLoading: false })
        if (response.success) {
            taskListArray = response.data.timeSheets
            let fromDate = new Date(response.data.fromDate)
            let toDate = new Date(response.data.toDate)
            this.getListOfDays(fromDate, toDate)
            this.filterTasks(date, this.state.projectId)
            dates.filter(function (value, index) {
                if (new Date(value).getDate() == new Date(date).getDate()) {
                    selectedIndex = index
                }
            })
            this.setState({
                previousWeekDate: response.data.prevDate,
                nextWeekDate: response.data.nextDate,
                weekInterval: getDateSuffix(fromDate.getDate(), fromDate.getMonth()) + " - " + getDateSuffix(toDate.getDate(), toDate.getMonth())
            });
            return;
        }
        Alert.alert('Error', response.errorMessage);
    }

    getListOfDays(fromDate: Date, toDate: Date) {
        dates = []
        var startDate = new Date(fromDate);
        while (startDate <= toDate) {
            if (new Date().getDate() == startDate.getDate()) {
                this.setState({hideSubmitTasks: false})
            }
            let date = formatDate(startDate.toString(), 0)
            dates.push(date)
            startDate.setDate(startDate.getDate() + 1);
        }
    }

    filterTasks(date: string, projectId: string) {
        var filteredTaskArray = projectId == '' ? taskListArray : taskListArray.filter(function (value) {
            return value.project.id == projectId //filter  tasks based on projects
        })
        let filteredArray = filteredTaskArray.filter(function (value) {
            return new Date(value.taskDate).getDate() == new Date(date).getDate() //filter tasks based on selectedDate
        })
        this.setState({ data: filteredArray, selectedDate: date })
    }

    getPrviousWeek() {
        selectedIndex = 0 //set the selected date as previousWeek date
        this.fetchTaskList(this.state.previousWeekDate.toString())
    }

    getNextWeek() {
        selectedIndex = 0  //set the selected date as nextWeek date
        this.fetchTaskList(this.state.nextWeekDate.toString())
    }

    getPrevOrNextDayTasks(type: WeekType) {
        let date = dates[type == WeekType.Prev ? selectedIndex - 1 : selectedIndex + 1]
        let filterArray = dates.filter(function (value) {
            return new Date(date).getDate() == new Date(value).getDate()
        })
        if (filterArray.length > 0) {
            selectedIndex = type == WeekType.Prev ? selectedIndex - 1 : selectedIndex + 1
            this.filterTasks(date.toString(), this.state.projectId)
        }
    }

    async fetchProjects() {
        let response = await ProjectService.fetchProjectss()
        if (response.success) {
            this.setState({ projectsList: response.data })
        }
    }

    showProjectsList() {
        this.setState({ dialogVisible: true })
    }

    submitTaskButtonAction() {
        Alert.alert(
            'Jade',
            'All your tasks for the week will be submitted and cannot be edited',
            [ {text: 'Cancel'},{text: 'Submit', onPress: () => this.navigateToTaskSummary()}]);
    }

    navigateToTaskSummary() {
        var hours = 0
        var projectName = ''
        let weekInterval = this.state.weekInterval
        let id = this.state.projectId;
        let currentProject = taskListArray.filter(function (value) {
            return value.project.id == id 
        })
        currentProject.filter(function (value) {
            projectName = value.project.name
            hours += value.hour
        })
        if (hours == 0) {
             Alert.alert('You dont have any tasks to submit')
            return
        }
        let data: SummaryData = {projectName: projectName,week: weekInterval,submittedBy: 'Pranay Kumar',submittedTo: 'Sachin Nigam' ,hoursAllocated: hours, hoursPerformed: hours,}
        this.props.navigation.navigate('Summary', {data: data})
    }

    closeButtonAction() {
        this.setState({ dialogVisible: false })
    }

    viewTasksButtonAction(item: ProjectResponse) {
        this.filterTasks(this.state.selectedDate, item.id)
        this.setState({ dialogVisible: false, projectId: item.id })
    }

    refreshTaskList() {
        this.fetchTaskList(this.state.selectedDate); //Refresh task list when a new task is added
    }

    navigateToAddTaskScreen() {
        Constants.isDemoAddTask = false
        this.props.navigation.navigate('AddTask', { projectId: this.state.projectId })
    }
}