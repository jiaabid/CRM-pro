import showNotification from '../../components/extras/showNotification';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import RoleAction from '../Actions/RoleAction';

export default class RoleMiddleware {
	static Get_Roles() {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Get('role', ApiCaller.BearerHeaders(token));
					console.log(response.data.payload)
					if (response.status == 201 || response.status == 200) {
						dispatch(RoleAction.Role(response.data.payload));
						resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					// showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
	static Add_Role(name: any, parentId: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Post(
						'role',
						{ name, parentId: parseInt(parentId) },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 201 || response.status === 200) {
						dispatch(RoleAction.AddRole(response.data.payload));
						resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					// showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
	static Update_Role(id: any, name: any, parentId: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Patch(
						`role/${id}`,
						{ name, parentId: parseInt(parentId) },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 201 || response.status === 200) {
						dispatch(RoleAction.UpdateRole(response.data.payload));
						resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					// showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
	static Delete_Role(id: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Patch(
						`role/${id}`,
						{ isDeleted: true },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 201 || response.status === 200) {
						dispatch(RoleAction.DeleteRole(response.data.payload));
						resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					// showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
}
