import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/MyComponents/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import UserApprovalMiddleware from '../../Redux/Middlewares/UserApprovalMiddleware';
import { useAppDispatch } from '../../Configurations/Hooks/Hooks';


interface IRejectionModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
    rejectId: any
}


const RejectionModel: FC<IRejectionModalProps> = ({ id, isOpen, setIsOpen, rejectId }) => {
    const dispatch = useAppDispatch()

    const reject = () => {
        console.log(rejectId)
        dispatch(UserApprovalMiddleware.RejectionRequest(rejectId, values.rejectionMessage))
    }

    const { values, initialValues, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            rejectionMessage: '',
        },

        onSubmit: (values: any, { resetForm }) => {
            reject()
            setIsOpen(false);
            resetForm({ values: '' })
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>Rejection Message Created Successfully</span>
                </span>,
                'Rejection Message has been updated successfully',

            )
        },
    })

    if (id === '') {
        return (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId={id.toString()} >
                <ModalHeader setIsOpen={setIsOpen} resetForm={resetForm} className='p-4'>
                    <ModalTitle id={id}>REJECTION</ModalTitle>
                </ModalHeader>
                <ModalBody className='px-4'>
                    <div className='row g-4'>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-0' borderColor='muted'>
                                <CardHeader className='bg-muted'>
                                    <CardLabel icon='ReceiptLong'>
                                        <CardTitle>Rejection Message</CardTitle>
                                    </CardLabel>
                                </CardHeader>

                                <CardBody>
                                    <div className='row g-3'>
                                        <FormGroup
                                            id='rejectionMessage'
                                            label='Your Message'
                                            className='col-12'>
                                            <Input
                                                id='rejectionMessage'
                                                placeholder='Type Your Message Here'
                                                type='text'
                                                onChange={handleChange}
                                                value={values.rejectionMessage}
                                            />

                                        </FormGroup>
                                    </div>
                                </CardBody>
                                <CardFooter className='d-flex justify-content-end'>
                                    <Button className='col-4' isDisable={values?.rejectionMessage?.length < 3} color='info' onClick={handleSubmit}>
                                        Reject
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        )
    }
    return null

};

RejectionModel.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    rejectId: PropTypes.any.isRequired
};
export default RejectionModel
