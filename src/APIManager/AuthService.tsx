import {LoginRequest} from '../Models/Request'
import { ModelResponse, LoginResponse } from '../Models/Response'
import axios from 'axios'
import APIEndpoints from './APIEndpoints';

export default class AuthService {
    public static async Login(loginRequest: LoginRequest): Promise<ModelResponse<LoginResponse>> {
        let response = await axios.post<ModelResponse<LoginResponse>>(APIEndpoints.baseUrl + APIEndpoints.loginUrl,loginRequest)
        console.log('LoginUrl:',(APIEndpoints.baseUrl + APIEndpoints.loginUrl))
        console.log('LoginRequest:',loginRequest);
        console.log('LoginResponse :',response)
        return response.data;
    }
}