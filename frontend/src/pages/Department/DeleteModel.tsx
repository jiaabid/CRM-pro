import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import Button from '../../components/bootstrap/Button';
import { useAppDispatch } from '../../Configurations/Hooks/Hooks';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import PermissionMiddleware from '../../Redux/Middlewares/PermissionMiddleware';
import DepartmentMiddleware from '../../Redux/Middlewares/DepartmentMiddelware';


interface IDeleteModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
    body: any

}

const DeleteModel: FC<IDeleteModalProps> = ({ id, isOpen, setIsOpen, body }) => {
    const dispatch = useAppDispatch();

    const deleteRole = async (id: any) => {
        await dispatch(DepartmentMiddleware.DeleteDepartments(id));
    };
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isCentered>
            <ModalHeader className='p-4'>
                <ModalTitle id='contained-modal-title-vcenter'>Modal heading</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <div className='row-md-12'>
                        <h4 className='bg-muted'>Confirmation</h4>
                        <span>Are you sure you want to Delete ?</span>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className='d-flex justify-content-end'>
                <Button className='col-2' color='info' onClick={() => {
                    setIsOpen(false)
                    deleteRole(body)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <Icon icon='Info' size='lg' className='me-1' />
                            <span>Deleted Succesfully</span>
                        </span>,
                        `Department has been Deleted Successfully`,

                    );
                }}>
                    Yes
                </Button>
                <Button className='col-2' color='info' onClick={() => setIsOpen(false)}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    )
}

DeleteModel.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default DeleteModel
