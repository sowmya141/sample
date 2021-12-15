import React, { Component } from 'react';
import { View, Text, CardItem, Button, Content, Title, Body, ListItem, Card } from 'native-base';
import { ListView, Alert, TouchableOpacity, FlatList, Dimensions, Image, StyleSheet } from 'react-native';
import { getDay, getDateSuffix } from '../Helpers/DateExtension';
import AppColors from './AppColors';
import Constants from '../Helpers/Constants';

export default class ChatBubble extends Component {
    data: any;
    navigation: any;
    selectedData: string
    selectedButton: true
    questionButtonSelected: false
    constructor(props) {
        super(props);
        this.data = props.data;
        this.navigation = props.navigation
        this.state = {
             selectedButton: true,
             questionButtonSelected: false,
             selectedData: ''
        }
    }

    numberOfÇolumn = 3

    function refreshPage() {
    window.location.reload(false);
  }
    
    answerSelectedAction(title: string) {
     
     // this.data.answerSelectionStatus = true
      //this.data.answer = title
      this.state({questionButtonSelected: true})
      
      questionButtonSelected = true
      let freshResponsedata = {
          answerSelectionStatus: true,
           answer:title
      }
      Constants.screening.push(freshResponsedata)
      refreshPage()
     // this.setState({ selectedData: title})
    }

    render() {
        return (
        <View style={{flexDirection:'row', marginBottom: 5, marginTop:20}}>
           { !this.data.answerSelectionStatus ?
            <View style={{flex:1}}>
              <View style={{ flex:1,justifyContent:'center', alignItems:'center', justifyContent:'center', backgroundColor:AppColors.pickerHeaderStyleColor, borderBottomRightRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10, minHeight:60, marginRight:80, marginLeft:20 }}>
                 <Text style={{paddding:20, color:'white', textAlign:'center', fontSize: 14, fontWeight: '400'}}> {this.data.message}</Text>
              </View>
              { !this.data.answerSelectionStatus ? &&  !this.state.questionButtonSelected
               <View style={{ marginLeft:20, marginTop:20, flex:1, marginRight:20  }}>
                    <FlatList
                      style={{ margin: 0, padding: 0, borderWidth: 0 }} 
                      numColumns={this.numberOfÇolumn}
                      data={this.data.qustions}
                      renderItem={({ item, index }) =>
                       
                        <Button style={{ margin:5, backgroundColor:"#add8e6"}} onPress = {this.answerSelectedAction.bind(this, item.name)}>
                          <Text style={styles.title}>{item.name}</Text>
                        </Button> 
                       
                        } />
              </View>
              : null }
            
            </View>

            :
            
             <View style={{ flex:1,  flexDirection: 'column', width: 'auto' ,justifyContent:'center', minHeight:60,marginLeft:150, marginRight:20, backgroundColor:AppColors.backgroundGray, borderBottomLeftRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10}}>    
            <Text style={{paddding:20, color:'white', textAlign:'center', fontSize: 14, fontWeight: '400'}}> {this.data.answer} </Text>
            </View> 
            }
           </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        color: AppColors.black
    },
});