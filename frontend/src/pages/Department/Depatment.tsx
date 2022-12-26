import React, { useState, useEffect, FC } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import { useSelector } from 'react-redux';
import useSortableData from '../../hooks/useSortableData';
import { DepartmentTable } from './DepartmentHelper';
import Input from '../../components/bootstrap/forms/Input';
import DepartmentModel from './DepartmentModel';
import DeleteModel from './DeleteModel';
import can from '../../Configurations/CASL/can'

export default function User() {
    const { Departments,
        editModalStatus,
        setEditModalStatus,
        AddDepartment,
        editDepartment,
        currentPage,
        perPage,
        setCurrentPage,
        setPerPage,
        viewDepartment,
        UpdateDepartment,
        ViewDepartment,
        setEditDepartment,
        deleteModel,
        setDeleteModel,
        deleteBody,
        onDelete
    } = DepartmentTable()


    const formik = useFormik({
        initialValues: {
            searchInput: '',

        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
        },
    });
    const filteredData = Departments.filter(
        (f: any) =>
            f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
    );


    const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

    return (
        <PageWrapper>
            <Page >
                <div className='row h-100'>
                    <div className='col-12 h-100'>
                        <Card className='col-12 h-100'>
                            <CardHeader>
                                <CardTitle>
                                    <Icon icon='Ballot' size='2x' className='mb-2 me-2' color='primary' />
                                    <span className='h4 fw-bold ms-2 mt-3'>DEPARTMENTS</span>
                                </CardTitle>
                                <div className="input-group w-50">
                                    <span className='input-group-text border-0 bg-transparent cursor-pointer'><Icon icon='Search' size='2x' color='primary' /></span>
                                    <Input id='searchInput'
                                        type='search'
                                        className='border-0 shadow-none bg-transparent'
                                        placeholder='Search User...'
                                        onChange={formik.handleChange}
                                        value={formik.values.searchInput} />
                                </div>
                                {can('canAdd', 'department') && <Button
                                    className='float-end mb-4 me-4 mt-3'
                                    icon='Verified'
                                    color='primary'
                                    onClick={() => AddDepartment()}
                                    isLight>
                                    Create New
                                </Button>}
                            </CardHeader>
                            <CardBody isScrollable className='table-responsive '>
                                <table className='table table-modern table-hover '>
                                    <thead className='cursor-pointer text-decoration-underline'>
                                        <tr>
                                            <th scope='col' >Department</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPagination(items, currentPage, perPage).map((i: any) => (
                                            <tr>
                                                <th>{i.name}</th>
                                                <td>
                                                    <div>
                                                        {can('canUpdate', 'department') && <td>
                                                            <Button
                                                                color='dark'
                                                                isLight
                                                                icon='Edit'
                                                                onClick={() => UpdateDepartment(i)}
                                                            >
                                                            </Button>
                                                        </td>}
                                                        {can('canDelete', 'department') && <td>
                                                            <Button
                                                                className='ms-5'
                                                                color='dark'
                                                                isLight
                                                                icon='Delete'
                                                                onClick={() => onDelete(i.id)}
                                                            >
                                                            </Button>
                                                        </td>}
                                                        <td>
                                                            <Button
                                                                className='ms-5'
                                                                color='dark'
                                                                isLight
                                                                icon='Visibility'
                                                                onClick={() => ViewDepartment(i)}
                                                            >
                                                            </Button>
                                                        </td>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={items}
                                label='Permissions'
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page>
            <DeleteModel setIsOpen={setDeleteModel} isOpen={deleteModel} id={''} body={deleteBody} />

            <DepartmentModel setIsOpen={setEditModalStatus} isOpen={editModalStatus} id={''} editDepartment={editDepartment} viewDepartment={viewDepartment} setEditDepartment={setEditDepartment} />
        </PageWrapper >
    )
}