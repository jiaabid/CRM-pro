import showNotification from '../../components/extras/showNotification';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import DepartmentAction from '../Actions/DepartmentAction';

const token = localStorage.getItem('token');
const bearerHeaders = ApiCaller.BearerHeaders(token)


export default class DepartmentMiddleware {
    static Departments() {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {

                    const response = await ApiCaller.Get(
                        'department',
                        bearerHeaders,
                    );
                    if (response.status == 201 || response.status == 200) {
                        dispatch(DepartmentAction.Department(response.data.payload));
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
    static NewDepartments(name: any) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await ApiCaller.Post(
                        'department',
                        { name: name },
                        bearerHeaders,
                    );
                    if (response.status == 201 || response.status == 200) {
                        // console.log(response.data.payload)
                        dispatch(DepartmentAction.NewDepartment(response.data.payload));
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
    static UpdateDepartments(id: any, name: any) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await ApiCaller.Patch(
                        `department/${id}`,
                        { name: name },
                        bearerHeaders,
                    );
                    if (response.status == 201 || response.status == 200) {
                        dispatch(DepartmentAction.UpdateDepartment(response.data.payload));
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
    static DeleteDepartments(id: any) {
        return async (dispatch: any) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await ApiCaller.Patch(
                        `department/${id}`,
                        { isDeleted: true },
                        bearerHeaders,
                    );
                    if (response.status == 201 || response.status == 200) {
                        dispatch(DepartmentAction.DeleteDepartment(response.data.payload));
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