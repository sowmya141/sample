import React from 'react'
import {View, Alert, TouchableOpacity, FlatList, Image, Dimensions,StyleSheet,Text} from 'react-native'
import {  Button, Spinner, NativeBaseProvider } from 'native-base'
import HealthService from '../APIManager/HealthService'
import {HealthQuestionResponse} from '../Models/Response'
import {HealthAnswersData} from '../Models/Request'

import Profile from './Profile'
import {OptionType} from '../Enums/OptionType'
import Dialog, { DialogFooter, DialogButton, DialogContent, ScaleAnimation, SlideAnimation } from 'react-native-popup-dialog'
import AppColors from './AppColors';

interface HealthFeedbackState {
    datasource: HealthQuestionResponse[],
    answersData: HealthAnswersData[],
    isLoading: boolean,
    dialogVisible: boolean,
    selectedIndex: number
  }

  interface HealthFeedbackProps{
  
  }
var answersArray = Array<HealthAnswersData>()
export default class HealthFeedback extends React.Component<HealthFeedbackProps, HealthFeedbackState> {
  
  componentDidMount() {
    console.log('ComponentDidMount Called')
      this.getHealthQuestions()
     
    }
    constructor(props: HealthFeedbackProps) {
        super(props)
        this.state =  {
            datasource : Array<HealthQuestionResponse>(),
            answersData: Array<HealthAnswersData>(),
            isLoading: false,
            dialogVisible: true,
            selectedIndex: 0
        }
        this.sendHealthUpdate = this.sendHealthUpdate.bind(this)
        this.yesOrNoButtonAction = this.yesOrNoButtonAction.bind(this)
      }
    render() 
    {
       
        return(
        
                <View style = {{flex: 1, backgroundColor: AppColors.background}}>
                    <Image source={require('../assets/health_bg.png')}style = {{resizeMode:'contain', height: '100%', width: '100%'}}/>
                    <Dialog visible={this.state.dialogVisible} dialogAnimation={new SlideAnimation({slideFrom:'bottom'})}>
                        <DialogContent>
                            <View style = {{width: Dimensions.get('window').width - 75, height: 275}}>
                            {              
                                this.state.isLoading && 
                                <View style={{position: 'absolute', left: 0, right: 0,top:0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
                                   
                               </View>
                            }
                                <View style = {{alignItems: 'flex-end'}}>
                                <TouchableOpacity onPress={()=>this.closeButtonAction()}>
                                {
                                    !this.state.isLoading && <Image source={require('../assets/close.png')}style = {{marginTop: 25,resizeMode:'contain', height: 35, width: 35}}/>
                                }
                                </TouchableOpacity>
                                    </View>
                                         <Text style = {{marginTop: 20, marginLeft: 20, fontSize: 15, marginBottom: 20}}> Please give an answer by selecting "YES" or "NO"</Text> 
                                        {this.state.datasource.length > 0 ?
                                            <View style = {{marginTop: 25, height: 200}}>
                                                <View style={{flexDirection:'row' }}>
                                                <Text style = {{marginLeft: 10, fontSize: 15, fontWeight: '500'}}> {this.state.selectedIndex + 1}. </Text> 
                                                <Text  numberOfLines={0} ellipsizeMode='tail' style = {{fontSize: 15, fontWeight: '500', width:'94%'}}>{this.state.datasource[this.state.selectedIndex].question}</Text> 
                                                </View>
                                          
                                            <View style = {{flexDirection: "row", justifyContent: 'space-evenly', marginTop: 50}}>
                                            <Button  style = { this.state.answersData[this.state.selectedIndex].questionId == ''  ? styles.buttonSelectedStyle :
                                             this.state.answersData[this.state.selectedIndex].answer == true ? styles.buttonSelectedStyle : styles.buttonSelectedStyle} onPress={ () => this.yesOrNoButtonAction(this.state.selectedIndex, OptionType.Yes)}>
                                            <Text style = { this.state.answersData[this.state.selectedIndex].questionId == ''  ? styles.textUnselectedStyle : this.state.answersData[this.state.selectedIndex].answer == true ? styles.textSelectedStyle : styles.textUnselectedStyle}>YES</Text>
                                            </Button>
                                            <Button  style = { this.state.answersData[this.state.selectedIndex].questionId == ''  ? styles.buttonUnselectedStyle : this.state.answersData[this.state.selectedIndex].answer == false ? styles.buttonSelectedStyle : 
                                            styles.buttonUnselectedStyle} onPress = { () => this.yesOrNoButtonAction(this.state.selectedIndex, OptionType.No)} >
                                            <Text style = { this.state.answersData[this.state.selectedIndex].questionId == ''  ? styles.textUnselectedStyle : this.state.answersData[this.state.selectedIndex].answer == false ? styles.textSelectedStyle : styles.textUnselectedStyle}>NO</Text>
                                            </Button>
                                            </View>
                                            
                                            <Text style = {{textAlign :'center', position: 'absolute', bottom: 10, left: 0, right: 0}}> {this.state.selectedIndex + 1}/{this.state.datasource.length}</Text>
                                        </View> : null }
                                </View>
                            </DialogContent>
                    </Dialog>
                </View>
            
        )
    }
    
    async getHealthQuestions() {
        this.setState({isLoading: true})
        let response = await HealthService.getHealthQuestions()
        console.log('Response of GetHealthQuestion')
        console.log('QuestionData',response.data.questionData)
        this.setState({isLoading: false})
        if (response.success) {
            answersArray = response.data.questionData.map(function(question) {
                return {questionId: '', answer: false}
            })
            this.setState({answersData: answersArray,datasource: response.data.questionData, selectedIndex: 0})
            return
        }
        Alert.alert(response.errorMessage)
    }

    async sendHealthUpdate() {
        this.setState({isLoading: true})
        let request: HealthAnswersData = {answerdata:answersArray}
        let response = await HealthService.SendHealthUpdate(request)
        this.setState({isLoading: false})
        if (response.success) {
            Alert.alert(
                'Jade',
                'Thank you for submitting your health update',
                [ {text: 'OK', onPress: () => this.closeButtonAction()}]);
            return
        }
        Alert.alert("Error", response.errorMessage)
    }

    yesOrNoButtonAction(index: number, type: OptionType) {
        answersArray[index] = {questionId: this.state.datasource[index].id, answer: type == OptionType.Yes ? true : false}
        this.setState({answersData: answersArray})
        if (index == this.state.datasource.length - 1) {
            this.sendHealthUpdate()
            return
        }
        this.setState({dialogVisible: false})
        setTimeout(() => {this.scrollToIndex(index)}, 500);
    }


    closeButtonAction() {
        this.setState({dialogVisible:false})
        this.props.navigation.goBack();
    }

    scrollToIndex(index: number) {
        this.setState({dialogVisible: true, selectedIndex: index + 1})
    } 
}
    const styles = StyleSheet.create({
        viewStyle: {
          flex: 1,backgroundColor: AppColors.background,flexDirection: 'column'
      },
      buttonSelectedStyle: {
        backgroundColor: AppColors.appThemeColor, width: 120, height:  40 ,borderColor: AppColors.appThemeColor, shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, textAlign:'center', alignItems: 'center',
        justifyContent: 'center'
      },
      buttonUnselectedStyle: {
        backgroundColor: AppColors.background, width: 120, height:  40 ,borderColor: AppColors.backgroundGray, shadowColor: AppColors.shadowColor, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,textAlign:'center', alignItems: 'center',
        justifyContent: 'center'
      },
      textSelectedStyle: {
        color: AppColors.whiteTitle, fontSize: 16
      },
      textUnselectedStyle: {
        color: AppColors.blackTitle, fontSize: 16
      }
})