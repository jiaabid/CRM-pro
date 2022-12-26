import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/MyComponents/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { useAppDispatch, useAppSelector } from '../../../Configurations/Hooks/Hooks';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { userRole } from './UserRoleHepler';
import RoleMiddleware from '../../../Redux/Middlewares/RoleMiddleware';
import * as Yup from 'yup';

interface IUserPErmissionModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
    editRole: any;
    viewRole: any
}


const RoleModel: FC<IUserPErmissionModalProps> = ({ id, isOpen, setIsOpen, editRole, viewRole }) => {
    const { Roles } = userRole()
    const dispatch = useAppDispatch()

    const AddNewRole = (name: any, parentId: any) => {
        dispatch(RoleMiddleware.Add_Role(name, parentId))
    }


    const { values, resetForm, handleChange, initialValues, handleSubmit, errors, touched, handleBlur, isValid }: any = useFormik({
        initialValues: {
            name: '',
            parentId: ''
        },
        onSubmit: (values: any, { resetForm }) => {
            AddNewRole(values.name, values.parentId)
            setIsOpen(false);
            resetForm({ values: '' })
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            parentId: Yup.string().required(),

        })
    })

    if (editRole || viewRole) {
        initialValues.name = editRole?.name || viewRole?.name
        initialValues.parentId = editRole?.parentId || viewRole?.parentId
    }
    else {
        initialValues.name = ""
        initialValues.parentId = ""
    }

    const onUpdate = async () => {
        await dispatch(RoleMiddleware.Update_Role(editRole.id, values.name, values.parentId))
        setIsOpen(false);
    }

    if (editRole !== null || viewRole !== null || id === '') {
        return (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId={id.toString()} >
                <ModalHeader setIsOpen={setIsOpen} resetForm={resetForm} className='p-4'>
                    <ModalTitle id={id}>ROLE</ModalTitle>
                </ModalHeader>
                <ModalBody className='px-4'>
                    <div className='row g-4'>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-3' borderColor='muted'>
                                <CardHeader className='bg-muted'>
                                    <CardLabel icon='ReceiptLong'>
                                        {editRole ? <CardTitle>UPDATE ROLE</CardTitle> : <CardTitle>ADD ROLE</CardTitle>}
                                    </CardLabel>
                                </CardHeader>

                                <CardBody>
                                    <div className='row g-3'>
                                        <FormGroup
                                            id='name'
                                            label='Name *'
                                            className='col-12'>
                                            <Input
                                                type='text'
                                                placeholder='Enter Role'
                                                onChange={handleChange}
                                                value={values.name}
                                                onBlur={handleBlur}
                                                invalidFeedback={errors.name}
                                                isValid={isValid}
                                                className={touched.name && errors.name ? 'square border border-danger' : ''}
                                            />

                                        </FormGroup>
                                        <span className='text-danger ms-2 mt-2'>{errors.name}</span>
                                        <FormGroup
                                            id='parentId'
                                            label='Parent *'
                                            className='col-12'>
                                            <Select
                                                ariaLabel='Board select'
                                                placeholder='Select group'
                                                onChange={handleChange}
                                                value={values.parentId}
                                                onBlur={handleBlur}
                                                invalidFeedback={errors.parentId}
                                                isValid={isValid}
                                                className={touched.parentId && errors.parentId ? 'square border border-danger' : ''}>
                                                {
                                                    Roles.length > 0 && Roles.map((el: any) => (

                                                        < Option key={el.id} value={el.id} >
                                                            {el.name}
                                                        </Option>
                                                    ))
                                                }


                                            </Select>
                                        </FormGroup>
                                        <span className='text-danger ms-2 mt-2'>{errors.parentId}</span>
                                    </div>
                                </CardBody>
                                <CardFooter className='d-flex justify-content-end'>
                                    {editRole ? <Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={() => onUpdate()}>
                                        Update
                                    </Button> : <Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={handleSubmit}>
                                        Save
                                    </Button>}

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

RoleModel.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    editRole: PropTypes.any.isRequired,
    viewRole: PropTypes.any.isRequired
};
export default RoleModel
