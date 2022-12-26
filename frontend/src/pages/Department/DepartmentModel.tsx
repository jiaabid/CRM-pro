import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../components/MyComponents/Modal';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import showNotification from '../../components/extras/showNotification';
import Icon from '../../components/icon/Icon';
import DepartmentMiddleware from '../../Redux/Middlewares/DepartmentMiddelware';
import { useDispatch } from 'react-redux';

interface IDepartmentModelProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
    editDepartment: any;
    viewDepartment: any
    setEditDepartment: any
}


const DepartmentModel: FC<IDepartmentModelProps> = ({ id, isOpen, setIsOpen, editDepartment, setEditDepartment, viewDepartment }) => {
    const dispatch = useDispatch<any>()
    const AddNewRole = (name: any) => {
        dispatch(DepartmentMiddleware.NewDepartments(name))
    }


    const { values, handleChange, initialValues, handleSubmit, resetForm } = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values: any, { resetForm }) => {
            AddNewRole(values.name)
            setIsOpen(false);
            resetForm({
                values: {
                    name: ""
                }
            })
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>Department Created Successfully</span>
                </span>,
                'Department has been Created successfully',

            );
        }
    })

    const onUpdate = async () => {
        await dispatch(DepartmentMiddleware.UpdateDepartments(editDepartment.id, values.name))
        setIsOpen(false);
        setEditDepartment(null)
        resetForm({
            values: {
                name: ""
            }
        })
        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>Department Updated Successfully</span>
            </span>,
            'Department has been updated successfully',

        );
    }
    if (editDepartment !== null || viewDepartment !== null) {
        initialValues.name = editDepartment?.name || viewDepartment?.name || ""
        // resetForm({
        //     values:{
        //         name: viewDepartment.name
        //     }
        // })

    }
    else {
        initialValues.name = ""
    }
    if (editDepartment !== null || viewDepartment !== null || id === '') {
        return (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId={id.toString()} >
                <ModalHeader setIsOpen={setIsOpen} resetForm={resetForm} className='p-4'>
                    <ModalTitle id={id}>DEPARTMENT</ModalTitle>
                </ModalHeader>
                <ModalBody className='px-4'>
                    <div className='row g-4'>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-3' borderColor='muted'>
                                <CardHeader className='bg-muted'>
                                    <CardLabel icon='Ballot'>
                                        <CardTitle>ADD DEPARTMENT</CardTitle>
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
                                    {editDepartment ? <Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={() => onUpdate()}>
                                        Update
                                    </Button> :
                                        <Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={handleSubmit}>
                                            Save
                                        </Button>
                                    }
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </ModalBody>
            </Modal >

        )
    }
    return null

};

DepartmentModel.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    editDepartment: PropTypes.any.isRequired,
    viewDepartment: PropTypes.any.isRequired,
    setEditDepartment: PropTypes.any.isRequired
};
export default DepartmentModel
