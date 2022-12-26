import { configureStore } from '@reduxjs/toolkit';
import RoleSlice from '../Reducers/Role_Reducer/RoleReducer';
import UserSlice from '../Reducers/User_Reducer/UserReducer';

const store = configureStore({
	reducer: {
		user: UserSlice.reducer,
		role: RoleSlice.reducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
