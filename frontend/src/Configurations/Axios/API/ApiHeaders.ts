import Axios, { AxiosRequestConfig } from 'axios';

export const baseUrl = 'http://localhost:4001/';

export default class ApiCaller {
	static BearerHeaders = (token: any, More: AxiosRequestConfig = {}) => {
		return {
			Authorization: 'Bearer ' + token,
			...More,
		};
	};

	static Get = (url = '', headers = {}, customUrl = '') => {
		return Axios.get(customUrl ? customUrl : `${baseUrl}${url}`, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				...headers,
			},
		})
			.then((res) => res)
			.catch((err) => err.response);
	};

	static Post = async (endPoint = '', body = {}, headers = {}, cutomUrl = '') => {
		return Axios.post(cutomUrl ? cutomUrl : `${baseUrl}${endPoint}`, body, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				...headers,
			},
		});
	};

	static Put = (url = '', body = {}, headers = {}) => {
		return Axios.put(`${baseUrl}${url}`, body, {
			headers: { 'Content-Type': 'application/json', ...headers },
		})
			.then((res) => res)
			.catch((err) => err.response);
	};

	static Delete = (url = '', body = {}, headers = {}) => {
		return Axios.delete(`${baseUrl}${url}`, {
			headers: { 'Content-Type': 'application/json', ...headers },
			data: body,
		})
			.then((res) => res)
			.catch((err) => err.response);
	};
	static Patch = async (endPoint = '', body = {}, headers = {}, cutomUrl = '') => {
		return Axios.patch(cutomUrl ? cutomUrl : `${baseUrl}${endPoint}`, body, {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				...headers,
			},
		});
	};
}
