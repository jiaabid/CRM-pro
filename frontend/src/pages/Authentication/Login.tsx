import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, { CardBody } from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import { useFormik } from 'formik';
import Spinner from '../../components/bootstrap/Spinner';
import { useLogin } from './helper';


//////////  LOGIN HEADER FUNCTION  //////////

const LoginHeader = () => {

  return (
    <>
      <h1 className='text-center fw-bold mt-5' style={{ color: '#f24141' }} >Welcome!</h1>
      <h4 className='text-center  text-dark mb-5' style={{ color: '#f24141' }} >Sign in to continue!</h4>
    </>
  );
};

interface ILoginProps {
  isSignIn?: boolean;
}



//////////  MAIN LOGIN FUNTION   //////////


const Login: FC<ILoginProps> = ({ isSignIn }) => {


  ////////// DESTRUCTING FUNTION FROM HELPER FILE  //////////

  const { isLoading, singInStatus, users, handleContinue, signInPassword, login } = useLogin()
  const { darkModeStatus } = useDarkMode();

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      loginEmail: '',
      loginPassword: '',
    },
    validate: (values) => {
      const errors: { loginEmail?: string; loginPassword?: string } = {};
      if (!values.loginEmail) {
        errors.loginEmail = 'Required';
      }
      if (!values.loginPassword) {
        errors.loginPassword = 'Required';
      }
      return errors;
    },
    validateOnChange: true,
    onSubmit: (values) => {
      if (!values.loginEmail) {
        return formik.setFieldError('Email is required!');

      }
      if (!values.loginPassword) {
        return formik.setFieldError('Password is required!');
      }

      login(values.loginEmail, values.loginPassword)
    }
  });

  //////////  USER INTERFACE (UI) CODE STARTS FROM HERE   //////////

  return (
    <PageWrapper
      isProtected={true}
      title={singInStatus ? 'Login' : 'Login'}
      className={classNames({ 'Page-Wrapper': PageWrapper })}
    >
      <Page className='p-0 '>
        <div className='row h-100 align-items-center justify-content-center'>
          <div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
            <Card className='card p-4' data-tour='login-page' style={{ height: '30rem' }}>
              <CardBody>
                <div className='text-center my-5'>
                  <Link
                    to='/'
                    className={classNames(
                      'text-decoration-none  fw-bold display-2',
                      {
                        'text-dark': !darkModeStatus,
                        'text-light': darkModeStatus,
                      },
                    )}>
                  </Link>
                </div>
                <div
                  className={classNames('rounded-3', {
                    'bg-l10-dark': !darkModeStatus,
                    'bg-dark': darkModeStatus,
                  })}>
                </div>
                <LoginHeader />
                <form className='row g-4'>
                  <>
                    <div className='col-12'>
                      <FormGroup
                        id='loginEmail'
                        isFloating
                        label='Your email'
                        className={classNames({
                          'd-none': signInPassword,
                        })}>
                        <Input
                          className='mt-5'
                          autoComplete='Email'
                          type='email'
                          value={formik.values.loginEmail}
                          isTouched={formik.touched.loginEmail}
                          invalidFeedback={
                            formik.errors.loginEmail
                          }
                          isValid={formik.isValid}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </FormGroup>
                      {signInPassword && users?.email && (
                        <div className='text-center h5 mb-3 fw-bold text-muted'>
                          Hi, {users?.firstname}.
                        </div>
                      )}
                      <FormGroup
                        id='loginPassword'
                        isFloating
                        label='Password'
                        className={classNames({
                          'd-none': !signInPassword,
                        })}>
                        <Input
                          type='password'
                          autoComplete='current-password'
                          value={formik.values.loginPassword}
                          isTouched={formik.touched.loginPassword}
                          invalidFeedback={
                            formik.errors.loginPassword
                          }
                          validFeedback='Looks good!'
                          isValid={formik.isValid}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        // onClick={handleContinue}
                        />
                      </FormGroup>
                    </div>
                    <div className='col-12'>
                      {!signInPassword ? (
                        <Button
                          style={{ backgroundColor: '#f24141' }}
                          color='warning'
                          className='w-100 py-3'
                          isDisable={!formik.values.loginEmail}
                          onClick={() => handleContinue(formik.values.loginEmail)}>
                          {isLoading && (
                            <Spinner isSmall inButton isGrow />
                          )}
                          Continue
                        </Button>
                      ) : (
                        <Button
                          style={{ backgroundColor: '#f24141' }}
                          color='warning'
                          className='w-100 py-3'
                          onClick={formik.handleSubmit}>
                          Login
                        </Button>
                      )}
                    </div>
                  </>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};


Login.propTypes = {
  isSignIn: PropTypes.bool,
};
Login.defaultProps = {
  isSignIn: false,
};

export default Login;
