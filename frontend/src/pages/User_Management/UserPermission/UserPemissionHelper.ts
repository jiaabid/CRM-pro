import { Formik, useFormik } from 'formik';
import react, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import showNotification from '../../../components/extras/showNotification';
import { defineRules } from '../../../Configurations/CASL/can';
import { useAppSelector, useAppDispatch } from '../../../Configurations/Hooks/Hooks';
import PermissionAction from '../../../Redux/Actions/PermissionAction';
import PermissionMiddleware from '../../../Redux/Middlewares/PermissionMiddleware';
import RoleMiddleware from '../../../Redux/Middlewares/RoleMiddleware';

export const usersPermission = () => {
	//////////   HOOKS DECLERATION    //////////

	const { Permissions, assignPermission } = useSelector((state: any) => state.permission);
	const { Roles } = useSelector((state: any) => state.role);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editPermission, seteditPermission] = useState(null);
	const [deleteModel, setDeleteModel] = useState<any>(null);
	const [deleteBody, setDeleteBody] = useState(null);
	const [permissions, setPermissions] = useState([]);
	const [roleId, setRoleId] = useState('');
	const [checkDisable, setCheckDisable] = useState(true);
	const dispatch = useAppDispatch();

	//////////   RENDERING API DATA    //////////

	useEffect(() => {
		dispatch(PermissionMiddleware.Permission());
		dispatch(RoleMiddleware.Get_Roles());
		setPermissions(Permissions);
		// defineRules();
	}, []);

	//////////   FORMIK STATE VALUES    //////////

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			name: '',
		},
		onSubmit: (values: any, { resetForm }) => {
			setEditModalStatus(false);
		},
	});

	//////////   ON-CLICK FUNTIONS USED IN BUTTONS      //////////

	const newPermission = async () => {
		setEditModalStatus(true);
		seteditPermission(null);
	};

	const UpdatePermission = async (editPermission: any) => {
		values.name = editPermission.name;
		seteditPermission(editPermission);
		setEditModalStatus(true);
	};
	const onDelete = (body: any) => {
		setDeleteBody(body);
		setDeleteModel(true);
	};

	//////////   CHECKED THE PERMISSION YOU WANT TO ASSIGN   //////////

	const handleChecked = (item: any, actionName: any) => {
		console.log('in handle check');

		assignPermission.find((permission: any) => {
			if (permission.id == item.id) {
				permission[actionName] = !permission[actionName];
				return permission;
			}
		});
		dispatch(PermissionAction.AssignPermission(assignPermission));
	};

	//////////   SAVE THE PERMISSION      //////////

	const savePermissions = () => {
		if (roleId == '') {
			return showNotification('Please Select Role ', '');
		}

		//////////   CALL THE ACTIONS      //////////

		dispatch(PermissionMiddleware.assign_permission(+roleId, assignPermission));
		showNotification('Granted Succesfully', `Permission has been Granted Successfully`);
	};

	//////////   ON SELECTING THE ROLE       //////////

	const handleSelect = (id: any) => {
		setRoleId(id);
		setCheckDisable(false);
		dispatch(PermissionMiddleware.role_permissions(+id));
	};

	//////////   RETURNING THE VALUES      //////////

	return {
		Permissions,
		editModalStatus,
		setEditModalStatus,
		newPermission,
		UpdatePermission,
		editPermission,
		values,
		handleChange,
		handleSubmit,
		deleteModel,
		deleteBody,
		setDeleteModel,
		onDelete,
		handleChecked,
		savePermissions,
		assignPermission,
		permissions,
		Roles,
		roleId,
		setRoleId,
		checkDisable,
		setCheckDisable,
		handleSelect,
		setPermissions,
	};
};
