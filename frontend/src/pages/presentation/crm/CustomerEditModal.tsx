import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
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

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
	editUser: any
}
const CustomerEditModal: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen, editUser, }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const formik = useFormik({
		initialValues: {
			Username: '',
			FirstName: editUser?.firstname || "",
			LastName: editUser?.lastname || "",
			Email: editUser?.email || "",
			Cnic: '',
			Password: editUser?.password || "",
			ConfirmPassWord: editUser?.password || "",
			Status: editUser?.isActive || "s",
			UserType: '',
			EmployeeStatus: '',
			JobTitle: '',
			Department: '',
			WorkPhone: '',
			ReportTo: '',
			MobileNumber: '',
			OtherPhone: '',
			Fax: '',
			IMType: '',
			IMName: '',
			City: '',
			Country: '',
			StreetAddress: '',
			StateRegion: '',
			Description: '',



		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values:any,{resetForm}) => {
			setIsOpen(false);
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				'Customer has been updated successfully',

			);
			resetForm({values:''})
		},
	});
	formik.values.FirstName = editUser?.firstname || ""
	formik.values.LastName = editUser?.lastname|| ""
	formik.values.Email = editUser?.email|| ""
	formik.values.Status = editUser?.isActive|| ""

	if (editUser !== null || id === "0") {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
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
										<FormGroup
											id='Username'
											label='Username'
											className='col-6'>
											< Input
												type='text'
												onChange={formik.handleChange}
												value={formik.values.Username}
											/>
										</FormGroup>
										<FormGroup id='FirstName' label='First Name' className='col-6'>
											<Input
												type='text'
												onChange={formik.handleChange}
												value={formik.values.FirstName}
											/>
										</FormGroup>
										<FormGroup id='LastName' label='Last Name' className='col-6'>
											<Input
												type='text'
												onChange={formik.handleChange}
												value={formik.values.LastName}
											/>
										</FormGroup>
										<FormGroup
											id='Email'
											label='Email'
											className='col-6'>
											<Input
												type='email'

												onChange={formik.handleChange}
												value={formik.values.Email}
											/>
										</FormGroup>
										<FormGroup id='Password' label='Password' className='col-6'>
											<Input
												type='password'

												onChange={() => formik.handleChange}
												value={formik.values.Password}
											/>
										</FormGroup>
										<FormGroup id='ConfirmPassWord' label='Confirm Password' className='col-6'>
											<Input
												type='password'

												onChange={formik.handleChange}
												value={formik.values.ConfirmPassWord}
											/>
										</FormGroup>

										<FormGroup className='col-6' id='Status' label='Status'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.Status}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='UserType' label='User Type'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.UserType}
											/>
										</FormGroup>
									</div>
								</CardBody>
							</Card>
						</div>

						{/* Employement Information Section */}

						<div className='col-md-12'>
							<Card className='rounded-1 mb-0' borderColor='muted'>
								<CardHeader>
									<CardLabel icon='ReceiptLong'>
										<CardTitle>Employement Information</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
										<FormGroup
											id='EmployeeStatus'
											label='Employement Status'
											className='col-6'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.EmployeeStatus}
											/>
										</FormGroup>
										<FormGroup
											id='JobTitle'
											label='Job Title'
											className='col-6'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.JobTitle}
											/>
										</FormGroup>
										<FormGroup id='Department' label='Department' className='col-6'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.Department}
											/>
										</FormGroup>
										<FormGroup id='WorkPhone' label='Work Phone #' className='col-6'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.WorkPhone}
											/>
										</FormGroup>
										<FormGroup
											id='ReportTo'
											label='Report To'
											className='col-6'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.ReportTo}
											/>
										</FormGroup>
										<FormGroup id='MobileNumber' label='Mobile #' className='col-6'>
											<Input
												type='tel'

												onChange={formik.handleChange}
												value={formik.values.MobileNumber}
											/>
										</FormGroup>
										<FormGroup id='OtherPhone' label='Other Phone #' className='col-6'>
											<Input
												type='tel'

												onChange={formik.handleChange}
												value={formik.values.OtherPhone}
											/>
										</FormGroup>

										<FormGroup className='col-6' id='Fax' label='Fax #'>
											<Input
												type='tel'

												onChange={formik.handleChange}
												value={formik.values.Fax}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='IMType' label='IM Type'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.IMType}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='IMName' label='IM Name'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.IMName}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='City' label='City'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.City}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='Country' label='Country'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.Country}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='StreetAddress' label='Street Address'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.StreetAddress}
											/>
										</FormGroup>
										<FormGroup className='col-6' id='StateRegion' label='States/Region'>
											<Input
												type='text'

												onChange={formik.handleChange}
												value={formik.values.StateRegion}
											/>
										</FormGroup>
										<FormGroup className='col-12' id='Description' label='Description'>
											<Input
												type='text'

												size='lg'
												onChange={formik.handleChange}
												value={formik.values.Description}
											/>
										</FormGroup>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button color='info' onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
	return null;
};
CustomerEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	editUser: PropTypes.any.isRequired,
};

export default CustomerEditModal;
