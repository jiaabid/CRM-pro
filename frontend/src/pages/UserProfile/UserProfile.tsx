import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator, } from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import { Project } from '../../menu';
import Button from '../../components/bootstrap/Button';
import Card, { CardBody, CardHeader, CardLabel, CardTitle, } from '../../components/bootstrap/Card';
import Avatar from '../../components/Avatar';
import Icon from '../../components/icon/Icon';
import latestSalesData from '../../common/data/dummySalesData';
import useSortableData from '../../hooks/useSortableData';
import PaginationButtons, { dataPagination, PER_COUNT, } from '../../components/PaginationButtons';
import { useDispatch } from 'react-redux';
import UserMiddleware from '../../Redux/Middlewares/UserMiddleware';
import can from "../../Configurations/CASL/can"
import Logo from '../../assets/img/wanna/wanna1.png'

const Customer = () => {


    {/******************** HOOKS DECLERATIONS ********************/ }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['3']);
    const dispatch = useDispatch<any>()
    const [userData, setuserData] = useState<any>([])


    {/******************** RENDERING API DATA WHEN COMPONENT UPDATE OR MOUNT  ********************/ }

    useEffect(() => {
        const user: any = async () => {
            try {
                const data: any = await window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)
                const userDataByID: any = await dispatch(UserMiddleware.GetUserById(data))
                setuserData(userDataByID)
            } catch (error) {
                console.log(error)
            }
        }
        user()
    }, [])


    {/******************** GETTING SPECIFIC ARRAY FROM API   ********************/ }

    const EmployeeDetails = userData.employee
    const EmployeePermissions = userData?.role?.permissions




    {/******************** USER INTERFACE (UI) CODES START FROM HERE ********************/ }
    return (
        <PageWrapper>
            <SubHeader>
                <SubHeaderLeft>
                    <Button
                        color='primary'
                        isLink
                        icon='ArrowBack'
                        tag='a'
                        to={`../${Project(can).UserManagement.subMenu.Users.path}`}>
                        Back to List
                    </Button>
                    <SubheaderSeparator />
                    <span className='text-muted fst-italic me-2'>Created At : </span>
                    <span className='fw-bold'>{userData.createdAt}</span>
                </SubHeaderLeft>
                <SubHeaderRight>
                    <Button icon='Edit' color='primary' isLight>
                        Edit
                    </Button>
                </SubHeaderRight>
            </SubHeader>
            <Page>
                <div className='pt-3 pb-5 d-flex align-items-center'>
                    <span className='display-5 fw-bold me-3 h3'>{userData.firstname}</span>
                    <span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
                        {userData?.role?.name}
                    </span>
                </div>
                <div className='row'>
                    <div className='col-lg-4'>
                        <Card className='shadow-md-primary'>
                            <CardBody>
                                <div className='row g-5 py-3'>
                                    <div className='col-12 d-flex justify-content-center'>
                                        <Avatar
                                            src={Logo}
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <div className='row g-3'>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='flex-shrink-0'>
                                                        <Icon
                                                            icon='Mail'
                                                            size='3x'
                                                            color='primary'
                                                        />
                                                    </div>
                                                    <div className='flex-grow-1 ms-3'>
                                                        <div className='fw-bold fs-5 mb-0'>
                                                            {userData.email}
                                                        </div>
                                                        <div className='text-muted'>
                                                            Email Address
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='flex-shrink-0'>
                                                        {userData.isActive === true ? <Icon
                                                            icon='Circle'
                                                            size='2x'
                                                            color='success'
                                                        /> : <Icon
                                                            icon='Circle'
                                                            size='3x'
                                                            color='danger'
                                                        />}
                                                    </div>
                                                    <div className='ms-3'>
                                                        <div className='text-muted'>
                                                            Status
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-lg-8'>
                        <Card>
                            <CardHeader>
                                <CardLabel icon='Info'>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <div className='d-flex shadow-md p-4 mb-4' style={{ backgroundColor: '#e4e4e443', width: '100%' }}>
                                    <div className='col-6 d-flex'>
                                        <div className='d-flex flex-column'>
                                            <span className='fw-bold mb-2 '>Title : </span>
                                            <span className='fw-bold mb-2 '>Contact : </span>
                                            <span className='fw-bold mb-2 '>City : </span>
                                            <span className='fw-bold mb-2 '>Region : </span>
                                            <span className='fw-bold mb-2  '>Country : </span>
                                            <span className='fw-bold mb-2'>Postal Code : </span>
                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.title} </span>
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.contact} </span>

                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.city} </span>
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.region}</span>
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.country}</span>
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.postalCode} </span>

                                        </div>
                                    </div>
                                    <div className='col-6 d-flex '>
                                        <div className='d-flex flex-column' >
                                            <span className='fw-bold mb-2 '>Address :</span>
                                            <span className='fw-bold mb-2'>Description : </span>

                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.address} </span>
                                            <span className='ms-4 text-muted mb-2'>{EmployeeDetails?.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <Card>
                        <CardHeader>
                            <CardLabel icon='AssignmentTurnedIn'>
                                <CardTitle>Permission Assigned</CardTitle>
                            </CardLabel>
                        </CardHeader>
                        <CardBody>
                            <table className='table table-modern table-hover text-align-center h-100'>
                                <thead className='cursor-pointer text-decoration-underline'>
                                    <tr>
                                        <th scope='col'>Role Name</th>
                                        <th scope='col'>Can Add</th>
                                        <th scope='col'>Can View</th>
                                        <th scope='col'>Can Update</th>
                                        <th scope='col'>Can Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EmployeePermissions?.map((i: any) => (
                                        <tr>
                                            <td>{i.name}</td>
                                            <td>{i.canAdd === true ? <Icon icon='Check' color='success' /> : ""}</td>
                                            <td>{i.canView === true ? <Icon icon='Check' color='success' /> : ""}</td>
                                            <td>{i.canUpdate === true ? <Icon icon='Check' color='success' /> : ""}</td>
                                            <td>{i.canDelete === true ? <Icon icon='Check' color='success' /> : ""}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardBody>
                        <PaginationButtons
                            data={EmployeePermissions}
                            label='EmployeePermissions'
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    </Card>
                </div>
            </Page>
        </PageWrapper>
    );
};

export default Customer;



