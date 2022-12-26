import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Card, {
  CardBody, CardHeader,

  CardTitle,
} from '../../../components/bootstrap/Card';
import data from '../../../common/data/dummyCustomerData';
import PaginationButtons, {
  dataPagination,
  PER_COUNT,
} from '../../../components/PaginationButtons';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import PAYMENTS from '../../../common/data/enumPaymentMethod';
import useSortableData from '../../../hooks/useSortableData';
import useDarkMode from '../../../hooks/useDarkMode';
import Dropdown, {
  DropdownMenu,
  DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Popovers from '../../../components/bootstrap/Popovers';
import { userRole } from './UserRoleHepler';
import RoleModel from './RoleModel';
import DeleteModel from './DeleteModel';
import can from '../../../Configurations/CASL/can'


export default function User() {


  //////////   DESTRUCTING THE VALUES FROM FUNCTIONS IN HELPER      //////////

  const {
    Roles,
    editModalStatus,
    setEditModalStatus,
    newRole,
    EditValue,
    editRole,
    viewRole,
    ViewButton,
    deleteModel,
    setDeleteModel,
    onDelete,
    deleteBody,
    currentPage,
    perPage,
    setCurrentPage,
    setPerPage

  } = userRole()


  const formik = useFormik({
    initialValues: {
      searchInput: '',

    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const filteredData = Roles.filter(
    (f: any) =>
      // Name
      f.name.toLowerCase().includes(formik.values.searchInput.toLowerCase())
  );

  const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);



  //////////   USER INTERFACE (UI) CODE START FROM HERE   //////////

  return (
    <PageWrapper>

      <Page >
        <div className='row h-100'>
          <div className='col-12'>
            <Card stretch >
              <CardHeader className='bg-200-grey w-100'>
                <CardTitle className=' mt-2 ms-2'>
                  <Icon icon='PersonSearch' size='2x' className='mb-2 me-2' color='primary' />
                  <span className='h4 fw-bold ms-2' >Roles</span>
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
                        {Roles.length !== filteredData.length && (
                          <Popovers desc='Filtering applied' trigger='hover'>
                            <span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2'>
                            </span>
                          </Popovers>
                        )}
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
                  {can('canAdd', 'role') && <Button
                    icon='PersonAdd'
                    color='primary'
                    isLight
                    onClick={() => newRole()}>
                    New Role
                  </Button>}
                </div>
              </CardHeader>

              <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover '>
                  <thead>
                    <tr>
                      <th
                        onClick={() => requestSort('name')}
                        className='cursor-pointer text-decoration-underline'>
                        Name
                      </th>
                      <th>Parent Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody >
                    {dataPagination(items, currentPage, perPage).map((s) =>
                    (
                      <tr key={s.id}>
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
                          <div>{s.parentId !== null ? s.parent?.name : ('null')}</div>
                        </td>
                        <td>
                          <div>
                            {can('canAdd', 'role') && <td>
                              <Button
                                color='dark'
                                isLight
                                icon='Edit'
                                onClick={() => EditValue(s)}>
                              </Button>
                            </td>}
                            {can('canAdd', 'role') && <td>
                              <Button
                                className='ms-5'
                                color='dark'
                                isLight
                                icon='Delete'
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                onClick={() =>
                                  onDelete(s.id)
                                } >
                              </Button>
                            </td>}
                            <td>
                              <Button
                                className='ms-5'
                                color='dark'
                                isLight
                                icon='Visibility'
                                onClick={() => ViewButton(s)}
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
                        </td>
                      </tr>

                    )

                    )
                    }
                  </tbody>
                </table>
              </CardBody>
              <PaginationButtons
                data={filteredData}
                label='Roles'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </Card>
          </div>
        </div>
      </Page >
      {/* Edit button Model */}
      <DeleteModel setIsOpen={setDeleteModel} isOpen={deleteModel} id={''} body={deleteBody} />

      {/* Edit button Model */}
      <RoleModel setIsOpen={setEditModalStatus} isOpen={editModalStatus} id={''} editRole={editRole} viewRole={viewRole} />
    </PageWrapper >
  )
}
