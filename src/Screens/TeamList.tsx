import React, { Component } from 'react';
import { Container,  Text,  View,  NativeBaseProvider, ScrollView} from 'native-base';
import {FlatList, } from 'react-native';

import TeamItem from './TeamItem';
import Constants from '../Helpers/Constants'
import AppColors from './AppColors';
interface TeamListState {
    isLoading: boolean,
    data: []
}

interface TeamListProps {
}

export default class TeamList extends Component<TeamListProps, TeamListState>  {

    constructor(props: TeamListProps) {
        super(props);
        this.state = {
            isLoading: false,
            data: []
        }
    }

    async componentDidMount() {
        this.setState({data: Constants.Teams})
    }

    render() {
        return (
            <NativeBaseProvider>
              
                 <View
          style={{
            height: 120,
            backgroundColor: AppColors.appThemeColor,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              marginLeft: 13,
              marginBottom: 8,
              color: AppColors.whiteTitle,
              fontSize: 24,
              textAlign: 'center',
              fontWeight: '800',
              height:30
            }}>
            Team View
          </Text>          
        </View>
                <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => {
                            return <TeamItem navigation={this.props.navigation}
                             data={item} />
                        }
                        } />
          
          
            </NativeBaseProvider>
        );
    }
}