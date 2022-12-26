import axios from 'axios'

import { ADD_MODULE, GET_MODDULE, MODULE_CONFIGURATION, API_REQUEST, API_RESPONSE, DB_VARIABLE_METHOD } from '../action_types'

export default class ModuleAction {
    static GetModule = (data: any) => {
        return {
            type: GET_MODDULE,
            payload: data,
        };
    };
    static AddModule = (data: any) => {
        return {
            type: ADD_MODULE,
            payload: data,
        };
    };
    static ModuleConfiguration = (data: any) => {
        return {
            type: MODULE_CONFIGURATION,
            payload: data
        }
    }
    static ApiRequest = (data: any) => {
        return {
            type: API_REQUEST,
            payload: data
        }
    }
    static ApiResponse = (data: any) => {
        return {
            type: API_RESPONSE,
            payload: data
        }
    }
    static MethodType = (data: any) => {
        return {
            type: DB_VARIABLE_METHOD,
            payload: data
        }
    }
}