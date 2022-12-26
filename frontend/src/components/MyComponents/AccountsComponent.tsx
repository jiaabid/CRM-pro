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
import Page from '../../layout/Page/Page';
import AccountsModal from './AccountsModal';
import { useSelector } from 'react-redux';


const AccountsComponent = () => {
    const { darkModeStatus } = useDarkMode();
    const [ModalStatus, setModalStatus] = useState(false)
    const { Customers } = useSelector((state: any) => state.customers)
    const accounts = Customers?.cstm_accounts
    return (
        // <Page>
           <> <Card
                stretch
                shadow='sm'
                className={`bg-l${darkModeStatus ? 'o25' : '25'
                    }-success border-success rounded-2 bg-transparent`}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                <CardHeader className='bg-transparent'>
                    <CardLabel icon='Account Balance' iconColor='dark'>
                        <CardTitle className='h3 fs-5'>Accounts</CardTitle>
                    </CardLabel>
                    <Button
                        icon='Add'
                        color='success'
                        isLight

                    >
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className='d-flex align-items-center pb-2'>
                        <div className='flex-grow-1 ms-3'>
                            <div className='fw-bold fs-3 mb-0'>
                               {accounts?.length}
                            </div>
                            <small>Total Accounts</small>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <AccountsModal setIsOpen={setModalStatus} isOpen={ModalStatus} accounts={accounts}/>
            </>
        // </Page>
    );
};

export default AccountsComponent;
