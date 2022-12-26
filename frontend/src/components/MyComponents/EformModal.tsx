import React, { FC, useState } from 'react';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { CardBody, CardHeader, CardTitle } from '../bootstrap/Card';
import Icon from '../icon/Icon';
import Input from '../bootstrap/forms/Input';

interface IEFORMModalProps {
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
}
const EFORMModal: FC<IEFORMModalProps> = ({ isOpen, setIsOpen }) => {

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} fullScreen titleId='Eforms Table'>
            <ModalHeader setIsOpen={setIsOpen} className='text-center'>
            </ModalHeader>
            <ModalBody className='h-100 d-flex justify-content-center'>
                <div className='col-10 h-100 mb-5'>
                    <div className='col-12 h-100'>
                        <Card className='col-12 h-100'>
                            <CardHeader>
                                <CardTitle>
                                    <Icon icon='FactCheck' size='2x' className='mb-2 me-2' color='primary' />
                                    <span className='h4 fw-bold ms-2 mt-3'>E-Forms</span>
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
                                            <th scope='col' >E-Forms</th>
                                            <th> Type</th>
                                            <th> Type</th>
                                            <th> Type</th>
                                            <th> Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
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


EFORMModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default EFORMModal