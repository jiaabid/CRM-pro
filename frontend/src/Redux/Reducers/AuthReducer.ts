import { SIGNIN } from '../action_types';

const initialState = {
	user: false,
};

const AuthReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SIGNIN:
			localStorage.setItem("permissions",JSON.stringify(action.payload.role.permissions))
			state = { ...state, user: action.payload };
			break;
		default:
			break;
	}

	return state;
};

export default AuthReducer;
