import React from 'react';
import { componentsMenu, dashboardMenu, demoPages, layoutMenu, Project } from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';
import DefaultHeader from '../pages/_layout/_headers/DefaultHeader';
import UserApprovalHeader from '../pages/_layout/_headers/UserApprovalHeader';
import ModuleHeader from '../pages/_layout/_headers/ModuleHeader';

import can from "../Configurations/CASL/can"
const headers = [
	{ path: Project(can).Dashboard.path, element: <DashboardHeader />, exact: true },
	{ path: Project(can).UserManagement.subMenu.Users.path, element: <DefaultHeader />, exact: true },
	{ path: Project(can).UserManagement.subMenu.Role.path, element: <DefaultHeader />, exact: true },
	{ path: Project(can).UserManagement.subMenu.Permissions.path, element: <DefaultHeader />, exact: true },
	{ path: Project(can).UserApproval.subMenu.Request.path, element: <UserApprovalHeader />, exact: true },
	{ path: Project(can).UserApproval.subMenu.RequestByMe.path, element: <UserApprovalHeader />, exact: true },
	{ path: Project(can).Department.path, element: <DashboardHeader />, exact: true },
	{ path: Project(can).Module.subMenu.ModuleConfiguration.path, element: <ModuleHeader />, exact: true },
	{ path: Project(can).Module.subMenu.ModuleCreation.path, element: <ModuleHeader />, exact: true },
	// { path: Project(can).CustomerProfile.path, element: <DashboardHeader />, exact: true },

];

export default headers;
