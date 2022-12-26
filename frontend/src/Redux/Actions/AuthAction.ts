import axios from 'axios';
import { SIGNIN } from '../action_types';
import { toast } from "react-toastify";

export default class AuthAction {
	static Signin = (data: any) => {
		return {
			type: SIGNIN,
			payload: data,
		};
	};
}
