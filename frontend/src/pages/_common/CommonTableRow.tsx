import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Checks from '../../components/bootstrap/forms/Checks';
import Chart from '../../components/extras/Chart';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import { demoPages } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import { ApexOptions } from 'apexcharts';

interface ICommonTableRowProps {
	id: string | number;
	name: string;
	selectOnChange: any;
	selectChecked: any;
	selectName: string;
}
const CommonTableRow: FC<ICommonTableRowProps> = ({
	id,
	name,
	selectOnChange,
	selectChecked,
	selectName,
}) => {

	return (
		<tr>
			<th scope='row'>{name}</th>
			<th scope='row'>
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
				/>
			</th>
			<th scope='row'>
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
				/>
			</th>
			<th scope='row'>
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
				/>
			</th>
			<th scope='row'>
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
				/>
			</th>
		</tr>
	);
};

export default CommonTableRow;
