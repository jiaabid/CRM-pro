export interface UserModel {
	
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	roleId: number|null;
	approverId: null | number;
	isActive: boolean;
	isApproved: boolean;
	isDeleted: boolean;
	createdBy: null | number;
	updatedBy: null | number;
	deletedBy: null | number;
	approvedBy: null | number;
	createdAt: null | Date | string
	updatedAt: null | Date | string;
	deletedAt: null | Date | string;
	approvedAt: null | Date | string;
}
export interface PermissionModel {
	Permision: any[]
}

export interface UserArrayModel {
	users: UserModel[];
	user: UserModel;
	PModel : PermissionModel
}
