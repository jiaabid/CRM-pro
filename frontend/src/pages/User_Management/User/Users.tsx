import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle, } from '../../../components/bootstrap/Card';
import PaginationButtons, { dataPagination, PER_COUNT, } from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import CustomerEditModal from '../../../pages/presentation/crm/CustomerEditModal';
import useDarkMode from '../../../hooks/useDarkMode';
import OffCanvas, { OffCanvasBody, OffCanvasHeader, OffCanvasTitle, } from '../../../components/bootstrap/OffCanvas';
import Dropdown, { DropdownMenu, DropdownToggle, DropdownItem } from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Popovers from '../../../components/bootstrap/Popovers';
import { Project } from '../../../menu';
import { UserTable } from "./UserHelper"
import UserMiddleware from '../../../Redux/Middlewares/UserMiddleware';
import { useAppDispatch } from '../../../Configurations/Hooks/Hooks';
import NewUserModal from './UserAddModel';

import can from '../../../Configurations/CASL/can'




export default function User() {
  const { darkModeStatus } = useDarkMode();


  //////  DESTRUCTING FUNCTION AND STATES FROM USER-HELPER.TS FILE   //////


  const { EditValues,
    addUser,
    currentPage,
    editModalStatus,
    editUser,
    values,
    perPage,
    setCurrentPage,
    setEditModalStatus,
    setPerPage,
    viewUser,
    AllUsers,
    handleChange,
    ViewUserDetails,
    items
  } = UserTable()


  ////// MOUNTING API DATA WHEN PAGE RENDER   //////

  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log('im running')
    dispatch(UserMiddleware.Get_Users());
  }, []);


  //////   USER INTERFACE (UI) CODE START FROM HERE    //////
  return (
    <PageWrapper>
      <Page >
        <div className='row h-100'>
          <div className='col-12'>
            <Card stretch className='w-100'>
              <CardHeader className='bg-200-grey w-100'>
                <CardTitle className=' mt-2 ms-2'>
                  <Icon icon='PersonSearch' size='2x' className='mb-2 me-2' color='primary' />
                  <span className='h4 fw-bold ms-2' >USERS</span>
                </CardTitle>
                <div className="input-group w-50">
                  <span className='input-group-text border-0 bg-transparent cursor-pointer'><Icon icon='Search' size='2x' color='primary' /></span>
                  <Input id='searchInput'
                    type='search'
                    className='border-0 shadow-none bg-transparent'
                    placeholder='Search User...'
                    onChange={handleChange}
                    value={values.searchInput} />
                </div>
                <div className='d-flex justify-content-evenly'>
                  <Dropdown>
                    <DropdownToggle hasIcon={false}>
                      <Button
                        icon='FilterAlt'
                        color='primary'
                        isLight
                        className='btn-only-icon position-relative'>
                        {/* {data.length !== filteredData.length && ( */}
                        <Popovers desc='Filtering applied' trigger='hover'>
                          <span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
                            <span className='visually-hidden'>
                              there is filtering
                            </span>
                          </span>
                        </Popovers>
                        {/* )} */}
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
                  {can('canAdd', 'user') && <Button
                    icon='PersonAdd'
                    color='primary'
                    isLight
                    onClick={() => addUser()}>
                    New User
                  </Button>}
                </div>
              </CardHeader>
              <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover '>
                  <thead>
                    <tr>
                      <th
                        // onClick={() => requestSort('name')}
                        className='cursor-pointer text-decoration-underline'>
                        FirstName
                        <Icon
                          size='lg'
                          // className={getClassNamesFor('name')}
                          icon='FilterList'
                        />
                      </th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th>isActive</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody >
                    {dataPagination(items, currentPage, perPage).map((i) => (
                      <tr key={i.id}>
                        <td>{i.firstname}</td>
                        <td>{i.lastname}</td>
                        <td>
                          <Button
                            isLink
                            color='light'
                            icon='Email'
                            className='text-lowercase'
                            tag='a'
                            href={`mailto:${i.email}`}>
                            {i.email}
                          </Button>
                        </td>
                        <td>{i.isActive === true ? <Dropdown>
                          <DropdownToggle>
                            <Button color='success' icon='Circle' isLight>
                              Active
                            </Button>
                          </DropdownToggle>
                          <DropdownMenu isAlignmentEnd size='sm'>
                            <DropdownItem >
                              <Button color='danger' icon='Circle' isLight>
                                In Active
                              </Button>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                          : <Dropdown>
                            <DropdownToggle>
                              <Button color='danger' icon='Circle' isLight>
                                In Active
                              </Button>
                            </DropdownToggle>
                            <DropdownMenu isAlignmentEnd size='sm'>
                              <DropdownItem>
                                <Button color='success' icon='Circle' isLight>
                                  Active
                                </Button>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>}

                        </td>
                        <td>
                          <div className='d-flex justify-content-around'>
                            {can('canUpdate', 'user') && <td>
                              <Button
                                color='dark'
                                isLight
                                icon='Edit'
                                onClick={() => EditValues(i)}>
                              </Button>
                            </td>}
                            {can('canDelete', 'user') && <td>
                              <Button
                                color='dark'
                                isLight
                                icon='Delete'
                              >
                              </Button>
                            </td>}
                            <td>
                              <Button
                                color='dark'
                                isLight
                                icon='Visibility'
                                onClick={() => viewUser(i)}>
                              </Button>
                            </td>
                            <td>
                              <Button
                                color='dark'
                                isLight
                                icon='Info'
                                tag='a'
                                onClick={() => ViewUserDetails(i.id)}>
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
                label='Users'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page>
      <NewUserModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' editUser={editUser} />
    </PageWrapper>
  )
}
