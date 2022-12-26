import { AxiosAPI } from './Axios';
const axios = AxiosAPI();
import { UserModel } from '../../Redux-Models/Redux_Models';

export default {
	async getUsers() {
		var response = await axios.post('/auth/login', {
			email: 'admin@csqaure.co',
			password: 'admin',
		});
		// console.log(response);
		return response.data;
	},
	async getParticularUser(email: string) {
		var response = await axios.post(`/${email}`);
		return response.data.filter((user: UserModel) => user.email === email)[0];
	},

	async validateEmail(email: string) {
		var response = await axios.post(`/auth/validate`, {
			email: email,
		});
		return response.data.payload;
	},
};
