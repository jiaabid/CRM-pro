import React, { Component, useRef } from 'react';
import { toast } from 'react-toastify';
import showNotification from '../../components/extras/showNotification';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import AuthAction from '../Actions/AuthAction';

export default class AuthMiddleware {
	static ValidateEmail({ email }: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const formData = new FormData();
					formData.append('email', email);

					const response = await ApiCaller.Post('auth/validate', formData);
				

					if (response.status == 201 || response.status == 200) {
						console.log(response.data);
						showNotification('Success', response.data.message);
						resolve(response.data?.payload?.user);
					} else {
						reject(false);
					}
				} catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}

	static SignIn({ email, password }: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const formData = new FormData();
					formData.append('email', email);
					formData.append('password', password);
					const response = await ApiCaller.Post('auth/login', formData);
					console.log(response)
					if (response.status == 201 || response.status == 200) {
						showNotification('Success', response.data.message);
						resolve(response.data?.payload);
						dispatch(AuthAction.Signin(response.data.payload.user));
					} else {
						reject(false);	
					}
				} catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
}
