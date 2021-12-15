import React, { Component } from 'react';
import { Container, Header, Content, Left, Title, Body, List } from 'native-base';
import { Alert } from 'react-native';
import EmployeeService from '../APIManager/EmployeeService';
import TaskService from '../APIManager/TaskService'
import EmployeeItem from './EmployeeItem';
import AppColors from './AppColors';

export default class EmployeeList extends Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            isLoading: true,
            data: null
        }
    }

    async componentDidMount() {

        let response = await EmployeeService.fetchEmployees()
        if (response.success) {
            this.setState({
                isLoading: false,
                data: response.data
            });
            return;
        }
        Alert.alert('Task Error', response.errorMessage);
    }
    render() {
        return (
            <Container style={{ backgroundColor: AppColors.background }}>
                <Content>
                    <List
                        dataArray={this.state.data}
                        renderRow={(item) => {
                            return <EmployeeItem data={item} />
                        }}
                    />
                </Content>
            </Container>
        );
    }
}