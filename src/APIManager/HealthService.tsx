import axios from 'axios'
import APIEndpoints from './APIEndpoints';
import { ModelResponse, HealthQuestionData, FieldError } from '../../src/Models/Response';
import Constants from '../Helpers/Constants'
import { HealthAnswersData } from '../Models/Request'

export default class HealthService {
    public static async getHealthQuestions(): Promise<ModelResponse<HealthQuestionData>> {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.get<ModelResponse<HealthQuestionData>>(APIEndpoints.baseUrl + APIEndpoints.healthQuestionUrl)
    let Questionurl=(APIEndpoints.baseUrl + APIEndpoints.healthQuestionUrl)
    console.log('HealthQuestion Url:',Questionurl);
    console.log('HealthQuestion Response:',response)
    return response.data;
    } 

    public static async SendHealthUpdate(request: HealthAnswersData): Promise<ModelResponse<FieldError>>  {
        axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
        let response = await axios.post<ModelResponse<FieldError>>(APIEndpoints.baseUrl + APIEndpoints.healthAnswersUrl, request)
        let Healthurl=(APIEndpoints.baseUrl + APIEndpoints.healthAnswersUrl)
        console.log('HealthUpdate Request',request)
        console.log('HealthUpdate Url:',Healthurl);
        console.log('HealthUpdate Response:',response)
        return response.data;
   }
   //assessments
    public static async getAssessments(): Promise<ModelResponse<HealthQuestionData>> {
    axios.defaults.headers.common['Authorization'] = Constants.authenticationToken;
    let response = await axios.get<ModelResponse<HealthQuestionData>>(APIEndpoints.baseUrl + APIEndpoints.healthQuestionUrl)
    return response.data;
    } 
}