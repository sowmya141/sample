import React from 'react'
import {View, Image, Alert, FlatList, Dimensions} from 'react-native'
import{Text} from 'native-base'
import {getDay, getDateSuffix, getTime} from '../Helpers/DateExtension'
import AppColors from './AppColors';
import { Job } from 'src/Models/Response';
import Constants from '../Helpers/Constants';

interface DemoActiveJobSummaryState {
    openJobs: Array<Job>;
}

interface DemoActiveJobSummaryProps {
    
}

export default class DemoActiveJobSummary extends React.Component<DemoActiveJobSummaryProps,DemoActiveJobSummaryState> {
    constructor(props: DemoActiveJobSummaryProps) {
        super(props);
        this.state = {
            openJobs: Array<Job>(),
        };
    }

    componentDidMount() {
        Constants.isDemoTaskView = false;
        let jobs: Job[] = [
            {
                id: '123',
                name: 'Emergency department.',
                description: 'xyz',
                departmentId: 'qwerty123',
                departmentName: 'Cardiology',
                location:
                    '111, West of Chord Road Opp Rajajinagar, 1st Block, Junction, Bengaluru, Karnataka 560086',
                lat: '12.9177',
                lon: '77.6238',
                startDate: new Date(),
                endDate: new Date()
            },
            {
                id: '123',
                name: 'Emergency department.',
                description: 'xyz',
                departmentId: 'qwerty123',
                departmentName: 'Cardiology',
                location:
                    '111, West of Chord Road Opp Rajajinagar, 1st Block, Junction, Bengaluru, Karnataka 560086',
                lat: '12.9177',
                lon: '77.6238',
                startDate: new Date(),
                endDate: new Date()
            }
        ];
        this.setState({ openJobs: jobs });
    }

    render() {
        const {viewStyle} = styles
          return (
              <View style = {viewStyle}>
                  <View style={{ marginBottom: 100 }}>
                                    <FlatList
                                        data={this.state.openJobs}
                                        renderItem={({ item, index }) => (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    width: Dimensions.get('window').width,
                                                    flexDirection: 'row',
                                                    marginTop: 8,
                                                    marginBottom: 8,
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: AppColors.whiteTitle,
                                                        width: 30,
                                                        height: 50,
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                        borderRadius: 4,
                                                        margin: 12,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 20,
                                                            marginTop: 8,
                                                            textAlign: 'center',
                                                        }}>
                                                        17{' '}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            marginTop: 2,
                                                            textAlign: 'center',
                                                        }}>
                                                        Mon{' '}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-evenly',
                                                            backgroundColor: AppColors.whiteTitle,
                                                            height: 30,
                                                            marginTop: 8,
                                                            borderRadius: 4,
                                                        }}>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                                            Started Work
                          </Text>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                                            10:00 AM
                          </Text>
                                                    </View>
                                                    <Text style={{ fontSize: 12, marginTop: 8 }}>
                                                        1-21C, Radham Bazar, Tarlupadu, Prakasam district,
                                                        Andhars pradesh, India, 523332
                        </Text>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-evenly',
                                                            backgroundColor: AppColors.whiteTitle,
                                                            height: 30,
                                                            marginTop: 8,
                                                            borderRadius: 4,
                                                            marginRight: 8
                                                        }}>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                                            Checked Out
                          </Text>
                                                        <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                                            10:00 AM
                          </Text>
                                                    </View>
                                                    <Text style={{ fontSize: 12, marginTop: 8 }}>
                                                        1-21C, Radham Bazar, Tarlupadu, Prakasam district,
                                                        Andhars pradesh, India, 523332
                        </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        backgroundColor: AppColors.pickerHeaderStyleColor,
                                                        width: 80,
                                                        borderRadius: 5,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginRight: 20,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: AppColors.whiteTitle,
                                                            textAlign: 'center',
                                                        }}>
                                                        Total Hrs
                        </Text>
                                                    <Text
                                                        style={{
                                                            color: AppColors.whiteTitle,
                                                            marginTop: 5,
                                                            textAlign: 'center',
                                                        }}>
                                                        4hrs 15 min
                        </Text>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
              </View>
        );
      }

    }
    
    const styles = {
      viewStyle: {
        flex: 1,
        backgroundColor: AppColors.background,
        flexDirection: 'column'
      }
    }