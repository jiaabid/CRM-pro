import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PermissionReducer from './PermissionReducer';
import RoleReducer from './RoleRuducer';
import UserReducer from './UserReducer';
import DepartmentReducer from './DepartmentReducer';
import ARPReducer from './UserApprovalReducer';
import ModuleReducer from './ModuleCreationReducer';
import CustomerReducer from './CustomerReducer';

export default combineReducers({
	auth: AuthReducer,
	user: UserReducer,
	role: RoleReducer,
	permission: PermissionReducer,
	department: DepartmentReducer,
	userapprovals: ARPReducer,
	module: ModuleReducer,
	customers: CustomerReducer,
});
