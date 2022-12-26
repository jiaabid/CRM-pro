import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
  CardBody, CardFooter, CardFooterRight, CardHeader,
  CardLabel,
  CardTitle,
  CardTabItem
} from '../../components/bootstrap/Card';
import PaginationButtons, {
  dataPagination,
} from '../../components/PaginationButtons';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import PAYMENTS from '../../common/data/enumPaymentMethod';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import { useAppDispatch } from '../../Configurations/Hooks/Hooks';
import { userApproval } from './UserApprovalHelper';
import RejectionModel from './RejectionModel';
import UserApprovalMiddleware from '../../Redux/Middlewares/UserApprovalMiddleware';
import can from '../../Configurations/CASL/can'



export default function User() {
  const { darkModeStatus } = useDarkMode();
  const dispatch = useAppDispatch()

  //////////   DESTRUCTURING VALUS FROM HELPER FILE      //////////

  const {
    Approvals,
    Pendings,
    Rejections,
    currentPage,
    perPage,
    setCurrentPage,
    setPerPage,
    editModalStatus,
    setEditModalStatus,
    onRejectClick,
    rejectID,
    onApprove
  } = userApproval()

  //////////   RENDERING API DATA WHEN COMPONENT MOUNT      //////////

  useEffect(() => {
    dispatch(UserApprovalMiddleware.Approvals("tome"))
  }, [])
  useEffect(() => {
    dispatch(UserApprovalMiddleware.Pendings("tome"))
  }, [])
  useEffect(() => {
    dispatch(UserApprovalMiddleware.Rejections("tome"))
  }, [])

  const formik = useFormik({
    initialValues: {
      searchInput: '',
      payment: Object.keys(PAYMENTS).map((i) => PAYMENTS[i].name),
      minPrice: '',
      maxPrice: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  //////////   USER INTERFACE (UI) CODE START FROM HERE      //////////

  return (
    <PageWrapper>
      <Page >
        <div className='row h-100'>
          <div className='col-12'>
            <Card hasTab>
              <CardTabItem id='profile2' title='Pendings' icon='pending_actions' >
                <Card
                  className='rounded-2'
                  tag='form'
                  onSubmit={formik.handleSubmit}>
                  <CardHeader>
                    <CardLabel icon='pending_actions'>
                      <CardTitle>Pendings Request</CardTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody>
                    <div className='row g-4'>
                      <table className='table table-modern table-hover text-align-center h-100'>
                        <thead className='cursor-pointer text-decoration-underline text-align-center'>
                          <tr>
                            <th scope='col'>Module Name</th>
                            <th scope='col'>Approval Type </th>
                            <th scope='col'>Assign To</th>
                            <th scope='col'>Actions</th>
                            {/* <th scope='col'>Can Delete</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {dataPagination(Pendings, currentPage, perPage).map((i: any) => (
                            <tr>
                              <td>{i.moduleName}</td>
                              <td>{i.approvalType}</td>
                              <td>{`${i?.approver.firstname} ${i?.approver.lastname}`}</td>
                              <td className='m-5'>
                                {can('canAdd', 'approval') && <Button color='success' isLight icon='Check Circle' onClick={() => onApprove(i.id)}>
                                  Approve
                                </Button>}
                                {can('canAdd', 'approval') && <Button className='ms-3' color='danger' isLight icon='Eject' onClick={() => onRejectClick(i.id)}>
                                  Reject
                                </Button>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <PaginationButtons
                    data={Pendings}
                    label='Approvals'
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                  />
                </Card>
              </CardTabItem>
              <CardTabItem id='profile' title='Approved' icon='Check Circle'>
                <Card
                  className='rounded-2'
                  tag='form'
                  onSubmit={formik.handleSubmit}>
                  <CardHeader>
                    <CardLabel icon='Check Circle'>
                      <CardTitle>Approve Request</CardTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody>
                    <div className='row g-4'>
                      <table className='table table-modern table-hover text-align-center h-100'>
                        <thead className='cursor-pointer text-decoration-underline'>
                          <tr>
                            <th scope='col'>Module Name</th>
                            <th scope='col'>Approval Type </th>
                            <th scope='col'>Assign To</th>
                            {/* <th scope='col'>Can Delete</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {dataPagination(Approvals, currentPage, perPage).map((i: any) => (
                            <tr>
                              <td>{i.moduleName}</td>
                              <td>{i.approvalType}</td>
                              <td>{`${i?.approver.firstname} ${i?.approver.lastname}`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <PaginationButtons
                    data={Approvals}
                    label='Approvals'
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                  />
                </Card>
              </CardTabItem>
              <CardTabItem id='address' title='Rejected' icon='Eject'>
                <Card
                  className='rounded-2'
                  tag='form'
                  onSubmit={formik.handleSubmit}>
                  <CardHeader>
                    <CardLabel icon='Eject'>
                      <CardTitle>Rejected Request</CardTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody>
                    <div className='row g-4'>
                      <table className='table table-modern table-hover text-align-center h-100'>
                        <thead className='cursor-pointer text-decoration-underline'>
                          <tr>
                            <th scope='col'>Module Name</th>
                            <th scope='col'>Approval Type </th>
                            <th scope='col'>Rejection Message</th>
                            <th scope='col'>Assign To</th>
                            {/* <th scope='col'>Can Delete</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {dataPagination(Rejections, currentPage, perPage).map((i: any) => (
                            <tr>
                              <td>{i.moduleName}</td>
                              <td>{i.approvalType}</td>
                              <td>{i.rejectionMessage}</td>
                              <td>{`${i?.approver.firstname} ${i?.approver.lastname}`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                  <PaginationButtons
                    data={Rejections}
                    label='Approvals'
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                  />
                </Card>
              </CardTabItem>
            </Card>
          </div>
        </div >
      </Page >

      <RejectionModel setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='' rejectId={rejectID} />
    </PageWrapper >
  )
}
