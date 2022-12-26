import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import PermissionAction from '../Actions/PermissionAction';
import showNotification from '../../components/extras/showNotification';

export default class PermissionMiddleware {
	static Permission() {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Get(
						'permission',
						ApiCaller.BearerHeaders(token),
					);
					if (response.status == 201 || response.status == 200) {
						console.log(response.data.payload);
						dispatch(PermissionAction.Permission(response.data.payload));
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
	static AddPermissions(name: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Post(
						'permission',
						{ name: name },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 201 || response.status === 200) {
						dispatch(PermissionAction.AddPermission(response.data.payload));
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
	static UpdatePermission(id: any, name: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Patch(
						`permission/${id}`,
						{ name: name },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 200 || response.status === 201) {
						dispatch(PermissionAction.UpdatePermission(response.data.payload));
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
	static DeletePermissions(id: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Patch(
						`permission/${id}`,
						{ isDeleted: true },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 200 || response.status === 201) {
						dispatch(PermissionAction.DeletePermission(response.data.payload));
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

	//assign permission to the role
	static assign_permission(id: number, permissionPayload: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					let permissions: any[] = [];
					permissionPayload.forEach((el: any) =>
						permissions.push({
							permissionId: el.id,
							canAdd: el.canAdd,
							canView: el.canView,
							canUpdate: el.canUpdate,
							canDelete: el.canDelete,
							name: el.name,
						}),
					);
					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Post(
						`role/assign`,
						{ roleId: id, permissions },
						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 201 || response.status === 200) {
						dispatch(PermissionAction.AssignRolePermission());
						// resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					// showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}

	//get specific role permissions

	static role_permissions(id: number) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					let permissions: any[] = [];

					const token = await localStorage.getItem('token');
					const response = await ApiCaller.Get(
						`role/${id}`,

						ApiCaller.BearerHeaders(token),
					);
					if (response.status === 201 || response.status === 200) {
						dispatch(
							PermissionAction.RolePermissions(response.data.payload.permissions),
						);
						// resolve(response.data.payload);
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
