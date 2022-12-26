import { ADD_USER, USERS, GET_USER_BY_ID } from '../action_types';

const initialState = {
	AllUsers: [],
	UserById: {},
};
const UserReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case USERS:
			state = { ...state, AllUsers: action.payload };
			break;
		case GET_USER_BY_ID:
			state = { ...state, UserById: action.payload };
			break;
		case ADD_USER:
			
			let User: any = [...state.AllUsers, action.payload];
			state = {
				...state,
				AllUsers: action.payload.isApproved?User:state.AllUsers,
			};
			break;
		default:
			break;
	}

	return state;
};

export default UserReducer;
