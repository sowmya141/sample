import React from 'react';
import {Button, View, Input, Card, Container,  Text, Icon, NativeBaseProvider, } from 'native-base';
import {Image, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions, ScrollView,StyleSheet} from 'react-native';
import AppColors from './AppColors';
import DepartmentService from '../APIManager/DepartmentService';
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-gesture-handler';
import {PostJobRequest} from '../../src/Models/Request/PostJobRequest'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {DepartmentModel} from '../Models/Response/DepartmentModel';
import { Account } from '../Models/Response/Account';
import Constants from '../Helpers/Constants';
import { formatDate, getHours, getMinutes } from '../Helpers/DateExtension';
import DatePicker from 'react-native-datepicker';


interface PostJobState {
  isLoading: Boolean,
  data: Array<DepartmentModel>,
  hospitalData: Array<Account>,
  numberOfHoursSpent: string,
  accountId: string,
  startDate: string,
  formattedStartDate: string,
  endDate: string,
  numberOfHours: string,
  jobDetailDescription: string,
  jobTitle: string,
  hospitalName: string,
  hospitalId: string,
  departmentId: string,
  departmentName: string,
  location: string,
  dialogVisible: boolean,
  taskStartHours: string,
  taskStartMinutes: string,
  taskStartTime: string,
  taskEndHours: string,
  taskEndMinutes: string,
  taskEndTime: string,
  imagePath: string,
  jobStartDate: Date,
  jobEndDate:Date,
}
interface AddTaskProps {
}
export default class PostJob extends React.Component<PostJobState,AddTaskProps> {

   constructor(props: PostJobState) {
      super(props);
      this.state = {
      isLoading: true,
      data: Array<DepartmentModel>(),
      hospitalData: Array<Account>(),
      numberOfHoursSpent: '',
      accountId:'',
      startDate: '',
      formattedStartDate: '',
      endDate: '',
      numberOfHours: '',
      hospitalName: '',
      hospitalId: '',
      jobDetailDescription: '',
      jobTitle: '',
      departmentId: '',
      departmentName: '',
      location: '',
      dialogVisible: false,
      taskStartHours: '',
      taskStartMinutes: '',
      taskStartTime: '',
      taskEndHours: '',
      taskEndMinutes: '',
      taskEndTime: '',
    }
    this.submitJobAction = this.submitJobAction.bind(this);
   }
  
    closeDialog() {
    this.setState({ dialogVisible: true })
    this.props.route.params.refreshData();
    this.props.navigation.navigate('Dashboard');
    }

    async submitJobAction() {
    if ((this.state.jobTitle.length ===0) || (this.state.departmentId.length === 0) || (this.state.startDate.length === 0) || (this.state.endDate.length === 0)) {
      Alert.alert("Error", Constants.postAJbobVacantMessage);
      return;
    }
    else{
      this.props.navigation.navigate('Home')
    }
    
    let request: PostJobRequest = {
      name: this.state.jobTitle,
      description: this.state.jobDetailDescription,
      accountId: this.state.hospitalId,
      departmentId: this.state.departmentId,
      startDate: this.state.jobStartDate,
      endDate: this.state.jobEndDate
    }

    let response = await DepartmentService.postAJob(request);
      if (response.success) {
        this.setState({ dialogVisible: true });
          setTimeout(() => {
                this.moveToDashboard();
            }, 2000);
            return;

          //   this.setState({isLoading: false})
          // if (response.success) {
          //     this.props.navigation.navigate('CheckOut',  {address: response.data.address, refreshData: this.refreshDashboard.bind(this)})
          //    return
          // }
          // console.log(response.data.address)
          // Alert.alert("Error", response.fieldErrors[0].errorMessage);
    }
    Alert.alert(Constants.error, response.errorMessage);
  }

moveToDashboard(){
  this.setState({ dialogVisible: true })
  this.closeDialog();
}

 async fetchAcountInfo() {
    let response = await DepartmentService.fetchAccount();
    if (response.success) {
         this.setState({
        hospitalData: response.data
      });
      return;
    }
  }
   
  async componentDidMount() {
    this.fetchAcountInfo();
    let response = await DepartmentService.fetchDepartments();
    if (response.success) {
      this.setState({
        isLoading: false,
        data: response.data
      });
      return;
    }
    Alert.alert('Error', response.errorMessage);
  }


  render() {
    
    let jobItems = this.state.data.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
    });

    let hospitals = this.state.hospitalData.map((s,i) => {
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
  
      
return (
<NativeBaseProvider>
  <View>
  <Dialog visible={(this.state.dialogVisible)}>
      <DialogContent>
        <View style={{ height: 200, width: Dimensions.get('window').width - 75 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', marginTop: 30 }}>
                  <Image source={require('../assets/whiteTick.png')} style={styles.dailogueimg}/>
              </View>
          </View>
          <Text style={styles.dailoguetxt}>{' '}{ 'Job Posted' }</Text>
       </View>
      </DialogContent>
    </Dialog>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Text style={styles.titletxt}>Job Title </Text>
        <View style={{ height: 40, marginLeft: 20, marginRight: 20 }}>
            <TextInput returnKeyType='next' 
            placeholder='Type a Title for the job being posted'
            onChangeText={(text) => this.setState({ jobTitle: text })} 
            style={styles.txtinput}></TextInput>
        </View>
      <Text style={styles.titletxt}>Name of the Hospital </Text>
      <View style={styles.pickerview}>
        <Picker mode="dropdown" selectedValue={this.state.hospitalName} 
                  onValueChange={(itemValue, itemPosition) => 
                    {this.setState({
                      hospitalName: itemValue,
                      hospitalId: String(itemValue.id),
                  });
                }}>  
            {hospitals}  
        </Picker> 
      </View>
      <Text style={styles.titletxt}>Details of the Job </Text>

    <View style={{ marginLeft: 20, marginRight: 20,padding:5}}>
      <TextInput style={{backgroundColor: AppColors.background, height: 140,}}
          onChangeText={(text) => this.setState({ jobDetailDescription: text })}
          returnKeyType='next'  
          multiline={true} 
          placeholder="Type a small brief of the job" 
          placeholderTextColor='#888'/>
    </View>

    <View style={{ height: 170, marginTop: 20, marginRight: 20, marginLeft: 20 ,flexDirection: 'row', backgroundColor: AppColors.transparent, }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1, width:'60%',marginVertical:7,bottom:17}}>
                <View style={{right:20}}>
                <Text style={styles.titletxt}> Select Department</Text>
                </View>

            <View style={{ height: 30, flex: 1,bottom:19 ,width:'95%'}}>
            <Picker 
                mode="dropdown" 
                  
                selectedValue={this.state.departmentName}
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({
                    departmentName: itemValue,
                    departmentId: String(itemValue.id),
                    location: itemValue.location
                  });
                }}
            >  
            {jobItems}
              </Picker> 
          
          </View>

        </View>
        <View style={{width:'40%',bottom:10}}>
          <Text style={styles.titletxt}> Hours </Text>
          <View style={{ height: 40, marginLeft: 20 }}>
          <TextInput keyboardType = 'numeric' returnKeyType='next' placeholder='Hours' onChangeText={(text) => this.setState({ numberOfHoursSpent: text })} style={styles.txtinput}></TextInput>
          </View>
        </View>

      </View>

    <View style={{flex:1}}>
      <View style={{right:20}}>
      <Text style={styles.titletxt}> Enter the Location </Text>
      </View>
    <View style={{marginLeft:0}}>
      <TextInput editable={false} returnKeyType='next' placeholder='Enter a Location' value = {this.state.location} onChangeText={(text) => this.setState({ location: text })} style={styles.txtinput}></TextInput>
    </View>
      </View>
      </View>

    </View>
    <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, marginTop: 10, height: 180, flexDirection: 'row', backgroundColor:  AppColors.transparent }}>

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

                  this.setState({ formattedStartDate: formatedDate, jobStartDate: date })
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
                    this.setState({ endDate: dateStr, jobEndDate: date })
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
                

    
        <View style={{ flex: 1, backgroundColor: AppColors.transparent, flexDirection: 'column' }}>
            <View style={{ flex: 1, backgroundColor: AppColors.transparent }}>
             <Text style={styles.titletxt}> Start Time</Text>
               <View style={{ flexDirection: 'row' }}>
                 <View style={{ marginRight: 5, width: 100, bottom: 10, }}>
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
          <View style={{ flex: 1, backgroundColor: AppColors.transparent }}>
            <Text style={styles.titletxt}> End Time</Text>
            <View style={{ flexDirection: 'row' }}>
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
    
    <View style={{ height: 40, marginTop: 20, marginRight: 20, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => this.submitJobAction()} style={{ backgroundColor: AppColors.pickerHeaderStyleColor, width: 120, justifyContent: 'center', alignItems: 'center', height: 40 }}>
        <Text style={{ color: AppColors.whiteTitle, fontSize: 14, fontWeight: '600' }}>Submit</Text>
      </Button>
    </View>
    </View>
    
</ScrollView>
  </View>
  </NativeBaseProvider>
)
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
container:{ flex: 1, 
  backgroundColor: AppColors.transparent, 
  marginTop: 20,
  marginBottom: 20,
  shadowColor: AppColors.shadowColor, 
  shadowOffset: { width: 0, height: 2, },
  shadowOpacity: 0.25, 
  shadowRadius: 3.84,
  elevation: 5 
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
    
})