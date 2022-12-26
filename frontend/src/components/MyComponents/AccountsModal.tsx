import React, { FC, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { CardBody, CardHeader, CardTitle } from '../bootstrap/Card';
import Icon from '../icon/Icon';
import Input from '../bootstrap/forms/Input';

interface IAccountsModalProps {
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
    accounts:any
}
const AccountsModal: FC<IAccountsModalProps> = ({ isOpen, setIsOpen,accounts }) => {

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullScreen titleId='Accounts Table'>
            <ModalHeader setIsOpen={setIsOpen} className='text-center'>
            </ModalHeader>
            <ModalBody className='h-100 d-flex justify-content-center'>
                <div className='col-10 h-100 mb-5'>
                    <div className='col-12 h-100'>
                        <Card className='col-12 h-100'>
                            <CardHeader>
                                <CardTitle>
                                    <Icon icon='Account Balance' size='2x' className='mb-2 me-2' color='primary' />
                                    <span className='h4 fw-bold ms-2 mt-3'>Accounts</span>
                                </CardTitle>
                                <div className="input-group w-50">
                                    <span className='input-group-text border-0 bg-transparent cursor-pointer'><Icon icon='Search' size='2x' color='primary' /></span>
                                    <Input id='searchInput'
                                        type='search'
                                        className='border-0 shadow-none bg-transparent'
                                        placeholder='Search User...'
                                    />
                                </div>
                                <Button
                                    className='float-end mb-4 me-4 mt-3'
                                    // icon='Verified'
                                    color='primary'
                                >
                                    Create New
                                </Button>
                            </CardHeader>
                            <CardBody isScrollable className='table-responsive '>
                                <table className='table table-modern table-hover '>
                                    <thead className='cursor-pointer text-decoration-underline'>
                                        <tr>
                                            {/* <th scope='col' >Accounts</th> */}
                                            <th scope='col'> Account Number</th>
                                            <th> Account Type</th>
                                            <th> Account Status</th>
                                            <th> Account Currency</th>
                                            <th> Branch Code </th>
                                            <th> Branch Name</th>
                                            <th> Correspondance Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {accounts?.map((i: any) => 
                                           <tr>
                                            {/* <td></td> */}
                                                <td>{i?.name}</td>
                                                <td>{i?.account_type_desc}</td>
                                                <td>{i?.account_status}</td>
                                                <td>{i?.account_currency}</td>
                                                {/* <td>{i?.call_back_number_2}</td> */}
                                                <td>{i?.branch_code}</td>
                                                <td>{i?.branch_name}</td>
                                               
                                                <td>{i?.correspondence_address}</td>

                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            {/* <PaginationButtons
                                data={items}
                                label='Permissions'
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            /> */}
                        </Card>
                    </div>
                </div>
            </ModalBody>
        </Modal >
    )

}


AccountsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default AccountsModal