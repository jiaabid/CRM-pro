import { useFormik } from 'formik';
import react, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PER_COUNT } from '../../../components/PaginationButtons';
import { useAppDispatch } from '../../../Configurations/Hooks/Hooks';
import RoleMiddleware from '../../../Redux/Middlewares/RoleMiddleware';

export const userRole = () => {
	//////////   HOOKS DECLERATIONS      //////////

	const { Roles } = useSelector((state: any) => state.role);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [editRole, setEditRole] = useState(null);
	const [viewRole, setviewRole] = useState(null);
	const [Disable, setDisable] = useState<any>(null);
	const [deleteModel, setDeleteModel] = useState<any>(null);
	const [deleteBody, setDeleteBody] = useState(null);
	const dispatch = useAppDispatch();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	//////////   RENDERING API DATA WHEN COMPONENT MOUNT      //////////

	useEffect(() => {
		dispatch(RoleMiddleware.Get_Roles());
	}, []);

	const formik = useFormik({
		initialValues: {
			name: '',
			parentId: '',
		},
		onSubmit: (values) => {},
	});

	//////////   ON-CLICK FUNTIONS USED IN BUTTON    //////////

	const newRole = () => {
		setEditRole(null);
		setEditModalStatus(true);
	};
	const EditValue = (editRole: any) => {
		(formik.values.name = editRole.name), (formik.values.parentId = editRole.parentId);
		setEditRole(editRole);
		setEditModalStatus(true);
	};

	const ViewButton = (viewRole: any) => {
		(formik.values.name = viewRole.name), (formik.values.parentId = viewRole.parentId);
		setviewRole(viewRole);
		setEditModalStatus(true);
		setDisable(true);
	};
	const onDelete = (body: any) => {
		setDeleteBody(body);
		setDeleteModel(true);
	};

	//////////   RETURNING THE VALUES      //////////

	return {
		Roles,
		newRole,
		editModalStatus,
		setEditModalStatus,
		EditValue,
		editRole,
		setEditRole,
		viewRole,
		ViewButton,
		setDeleteModel,
		deleteModel,
		deleteBody,
		onDelete,
		currentPage,
		setCurrentPage,
		perPage,
		setPerPage,
	};
};
