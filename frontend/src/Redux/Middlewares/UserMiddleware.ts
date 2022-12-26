import React, { Component } from 'react';
import showNotification from '../../components/extras/showNotification';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import UserAction from '../Actions/UserActions';

export default class UserMiddleware {
	static Get_Users() {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token: any = await localStorage.getItem('token');
					const response = await ApiCaller.Get('user', ApiCaller.BearerHeaders(token));
					if (response.status == 201 || response.status == 200) {
					
						dispatch(UserAction.Users(response.data.payload));
						resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
	static GetUserById(id: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					const token: any = await localStorage.getItem('token');
					const response = await ApiCaller.Get(
						`user/${id}`,
						ApiCaller.BearerHeaders(token),
					);
					if (response.status == 201 || response.status == 200) {
						dispatch(UserAction.getUserById(response.data.payload));
						resolve(response.data.payload);
					} else {
						reject(false);
					}
				} catch (error: any) {
					showNotification('Error Occurred', error.response.data.error);
				}
			});
		};
	}
	static Add_User({
		firstname,
		lastname,
		email,
		password,
		roleId,
		deptId,
		approverId,
		title,
		address,
		contact,
		isActive,
		city,
		region,
		country,
		postalCode,
		description,
	}: any) {
		return async (dispatch: any) => {
			return new Promise(async (resolve, reject) => {
				try {
					console.log({
						firstname: firstname,
						lastname: lastname,
						email: email,
						password: password,
						roleId: parseInt(roleId),
						deptId: deptId,
						approverId: approverId,
						title: title,
						address: address,
						contact: contact,
						isActive: isActive,
						city: city,
						region: region,
						country: country,
						postalCode: postalCode,
						description: description,
					});
					const token: any = await localStorage.getItem('token');
					const response = await ApiCaller.Post(
						'user',
						{
							firstname: firstname,
							lastname: lastname,
							email: email,
							password: password,
							roleId: parseInt(roleId),
							deptId: parseInt(deptId),
							approverId: parseInt(approverId),
							title: title,
							address: address,
							contact: contact,
							isActive: isActive,
							city: city,
							region: region,
							country: country,
							postalCode: postalCode,
							description: description,
						},
						ApiCaller.BearerHeaders(token),
					);
					console.log(response.data.payload);
					if (response.status == 201 || response.status == 200) {
						dispatch(UserAction.AddUser(response.data.payload));
						resolve(response.data.payload);
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
