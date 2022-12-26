import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Configurations/Hooks/Hooks';
import { validateUser, Login } from '../../Configurations/Reducers/User_Reducer/UserAction';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import AuthMiddleware from '../../Redux/Middlewares/AuthMiddleware';
import { useDispatch } from 'react-redux';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import { defineRules } from '../../Configurations/CASL/can';

export const useLogin = () => {
	/////////// HOOKS DECLERATION ///////////

	const [isLoading, setIsLoading] = useState(false);
	const [signInPassword, setSignInPassword] = useState<Boolean>(false);
	const [singInStatus, setSingIpStatus] = useState<boolean>(true);
	const [users, setUsers] = useState<any>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { setUser } = useContext(AuthContext);
	const next = useCallback(() => navigate('/Dashboard'), [navigate]);

	/////////// LOGICAL FUNCTIONS ///////////

	/*  LOGIN FUNCTION */

	const login = async (email: string, password: string) => {
		if (setUser) {
			setUser(email);
		}
		setIsLoading(true);
		dispatch<any>(AuthMiddleware.SignIn({ email, password }))
			.then((data: any) => {
				localStorage.setItem('token', data.token);
				let permissions = data.user.role.permissions;
				defineRules(permissions);
				next();
				setSingIpStatus(true);
				setIsLoading(true);
			})
			.catch((err: any) => {
				setIsLoading(false);
			});
	};

	/*  VALIDATE FUNCTION */

	const handleContinue = async (email: string) => {
		setIsLoading(true);
		dispatch<any>(AuthMiddleware.ValidateEmail({ email }))
			.then((data: any) => {
				if (data) {
					setIsLoading(false);
					setUsers(data);
					setSignInPassword(true);
					setIsLoading(false);
				} else {
					setIsLoading(false);
				}
			})
			.catch((err: any) => {});
	};



	/*  RETURNING  */

	return {
		singInStatus,
		isLoading,
		signInPassword,
		users,
		login,
		handleContinue,
		next,
	};
};
