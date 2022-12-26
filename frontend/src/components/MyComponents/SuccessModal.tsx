import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import Button from '../../components/bootstrap/Button';
import { useAppDispatch } from '../../Configurations/Hooks/Hooks';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import PermissionMiddleware from '../../Redux/Middlewares/PermissionMiddleware';


interface ISuccessModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;

}

const SuccessModal: FC<ISuccessModalProps> = ({ id, isOpen, setIsOpen }) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isCentered>
            <ModalHeader className='p-4'>
                <ModalTitle id='contained-modal-title-vcenter' className='text-white'>Success</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <div className='row-md-12'>
                        <div className="embed-responsive embed-responsive-22by9">
                            <iframe className="embed-responsive-item w-100" src="https://embed.lottiefiles.com/animation/27572"></iframe>
                        </div>
                    </div>
                </div>
                <div className="text-center h5 fw-bold mt-5">
                    <span className="">You Have Successfully Configure The Module</span>
                </div>
            </ModalBody>
            <ModalFooter className='d-flex justify-content-end'>
                <Button className='col-2' color='info' onClick={() => setIsOpen(false)}>
                    Okay
                </Button>
            </ModalFooter>
        </Modal>
    )
}

SuccessModal.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default SuccessModal
