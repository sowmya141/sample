import React from 'react'
import {View, Text, Image, Alert} from 'react-native'
import { Button} from 'native-base'
import { FlatList } from 'react-native-gesture-handler'
import {SummaryData} from '../Models/Response/SummaryData'
import AppColors from './AppColors';
interface TaskSummaryState {
    data: Array<SummaryData>
}
interface TaskSummaryProps {

}
export default class TaskSummary extends React.Component<TaskSummaryProps,TaskSummaryState> {
    constructor(props :TaskSummaryProps) {
        super(props)
        this.state = {
            data: Array<SummaryData>()
        }
        this.navigateToDashboard = this.navigateToDashboard.bind(this)
    }

    componentDidMount() {
        this.getTaskSummary()
    }
    
    render() {
        const {headerStyle} = styles
        return (
            <View style = {{flex: 1, justifyContent: 'flex-start'}}>
                <Text style = {{color: AppColors.blackTitle, textAlign: 'center', fontWeight: '600', fontSize: 20, marginTop: 20}}> Your Weekly Task Summary</Text>
                <View style={{ marginBottom: 125, marginTop: 20 }}>
                <FlatList
                            data={this.state.data}
                            renderItem={({ item, index }) =>
                                    <View style={{ height: 175, flexDirection: 'row', shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5, marginLeft: 12, marginRight: 12, marginTop: 12 }}>
                                    <View style={{ backgroundColor: AppColors.checkoutCellBackground, width: 90, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', color: AppColors.dateBackground, fontSize: 50, fontWeight: 'bold' }}> {item.projectName.substring(0,1)}</Text>
                                    </View>
                                        <View style={{flex: 1, marginLeft: 8}}>
                                            <Text style={{fontSize: 14, marginTop: 8, fontWeight: '600'}}>{item.projectName}</Text>
                                            <Text style={{fontSize: 14, marginTop: 8, fontWeight: '600'}}>Week: {item.week} </Text>
                                            <View style = {{flexDirection: 'row', marginTop: 8}}>
                                                <Text style = {{ width: '50%', fontWeight: '600', fontSize: 14}}>Submitted By:</Text>
                                                <Text style = {{fontWeight: '600', fontSize: 14}}>Submitted To:</Text>
                                             </View>
                                             <View style = {{flexDirection: 'row', marginTop: 5}}>
                                             <Image source={require('../assets/logo.png')}   style={{width: 30, height: 30, borderRadius:15, resizeMode: 'contain', borderColor: AppColors.blackTitle, borderWidth: 1}} />
                                                <Text style = {{fontWeight: '600', fontSize: 14, color: AppColors.grayTitle, margin: 8}}>{item.submittedBy}</Text>
                                                <Image source={require('../assets/logo.png')}   style={{width: 30, height: 30, borderRadius:15, resizeMode: 'contain', borderWidth: 1, borderColor:AppColors.blackTitle }} />
                                                <Text style = {{fontWeight: '600', fontSize: 14, color: AppColors.grayTitle, margin: 8}}>{item.submittedTo}</Text>
                                             </View>
                                            <Text style={{fontSize: 14, marginTop: 8, fontWeight: '600'}}>Total No.of Hours Allocated: {item.hoursAllocated} hours </Text>
                                            <Text style={{fontSize: 14, marginTop: 8, fontWeight: '600'}}>Total No.of Hours Performed: {item.hoursPerformed} hours </Text>
                                    </View>
                                </View>
                             } />
                             </View>
                             <View style = {{position: 'absolute', bottom: 0,height: 75,width: '100%', justifyContent: 'center', alignItems: 'center', shadowColor: AppColors.shadowColor, shadowOpacity: 0.25, shadowRadius: 5, elevation: 5}}>
                                 <Button style = {{justifyContent: 'center', backgroundColor: AppColors.contentBackground, width: '45%'}} onPress={this.navigateToDashboard}>
                                     <Text style = {{textAlign: 'center',color: AppColors.whiteTitle, fontSize: 16, fontWeight: '600'}}>Back to Home</Text>
                                     </Button>
                            </View>
            </View>
        )
    }

    getTaskSummary() {
        let data: SummaryData = this.props.route.params.data
        var array: SummaryData[] =  [data]
        this.setState({data:array})
    }

    navigateToDashboard() {
        this.props.navigation.navigate('Home')
    }
}
const styles = {
    headerStyle:  {
        fontSize: 14, marginTop: 8, fontWeight: '600'
    }
}