import React, { FC, useState } from 'react';
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
import ComplainModel from './ComplainModal';
import Page from '../../layout/Page/Page';
import { useSelector } from 'react-redux';


const ComplainComponent = () => {
    const { darkModeStatus } = useDarkMode();
    const [ModalStatus, setModalStatus] = useState(false)
    const { Customers } = useSelector((state: any) => state.customers)
    const Complains = Customers?.cstm_complain
    return (
        // <Page>
<>
            <Card
                stretch
                shadow='sm'
                className={`bg-l${darkModeStatus ? 'o25' : '25'
                    }-danger border-danger rounded-2 bg-transparent`}
                // className='border border-danger'
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                <CardHeader className='bg-transparent'>
                    <CardLabel icon='ReceiptLong' iconColor='dark' className='fs-5'>
                        <CardTitle className='h3 fs-5'>Complains</CardTitle>
                    </CardLabel>
                    <Button
                        icon='Add'
                        color='danger'
                        isLight

                    >
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className='d-flex align-items-center pb-2'>
                        <div className='flex-grow-1 ms-3'>
                            <div className='fw-bold fs-3 mb-0'>
                                {Complains?.length}
                            </div>
                            <small>Total Complains</small>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <ComplainModel setIsOpen={setModalStatus} isOpen={ModalStatus} />
            </>
       
    );
};

export default ComplainComponent;
