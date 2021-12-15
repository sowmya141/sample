import axios from 'axios'
import APIEndpoints from './APIEndpoints';
import { ModelResponse, Task, TaskType, CreateTaskResponse } from '../../src/Models/Response';
import { CreateTaskRequest, GetTaskListRequest } from '../Models/Request';
import Constants from '../Helpers/Constants'
import { Alert } from 'react-native';

export default class TaskService {
    public static async fetchTasks(getTaskListReqiest:GetTaskListRequest): Promise<ModelResponse<Task>> {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
        let response = await axios.post<ModelResponse<Task>>(APIEndpoints.baseUrl + APIEndpoints.taskList, getTaskListReqiest)
      // let url =APIEndpoints.baseUrl + APIEndpoints.taskList
        console.log('FetchTashUrl:',(APIEndpoints.baseUrl + APIEndpoints.taskList))
        console.log('FetchTak:',response)
        return response.data;
    }

    public static async createTask(createTaskRequest: CreateTaskRequest): Promise<ModelResponse<CreateTaskResponse>> {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
        let response = await axios.post<ModelResponse<CreateTaskResponse>>(APIEndpoints.baseUrl + APIEndpoints.createTask, createTaskRequest)
        return response.data;
    }

    public static fetchTaskTypes = async (): Promise<ModelResponse<Array<TaskType>>> => {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
        let response = await axios.get<ModelResponse<Array<TaskType>>>(APIEndpoints.baseUrl + APIEndpoints.taskTypeList)
        let url =(APIEndpoints.baseUrl + APIEndpoints.taskList)
        console.log('FetchTaskTypeUrl:',url)
        console.log('FetchTaskTyperesponse:',response)
        return response.data;
    }
}