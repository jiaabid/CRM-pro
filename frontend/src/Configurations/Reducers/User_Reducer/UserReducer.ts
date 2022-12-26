import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const UserSlice = createSlice({
	name: 'Users',
	initialState: {
		// User State for Login and User Details
		user: {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			roleId: null,
			approverId: null,
			isActive: false,
			isApproved: false,
			isDeleted: false,
			createdBy: null,
			updatedBy: null,
			deletedBy: null,
			approvedBy: null,
			createdAt: '',
			updatedAt: '',
			deletedAt: '',
			approvedAt: '',
		},
		users: [],
		allUser: [],
		token: '',
		error: {},
		isLogged: false,

		Permission: [],
		createPermissions: [],
	},
	reducers: {
		validateEmail(state, action: PayloadAction<any>) {
			state.user = action.payload.user;
		},
		userLogin(state, action: PayloadAction<any>) {
			localStorage.setItem('token', action.payload.token);
			state.isLogged = true;
			state.user = action.payload.user;
		},
		getAllUser(state, action: PayloadAction<any>) {
			state.allUser = action.payload;
		},
		// Permission //
		userPermission(state, action: PayloadAction<any>) {
			state.Permission = action.payload;
		},
		createPermission(state, action: PayloadAction<any>) {
			state.createPermissions = action.payload;
		},
		setError(state, action: PayloadAction<any>) {
			state.error = action.payload.error;
		},
	},
});

export default UserSlice;
