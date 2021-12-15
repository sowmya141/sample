import axios from 'axios'
import APIEndpoints from '../APIManager/APIEndpoints';
import { ModelResponse, } from '../../src/Models/Response';
import { DepartmentModel} from '../Models/Response/DepartmentModel'
import {PostJobRequest} from '../Models/Request/PostJobRequest';
import Constants from '../Helpers/Constants';

export default class DepartmentService {
    
    public static fetchDepartments = async(): Promise<ModelResponse<Array<DepartmentModel>>>  => {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.get<ModelResponse<Array<DepartmentModel>>>(APIEndpoints.baseUrl + APIEndpoints.getDepartments)
    let Depturl=(APIEndpoints.baseUrl + APIEndpoints.getDepartments)
    console.log('fetchDepartments Url',(APIEndpoints.baseUrl ));
    console.log('fetchDepartments',response);
    return response.data;
    } 

    public static fetchAccount = async(): Promise<ModelResponse<Array<AccountResponse>>>  => {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.get<ModelResponse<Array<AccountResponse>>>(APIEndpoints.baseUrl + APIEndpoints.accountInfo)
    let Url=(APIEndpoints.baseUrl + APIEndpoints.accountInfo)
    console.log('FetchAccount Url',Url);
    console.log('FetchAccount',response);
    return response.data;
    } 

    public static async postAJob(postJobRequest: PostJobRequest): Promise<ModelResponse<DepartmentModel>> {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.post<ModelResponse<DepartmentModel>>(APIEndpoints.baseUrl + APIEndpoints.posAJob, postJobRequest)
    let Url=(APIEndpoints.baseUrl + APIEndpoints.posAJob)
    console.log('PostJob Url',Url);
    console.log('PostJob Response',response);
    console.log('PostJob Request',postJobRequest);
    return response.data;
    }
}