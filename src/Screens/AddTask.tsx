import React, { Component, useState } from 'react';
import { Container,   Icon,  Text, Button, NativeBaseProvider,  } from 'native-base';
import { Alert, StyleSheet, View, Image, Dimensions, Platform, ScrollView } from 'react-native';
import EmployeeService from '../APIManager/EmployeeService';
import TaskService from '../APIManager/TaskService'
import EmployeeItem from './EmployeeItem';
import { CreateTaskRequest } from '../../src/Models/Request';
import Constants from '../Helpers/Constants'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog'
import { formatDate, getHours, getMinutes } from '../Helpers/DateExtension';
import { TaskType } from '../../src/Models/Response';
import DatePicker from 'react-native-datepicker';
import AppColors from './AppColors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker,{ImageOrVideo} from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker'
import  ActionSheet from 'react-native-actionsheet'

interface AddTaskState {
  isLoading: Boolean,
  data: Array<TaskType>,
  startDate: string,
  formattedStartDate: string,
  endDate: string,
  numberOfHours: string,
  numberOfHoursSpent: string,
  taskDescription: string,
  taskName: string,
  taskTypeId: string,
  projectId: string,
  choosenType: string,
  dialogVisible: boolean,
  taskStartHours: string,
  taskStartMinutes: string,
  taskStartTime: string,
  taskEndHours: string,
  taskEndMinutes: string,
  taskEndTime: string,
  imagePath: string,
  selected:number,
  onChange?:(image:ImageOrVideo)=>void;
}
interface AddTaskProps {
}
const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];

export default class AddTask extends Component<AddTaskProps, AddTaskState>  {
 
   constructor(props: AddTaskProps) {
    super(props);
    this.state = {
      isLoading: true,
      data: Array<TaskType>(),
      startDate: "",
      formattedStartDate: '',
      endDate: "",
      numberOfHours: '',
      taskDescription: '',
      taskName: '',
      taskTypeId: '',
      projectId: this.props.route.params.projectId,
      choosenType: '',
      dialogVisible: false,
      numberOfHoursSpent: '',
      taskStartHours: '',
      taskStartMinutes: '',
      taskStartTime: '',
      taskEndHours: '',
      taskEndMinutes: '',
      taskEndTime: '',
      selected:1
    }
    this.submitTaskAction = this.submitTaskAction.bind(this);
  }

  closeDialog() {
    this.setState({ dialogVisible: false })
    if (Constants.isDemoAddTask) {
      this.props.navigation.navigate('JobDetail', { isTaskAdded: true })
      return
    }
    this.props.navigation.navigate('TaskList', { isTaskAdded: true })
  }

  async submitTaskAction() {
    if ((this.state.taskName.length == 0) || (this.state.numberOfHours.length == 0) || (this.state.taskTypeId.length == 0) || (this.state.formattedStartDate.length == 0)) {
      Alert.alert("Error", Constants.taskCreateVacantMessage);
      return;
    }
    let request: CreateTaskRequest = {
      taskName: this.state.taskName,
      taskTypeId: this.state.taskTypeId,
      hour: Number(this.state.numberOfHours),
      taskDate: this.state.formattedStartDate,
      projectId: this.state.projectId
    }
    let response = await TaskService.createTask(request);
    if (response.success) {
      this.setState({ dialogVisible: true })
      setTimeout(() => {
        this.closeDialog();
      }, 2000);
      return
    }
    Alert.alert("Error", response.errorMessage);
  }

  async componentDidMount() {
    let response = await TaskService.fetchTaskTypes();
    if (response.success) {
      this.setState({
        isLoading: false,
        data: response.data
      });
      return;
    }
    Alert.alert('Error', response.errorMessage);
  }

  onSelectedImage = (image) => {
    this.setState({ imagePath: image.path })
  };

  takePhotoFromCamera = () => {
    console.log("takePhotoFromCamera takePhotoFromCamera takePhotoFromCamera takePhotoFromCamera")
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    })
    .finally(close);
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.onSelectedImage(image);
      console.log(image);
    });
  };
  
  showActionSheet = () => this.actionSheet.show()
 
  getActionSheetRef = ref => (this.actionSheet = ref)
 



  onClickAddImage = (index) => {
   
     this.setState({selected:index})
    console.log('inside click method')
    console.log('index',index)
    if(index===0){
      console.log('index is 0',index)
      this.takePhotoFromCamera()
    }
   else if(index===1){
      console.log('index is 1',index)
      this.choosePhotoFromLibrary()
    }
    else{
      return
    }
    };

  render() {
    let typeItems = this.state.data.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
    });

    let pickHours = getHours().map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    let pickMinutes = getMinutes().map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    let timeVariations = ['AM', 'PM']
    let pickTime = timeVariations.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    let date = new Date();
    let month = date.getMonth() + 1
    const minDate = date.getDate() + "/" + month + "/" + date.getFullYear()
  
    const {taskImageStyle} = styles

    return (
      <NativeBaseProvider>
     
      <View>
      {this.state.dialogVisible ?
        <View style={{ height: Dimensions.get('window').height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: Dimensions.get('window').width }}>
            <Image source={require('../assets/whiteTick.png')} style={{ backgroundColor: AppColors.appThemeColor, borderRadius: 35, width: 70, height: 70, resizeMode: 'contain', alignSelf: 'center' }} />
            <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 20, color: AppColors.blackTitle, textAlign: 'center' }}>
              Task Submitted </Text>
          </View>
        </View> : null}
      
      <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: AppColors.addTaskBackgroundColor, marginTop: 20, marginBottom: 20, shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
          <TouchableOpacity  onPress={this.showActionSheet} style={{ height: 150, width: 150, justifyContent: 'center', alignSelf: 'center', borderColor: 'gray', borderWidth: 2}}>
                 { this.state.imagePath == null ?  <Image  source= {require('../assets/emptyImage.png')} style={taskImageStyle} /> : <Image source={{ uri: this.state.imagePath }} style={taskImageStyle} /> }
            </TouchableOpacity>
            <ActionSheet
              ref={this.getActionSheetRef}
              title={'Which one do you like ?'}
              options={BUTTONS}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={this.onClickAddImage}
            />
          <Text style={{ fontSize: 14, fontWeight: '700', height: 30, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
            Task Name </Text>
          <View style={{ height: 40, marginLeft: 20, marginRight: 20, }}>
            <TextInput returnKeyType='next' placeholder='Name' onChangeText={(text) => this.setState({ taskName: text })} style={{ color: AppColors.blackTitle, fontSize: 15, backgroundColor: AppColors.background, height: 40, paddingLeft: 10 }}></TextInput>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '700', height: 30, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
            Task Description </Text>

          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <TextInput returnKeyType='next' onChangeText={(text) => this.setState({ taskDescription: text })} rowSpan={5} bordeclear={true} placeholder="Give a small brief of the Task Performed" style={{ backgroundColor: AppColors.background, height: 80 }} />
          </View>

          <View style={{ height: 180, marginTop: 10, marginRight: 20, marginLeft: 20, flexDirection: 'row', backgroundColor: AppColors.transparent }}>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: AppColors.transparent }}>
              <View style={{ height: 30,padding:2 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', flex: 1 }}> Task Type </Text>
              </View>
              <View style={{ height: 30, marginRight:10, }}>
                <View style={{ height: 30, flex: 1 ,bottom:20,right:7}}>
                  <Picker  mode="dropdown"
                    selectedValue={this.state.choosenType}
                    onValueChange={(itemValue, itemPosition) => {
                      this.setState({
                        choosenType: itemValue,
                        taskTypeId: String(itemValue.id)
                      });
                    }}>
                    {typeItems}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: AppColors.transparent, }}>
              <View style={{ flex: 1, flexDirection: 'column', }}>
                <View style={{ height: 45 ,}}>
                  <Text style={{ fontSize: 14, fontWeight: '700', flex: 1 }}> No of Hrs Allocated</Text>
                </View>
                <View style={{ flex: 1,height: 40, backgroundColor: AppColors.transparent, paddingLeft: 2, paddingRight: 2 }}>
                  <View style={{ height: 40 }}>
                    <TextInput returnKeyType='next' onChangeText={(text) => this.setState({ numberOfHours: text })} style={{ color: AppColors.blackTitle, fontSize: 15, backgroundColor: AppColors.background, height: 40 }}></TextInput>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ height: 45 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', flex: 1 }}> No of Hrs Spent</Text>
                </View>
                <View style={{ flex: 1, height: 40, paddingLeft: 2, paddingRight: 2 }}>
                  <View style={{ height: 40 }}>
                    <TextInput returnKeyType='next' onChangeText={(text) => this.setState({ numberOfHoursSpent: text })} style={{ color: AppColors.blackTitle, fontSize: 15, backgroundColor: AppColors.background, height: 40, paddingLeft: 10 }}></TextInput>
                  </View>
                </View>
              </View>
            </View>

          </View>

          <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 10, height: 180, flexDirection: 'row', backgroundColor:  AppColors.transparent ,bottom:90}}>

  <View style={{ flex: 1, backgroundColor: AppColors.transparent }}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 14, fontWeight: '700', flex: 1 }}> Start Date</Text>
      <View style={{ flexDirection: 'row', flex: 1 }}>

        <View style={{ flex: 1, backgroundColor: AppColors.background, bottom: 10, height: 40, marginRight: 5 }}>
          <DatePicker
            style={{ flex: 1 }}
            mode="date"
            date={this.state.startDate} //The enum of date, datetime and time
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            minDate={minDate}
            iconSource={require('../Images/calendar.png')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={true}
            customStyles={{
              
                dateIcon: {
                marginTop: 5,
                marginRight: 1,
                width: 30,
                backgroundColor: AppColors.transparent,
                left:150
              },
              dateInput: {
                borderWidth: 0,
                backgroundColor: AppColors.background
              },
              datePicker: {
                backgroundColor: AppColors.pickerHeaderStyleColor
              }
            }}
            onDateChange={(dateStr, date) => {
              var formatedDate = formatDate(date.toDateString(), 0)

              this.setState({ formattedStartDate: formatedDate })
              this.setState({ startDate: dateStr })
            }}
          />
        </View>
        <Button  style={{ marginLeft: 5, marginTop: 1.5, bottom: 10, marginRight: 5 , backgroundColor: AppColors.transparent}}>
          <Icon name='' />
        </Button>
      </View>
    </View>
    <View style={{ backgroundColor: AppColors.transparent, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '700', flex: 1 }}> End Date</Text>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: AppColors.background, bottom: 10, height: 40, marginRight: 5 }}>
            <DatePicker
              style={{ flex: 1 }}
              date={this.state.endDate} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              minDate={this.state.startDate}
              iconSource={require('../Images/calendar.png')}

              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              customStyles={{
                
                dateInput: {
                  borderWidth: 0,
                  backgroundColor: AppColors.background
                },
                dateIcon: {
                  marginTop: 5,
                  marginRight: 1,
                  width: 30,
                  backgroundColor: AppColors.transparent,
                  left:150
                },
                datePicker: {
                  backgroundColor: AppColors.pickerHeaderStyleColor,
                }
              }}
              onDateChange={(dateStr, date) => {
                this.setState({ endDate: dateStr })
              }}
            />
          </View>
          <Button  style={{ backgroundColor: AppColors.transparent, marginLeft: 5, marginTop: 1.5, bottom: 10, marginRight: 5 }}>
            <Icon name='' />
          </Button>
        </View>
      </View>
    </View>
  </View>



  </View>



            
          
            <View style={{ flex: 1, backgroundColor: AppColors.transparent, flexDirection: 'column',bottom:120 }}>
            <View style={{ flex: 1, backgroundColor: AppColors.transparent }}>
             <Text style={styles.titletxt}> Start Time</Text>
               <View style={{ flexDirection: 'row' ,left:15}}>
                 <View style={{ marginRight: 15, width: 100, bottom: 10, }}>
                     <Picker mode="dropdown" selectedValue={this.state.taskStartHours}
                             onValueChange={(itemValue, itemPosition) => {
                             this.setState({ taskStartHours: itemValue }) }}>{pickHours}
                       </Picker> 
                  </View>
                 
                  <View style={{top:5}}>
                    <Text style={{fontWeight:'800'}}>:</Text>
                   </View> 
                  <View style={{ marginLeft: 5, marginRight: 5, width: 99, bottom: 10 }}>
                     <Picker 
                mode="dropdown" 
                  
                selectedValue={this.state.taskStartMinutes}
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({ taskStartMinutes: itemValue })
                }}>
                {pickMinutes}
              </Picker> 
              
            </View>
            <View style={{top:5}}>
                    <Text style={{fontWeight:'800'}}>:</Text>
                   </View> 
            <View style={{ marginLeft: 5, marginRight: 5, width: 105, bottom: 10 }}>
                
            <Picker 
                mode="dropdown" 
                  
                selectedValue={this.state.taskStartTime}
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({ taskStartTime: itemValue })
                }}>
                {pickTime}
              </Picker> 
              
            </View>
            
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: AppColors.transparent }}>
          <View style={{ flex: 1, backgroundColor: AppColors.transparent,bottom:10 }}>
            <Text style={styles.titletxt}> End Time</Text>
            <View style={{ flexDirection: 'row' ,left:15}}>
              <View style={{ marginRight: 5, width: 100, bottom: 10 }}>
              <Picker 
                mode="dropdown" 
                  
                selectedValue={this.state.taskEndHours}
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({ taskEndHours: itemValue })
                }}>
                {pickHours}
              </Picker> 
                
              </View>
              <View style={{top:5}}>
                    <Text style={{fontWeight:'800'}}>:</Text>
                   </View> 
              <View style={{ marginLeft: 5, marginRight: 5, width: 100, bottom: 10 }}>
              <Picker 
                mode="dropdown" 
                  
                selectedValue={this.state.taskEndMinutes}
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({ taskEndMinutes: itemValue })
                }}>
                {pickMinutes}
              </Picker> 
                
              </View>
              <View style={{top:5}}>
                    <Text style={{fontWeight:'800'}}>:</Text>
                   </View> 
              <View style={{ marginLeft: 5, marginRight: 5, width: 105, bottom: 10 }}>
              <Picker 
                mode="dropdown" 
                  
                selectedValue={this.state.taskEndTime}
                  onValueChange={(itemValue, itemPosition) => {
                    this.setState({ taskEndTime: itemValue })
                  }}>
                  {pickTime}
              </Picker> 
                
              </View>
            </View>
          </View>
        </View>
      </View>





          <View style={{ height: 40, marginTop: 20, marginRight: 20, marginLeft: 20, justifyContent: 'center', alignItems: 'center',bottom:100 }}>
            <Button onPress={() => this.submitTaskAction()} style={{ backgroundColor: AppColors.pickerHeaderStyleColor, width: 120, justifyContent: 'center', alignItems: 'center', height: 40 }}>
              <Text style={{ color: AppColors.whiteTitle, fontSize: 14, fontWeight: '600' }}>Submit</Text>
            </Button>
          </View>
        </View>
        </ScrollView>
      </View>
    </View>

   
    </NativeBaseProvider>
     );
  }
}

const styles=StyleSheet.create({
  dailogueimg:{
    backgroundColor: AppColors.pickerHeaderStyleColor,
    borderRadius: 35,
    width: 70,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
dailoguetxt:{
  marginTop: 30,
  width: '100%',
  textAlign: 'center',
  fontSize: 20,
},
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 50,
  padding: 16
},
  titletxt:{ 
    fontSize: 14,
     fontWeight: '700', 
     height: 30,
      marginLeft: 20,
      marginRight: 20,
     marginTop: 10
    },
  pickerview:{
     height: 30,
     marginLeft: 15, 
     marginRight: 20 ,
     bottom:15,
     width:300
    },
    txtinput:
      { color: AppColors.blackTitle, fontSize: 15, backgroundColor: AppColors.background, height: 40, paddingLeft: 10 }
    ,
    taskImageStyle: {
      resizeMode: 'cover', alignSelf: 'center', height: 150, width: 150, borderRadius: 5
   }
})