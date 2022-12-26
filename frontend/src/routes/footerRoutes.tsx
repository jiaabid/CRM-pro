import React from 'react';
import can from '../Configurations/CASL/can';
import { Project } from '../menu';
import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';
import TransactionTab from '../pages/_layout/_footers/TransactionTab';

const footers = [
	{ path: '/CustomerProfile/:cnic', element: <TransactionTab />, exact: true },
	{ path: Project(can).CustomerSearch.path, element: <DefaultFooter />, exact: true },
	{ path: '*', element: <DefaultFooter /> },
];

export default footers;
