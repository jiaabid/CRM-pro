import showNotification from '../../components/extras/showNotification';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import ModuleAction from '../Actions/ModuleAction';


export default class ModuleMiddleware {
    static GetModuele = () => {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Get(
                        'custom-modules',
                        ApiCaller.BearerHeaders(token),
                    );
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ModuleAction.GetModule(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    showNotification('Error Occurred', error.response.data.error);
                }
            })
        }
    }
    static AddModule = (name: any) => {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(
                        'custom-modules',
                        {
                            name: name,
                        },
                        ApiCaller.BearerHeaders(token),
                    );
                    if (response.status == 201 || response.status == 200) {

                        dispatch(ModuleAction.AddModule(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    showNotification('Error Occurred', error.response.data.error);
                }
            })
        }
    }
    static MethodType = () => {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Get(
                        'db-variable/detail/method_type',
                        ApiCaller.BearerHeaders(token),
                    );
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ModuleAction.MethodType(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    showNotification('Error Occurred', error.response.data.error);
                }
            })
        }
    }
    static ModuleConfiguration = (name: any, url: any, requestType: any, requestMethodId: any, moduleId: any) => {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(
                        'chthonic',
                        {
                            name: name,
                            url: url,
                            requestType: requestType,
                            requestMethodId: parseInt(requestMethodId),
                            moduleId: parseInt(moduleId)
                        },
                        ApiCaller.BearerHeaders(token),
                    );
                    console.log(response,'response')
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ModuleAction.ModuleConfiguration(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    showNotification('Error Occurred', error.response.data.error);
                }
            })
        }
    }
    static ApiRequest = (fields: any) => {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(
                        'chthonic/fields/create',
                        {
                            fields: fields
                        },
                        ApiCaller.BearerHeaders(token),
                    );
                    if (response.status == 201 || response.status == 200) {
                        console.log(response.data.payload)
                        dispatch(ModuleAction.ApiRequest(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    console.log(error)
                    showNotification('Error Occurred', error.response.data.error);
                }
            })
        }
    }
    static ApiResponse = (fields: any) => {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(
                        'chthonic/fields/create',
                        {
                            fields: fields
                        },
                        ApiCaller.BearerHeaders(token),
                    );
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ModuleAction.ApiResponse(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    showNotification('Error Occurred', error.response.data.error);
                }
            })
        }
    }
}