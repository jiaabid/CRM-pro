import react, { useEffect } from 'react';
import { useCallback, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Configurations/Hooks/Hooks';
import { useFormik } from 'formik';
import UserMiddleware from '../../../Redux/Middlewares/UserMiddleware';
import { PER_COUNT } from '../../../components/PaginationButtons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSortableData from '../../../hooks/useSortableData';

export const UserTable = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const [Users, setUser] = useState(null);
	const { AllUsers } = useSelector((state: any) => state.user);
	const [editUser, setEditUser] = useState(null);
	const DataRouting = useCallback((id: any) => navigate(`/UserProfile/${id}`), [navigate]);

	//////  FORMIK   //////

	const { values, initialValues, handleSubmit, handleChange } = useFormik({
		initialValues: {
			searchInput: '',
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			roleId: '',
			deptId: '',
			approverId: '',
			title: '',
			address: '',
			contact: '',
			isActive: false,
			city: '',
			region: '',
			country: '',
			postalCode: '',
			description: '',
		},
		onSubmit: (values) => {},
	});


	//////  FUNCTION FOR GETTING STATE FROM REDUX   //////

	const getUsers = () => {
		dispatch(UserMiddleware.Get_Users()).then((user: any) => {
			if (user) {
				setUser(user);
			}
		});
	};

	const filteredData = AllUsers.filter((f: any) =>
		// Name
		f.firstname.toLowerCase().includes(values.searchInput.toLowerCase()),
	);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);



	//////  FUNCTION FOR EDITING DETAILS ON CLICKING EDIT BUTTON   //////

	const EditValues = (editObject: any) => {
		setEditUser(editObject);
		setEditModalStatus(true);
		values.firstname = editObject.firstname;
		values.lastname = editObject.lastname;
		values.email = editObject.email;
		values.address = editObject.address;
		values.approverId = editObject.approverId;
		values.city = editObject.city;
		values.contact = editObject.contact;
		values.country = editObject.country;
		values.isActive = editObject.isActive;
		values.deptId = editObject.deptId;
		values.description = editObject.description;
		values.postalCode = editObject.postalCode;
		values.region = editObject.region;
		values.title = editObject.title;
		values.roleId = editObject.roleId;
		values.deptId = editObject.deptId;
	};

	//////  FUNCTION FOR VIEWING DETAILS ON CLICKING EDIT BUTTON   //////

	const viewUser = (user: any) => {
		setEditUser(user);
		setEditModalStatus(true);
	};

	//////  FUNCTION FOR ADDING NEW USER DETAILS ON CLICKING ADD BUTTON   //////

	const addUser = () => {
		setEditUser(null);
		setEditModalStatus(true);
	};

	const ViewUserDetails = (userId: any) => {
		console.log(userId);
		DataRouting(userId);
	};

	//////  RETURNING FUNCTION AND STATE TO DESTRUCTURE   //////
	return {
		handleChange,
		handleSubmit,
		values,
		Users,
		viewUser,
		addUser,
		editUser,
		editModalStatus,
		setEditModalStatus,
		currentPage,
		perPage,
		setPerPage,
		setCurrentPage,
		EditValues,
		getUsers,
		AllUsers,
		ViewUserDetails,
		items
	};
};
