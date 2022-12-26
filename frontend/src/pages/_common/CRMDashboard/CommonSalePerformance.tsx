import React, { useState } from 'react';
import moment from 'moment';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Chart, { IChartOptions } from '../../../components/extras/Chart';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';


interface ISalePerTab {
	[key: string]: 'Day' | 'Week' | 'Month';
}
const CommonSalePerformance = () => {

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle>Data Source</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='d-flex'>
				<div className='col-6'>
					<FormGroup label='Input 1' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
					<FormGroup label='Input 2' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
					<FormGroup label='Input 3' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
					<FormGroup label='Input 4' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
				</div>
				<div className='col-6'>
					<FormGroup label='Input 1' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
					<FormGroup label='Input 2' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
					<FormGroup label='Input 3' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
					<FormGroup label='Input 4' className='mt-2 col-10'>
						<Input type='text' />
					</FormGroup>
				</div>
			</CardBody>
		</Card >
	);
};

export default CommonSalePerformance;
