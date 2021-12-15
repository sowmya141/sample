import React from 'react';
import {Button, View, Input, Card, Container,  Text, Icon, NativeBaseProvider, } from 'native-base';
import {Image, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions,StyleSheet} from 'react-native';
import AppColors from './AppColors';
import DepartmentService from '../APIManager/DepartmentService';
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-gesture-handler';
import { TaskType } from '../../src/Models/Response';
import Constants from '../Helpers/Constants';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

interface AddEmployeeState {
  choosenType: string,
  employeeName: string,
  educationTitle: string,
  dialogVisible: boolean,
  
}
export default class AddEmployee extends React.Component {

   constructor(props: AddEmployeeState) {
    super(props);
    this.state = {
      isLoading: true,
      data: Array<TaskType>(),
      choosenType: '',
      dialogVisible: false,
      employeeName: '',
      educationTitle: '',
     
    }
    this.submitTaskAction = this.submitTaskAction.bind(this);
  }
    async componentDidMount() {
    let response = await DepartmentService.fetchDepartments();
    if (response.success) {
      console.log('Finding response',response)
      this.setState({
        isLoading: false,
        data: response.data
      });
      
      return;
    }
    //Alert.alert('Error', response.errorMessage);
  }

  async submitTaskAction() {
    if ((this.state.employeeName.length ===0) || (this.state.educationTitle.length===0)) {
      Alert.alert("Error", Constants.addEmployeeVacantMessage);
      return;
    }
    else{
    
      this.props.navigation.navigate('Home')
    }
    this.closeDialog();
  }
  closeDialog() {
    //this.setState({ dialogVisible: true })
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    let typeItems = this.state.data.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s.name} />
    });
      return (
        <NativeBaseProvider>
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
       <Container>
        <View> 
           <View style={{ flex: 1, backgroundColor: AppColors.transparent, marginTop: 20, marginBottom: 20, 
           shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', height: 30, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
              Employee Name </Text>
            <View style={{ height: 40, marginLeft: 20, marginRight: 20, }}>
              <TextInput returnKeyType='next' placeholder='Type the name of the Employee' onChangeText={(text) => this.setState({ employeeName:text })} style={{ color: AppColors.blackTitle, fontSize: 15, backgroundColor: AppColors.background, height: 40, paddingLeft: 10 }}></TextInput>
            </View>
             <Text style={{ fontSize: 14, fontWeight: '700', height: 30, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
              Education </Text>
            <View style={{ height: 40, marginLeft: 20, marginRight: 20, }}>
              <TextInput returnKeyType='next' placeholder='Give the Title of the Degree acquired' onChangeText={(text) => this.setState({ educationTitle: text })} style={{ color: AppColors.blackTitle, fontSize: 15, backgroundColor: AppColors.background, height: 40, paddingLeft: 10 }}></TextInput>
            </View>
             <Text style={{ fontSize: 14, fontWeight: '700', height: 30, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
              Assign a Department </Text>
              
                  <View style={{ height: 30, flex: 1, width:'60%', marginLeft: 20, marginRight: 20, }}>
                  <Picker 
                        mode="dropdown" 
                         
                        selectedValue={this.state.choosenType}  
                        onValueChange={(itemValue) => 
                          {
                            this.setState({
                              choosenType: itemValue,
                              taskTypeId: String(itemValue.id)
                            });
                          }}  
                    >  
                    {typeItems}  
                     </Picker> 
                  </View>
                  
                  <View style={{ height: 40, marginLeft: 70, justifyContent: 'center', alignItems: 'center' }}>
                  <Button onPress={() => this.submitTaskAction()} style={{ backgroundColor: AppColors.pickerHeaderStyleColor, width: 120, justifyContent: 'center', alignItems: 'center', height: 40 ,}}>
                <Text style={{ color: AppColors.whiteTitle, fontSize: 14, fontWeight: '600' }}>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
         </Container>
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

})