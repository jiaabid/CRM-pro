import { PERMISSION, ADD_PERMISSION, UPDATE_PERMISSION, DELETE_PERMISSION, ASSIGN_PERMISSION, AssignRolePermission, Role_Permissions } from '../action_types';

interface PermissionState {
	Permissions: any[];
	assignPermission: any[]
}

const initialState: PermissionState = {
	Permissions: [],
	assignPermission: []
};

const PermissionReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case PERMISSION:
			state = { ...state, Permissions: action.payload, assignPermission: action.payload };

			break;

		case ADD_PERMISSION:
			let Permission = [...state.Permissions, action.payload];
			state = { ...state, Permissions: Permission };
			break;
		case UPDATE_PERMISSION:
			state = {
				...state,
				Permissions: state.Permissions.map((el) => {
					if (el.id === action.payload.id) {
						el = action.payload;
						return el;
					}
					return el;
				}),
			};
			break;
		case DELETE_PERMISSION:
			return {
				...state,
				Permissions: state.Permissions.filter((el: any) => el.id !== action.payload.id),
			};
		//maintaining checkbox states	
		case ASSIGN_PERMISSION:
			state = { ...state, assignPermission: action.payload };
			break;
		//saving permissions	
		case AssignRolePermission:
			state = { ...state };
			break;
		//getting permissions against specfic role	
		case Role_Permissions:

		//filtering the assigned and unassigned
			let remainingPermissions = state.Permissions.filter((el: any) => {
				if (!action.payload.find((item: any) => item.permissionId == el.id)) {
					return el
				}
			})

			//restructuring
			action.payload = action.payload.map((item: any) => {
				item.id = item.permissionId
				return item
			})
		
			state = { ...state, assignPermission: [...action.payload, ...remainingPermissions] };
			break;
		default:
			break;

	}
	return state;
};

export default PermissionReducer;
