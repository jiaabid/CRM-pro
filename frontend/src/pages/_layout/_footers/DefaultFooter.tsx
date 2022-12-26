import React from 'react';
import classNames from 'classnames';
import useDarkMode from '../../../hooks/useDarkMode';
import Footer from '../../../layout/Footer/Footer';
import Logo from '../../../assets/img/Logo.png'

const DefaultFooter = () => {
	const { darkModeStatus } = useDarkMode();
	const CopyRight = new Date().getFullYear()

	return (
		<Footer> 
			<div className='container-fluid transparent'>
				<div className='row'>
					<div className='col mt-3'>
						<span className='fw-light'>Copyright © {CopyRight} - Version 2.0.0</span>
					</div>
					<div className='col-auto'>
						<a
							href='https://csquare.co/'
							target="_blank"
							className={classNames('text-decoration-none', {
								'link-dark': !darkModeStatus,
								'link-light': darkModeStatus,
							})}>
							<small className='fw-bold'>Powered by</small>
							<img src={Logo} alt="" width={60} />
						</a>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
