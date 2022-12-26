import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '../../../components/MyComponents/Modal';
import data from '../../../common/data/dummyCustomerData';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import UserMiddleware from '../../../Redux/Middlewares/UserMiddleware';
import { useAppDispatch } from '../../../Configurations/Hooks/Hooks';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import RoleMiddleware from '../../../Redux/Middlewares/RoleMiddleware';
import DepartmentMiddleware from '../../../Redux/Middlewares/DepartmentMiddelware';
import Checks from '../../../components/bootstrap/forms/Checks';
import * as Yup from 'yup';

interface INewUserModalProps {
    id: string;
    isOpen: boolean;
    setIsOpen(...args: unknown[]): unknown;
    editUser: any
}
const NewUserModal: FC<INewUserModalProps> = ({ id, isOpen, setIsOpen, editUser, }) => {
    const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
    const item = id && Array.isArray(itemData) ? itemData[0] : {};
    const { AllUsers } = useSelector((state: any) => state.user);
    const { Roles } = useSelector((state: any) => state.role);
    const { Departments } = useSelector((state: any) => state.department)

    useEffect(() => {
        dispatch(RoleMiddleware.Get_Roles());
    }, []);

    useEffect(() => {
        dispatch(UserMiddleware.Get_Users());
    }, []);
    useEffect(() => {
        dispatch(DepartmentMiddleware.Departments());
    }, []);


    let password1 = document.getElementById('password')
    let password2 = document.getElementById('Confirmpassword')


    const dispatch = useAppDispatch()
    const AddUser = ({
        firstname,
        lastname,
        email,
        password,
        roleId,
        deptId,
        approverId,
        title,
        address,
        contact,
        isActive,
        city,
        region,
        country,
        postalCode,
        description,
    }: any) => {
        dispatch(UserMiddleware.Add_User(
            {
                firstname,
                lastname,
                email,
                password,
                roleId,
                deptId,
                approverId,
                title,
                address,
                contact,
                isActive,
                city,
                region,
                country,
                postalCode,
                description,
            }))
    }
    const { values, initialValues, handleBlur, handleChange, handleSubmit, errors, touched, isValid, resetForm }: any = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            roleId: '',
            deptId: '',
            approverId: '',
            title: '',
            address: '',
            contact: '',
            isActive: false,
            city: '',
            region: '',
            country: '',
            postalCode: '',
            description: ''
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit: (values: any, { resetForm }) => {
            AddUser({
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                roleId: values.roleId,
                deptId: parseInt(values.deptId),
                approverId: parseInt(values.approverId),
                title: values.title,
                address: values.address,
                contact: values.contact,
                isActive: Boolean(values.isActive),
                city: values.city,
                region: values.region,
                country: values.country,
                postalCode: values.postalCode,
                description: values.description,
            })
            resetForm({ values: '' })
            setIsOpen(false);
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required(),
            lastname: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
            isActive: Yup.boolean().required(),
            roleId: Yup.string().required(),
            title: Yup.string().required(),
            deptId: Yup.string().required(),
            approverId: Yup.string().required(),
            address: Yup.string().required(),
            contact: Yup.string().required(),
            city: Yup.string().required(),
            region: Yup.string().required(),
            country: Yup.string().required(),
            postalCode: Yup.string().required(),
            description: Yup.string().required(),

        })
    });
    initialValues.firstname = editUser?.firstname || ""
    initialValues.lastname = editUser?.lastname || ""
    initialValues.email = editUser?.email || ""
    initialValues.password = editUser?.password || ""
    initialValues.roleId = editUser?.roleId || ""
    initialValues.deptId = editUser?.deptId || ""
    initialValues.approverId = editUser?.approverId || ""
    initialValues.title = editUser?.title || ""
    initialValues.address = editUser?.address || ""
    initialValues.contact = editUser?.contact || ""
    initialValues.isActive = editUser?.isActive || ""
    initialValues.city = editUser?.city || ""
    initialValues.region = editUser?.region || ""
    initialValues.country = editUser?.country || ""
    initialValues.postalCode = editUser?.postalCode || ""
    initialValues.description = editUser?.description || ""

    console.log(values.roleId)
    if (editUser !== null || id === "0") {
        return (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()} >
                <ModalHeader setIsOpen={setIsOpen} resetForm={resetForm} className='p-4'>
                    <ModalTitle id={id}>{item?.name || 'New User'}</ModalTitle>
                </ModalHeader>
                <ModalBody className='px-4'>
                    <div className='row g-4'>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-0' borderColor='muted'>
                                <CardHeader className='bg-muted'>
                                    <CardLabel icon='ReceiptLong'>
                                        <CardTitle>User Information</CardTitle>
                                    </CardLabel>
                                </CardHeader>
                                <CardBody>
                                    <div className='row g-3'>

                                        <FormGroup id='firstname' label='First Name *' className='col-6'>
                                            <Input
                                                type='text'
                                                placeholder='First Name Here'
                                                onChange={handleChange}
                                                value={values.firstname}
                                                invalidFeedback={errors.firstname}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.firstname}
                                                className={touched.firstname && errors.firstname ? 'square border border-danger' : ''}
                                            />
                                            {/* <span className='text-danger ms-2 mt-2'>{errors.firstname}</span> */}

                                        </FormGroup>
                                        <FormGroup id='lastname' label='Last Name *' className='col-6'>
                                            <Input
                                                type='text'
                                                onChange={handleChange}
                                                value={values.lastname}
                                                invalidFeedback={errors.lastname}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.lastname}
                                                className={touched.lastname && errors.lastname ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup
                                            id='email'
                                            label='Email *'
                                            className='col-6'>
                                            <Input
                                                type='email'

                                                onChange={handleChange}
                                                value={values.email}
                                                invalidFeedback={errors.email}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.email}
                                                className={touched.email && errors.email ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup id='password' label='Password *' className='col-6'>
                                            <Input
                                                type='password'

                                                onChange={handleChange}
                                                value={values.password}
                                                invalidFeedback={errors.password}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.password}
                                                className={touched.password && errors.password ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup id='Confirmpassword' label='Confirm Password *' className='col-6'>
                                            <Input
                                                type='password'

                                                onChange={handleChange}
                                                value={values.Confirmpassword}
                                                invalidFeedback={errors.Confirmpassword}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.Confirmpassword}
                                                className={touched.Confirmpassword && errors.Confirmpassword ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup
                                            id='roleId'
                                            label='Role *'
                                            className='col-6'>
                                            <Select
                                                ariaLabel='Board select'
                                                placeholder='Select group'
                                                onChange={handleChange}
                                                value={values.roleId}
                                                onBlur={handleBlur}
                                                invalidFeedback={errors.roleId}
                                                isValid={isValid}
                                                isTouched={touched.roleId}
                                                className={touched.roleId && errors.roleId ? 'square border border-danger' : ''}>
                                                {
                                                    Roles.length > 0 && Roles.map((el: any) => (

                                                        < Option key={el.id} value={el.id} >
                                                            {el.name}
                                                        </Option>
                                                    ))
                                                }


                                            </Select>
                                        </FormGroup>
                                        <FormGroup className='col-6' id='deptId' label='Department'>
                                            <Select
                                                ariaLabel='Board select'
                                                placeholder='Select Department'
                                                onChange={handleChange}
                                                value={values.deptId}
                                                invalidFeedback={errors.deptId}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.deptId}
                                                className={touched.deptId && errors.deptId ? 'square border border-danger' : ''}>
                                                {
                                                    Departments.length > 0 && Departments.map((el: any) => (

                                                        < Option key={el.id} value={el.id} >
                                                            {el.name}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        </FormGroup>
                                        <FormGroup className='col-6' id='approverId' label='Approver'>
                                            <Select
                                                ariaLabel='Board select'
                                                placeholder='Select Approver'
                                                onChange={handleChange}
                                                value={values.approverId}
                                                invalidFeedback={errors.approverId}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.approverId}
                                                className={touched.approverId && errors.approverId ? 'square border border-danger' : ''}>
                                                {
                                                    AllUsers.length > 0 && AllUsers.map((el: any) => (

                                                        < Option key={el.id} value={el.id} >
                                                            {el.firstname}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        </FormGroup>
                                        <FormGroup className='col-6' id='title' label='title *'>
                                            <Input
                                                type='text'

                                                onChange={handleChange}
                                                value={values.title}
                                                invalidFeedback={errors.title}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.title}
                                                className={touched.title && errors.title ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='address' label='Address'>
                                            <Input
                                                type='text'

                                                onChange={handleChange}
                                                value={values.address}
                                                invalidFeedback={errors.address}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.address}
                                                className={touched.address && errors.address ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='contact' label='Contact'>
                                            <Input
                                                type='text'
                                                onChange={handleChange}
                                                value={values.contact}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='isActive' label='Status *'>
                                            <Checks
                                                label='Active'
                                                id='isActive'
                                                onChange={handleChange}
                                                checked={values.isActive}
                                                invalidFeedback={errors.isActive}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.isActive}
                                                className={touched.isActive && errors.isActive ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='city' label='City'>
                                            <Input
                                                type='text'

                                                onChange={handleChange}
                                                value={values.city}
                                                invalidFeedback={errors.isActive}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.isActive}
                                                className={touched.isActive && errors.isActive ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='region' label='Region'>
                                            <Input
                                                type='text'

                                                onChange={handleChange}
                                                value={values.region}
                                                invalidFeedback={errors.isActive}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.isActive}
                                                className={touched.isActive && errors.isActive ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='country' label='Country'>
                                            <Input
                                                type='text'

                                                onChange={handleChange}
                                                value={values.country}
                                                invalidFeedback={errors.isActive}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.isActive}
                                                className={touched.isActive && errors.isActive ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-6' id='postalCode' label='Postal Code'>
                                            <Input
                                                type='text'
                                                onChange={handleChange}
                                                value={values.postalCode}
                                                invalidFeedback={errors.isActive}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.isActive}
                                                className={touched.isActive && errors.isActive ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                        <FormGroup className='col-12' id='description' label='Description'>
                                            <Input
                                                type='text'
                                                onChange={handleChange}
                                                value={values.description}
                                                invalidFeedback={errors.isActive}
                                                onBlur={handleBlur}
                                                isValid={isValid}
                                                isTouched={touched.isActive}
                                                className={touched.isActive && errors.isActive ? 'square border border-danger' : ''}
                                            />
                                        </FormGroup>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter className='px-4 pb-4'>
                    <Button color='info' onClick={() => {
                        if (password2 !== password1) {
                            document.getElementsByTagName("span")[1].innerHTML = "Password Does'nt match "
                        }
                        handleSubmit

                    }}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
    return null;
};
NewUserModal.propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    editUser: PropTypes.any.isRequired,
};

export default NewUserModal;
