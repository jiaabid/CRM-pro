import React, { FC, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { CardBody, CardHeader, CardTitle } from '../bootstrap/Card';
import Icon from '../icon/Icon';
import Input from '../bootstrap/forms/Input';
import { useSelector } from 'react-redux';

interface IComplainModalProps {
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
}



const ComplainModel: FC<IComplainModalProps> = ({ isOpen, setIsOpen }) => {
    const { Customers } = useSelector((state: any) => state.customers)
    const Complains = Customers?.cstm_complain
    // const [searchInput, setsearchInput] = useState('')

    // const filteredData = Complains.filter(
    //     (f: any) =>
    //         // Name
    //         f.ComplainNo.toLowerCase().includes(searchInput.toLowerCase())
    // );

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullScreen titleId='Complain Table'>
            <ModalHeader setIsOpen={setIsOpen} className='text-center'>
            </ModalHeader>
            <ModalBody className='h-100 d-flex justify-content-center'>
                <div className='col-12 h-100 mb-5'>
                    <div className='col-12 h-100'>
                        <Card className='col-12 h-100'>
                            <CardHeader>
                                <CardTitle>
                                    <Icon icon='ReceiptLong' size='2x' className='mb-2 me-2' color='primary' />
                                    <span className='h4 fw-bold ms-2 mt-3'>Complains</span>
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
                                            <th scope='col' >Complain No</th>
                                            <th>Category</th>
                                            <th>Complaint Type</th>
                                            <th>Call Back Number 1 </th>
                                            <th>Call Back Number 1 </th>
                                            <th>Due Date 1 </th>
                                            <th>Due Date 2 </th>
                                            <th>Due Date 3 </th>
                                            <th>Status </th>
                                            <th>Assigned To </th>
                                            <th>Date Modified </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {Complains?.map((i: any) =>
                                            <tr>
                                                <td>{i?.name}</td>
                                                <td>{i?.category}</td>
                                                <td>{i?.complaint_type_text}</td>
                                                <td>{i?.call_back_number_1}</td>
                                                <td>{i?.call_back_number_2}</td>
                                                <td>{i?.due_date_1}</td>
                                                <td>{i?.due_date_2}</td>
                                                <td>{i?.due_date_3}</td>
                                                <td>{i?.status}</td>
                                                <td>{i?.assigned_user_id}</td>
                                                <td>{i?.date_modified}</td>

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


ComplainModel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default ComplainModel