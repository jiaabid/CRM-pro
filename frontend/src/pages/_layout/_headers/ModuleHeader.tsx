import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { componentsMenu, layoutMenu, Project } from '../../../menu';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import CommonHeaderRight from './CommonHeaderRight';
import can from '../../../Configurations/CASL/can';

const ModuleHeader = () => {
	const { width } = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft>
				<Navigation
					menu={Project(can).Module.subMenu}
					id='header-top-menu'
					horizontal={
						!!width && width >= Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
					}
				/>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default ModuleHeader;