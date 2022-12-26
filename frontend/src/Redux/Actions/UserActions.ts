import { ADD_USER, USERS, GET_USER_BY_ID } from '../action_types';

export default class UserAction {
	static Users = (data: any) => {
		return {
			type: USERS,
			payload: data,
		};
	};
	static getUserById = (data: any) => {
		return {
			type: GET_USER_BY_ID,
			payload: data,
		};
	};
	static AddUser = (data: any) => {
		return {
			type: ADD_USER,
			payload: data,
		};
	};
}
