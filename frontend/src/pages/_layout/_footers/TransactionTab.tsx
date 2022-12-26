import React from 'react';
import classNames from 'classnames';
import useDarkMode from '../../../hooks/useDarkMode';
import TransactionFooter from '../../../layout/Footer/TransactionFooter';
import Logo from '../../../assets/img/Logo.png'
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import Popovers from '../../../components/bootstrap/Popovers';


const TransactionTab = () => {
    const { darkModeStatus } = useDarkMode();

    return (
        <TransactionFooter>
            <Popovers trigger='hover' desc='Balance Inquiry'>
                <Icon icon='Analytics' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='Funds Transfer (Own)'>
                <Icon icon='Swap Horiz' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='Funds Transfer (TPFT)'>
                <Icon icon='Compare Arrow' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='IBFT'>
                <Icon icon='Publish' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='Card Status Inquiry/Change'>
                <Icon icon='Credit Card' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='MobileApp Sub/UnSub'>
                <Icon icon='Phone Android' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='Account Statement'>
                <Icon icon='Account Balance Wallet' color='light' size='2x' />
            </Popovers>
            <Popovers trigger='hover' desc='Bill Inquiry/Bill Payment'>
                <Icon icon='Money' color='light' size='2x' />
            </Popovers>
        </TransactionFooter>
    );
};

export default TransactionTab
