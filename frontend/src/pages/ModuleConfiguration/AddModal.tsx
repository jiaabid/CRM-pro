import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../components/MyComponents/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Checks from '../../components/bootstrap/forms/Checks';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import ModuleMiddleware from '../../Redux/Middlewares/ModuleMiddleware';
import Select from '../../components/bootstrap/forms/Select';
import Option from '../../components/bootstrap/Option';


interface IModuleModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
}


const ModuleModal: FC<IModuleModalProps> = ({ id, isOpen, setIsOpen }) => {
    const { Module } = useSelector((state: any) => state.module)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(ModuleMiddleware.MethodType())
    }, [])

    console.log(Module)
    const AddNewModule = (name: any) => {
        dispatch(ModuleMiddleware.AddModule(name))
    }
    const { values, initialValues, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            name: '',
        },

        onSubmit: (values: any, { resetForm }) => {
            AddNewModule(values.name)
            setIsOpen(false);
            resetForm({ values: '' })
        },
    })
    if (id === '') {
        return (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId={id.toString()} >
                <ModalHeader setIsOpen={setIsOpen} resetForm={resetForm} className='p-4'>
                    <ModalTitle id={id}>MODULE</ModalTitle>
                </ModalHeader>
                <ModalBody className='px-4'>
                    <div className='row g-4'>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-0' borderColor='muted'>
                                <CardHeader className='bg-muted'>
                                    <CardLabel icon='ReceiptLong'>
                                        <CardTitle>ADD MODULE</CardTitle>
                                    </CardLabel>
                                </CardHeader>

                                <CardBody>
                                    <div className='row g-3'>
                                        <FormGroup
                                            id='name'
                                            label='Name'
                                            className='col-12'>
                                            <Input
                                                type='text'
                                                onChange={handleChange}
                                                value={values.name}
                                            />

                                        </FormGroup>
                                    </div>
                                </CardBody>
                                <CardFooter className='d-flex justify-content-end'>
                                    <Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={handleSubmit}>
                                        Save
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

ModuleModal.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};
export default ModuleModal
