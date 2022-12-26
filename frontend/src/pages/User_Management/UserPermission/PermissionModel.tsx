import react, { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../../../components/MyComponents/Modal';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { useFormik } from 'formik';
import Card, { CardBody, CardFooter, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Checks from '../../../components/bootstrap/forms/Checks';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { createPermissions, UserAction } from '../../../Configurations/Reducers/User_Reducer/UserAction';
import { useAppDispatch, useAppSelector } from '../../../Configurations/Hooks/Hooks';
import PermissionMiddleware from '../../../Redux/Middlewares/PermissionMiddleware';
import * as Yup from 'yup';


interface IUserPErmissionModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	editPermission: any
}


const PermissionModel: FC<IUserPErmissionModalProps> = ({ id, isOpen, setIsOpen, editPermission }) => {
	const permissions = useAppSelector(state => state.user.Permission)

	const dispatch = useAppDispatch()

	const AddNewPermission = (name: any) => {
		dispatch(PermissionMiddleware.AddPermissions(name))
	}
	const { values, initialValues, handleChange, handleSubmit, resetForm, errors, handleBlur, isValid, touched }: any = useFormik({
		initialValues: {
			name: '',
		},

		onSubmit: (values: any, { resetForm }) => {
			AddNewPermission(values.name);
			setIsOpen(false);
			resetForm({ values: '' })
		},
		validationSchema: Yup.object({
			name: Yup.string().required()
		})
	})
	const UpdatePermission = () => {
		dispatch(PermissionMiddleware.UpdatePermission(editPermission.id, values.name))
		setIsOpen(false)
	}

	if (editPermission) {
		initialValues.name = editPermission.name || ''
	}
	else {
		initialValues.name = ''
	}
	if (editPermission !== null || id === '') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId={id.toString()} >
				<ModalHeader setIsOpen={setIsOpen} resetForm={resetForm} className='p-4'>
					<ModalTitle id={id}>PERMISSION</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row g-4'>
						<div className='col-md-12'>
							<Card className='rounded-1 mb-0' borderColor='muted'>
								<CardHeader className='bg-muted'>
									<CardLabel icon='ReceiptLong'>
										{editPermission ? <CardTitle>UPDATE PERMISSION</CardTitle> : <CardTitle>ADD PERMISSION</CardTitle>}
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
												placeholder='Enter Department'
												onChange={handleChange}
												value={values.name}
												invalidFeedback={errors.name}
												onBlur={handleBlur}
												isValid={isValid}
												className={touched.name && errors.name ? 'square border border-danger' : ''}
											/>

										</FormGroup>
										<span className='text-danger ms-2 mt-2'>{errors.name}</span>

									</div>
								</CardBody>
								<CardFooter className='d-flex justify-content-end'>
									{editPermission ? <Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={() => UpdatePermission()}>
										Update
									</Button> :
										<Button className='col-4' isDisable={values.name.length < 3} color='info' onClick={handleSubmit}>
											Save
										</Button>}
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

PermissionModel.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	editPermission: PropTypes.any.isRequired
};
export default PermissionModel
