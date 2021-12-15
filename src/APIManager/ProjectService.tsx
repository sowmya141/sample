import axios from 'axios'
import APIEndpoints from './APIEndpoints';
import { ModelResponse, ProjectResponse } from '../../src/Models/Response';
import Constants from '../Helpers/Constants'
import {DeviceTokenRequest} from '../Models/Request/DeviceTokenRequest'
import {DeviceTokenUploadResponse} from '../Models/Response/DeviceTokenUploadResponse'

export default class ProjectService {
    public static fetchProjectss = async(): Promise<ModelResponse<Array<ProjectResponse>>>  => {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.get<ModelResponse<Array<ProjectResponse>>>(APIEndpoints.baseUrl + APIEndpoints.projectList)
    console.log("responseivedata:",response.data)
    return response.data;
    } 

     public static async uploadDeviceToken(request: DeviceTokenRequest): Promise<ModelResponse<DeviceTokenUploadResponse>>  {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
        let response = await axios.post<ModelResponse<DeviceTokenUploadResponse>>(APIEndpoints.baseUrl + APIEndpoints.uploadDeviceToken, request)
        return response.data;
   }
}