import { element } from 'prop-types';
import React, { lazy } from 'react';
import { componentsMenu, dashboardMenu, demoPages, layoutMenu, Project } from '../menu';
import Login from '../pages/Authentication/Login';
import Can from '../Configurations/CASL/can'
import can from '../Configurations/CASL/can';
export const CRM = {
	LOGIN: lazy(() => import('../pages/Authentication/Login')),
	DASHBOARD: lazy(() => import('../pages/Dashboard')),
	USER_APPROVAL: lazy(() => import('../pages/User_Approval/User_Approval')),
	USER_REQUEST_BY_ME: lazy(() => import('../pages/User_Approval/RequestByMe')),
	USERS: lazy(() => import('../pages/User_Management/User/Users')),
	USER_ROLE: lazy(() => import('../pages/User_Management/UserRole/User_role')),
	USER_PERMISSION: lazy(() => import('../pages/User_Management/UserPermission/User_permissions')),
	MODULE_CONFIG: lazy(() => import('../pages/ModuleConfiguration/ModuleConfiguration')),
	MODULE_CREATION: lazy(() => import('../pages/ModuleConfiguration/ModuleCreation')),
	DEPARTMENT: lazy(() => import('../pages/Department/Depatment')),
	USER_PROFILE: lazy(() => import('../pages/UserProfile/UserProfile')),
	CUSTOMER_SEARCH: lazy(() => import('../pages/CustomerProfile/CustomerSearch')),
	CUSTOMER_PROFILE: lazy(() => import('../pages/CustomerProfile/CustomerProfile'))
}
// console.log(Can('canAdd','user'),'in route sj')

const pages = [
	{
		path: demoPages.login.path,
		element: <CRM.LOGIN />,
		exact: true
	},
	{
		path: Project(Can).Dashboard.path,
		element: <CRM.DASHBOARD />,
		exact: true
	},
	{
		path: Project(Can).UserApproval.subMenu.Request.path,
		element: <CRM.USER_APPROVAL />,
		exact: true
	},
	{
		path: Project(Can).UserApproval.subMenu.RequestByMe.path,
		element: <CRM.USER_REQUEST_BY_ME />,
		exact: true
	},
	{
		path: Project(Can).UserManagement.subMenu.Users.path,
		element: <CRM.USERS />,
		exact: true
	},
	{
		path: Project(Can).UserManagement.subMenu.Role.path,
		element: <CRM.USER_ROLE />,
		exact: true
	},
	{
		path: Project(Can).UserManagement.subMenu.Permissions.path,
		element: <CRM.USER_PERMISSION />,
		exact: true
	},
	{
		path: Project(can).Module.subMenu.ModuleCreation.path,
		element: <CRM.MODULE_CREATION />,
		exact: true
	},

	{
		path: Project(Can).Module.subMenu.ModuleConfiguration.path,
		element: <CRM.MODULE_CONFIG />,
		exact: true
	},
	{
		path: Project(Can).Department.path,
		element: <CRM.DEPARTMENT />,
		exact: true
	},
	{
		path: `/UserProfile/:id`,
		element: <CRM.USER_PROFILE />,
		exact: false
	},
	{
		path: Project(can).CustomerSearch.path,
		element: <CRM.CUSTOMER_SEARCH />,
		exact: false
	},
	{
		path: '/CustomerProfile/:cnic',
		// path: Project(can).CustomerProfile.path,
		element: <CRM.CUSTOMER_PROFILE />,
		exact: false
	},
]


const contents = [...pages];

export default contents;
