import {OTPRequest, OTPLoginRequest} from '../Models/Request'
import { ModelResponse, OTPResponse, LoginResponse } from '../../src/Models/Response';
import axios from 'axios'
import APIEndpoints from './APIEndpoints';

export default class OTPService {
    public static async RequestOTP(otpRequest: OTPRequest): Promise<ModelResponse<OTPResponse>> {
        let response = await axios.post<ModelResponse<OTPResponse>>(APIEndpoints.baseUrl + APIEndpoints.emailOtpUrl,otpRequest)
        return response.data;
    }

    public static async LoginOTP(otpRequest: OTPLoginRequest): Promise<ModelResponse<LoginResponse>> {
        let response = await axios.post<ModelResponse<LoginResponse>>(APIEndpoints.baseUrl + APIEndpoints.otpLoginUrl,otpRequest)
        console.log('OtpRespone',response);
        console.log('otpRequest',otpRequest)
        
        return response.data;
    }
}