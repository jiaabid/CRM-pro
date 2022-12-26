import React, { useState, useEffect, FC } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, { CardBody, CardFooter, CardFooterRight, CardHeader, CardLabel, CardTabItem, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from '../../components/bootstrap/forms/Select';
import Option from '../../components/bootstrap/Option';
import Input from '../../components/bootstrap/forms/Input';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import CustomerMiddleware from '../../Redux/Middlewares/CustomerMiddleware';
import { useNavigate } from 'react-router-dom';
import showNotification from '../../components/extras/showNotification';
import * as Yup from 'yup';
import classNames from 'classnames';


export default function User() {
    const dispatch: any = useDispatch()
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            cnic: ''
        },
        onSubmit: (values) => {
            if (values.cnic.length === 13) {
                dispatch(CustomerMiddleware.getCustomer("search profile", values.cnic))
                navigate(`/CustomerProfile/${values.cnic}`)
            }

        },
        validationSchema: Yup.object({
            cnic: Yup.string().required()
        })
    })

    return (
        <PageWrapper>
            <Page >
                <div className='row h-100'>
                    <div className='col-12 h-100'>
                        <Card hasTab className='col-12 h-100'>

                            {/* Quick Filter Tab Section  */}
                            <CardTabItem id='profile' title='Quick Filter' icon='FilterAlt'>
                                <Card
                                    className='rounded-2 h-100'
                                    tag='form'
                                    stretch
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            <Icon icon='Search' size='2x' className='mb-2 me-2' color='primary' />
                                            <span className='h4 fw-bold ms-2 mt-3'>Customer Search </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody isScrollable>
                                        <div className='row '>
                                            <FormGroup
                                                label='CNIC Number *'
                                                className={classNames(formik.touched.cnic && formik.errors.cnic ? 'text-primary' : '', 'col-4')}
                                            >
                                                <Input
                                                    id='cnic'
                                                    type='text'
                                                    placeholder='Enter Cnic Number'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.cnic}
                                                    onBlur={formik.handleBlur}
                                                    invalidFeedback={formik.errors.cnic}
                                                    isValid={formik.isValid}
                                                    className={formik.touched.cnic && formik.errors.cnic ? 'square border border-danger' : ''}
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                className='col-4'
                                                style={{ marginTop: '25px' }}
                                            >
                                                <Button color='info' onClick={formik.handleSubmit} isDisable={formik.values.cnic.length < 12}>
                                                    Search
                                                </Button>
                                            </FormGroup>
                                            <span className='text-danger ms-2 mt-2'>{formik.errors.cnic}</span>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardTabItem>


                            {/* Advance Filter Tab Section */}
                            <CardTabItem id='profile' title='Advance Filter' icon='FilterBAndW' >
                                <Card
                                    className='rounded-2 h-100'
                                    tag='form'
                                    stretch
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            <Icon icon='FilterBAndW' size='2x' className='mb-2 me-2' color='primary' />
                                            <span className='h4 fw-bold ms-2 mt-3'>Advance Filter</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody isScrollable>
                                        <div className='row'>
                                            <FormGroup
                                                label='Mobile Number'
                                                className='col-4'
                                            >
                                                <Input
                                                    type='text'
                                                    placeholder='Mobile Number'
                                                />
                                            </FormGroup>

                                            <FormGroup
                                                label='Customer Name :'
                                                className='col-4' >
                                                <Input
                                                    type='text'
                                                    placeholder='Customer Name'
                                                />
                                            </FormGroup>

                                            <FormGroup
                                                label='Phone Banking Status'
                                                className='col-4'>
                                                <Input
                                                    type='text'
                                                    placeholder='Banking Status'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                label='Passport Number'
                                                className='col-4 mt-4'>
                                                <Input
                                                    type='text'
                                                    placeholder='Type Number'
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className='row mt-5'>
                                            <FormGroup className='col-4' label='Layout Options'>
                                                <Select
                                                    ariaLabel='Board select'
                                                    placeholder='Select Options'
                                                >
                                                    < Option>
                                                        Option 1
                                                    </Option>
                                                    < Option>
                                                        Option 2
                                                    </Option>

                                                </Select>
                                            </FormGroup>
                                            <FormGroup
                                                label='Save Filter as : '
                                                className='col-4'>
                                                <Input
                                                    type='text'
                                                    placeholder='Example'
                                                />
                                            </FormGroup>
                                            <FormGroup className='col-4' label='My Filter'>
                                                <Select
                                                    ariaLabel='Board select'
                                                    placeholder='--None--'
                                                >
                                                    < Option>
                                                        Option 1
                                                    </Option>
                                                    < Option>
                                                        Option 2
                                                    </Option>

                                                </Select>
                                            </FormGroup>
                                        </div>

                                    </CardBody>
                                    <CardFooterRight>
                                        <div className='d-flex me-5  mb-5'>
                                            <Button color='info' className='ms-4'>
                                                Save
                                            </Button>
                                            <Button color='info' className='ms-2'>
                                                Reset
                                            </Button>
                                            <Button color='info' className='ms-2'>
                                                Cancel
                                            </Button>
                                        </div>
                                    </CardFooterRight>
                                </Card>
                            </CardTabItem>
                        </Card>
                    </div>
                </div>
            </Page >
        </PageWrapper >
    )
}