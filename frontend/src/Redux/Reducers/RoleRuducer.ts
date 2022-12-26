import { ADD_ROLE, DELETE_ROLE, ROLE, UPDATE_ROLE } from '../action_types';
interface RoleState {
	Roles: any[];
}

const initialState: RoleState = {
	Roles: [],
};
const RoleReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ROLE:
			state = { ...state, Roles: action.payload };
			break;

		case ADD_ROLE:
			let roles: any = [...state.Roles, action.payload];
			state = { ...state, Roles: roles };
			break;

		case UPDATE_ROLE:
			state = {
				...state,
				Roles: state.Roles.map((el: any) => {
					if (el.id == action.payload.id) {
						el = action.payload;
						return el;
					}
					return el;
				}),
			};
			
			break;
			
			case DELETE_ROLE : 
			state = {
				...state,
				Roles: state.Roles.filter((el: any) => el.id !== action.payload.id)
			}
			break;
		default:
			break;
	}

	return state;
};

export default RoleReducer;
