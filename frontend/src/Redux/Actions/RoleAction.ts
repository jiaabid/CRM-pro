import { ROLE, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE ,AssignRolePermission} from '../action_types';

export default class RoleAction {
	static Role = (data: any) => {
		return {
			type: ROLE,
			payload: data,
		};
	};
	static AddRole = (data: any) => {
		return {
			type: ADD_ROLE,
			payload: data,
		};
	};
	static UpdateRole = (id: any) => {
		return {
			type: UPDATE_ROLE,
			payload: id,
		};
	};
	static DeleteRole = (data: any) => {
		return {
			type: DELETE_ROLE,
			payload: data,
		};
	};
	
}
