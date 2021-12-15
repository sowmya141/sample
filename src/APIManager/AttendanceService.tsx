import { ModelResponse, JobCheckInResponse  } from '../../src/Models/Response';
import axios from 'axios'
import APIEndpoints from './APIEndpoints';
import { AttendanceType } from '../Enums/AttendanceType';
import { MyAttendanceRequest } from '../../src/Models/Request/MyAttendanceRequest';
import { MyAttendanceListRequest } from '../../src/Models/Request/MyAttendanceListRequest';
import { MyAttendanceResponse } from '../../src/Models/Response/MyAttendanceResponse';
import { MyAttendanceListResponse } from '../../src/Models/Response/MyAttendanceListResponse';
import Constants from '../Helpers/Constants';
import { JobCheckInOrOutRequest } from '../Models/Request/JobCheckInOrOutRequest';
import { JobCheckOutResponse } from '../../src/Models/Response/JobCheckOutResponse';


export default class AttendanceService {
    public static async TrackAttendance(request: MyAttendanceRequest, type: AttendanceType): Promise<ModelResponse<MyAttendanceResponse>> {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken
        var url = type == AttendanceType.CheckIn ? APIEndpoints.checkInUrl : APIEndpoints.checkOutUrl
        url = APIEndpoints.baseUrl + url
        console.log('TrackAttendance url:',url)
        let response = await axios.post<ModelResponse<MyAttendanceResponse>>(url, request)
        console.log('request:',request);
        console.log('response:',response)
        return response.data;
    }

    public static async MyAttendanceSummary(request: MyAttendanceListRequest): Promise<ModelResponse<Array<MyAttendanceListResponse>>> {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken
        var url=(APIEndpoints.baseUrl + APIEndpoints.summaryUrl)
        
        console.log('MyAttendance url:',url)
       
        let response = await axios.post<ModelResponse<Array<MyAttendanceListResponse>>>(APIEndpoints.baseUrl + APIEndpoints.summaryUrl, request)
        console.log('response MYAT:',response);
        console.log('requestMY AT:',request)
        return response.data;
    }

    public static async checkInJob(request: JobCheckInOrOutRequest): Promise<ModelResponse<JobCheckInResponse>> {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken
        let response = await axios.post<ModelResponse<JobCheckInResponse>>(APIEndpoints.baseUrl + APIEndpoints.jobCheckIn, request)
        console.log('request CheckIn:',request);
        console.log('response CheckIn:',response)
        return response.data;
        
    }

    public static async checkOutJob(request: JobCheckInOrOutRequest): Promise<ModelResponse<JobCheckOutResponse>> {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken
        let response = await axios.post<ModelResponse<JobCheckOutResponse>>(APIEndpoints.baseUrl + APIEndpoints.jobCheckout, request)
        console.log('request Checkout:',request);
        console.log('response CheckOut:',response)
        return response.data;
       
    }
}
