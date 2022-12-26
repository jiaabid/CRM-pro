import React, { lazy } from 'react';
import { componentsMenu, dashboardMenu, demoPages, layoutMenu, Project } from '../menu';

import { Route, Routes } from 'react-router-dom';




class Auth extends React.Component {
	render(){
	const login = {
		path: demoPages.login.path,
		element: lazy(() => import('../pages/Authentication/Login')),
		exact: true
	}
	return (
		<Routes>
			<Route key={login.path} />
		</Routes>
	)
}
}

export default Auth;




