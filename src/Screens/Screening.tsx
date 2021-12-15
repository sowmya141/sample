import React from 'react';
import { Container, Text,  NativeBaseProvider, } from 'native-base';

import { Alert, StyleSheet, View, Image, Dimensions, Platform, TouchableOpacity, FlatList } from 'react-native';
import ChatBubble from './ChatBubble';
import Constants from '../Helpers/Constants'
import AppColors from './AppColors';

interface ScreeningState {
    dialogVisible: boolean,
    confirmedScreening: boolean,
    screeningCompleted: boolean,
    isLoading: boolean,
    questionButtonSelected: boolean,
    firstSelection: boolean,
    secondSelection: boolean,
    data: [],
    answerSelectedAction:boolean
}
let screeningList = [];
export default class Screening extends React.Component {
  
  constructor(props: ScreeningState) {
    super(props);
    
    this.state = {
      isLoading: false,
      questionButtonSelected: false,
      firstSelection: false,
      secondSelection: false,
      data: screeningList
    }
  }

componentWillUnmount() {
    screeningList = []; 
   //  this.setState({ data:  screeningList, firstSelection: false, secondSelection: false})
 }


componentWillMount(){
    screeningList = []; 
   Constants.screening.forEach(element => {
      element.answerSelectedAction = false
   screeningList.push(element);
   
   });
   this.setState({ data:  screeningList, firstSelection: false, secondSelection: false})
  }

  answerSelectedAction(parentDatavalue: any, questionData:any) {
    parentDatavalue.answerSelectedAction = !parentDatavalue.answerSelectedAction
  
      if (questionData.name == 'Proceed') {
         screeningList = [];
        this.setState({ data:  screeningList, firstSelection: false, secondSelection: false})
        this.props.route.params.refreshData();
        this.props.navigation.goBack();
        return;
      }

     if (!this.state.firstSelection) {
          let freshResponsedata = {
              id:4,
              answerSelectionStatus: true,
              newSelectionStatus: true,
              answer:questionData.name
            }
            screeningList.push(freshResponsedata)
            this.setState({ firstSelection: true, secondSelection: false })

           let newItem =  {
                    id:5,
                    message: 'From how long have you had difficulty in Breathing?',
                    qustions: [ 
                                {
                                  name: 'More than 1 week',
                                  id: 'qwerty8',
                                },
                                {
                                  name: 'More than 2 week',
                                  id: 'qwerty9',
                                },
                                {
                                  name: 'More than 3 week',
                                  id: 'qwerty10',
                                },
                                {
                                  name: 'None of the Above',
                                  id: 'qwerty11',
                                }],
                                  answerSelectionStatus: false,
                                  newSelectionStatus: false,
                                  answer:''
                }

               screeningList.push(newItem)
       return;
     }


     if (!this.state.secondSelection)
     {

       let freshResponsedata = {
              id:6,
              answerSelectionStatus: true,
              newSelectionStatus: true,
              answer:questionData.name
        }

      screeningList.push(freshResponsedata)

      this.setState({ secondSelection: true, firstSelection: true })

                let secondItem =  {
                  id:7,
                  message: 'You might have a fair threat for traeting +ve for Covid - 19. Consult a doctor immediatley',
                  qustions: [],
                  answerSelectionStatus: false,
                  newSelectionStatus: false,
                  answer:''
                 };

              screeningList.push(secondItem);

                 let lastItem =  {
                     id:8,
                     message: 'You are done with your Screening. You can click on Proceed to cotinue',
                     qustions: [
                      {
                       name: 'Proceed',
                       id: 'qwerty12',
                       },
                     ],
                     answerSelectionStatus: false,
                     newSelectionStatus: false,
                     answer:''
                     };
               screeningList.push(lastItem);
     }   

    }

  render(){
    return(
      <NativeBaseProvider>
      
       <View>
         <FlatList  style={{marginTop:20}}
                    data={this.state.data} 
                    renderItem={({ item: parentData })  => 
                   <View>
                     <Text>
                       Welcome!!!
                     </Text>
                   </View>
                        }
                >
             </FlatList>  
       </View>
      
      </NativeBaseProvider>
    )
  }
}
 