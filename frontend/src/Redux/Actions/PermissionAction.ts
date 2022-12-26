import { ADD_PERMISSION, DELETE_PERMISSION, PERMISSION, UPDATE_PERMISSION,ASSIGN_PERMISSION, AssignRolePermission, Role_Permissions } from '../action_types';

export default class PermissionAction {
	static Permission = (data: any) => {
		return {
			type: PERMISSION,
			payload: data,
		};
	};

	static AddPermission = (data: any) => {
		return {
			type: ADD_PERMISSION,
			payload: data,
		};
	};
	static UpdatePermission = (data: any) => {
		return {
			type: UPDATE_PERMISSION,
			payload: data,
		};
	};
	static DeletePermission = (data: any) => {
		return {
			type: DELETE_PERMISSION,
			payload: data,
		};
	};
	static AssignPermission = (data:any)=>{
       return {
		type: ASSIGN_PERMISSION,
		payload:data
	   }
	}
	static AssignRolePermission = () => {
		return {
			type: AssignRolePermission,
			payload: [],
		};
	}
	static RolePermissions = (data:any) => {
		return {
			type: Role_Permissions,
			payload: data
		};
	}
}
