import React, { useState } from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle, } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Wizard, { WizardItem } from '../../components/MyComponents/Wizard';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Select from '../../components/bootstrap/forms/Select';
import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Icon from '../../components/icon/Icon';
import { Project } from '../../menu';
import Option from '../../components/bootstrap/Option';
import { ModuleConfig } from './ModuleConfigurationHelper';
import can from '../../Configurations/CASL/can';



const EditWizardPage = () => {

    /////////////  DESTRUCTING VALUES PASS IN HELPER FILE    /////////////

    const { List,
        Module,
        Method,
        onClickValue,
        APICONFIG,
        apiRequest,
        apiResponse,
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        isValid,
        resetForm
    } = ModuleConfig()
    const [DefaultType, setDefaultType] = useState('api')




    return (
        <PageWrapper title={Project(can).Module.text}>
            <Page>
                <div className='row h-100 pb-3'>
                    <div className='col-lg-12 col-md-6'>
                        <Wizard
                            isHeader
                            color='info'
                            noValidate
                            className='shadow-1'
                            type={DefaultType}
                            APICONFIG={APICONFIG}
                            ApiRequest={apiRequest}
                            ApiResponse={apiResponse}
                            resetForm={resetForm}
                        >
                            <WizardItem id='step1' title='API CONFIGURATION' style={{ height: '30rem' }}>
                                <Card className='shadow-none h-100' stretch>
                                    <CardHeader>
                                        <CardLabel icon='Edit' iconColor='warning'>
                                            <CardTitle>Module Information</CardTitle>
                                        </CardLabel>
                                    </CardHeader>
                                    <CardBody className='pt-0'>
                                        <div className='row g-4'>
                                            <div className='col-md-12'>
                                                <FormGroup className='col-4' label='Select Module *'>
                                                    <Select
                                                        id='ModuleSelect'
                                                        ariaLabel='Board select'
                                                        placeholder='Select Module'
                                                        onChange={handleChange}
                                                        value={values.ModuleSelect}
                                                        invalidFeedback={errors.ModuleSelect}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.ModuleSelect}
                                                        className={touched.ModuleSelect && errors.ModuleSelect ? 'square border border-danger' : ''}
                                                    >
                                                        {Module.length > 0 && Module.map((el: any) => (
                                                            < Option key={el.id} value={el.id} >
                                                                {el.name}
                                                            </Option>

                                                        ))}
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                            {!values.ModuleSelect ? null :
                                                <div>
                                                    <div className='col-md-6'>
                                                        <FormGroup
                                                            id='ApiName'
                                                            label='Name *'
                                                        >
                                                            <Input
                                                                placeholder='API Name'
                                                                autoComplete='additional-name'
                                                                onChange={handleChange}
                                                                value={values.ApiName}
                                                                invalidFeedback={errors.ApiName}
                                                                onBlur={handleBlur}
                                                                isValid={isValid}
                                                                isTouched={touched.ApiName}
                                                                className={touched.ApiName && errors.ApiName ? 'square border border-danger' : ''}

                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-md-6 my-3'>
                                                        <FormGroup
                                                            id='URL'
                                                            label='URL: *'
                                                        >
                                                            <Input
                                                                type='url'
                                                                placeholder='https://www.example.com'
                                                                onChange={handleChange}
                                                                value={values.URL}
                                                                invalidFeedback={errors.URL}
                                                                onBlur={handleBlur}
                                                                isValid={isValid}
                                                                isTouched={touched.URL}
                                                                className={touched.URL && errors.URL ? 'square border border-danger' : ''}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <FormGroup label='API Type *' id='radioValue'>
                                                            <ChecksGroup isInline className='mt-2' id='radioValue' >
                                                                <Checks
                                                                    value='Rest Api'
                                                                    type='radio'
                                                                    label='Rest'
                                                                    name='radioValue'
                                                                    checked={values.radioValue}
                                                                    onChange={handleChange}
                                                                    invalidFeedback={errors.radioValue}
                                                                    onBlur={handleBlur}
                                                                    isValid={isValid}
                                                                    isTouched={touched.radioValue}
                                                                    className={touched.radioValue && errors.radioValue ? 'square border border-danger' : ''}

                                                                />
                                                                <Checks
                                                                    value='Soap Api'
                                                                    type='radio'
                                                                    label='Soap'
                                                                    name='radioValue'
                                                                    checked={values.radioValue}
                                                                    onChange={handleChange}
                                                                    invalidFeedback={errors.radioValue}
                                                                    onBlur={handleBlur}
                                                                    isValid={isValid}
                                                                    isTouched={touched.radioValue}
                                                                    className={touched.radioValue && errors.radioValue ? 'square border border-danger' : ''}

                                                                />
                                                            </ChecksGroup>
                                                        </FormGroup>
                                                    </div>
                                                    {values.radioValue === 'Rest Api' ?
                                                        <div className='col-md-6 mt-3'>
                                                            <FormGroup className='col-4' id='APIType' label='Rest API Method *'>
                                                                <Select
                                                                    ariaLabel='Board select'
                                                                    placeholder='API Method'
                                                                    onChange={handleChange}
                                                                    value={values.APIType}>
                                                                    {Method.length > 0 && Method.map((el: any) => (
                                                                        < Option key={el.id} value={el.id} >
                                                                            {el.value}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            </FormGroup>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </CardBody>
                                </Card>
                            </WizardItem>
                            <WizardItem id='step2' title='API Request' style={{ height: '30rem' }}>
                                <Card className='shadow-none h-100' stretch='full'>
                                    <CardHeader>
                                        <CardLabel icon='Edit' iconColor='warning'>
                                            <CardTitle>Request Information</CardTitle>
                                        </CardLabel>
                                    </CardHeader>
                                    <CardBody className='pt-0'>
                                        <div className='row g-4 '>
                                            <div className='col-lg-3'>
                                                <FormGroup
                                                    id='name'
                                                    label='Name'
                                                >
                                                    <Input
                                                        placeholder='Enter Name'
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        invalidFeedback={errors.name}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.name}
                                                        className={touched.name && errors.name ? 'square border border-danger' : ''}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-lg-3'>
                                                <FormGroup
                                                    id='label'
                                                    label='Label'
                                                >
                                                    <Input
                                                        placeholder='Enter Label'
                                                        onChange={handleChange}
                                                        value={values.label}
                                                        invalidFeedback={errors.label}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.label}
                                                        className={touched.label && errors.label ? 'square border border-danger' : ''}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-lg-3'>
                                                <FormGroup id='datatype' label='Select Data Type'>
                                                    <Select
                                                        id='datatype'
                                                        ariaLabel='Board select'
                                                        placeholder='Select Data Type'
                                                        onChange={handleChange}
                                                        value={values.datatype}
                                                        invalidFeedback={errors.datatype}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.datatype}
                                                        className={touched.datatype && errors.datatype ? 'square border border-danger' : ''}>
                                                        < Option value='String Value'>
                                                            String Value
                                                        </Option>
                                                        < Option value='Integer Value'>
                                                            Integer Value
                                                        </Option>
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-md-2'>
                                                <FormGroup label='Select'>
                                                    <ChecksGroup isInline className='mt-2'>
                                                        <Checks
                                                            type='checkbox'
                                                            label='Required'
                                                            name='required'
                                                            onChange={handleChange}
                                                            value='Required'
                                                            checked={values.required}
                                                            invalidFeedback={errors.required}
                                                            onBlur={handleBlur}
                                                            isValid={isValid}
                                                            isTouched={touched.required}
                                                            className={touched.required && errors.required ? 'square border border-danger' : ''}
                                                        />
                                                        <Checks
                                                            type='checkbox'
                                                            label='Null '
                                                            value='Null'
                                                            name='nullable'
                                                            onChange={handleChange}
                                                            checked={values.nullable}
                                                            invalidFeedback={errors.nullable}
                                                            onBlur={handleBlur}
                                                            isValid={isValid}
                                                            isTouched={touched.nullable}
                                                            className={touched.nullable && errors.nullable ? 'square border border-danger' : ''}
                                                        />
                                                    </ChecksGroup>
                                                </FormGroup>
                                            </div>
                                            <div className='col-md-1 my-5 mb-5'>
                                                <Button
                                                    // type=''
                                                    className='roung-3'
                                                    color='info'
                                                    isLight
                                                    onClick={(e: any) => {
                                                        // console.log(e)
                                                        onClickValue(e)
                                                        values.name = ''
                                                        values.label = ''
                                                        values.datatype = ''
                                                        values.required = false
                                                        values.nullable = false

                                                    }}
                                                >
                                                    <Icon icon='Add' />
                                                </Button>
                                            </div>
                                            {List.length > 0 ?
                                                <div className='w-100'>
                                                    <Card stretch className='w-100 shadow-none row-4' style={{ height: '17rem' }}>
                                                        <CardBody isScrollable className='table-responsive'>
                                                            <table className='table table-modern table-hover col-lg-12'>
                                                                <thead>
                                                                    <tr>
                                                                        <th
                                                                            className='cursor-pointer text-decoration-underline'>
                                                                            Name
                                                                        </th>
                                                                        <th>Label</th>
                                                                        <th>Data Type</th>
                                                                        <th>Required</th>
                                                                        <th>Nullable</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {List.map((item: any, index: any) => {

                                                                        return (<tr key={index}>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.label}</td>
                                                                            <td>{item.datatype}</td>
                                                                            <td>{item.required === true ? "Yes" : "-"}</td>
                                                                            <td>{item.nullable === true ? "Yes" : '-'}</td>
                                                                        </tr>)

                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                                : null}
                                        </div>
                                    </CardBody>
                                </Card>
                            </WizardItem>
                            <WizardItem id='step3' title='API Response' style={{ height: '30rem' }}>
                                <Card className='shadow-none h-100' stretch='full'>
                                    <CardHeader>
                                        <CardLabel icon='Edit' iconColor='warning'>
                                            <CardTitle>Response Information</CardTitle>
                                        </CardLabel>
                                    </CardHeader>
                                    <CardBody className='pt-0'>
                                        <div className='row g-4 '>
                                            <div className='col-lg-3'>
                                                <FormGroup
                                                    id='name'
                                                    label='Name'
                                                >
                                                    <Input
                                                        placeholder='Enter Name'
                                                        onChange={handleChange}
                                                        value={values.name}
                                                        invalidFeedback={errors.name}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.name}
                                                        className={touched.name && errors.name ? 'square border border-danger' : ''}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-lg-3'>
                                                <FormGroup
                                                    id='label'
                                                    label='Label'
                                                >
                                                    <Input
                                                        placeholder='Enter Label'
                                                        onChange={handleChange}
                                                        value={values.label}
                                                        invalidFeedback={errors.label}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.label}
                                                        className={touched.label && errors.label ? 'square border border-danger' : ''}
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className='col-lg-3'>
                                                <FormGroup id='datatype' label='Select Data Type'>
                                                    <Select
                                                        id=''
                                                        ariaLabel='Board select'
                                                        placeholder='Select Data Type'
                                                        onChange={handleChange}
                                                        value={values.datatype}
                                                        invalidFeedback={errors.datatype}
                                                        onBlur={handleBlur}
                                                        isValid={isValid}
                                                        isTouched={touched.datatype}
                                                        className={touched.datatype && errors.datatype ? 'square border border-danger' : ''}
                                                    >
                                                        < Option value='String Value'>
                                                            String Value
                                                        </Option>
                                                        < Option value='Integer Value'>
                                                            Integer Value
                                                        </Option>
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-md-2'>
                                                <FormGroup label='Select'>
                                                    <ChecksGroup isInline className='mt-2'>
                                                        <Checks
                                                            type='checkbox'
                                                            label='Required'
                                                            onChange={handleChange}
                                                            value='Required'
                                                            name='required'
                                                            checked={values.required}
                                                            invalidFeedback={errors.required}
                                                            onBlur={handleBlur}
                                                            isValid={isValid}
                                                            isTouched={touched.required}
                                                            className={touched.required && errors.required ? 'square border border-danger' : ''}
                                                        />
                                                        <Checks
                                                            type='checkbox'
                                                            label='Null '
                                                            value='Null'
                                                            name='nullable'
                                                            onChange={handleChange}
                                                            checked={values.nullable}
                                                            invalidFeedback={errors.nullable}
                                                            onBlur={handleBlur}
                                                            isValid={isValid}
                                                            isTouched={touched.nullable}
                                                            className={touched.nullable && errors.nullable ? 'square border border-danger' : ''}
                                                        />
                                                    </ChecksGroup>
                                                </FormGroup>
                                            </div>
                                            <div className='col-md-1 my-5 mb-5'>
                                                <Button
                                                    className='roung-3'
                                                    color='info'
                                                    isLight
                                                    onClick={(e: any) => {
                                                        // console.log(e)
                                                        onClickValue(e)
                                                        values.name = ''
                                                        values.label = ''
                                                        values.datatype = ''
                                                        values.required = false
                                                        values.nullable = false
                                                    }}
                                                >
                                                    <Icon icon='Add' />
                                                </Button>
                                            </div>
                                            {List.length > 0 ?
                                                <div className='w-100'>
                                                    <Card stretch className='w-100 shadow-none row-4' style={{ height: '17rem' }}>
                                                        <CardBody isScrollable className='table-responsive'>
                                                            <table className='table table-modern table-hover col-lg-12'>
                                                                <thead>
                                                                    <tr>
                                                                        <th
                                                                            className='cursor-pointer text-decoration-underline'>
                                                                            Name
                                                                        </th>
                                                                        <th>Label</th>
                                                                        <th>Data Type</th>
                                                                        <th>Required</th>
                                                                        <th>Nullable</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {List.map((item: any, index: any) => {
                                                                        return (<tr key={index}>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.label}</td>
                                                                            <td>{item.datatype}</td>
                                                                            <td>{item.required === true ? "Yes" : "-"}</td>
                                                                            <td>{item.nullable === true ? "Yes" : '-'}</td>
                                                                        </tr>)

                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                                : null}
                                        </div>
                                    </CardBody>
                                </Card>
                            </WizardItem>
                        </Wizard>
                    </div>
                </div>
            </Page>
        </PageWrapper >
    );
};

export default EditWizardPage;
