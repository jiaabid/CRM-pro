import React, { FC } from 'react';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';

const CampaingsComponent = () => {
    const { darkModeStatus } = useDarkMode();
    return (
        // <Page>

        <Card
            stretch
            shadow='sm'
            className={`bg-l${darkModeStatus ? 'o25' : '25'
                }-primary border-primary rounded-2 bg-transparent`}
        >
            <CardHeader className='bg-transparent'>
                <CardLabel icon='Campaign' iconColor='dark'>
                    <CardTitle className='h3 fs-5'>Campaigns</CardTitle>
                </CardLabel>
                <Button
                    icon='Add'
                    color='primary'
                    isLight

                >
                </Button>
            </CardHeader>
            <CardBody>
                <div className='d-flex align-items-center pb-2'>
                    <div className='flex-grow-1 ms-3'>
                        <div className='fw-bold fs-3 mb-0'>
                            15

                        </div>
                        <small>Total Campaigns</small>
                    </div>
                </div>
            </CardBody>
        </Card>
        // </Page>
    );
};

export default CampaingsComponent;
