import React, { useState } from 'react';
import moment from 'moment';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../components/bootstrap/Card';
import Chart, { IChartOptions } from '../../components/extras/Chart';
import Input from '../../components/bootstrap/forms/Input';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Accordion, { AccordionItem } from '../../components/bootstrap/Accordion';
import Icon from '../../components/icon/Icon';
import { useSelector } from 'react-redux';


interface ISalePerTab {
    [key: string]: 'Day' | 'Week' | 'Month';
}
const CommonSalePerformance = () => {
    const { Customers } = useSelector((state: any) => state.customers)

    console.log(Customers, 'In Profile')
    return (
        <Card stretch>
            <CardHeader>
                <CardLabel>
                    <CardTitle className='ms-3 mt-3 h3'>
                        <Icon icon='RecentActors' color='info' size='3x' />
                        <span className='mr-5 mt-2'>  Customer Profile</span>
                    </CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className='row gap-4'>
                    <div className='col-lg-12'>
                        <Accordion className='row-lg-12 ' id='accSample' isFlush>
                            <AccordionItem
                                id='accor1'
                                title='Personal Information'
                                icon='Person'>
                                <div className='d-flex shadow-md p-4 mb-4' style={{ backgroundColor: '#e4e4e443', width: '100%' }}>
                                    <div className='col-6 d-flex'>
                                        <div className='d-flex flex-column'>
                                            <span className='fw-bold mb-2 '>Cnic : </span>
                                            <span className='fw-bold mb-2 '>Is Customer : </span>
                                            <span className='fw-bold mb-2 '>Father's Name :</span>
                                            <span className='fw-bold mb-2 '>Staff/Non-Staff : </span>
                                            <span className='fw-bold mb-2 '>Email : </span>
                                            <span className='fw-bold mb-2  '>Place of Birth : </span>
                                            <span className='fw-bold mb-2'>Profession : </span>
                                            <span className='fw-bold mb-2'>Office Number : </span>
                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{Customers?.name} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.is_customer === null ? 'No' : 'Yes'} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.father_name} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.staff_nonstaff === null ? 'No' : 'Yes'}  </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.email_address === null ? '-' : Customers?.email_address}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.place_of_birth === null ? '-' : Customers?.place_of_birth}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.profession === null ? '-' : Customers?.profession} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.office_number === null ? '-' : Customers?.office_number}</span>
                                        </div>
                                    </div>
                                    <div className='col-6 d-flex '>
                                        <div className='d-flex flex-column' >
                                            <span className='fw-bold mb-2'>Customer Name : </span>
                                            <span className='fw-bold mb-2'>Profile Type : </span>
                                            <span className='fw-bold mb-2'>Gender : </span>
                                            <span className='fw-bold mb-2'>Customer Type : </span>
                                            <span className='fw-bold mb-2'>Matrital Status : </span>
                                            <span className='fw-bold mb-2'>Nationality : </span>
                                            <span className='fw-bold mb-2'>Home Number : </span>
                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{Customers?.customer_name}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.profile_type} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.gender === 'M' ? 'Male' : "Female"} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.customer_type === null ? '-' : Customers?.customer_type} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.marital_status === null ? '-' : Customers?.marital_status}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.nationality} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.home_number === null ? '-' : Customers?.home_number}  </span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem
                                id='accor2'
                                title='Residence'
                                icon='Store'>
                                <div className='d-flex shadow-md p-4 mb-4' style={{ backgroundColor: '#e4e4e443', width: '100%' }}>
                                    <div className='col-12 d-flex'>
                                        <div className='d-flex flex-column'>
                                            <span className='fw-bold mb-2 '>Address 1 : </span>
                                            <span className='fw-bold mb-2 '>Address 2 : </span>
                                            <span className='fw-bold mb-2 '>Address 3 :</span>

                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{Customers?.address1 === null ? '-' : Customers?.address1} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.address2 === null ? '-' : Customers?.address2}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.address3 === null ? '-' : Customers?.address3} </span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem
                                id='accor3'
                                title='Bank Services'
                                icon='Settings Applications '>
                                <div className='d-flex shadow-md p-4 mb-4' style={{ backgroundColor: '#e4e4e443', width: '100%' }}>
                                    <div className='col-6 d-flex'>
                                        <div className='d-flex flex-column'>
                                            <span className='fw-bold mb-2 '>Mobile Banking : </span>
                                            <span className='fw-bold mb-2 '>Internet Banking : </span>
                                            <span className='fw-bold mb-2 '>Phone Banking :</span>
                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{Customers?.mobile_banking === null ? 'No' : Customers?.mobile_banking}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.ib === null ? 'No' : Customers?.ib} </span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.phone_banking === null ? 'No' : Customers?.phone_banking} </span>
                                        </div>
                                    </div>
                                    <div className='col-6 d-flex '>
                                        <div className='d-flex flex-column' >
                                            <span className='fw-bold mb-2 '>Mobile Banking Status : </span>
                                            <span className='fw-bold mb-2 '>Internet Banking Status : </span>
                                            <span className='fw-bold mb-2 '>Phone Banking Status :</span>
                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'> <Icon icon='Trip Origin' color={Customers?.mobile_banking_status === null || Customers?.mobile_banking_status === 'NO' ? "danger" : "success"} /></span>
                                            <span className='ms-4 text-muted mb-2'><Icon icon='Trip Origin' color={Customers?.ib_status === null || Customers?.ib_status === 'NO' ? "danger" : "success"} /> </span>
                                            <span className='ms-4 text-muted mb-2'><Icon icon='Trip Origin' color={Customers?.phone_banking_status === null || Customers?.phone_banking_status === 'NO' ? "danger" : "success"} /> </span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                            < AccordionItem
                                id='accor4'
                                title='KYC Feilds'
                                icon='Star Rate'>
                                <div className='d-flex shadow-md p-4 mb-4' style={{ backgroundColor: '#e4e4e443', width: '100%' }}>
                                    <div className='col-6 d-flex'>
                                        <div className='d-flex flex-column'>
                                            <span className='fw-bold mb-2 '>Date of Birth : </span>
                                            <span className='fw-bold mb-2 '>Mobile Number : </span>

                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'>{Customers?.dob === null ? '-' : Customers?.dob}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.mobile_number === null ? '-' : Customers?.mobile_number} </span>

                                        </div>
                                    </div>
                                    <div className='col-6 d-flex '>
                                        <div className='d-flex flex-column' >
                                            <span className='fw-bold mb-2 '>CNIC Expiry : </span>
                                            <span className='fw-bold mb-2 '>Mothers Maiden Name : </span>

                                        </div>
                                        <div className='d-flex flex-column' >
                                            <span className='ms-4 text-muted mb-2'> {Customers?.cnic_expiry === null ? '-' : Customers?.cnic_expiry}</span>
                                            <span className='ms-4 text-muted mb-2'>{Customers?.mothers_maiden_name === null ? '-' : Customers?.mothers_maiden_name} </span>

                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </CardBody>
        </Card >
    );
};

export default CommonSalePerformance;
