import { ADD_MODULE, GET_MODDULE, MODULE_CONFIGURATION, API_REQUEST, API_RESPONSE, DB_VARIABLE_METHOD } from '../action_types'

interface ModuleState {
    Module: any[];
    ModuleConfiguration: any[]
    MethodType: any[]
    ApiRequest: any[]
    ApiResponse: any[]
    RouteId: any
}


const initialState: ModuleState = {
    Module: [],
    ModuleConfiguration: [],
    ApiRequest: [],
    ApiResponse: [],
    RouteId: 0,
    MethodType: []
};

const ModuleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_MODDULE:
            state = { ...state, Module: action.payload };
            break;
        case ADD_MODULE:
            let newModule = [...state.Module, action.payload]
            state = { ...state, Module: newModule };
            break;
        case MODULE_CONFIGURATION:
            state = { ...state, RouteId: action.payload.id }
            break
        case API_REQUEST:
            state = { ...state, ApiRequest: action.payload }
            break
        case API_RESPONSE:
            state = { ...state, ApiResponse: action.payload }
            break
        case DB_VARIABLE_METHOD:
            state = { ...state, MethodType: action.payload }
            break






        default:
            break;
    }
    return state
}

export default ModuleReducer