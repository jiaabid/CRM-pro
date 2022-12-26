import React, { useState, useEffect, FC } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardFooter, CardFooterRight, CardHeader, CardLabel, CardTabItem, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Checks from '../../../components/bootstrap/forms/Checks';
import useDarkMode from '../../../hooks/useDarkMode';
import Icon from '../../../components/icon/Icon';
import { useAppDispatch, useAppSelector } from '../../../Configurations/Hooks/Hooks';
import { usersPermission } from './UserPemissionHelper';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../../components/PaginationButtons';
import PermissionModel from './PermissionModel';
import PermissionMiddleware from '../../../Redux/Middlewares/PermissionMiddleware';
import { useSelector } from 'react-redux';
import useSortableData from '../../../hooks/useSortableData';
import { Alert, FormGroup } from 'react-bootstrap';
import CommonTableRow from '../../_common/CommonTableRowPermission';
import useSelectTable from '../../../hooks/useSelectTable';
import DeleteModel from './DeleteModel';
import { useDispatch } from 'react-redux';
import PermissionAction from '../../../Redux/Actions/PermissionAction';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Can from '../../../Configurations/CASL/can'
import showNotification from '../../../components/extras/showNotification';
import RoleMiddleware from '../../../Redux/Middlewares/RoleMiddleware';
export default function User() {
  const {
    editModalStatus,
    setEditModalStatus,
    newPermission,
    UpdatePermission,
    editPermission,
    values,
    deleteBody,
    deleteModel,
    setDeleteModel,
    onDelete,
    handleChecked,
    Permissions,
    assignPermission,
    Roles,
    savePermissions,
    roleId,
    setRoleId,
    checkDisable,
    setCheckDisable,
    handleSelect,
    setPermissions
  } = usersPermission()
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(PermissionMiddleware.Permission());
    dispatch(RoleMiddleware.Get_Roles());
    setPermissions(Permissions);
    // defineRules();
  }, []);
  useEffect(() => {
    dispatch(RoleMiddleware.Get_Roles());
  }, []);


  // const filteredData = Permissions.filter(
  //   (f: any) =>

  //   // ((values.canAdd ? f.name === 'canAdd' : false) ||
  //   //   (values.canView ? f.name === 'canView' : false) ||
  //   //   (values.canUpdate ? f.name === 'canUpdate' : false) ||
  //   //   (values.canDelete ? f.name === 'canDelete' : false)),
  // );
  // const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
  // const { selectTable, SelectAllCheck } = useSelectTable(filteredData);

  console.log(Permissions)
  console.log(Roles)
  return (
    <PageWrapper>
      <Page >
        <div className='row h-100'>
          <div className='col-12 h-100'>
            <Card hasTab className='col-12 h-100'>

              {/***********  USER TAB SECTION ***********/}

              <CardTabItem id='profile' title='Roles' icon='Contacts'>
                <Card
                  className='rounded-2 h-100'
                  tag='form'
                  stretch
                >
                  <CardHeader>
                    <CardTitle>
                      <Icon icon='Contacts' size='2x' className='mb-2 me-2' color='primary' />
                      <span className='h4 fw-bold ms-2 mt-3'>Permissions</span>
                    </CardTitle>
                    {Can('canAdd', 'permission') && <Button
                      className='float-end mb-4 me-4 mt-3'
                      icon='Verified'
                      color='primary'
                      onClick={() => newPermission()}
                      isLight>
                      Create New
                    </Button>}
                  </CardHeader>
                  <CardBody isScrollable className='table-responsive '>
                    <table className='table table-modern table-hover '>
                      <thead className='cursor-pointer text-decoration-underline'>
                        <tr>
                          <th scope='col'>Permission Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPagination(Permissions, currentPage, perPage).map((i: any) => (
                          <tr>
                            <th>{i.name}</th>
                            <td>
                              <div>
                                {Can('canUpdate', 'permission') &&
                                  <td>
                                    <Button
                                      color='dark'
                                      isLight
                                      icon='Edit'
                                      onClick={() => UpdatePermission(i)}
                                    >
                                    </Button>
                                  </td>}
                                {Can('canDelete', 'permission') &&
                                  <td>
                                    <Button
                                      className='ms-5'
                                      color='dark'
                                      isLight
                                      icon='Delete'
                                      onClick={() => onDelete(i.id)}
                                    >
                                    </Button>
                                  </td>}
                                {Can('canView', 'permission') && <td>
                                  <Button
                                    className='ms-5'
                                    color='dark'
                                    isLight
                                    icon='Visibility'

                                  >
                                  </Button>
                                </td>}
                                <td>
                                  <Button
                                    className='ms-5'
                                    color='dark'
                                    isLight
                                    icon='Info'>
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
                    data={Permissions}
                    label='Permissions'
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                  />
                </Card>
              </CardTabItem>


              {/***********  ASSIGN PERMISSION TAB SETION ***********/}

              <CardTabItem id='profile' title='Assign Permissions' icon='AssignmentTurnedIn'  >
                <Card
                  className='rounded-2 h-100'
                  tag='form'
                  stretch
                >
                  <CardHeader>
                    <CardTitle>
                      <Icon icon='AssignmentTurnedIn' size='2x' className='mb-2 me-2' color='primary' />
                      <span className='h4 fw-bold ms-2 mt-3'>ASSIGN PERMISSION</span>
                    </CardTitle>
                    {/* select the role */}
                    <FormGroup className='col-6' id='roleId' >
                      <Select
                        ariaLabel='Board select'
                        placeholder='Select Role'
                        onChange={(e: any) => {
                          handleSelect(e.target.value)
                          // console.log()

                        }}
                        value={roleId}>
                        {
                          Roles.length > 0 && Roles.map((el: any) => (

                            <Option key={el.id} value={el.id} >
                              {el.name}
                            </Option>
                          ))
                        }
                      </Select>
                    </FormGroup>
                    {Can('canAdd', 'assign_permission') && <Button
                      className='float-end mb-4 me-4 mt-3'
                      icon='Verified'
                      color='primary'
                      onClick={() => {
                        savePermissions()


                      }}
                      isLight>
                      Save
                    </Button>}
                  </CardHeader>
                  <CardBody isScrollable className='table-responsive '>
                    <table className='table table-modern table-hover text-align-center h-100'>
                      <thead className='cursor-pointer text-decoration-underline'>
                        <tr>
                          <th scope='col'>Permission Name</th>
                          <th scope='col'>Can Add</th>
                          <th scope='col'>Can View</th>
                          <th scope='col'>Can Update</th>
                          <th scope='col'>Can Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPagination(assignPermission, currentPage, perPage).map((i: any) => (
                          <CommonTableRow
                            key={i.id}
                            item={i}
                            selectName='selectedList'
                            selectOnChange={handleChecked}
                            checkDisable={checkDisable}
                          />
                        ))}
                      </tbody>
                    </table>
                  </CardBody>
                  <PaginationButtons
                    data={Permissions}
                    label='Permissions'
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                  />
                </Card>
              </CardTabItem>
            </Card>
          </div>
        </div>
      </Page >

      <DeleteModel setIsOpen={setDeleteModel} isOpen={deleteModel} id={''} body={deleteBody} />
      <PermissionModel setIsOpen={setEditModalStatus} isOpen={editModalStatus} id={''} editPermission={editPermission} />
    </PageWrapper >
  )
}