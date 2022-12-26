import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { SubheaderSeparator } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import Card, {
    CardBody, CardHeader,

    CardTitle,
} from '../../components/bootstrap/Card';
import PaginationButtons, {
    dataPagination,
    PER_COUNT,
} from '../../components/PaginationButtons';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import useDarkMode from '../../hooks/useDarkMode';
import Dropdown, {
    DropdownMenu,
    DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Popovers from '../../components/bootstrap/Popovers';
import { useDispatch } from 'react-redux';
import ModuleMiddleware from '../../Redux/Middlewares/ModuleMiddleware';
import { useSelector } from 'react-redux';
import useSortableData from '../../hooks/useSortableData';
import ModuleModal from './AddModal';



export default function ModuleCreation() {
    const { darkModeStatus } = useDarkMode();
    const { Module } = useSelector((state: any) => state.module)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(ModuleMiddleware.GetModuele())
    }, [])

    console.log(Module, "In  Creation")
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [editModalStatus, setEditModalStatus] = useState(false)
    const formik = useFormik({
        initialValues: {
            searchInput: '',

        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
        },
    });
    const filteredData = Module.filter(
        (f: any) =>
            // Name
            f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
    );

    const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);

    return (
        <PageWrapper>

            <Page >
                <div className='row h-100'>
                    <div className='col-12'>
                        <Card stretch >
                            <CardHeader className='bg-200-grey w-100'>
                                <CardTitle className=' mt-2 ms-2'>
                                    <Icon icon='drive_file_rename_outline' size='2x' className='mb-2 me-2' color='primary' />
                                    <span className='h4 fw-bold ms-2' >Module Creation</span>
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
                                <div className='d-flex justify-content-around'>
                                    <Dropdown>
                                        <DropdownToggle hasIcon={false}>
                                            <Button
                                                icon='FilterAlt'
                                                color='primary'
                                                isLight
                                                className='btn-only-icon position-relative'>

                                                <Popovers desc='Filtering applied' trigger='hover'>
                                                    <span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
                                                    </span>
                                                </Popovers>
                                            </Button>
                                        </DropdownToggle>
                                        <DropdownMenu isAlignmentEnd size='lg'>
                                            <div className='container py-2'>
                                                <div className='row g-3'>
                                                    <FormGroup label='USERS' className='col-12 ms-1 mt-3 fw-bold bg-muted'>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <SubheaderSeparator className='mt-1 mx-4' />
                                    <Button
                                        icon='drive_file_rename_outline'
                                        color='primary'
                                        isLight
                                        onClick={() => setEditModalStatus(true)}
                                    >
                                        New Module
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardBody isScrollable className='table-responsive'>
                                <table className='table table-modern table-hover '>
                                    <thead>
                                        <tr>
                                            <th
                                                className='cursor-pointer text-decoration-underline'>
                                                Name
                                            </th>
                                            <th>module Type</th>
                                            {/* <th>Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {dataPagination(items, currentPage, perPage).map((s) =>
                                        (
                                            <tr>
                                                <td>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='flex-grow-1'>
                                                            <div className='fs-6 fw-bold'>
                                                                {s.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        {s?.moduleType?.value}
                                                        {/* <span>1</span> */}
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <div>
                                                        <td>
                                                            <Button
                                                                color='dark'
                                                                isLight
                                                                icon='Edit'
                                                            >
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                className='ms-5'
                                                                color='dark'
                                                                isLight
                                                                icon='Delete'
                                                                data-toggle="modal"
                                                                data-target="#exampleModalCenter"
                                                            >
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                className='ms-5'
                                                                color='dark'
                                                                isLight
                                                                icon='Visibility'
                                                            >
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                className='ms-5'
                                                                color='dark'
                                                                isLight
                                                                icon='Info'>
                                                            </Button>
                                                        </td>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardBody>
                            <PaginationButtons
                                data={filteredData}
                                label='Module'
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                        </Card>
                    </div>
                </div>
            </Page >
            <ModuleModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id={''} />
        </PageWrapper >
    )
}
