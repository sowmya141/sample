import axios from 'axios'
import APIEndpoints from './APIEndpoints';
import { ModelResponse, User } from 'src/Models/Response';
import Constants from '../Helpers/Constants'

export default class EmployeeService {
    public static fetchEmployees = async(): Promise<ModelResponse<Array<User>>>  => {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.get<ModelResponse<Array<User>>>(APIEndpoints.baseUrl + APIEndpoints.employeeListUrl)
    return response.data;
    } 
}