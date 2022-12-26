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


const CreditCardComponent = () => {
    const { darkModeStatus } = useDarkMode();
    return (
        // <Page>
            <Card
                stretch
                shadow='sm'
                className={`bg-l${darkModeStatus ? 'o25' : '25'
                    }-brand border-storybook rounded-2`}
            // className='border border-danger'
            >
                <CardHeader className='bg-transparent'>
                    <CardLabel icon='Credit Card' iconColor='dark'>
                        <CardTitle className='h3 fs-5'>Credit Cards</CardTitle>
                    </CardLabel>
                    <Button
                        icon='Add'
                        color='brand'
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
                            <small>Total Credit Cards</small>
                        </div>
                    </div>
                </CardBody>
            </Card>
        // </Page>
    );
};

export default CreditCardComponent;
