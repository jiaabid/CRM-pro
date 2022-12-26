import React, { FC, ReactNode } from 'react';
import { useMeasure } from 'react-use';

interface ITransactionFooterProps {
	children: ReactNode;
}
const TransactionFooter: FC<ITransactionFooterProps> = ({ children }) => {
	const [ref, { height }] = useMeasure<HTMLDivElement>();

	const root = document.documentElement;
	// root.style.setProperty('--footer-height', '170px');

	return (
		<footer ref={ref} className='footer bg-dark d-flex justify-content-evenly pt-3 pb-3 h-25'>
			{children}
		</footer>
	);
};

export default TransactionFooter;