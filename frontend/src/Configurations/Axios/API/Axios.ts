import axios from 'axios';
import { MainURL } from '../../Main_Config';

export const AxiosAPI = () => {
	return axios.create({
		baseURL: MainURL,
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
	});
};
