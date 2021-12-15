import React from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import slateApi from '../NetworkManager/api'

export default class APIServices {

    private static instance : APIServices;

    private constructor() {

    }

    public static getInstance(): APIServices {
        if (!APIServices.instance) {
            APIServices.instance = new APIServices();
        }
        return APIServices.instance;
    }

    async makeRequest(request: any) {   
        return await slateApi(request);
    }
}