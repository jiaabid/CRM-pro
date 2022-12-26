import { StringDecoder } from 'string_decoder';
import showNotification from '../../components/extras/showNotification';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import ARPActions from '../Actions/UserApprovalActions';


export default class UserApprovalMiddleware {
    static Approvals(type:string) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Get(`approval/approved?type=${type}`, ApiCaller.BearerHeaders(token));
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ARPActions.Approvals(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
            });
        };
    }
    static Rejections(type:string) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Get(`approval/rejected?type=${type}`, ApiCaller.BearerHeaders(token));
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ARPActions.Rejections(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
            });
        };
    }
    static Pendings(type:string) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Get(`approval/pending?type=${type}`, ApiCaller.BearerHeaders(token));
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ARPActions.Pendings(response.data.payload));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
            });
        };
    }
    static RejectionRequest(id: any, rejectionMessage: string) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(`approval/reject/${id}`,
                        {
                            rejectionMessage: rejectionMessage
                        },
                        ApiCaller.BearerHeaders(token));
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ARPActions.requestRejected(id));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
            });
        };
    }
    static ApproveRequest(id: any) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(`approval/approve/${id}`,{}, ApiCaller.BearerHeaders(token));
                    console.log(ApiCaller.BearerHeaders(token))
                    console.log(response)
                    if (response.status == 201 || response.status == 200) {
                        dispatch(ARPActions.requestApprove(id));
                        resolve(response.data.payload);
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
            });
        };
    }
}