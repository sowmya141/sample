import axios from 'axios';
import APIEndpoints from './APIEndpoints';
import { ModelResponse, Job } from '../../src/Models/Response';
import { JobRequest } from '../Models/Request/JobRequest'
import Constants from '../Helpers/Constants';

export default class JobServices {
    public static async getOpenJobs(): Promise<ModelResponse<Array<Job>>> {
        axios.defaults.headers.common.Authorization = Constants.authenticationToken;
        let response = await axios.get<ModelResponse<Array<Job>>>(
            APIEndpoints.baseUrl + APIEndpoints.getJobs);
        return response.data;
    };

    public static async getActiveJob(): Promise<ModelResponse<Array<Job>>> {
        axios.defaults.headers.common.Authorization = Constants.authenticationToken;
        let response = await axios.get<ModelResponse<Array<Job>>>(
            APIEndpoints.baseUrl + APIEndpoints.getActiveJob);
        return response.data;
    };

    public static async allocateJob(request: JobRequest): Promise<ModelResponse<Job>> {
        axios.defaults.headers.common.Authorization = Constants.authenticationToken;
        let response = await axios.post<ModelResponse<Job>>(APIEndpoints.baseUrl + APIEndpoints.allocateJob, request);
        return response.data;
    };
}