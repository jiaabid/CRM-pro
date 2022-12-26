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
	selectOnChange: any;
	selectName: string;
	item:any;
	checkDisable:boolean;
}
const CommonTableRow: FC<ICommonTableRowProps> = ({
	selectOnChange,
	selectName,
	item,
	checkDisable
}) => {
	return (
		<tr>
			<th scope='row'>{item.name}</th>
			<th scope='row'>
				<Checks
					id={item.id+"canAdd"}
					name={selectName}
					value={item.canAdd}
					onChange={()=>{
						 selectOnChange(item,"canAdd")}}
					checked={item.canAdd == true}
					disabled={checkDisable}
				/>
			</th>
			<th scope='row'>
				<Checks
					id={item.id+"canView"}
					name={selectName}
					value={item.canView}
					onChange={()=>{selectOnChange(item,"canView" )}}
					checked={item.canView == true}
					disabled={checkDisable}
				/>
			</th>
			<th scope='row'>
				<Checks
					id={item.id+"canUpdate"}
					name={selectName}
					value={item.canUpdate}
					onChange={()=>{selectOnChange(item,"canUpdate")}}
					checked={item.canUpdate == true}
					disabled={checkDisable}
				/>
			</th>
			<th scope='row'>
				<Checks
					id={item.id+"canDelete"}
					name={selectName}
					value={item.canDelete}
					onChange={()=>{selectOnChange(item,"canDelete" )}}
					checked={item.canDelete == true}
					disabled={checkDisable}
				/>
			</th>
		</tr>
	);
};

export default CommonTableRow;
