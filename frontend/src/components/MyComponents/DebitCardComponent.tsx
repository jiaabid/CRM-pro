import React, { FC } from 'react';
import classNames from 'classnames';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import topSalesData from '../../common/data/dummySalesData';
import { getFirstLetter, priceFormat } from '../../helpers/helpers';
import useDarkMode from '../../hooks/useDarkMode';
import { demoPages } from '../../menu';
import Icon from '../icon/Icon';
import Page from '../../layout/Page/Page';
import { useSelector } from 'react-redux';


const DebitCardComponent = () => {
    const { darkModeStatus } = useDarkMode();
    const { Customers } = useSelector((state: any) => state.customers)
    const debitCard = Customers?.cstm_debitCard
    return (
        // <Page>
            <Card
                stretch
                shadow='sm'
                className={`bg-l${darkModeStatus ? 'o25' : '25'
                    }-brand-two border-danger rounded-2 bg-transparent`}
            // className='border border-danger'
            >
                <CardHeader className='bg-transparent'>
                    <CardLabel icon='Credit Card' iconColor='dark'>
                        <CardTitle className='h3 fs-5'>Debit Cards</CardTitle>
                    </CardLabel>
                    <Button
                        icon='Add'
                        color='brand-two'
                        isLight

                    >
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className='d-flex align-items-center pb-2'>
                        <div className='flex-grow-1 ms-3'>
                            <div className='fw-bold fs-3 mb-0'>
                                {debitCard?.length}
                            </div>
                            <small>Total Debit Cards</small>
                        </div>
                    </div>
                </CardBody>
            </Card>
        // </Page>
    );
};

export default DebitCardComponent;
