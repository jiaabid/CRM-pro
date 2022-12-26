import UserSlice from './UserReducer';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../../Store/index';
import { AxiosAPI } from '../../Axios/API/Axios';
import { useFormik } from 'formik';
import showNotification from '../../../components/extras/showNotification';

const axios = AxiosAPI();

export const UserAction = UserSlice.actions;

export const validateUser = (email: string): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		const response = await axios.post(`/auth/validate`, {
			email: email,
		});
		dispatch(UserAction.validateEmail(response.data.payload));
	};
};
export const Login = (
	email: string,
	password: string,
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.post(`/auth/login`, {
				email,
				password,
			});
			dispatch(UserAction.userLogin(response.data.payload));
		} catch (err) {
			dispatch(
				UserAction.setError({
				}),
			);
		}
	};
};
export const allUsers = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispach, getState) => {
		try {
			const response = await axios.get('/user');
			dispach(UserAction.getAllUser(response.data.payload));
		} catch (err) {
			console.log(err);
		}
	};
};


export const userPermission = (): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getState) => {
		try {
			const response = await axios.get('/permission');
			dispatch(UserAction.userPermission(response.data.payload));
		} catch (err) {
			console.log(err);
		}
	};
};

export const createPermissions = ({
	formik,
	callback,
}: any): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch, getstate) => {
		try {
			const response = await axios.post('/permission', {
				name: formik.values.name,
			});

			if (response.status == 200 || response.status == 201) {
				callback(response.data);
				// dispatch(UserAction.userPermission(response.data.payload));
				// dispatch(UserAction.createPermission(response.data.payload));
			} else {
				callback(false);
			}
		} catch (AxiosError) {
			console.log(AxiosError);
		}
	};
};
