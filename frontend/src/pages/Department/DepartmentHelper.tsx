
import react, { useEffect } from 'react';
import { useCallback, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Configurations/Hooks/Hooks';
import { useFormik } from 'formik';
import { PER_COUNT } from '../../components/PaginationButtons';

import { useSelector } from 'react-redux';
import DepartmentMiddleware from '../../Redux/Middlewares/DepartmentMiddelware';


export const DepartmentTable = () => {
    const { Departments } = useSelector((state: any) => state.department)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [editDepartment, setEditDepartment] = useState(null);
    const [viewDepartment, setviewDepartment] = useState(null);
    const [deleteModel, setDeleteModel] = useState<any>(null);
    const [deleteBody, setDeleteBody] = useState(null);

    const dispatch = useAppDispatch();




    useEffect(() => {
        dispatch(DepartmentMiddleware.Departments());
    }, []);

    const AddDepartment = () => {
        setEditDepartment(null)
        setEditModalStatus(true)
    }
    const UpdateDepartment = (editDepartment: any) => {
        setEditDepartment(editDepartment)
        // console.log(editDepartment,'helper')
        setEditModalStatus(true)
    }
    const ViewDepartment = (viewDepartment: any) => {
        setviewDepartment(viewDepartment)
        setEditModalStatus(true)
    }
    const onDelete = (body: any) => {
        setDeleteBody(body)
        setDeleteModel(true)
    }

    return {
        Departments,
        editModalStatus,
        setEditModalStatus,
        AddDepartment,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        editDepartment,
        viewDepartment,
        UpdateDepartment,
        ViewDepartment,
        setEditDepartment,
        deleteModel,
        setDeleteModel,
        deleteBody,
        setDeleteBody,
        onDelete

    }
}