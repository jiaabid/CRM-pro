import React, { useEffect, useState } from 'react';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import { Project } from '../../menu';
import CommonSalePerformance from './CustomerDetailComponent';
import ComplainComponent from '../../components/MyComponents/ComplainComponent';
import EFormComponent from '../../components/MyComponents/E-FormComponent';
import can from '../../Configurations/CASL/can';
import AccountsComponent from '../../components/MyComponents/AccountsComponent';
import DebitCardComponent from '../../components/MyComponents/DebitCardComponent';
import CreditCardComponent from '../../components/MyComponents/CreditCardComponent';
import CampaingsComponent from '../../components/MyComponents/CampaingCoponent';

const CrmDashboard = () => {

    return (
        <PageWrapper>
            <Page>
                <div className='row'>
                    <div className='col-lg-9'>
                        <CommonSalePerformance />
                    </div>
                    <div className='col-lg-3'>
                        <div>
                            <div><ComplainComponent /></div>
                            <div><EFormComponent /></div>
                            <div><AccountsComponent /></div>
                            <div><DebitCardComponent /></div>
                            <div><CreditCardComponent /></div>
                            <div><CampaingsComponent /></div>
                        </div>
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
};

export default CrmDashboard;
