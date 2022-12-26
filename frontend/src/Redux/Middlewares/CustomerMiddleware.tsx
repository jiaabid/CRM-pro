import showNotification from '../../components/extras/showNotification';
import { useCallback, useContext, useState } from 'react';
import ApiCaller from '../../Configurations/Axios/API/ApiHeaders';
import CustomerAction from '../Actions/CustomerAction';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');
const bearerHeaders = ApiCaller.BearerHeaders(token)


export default class CustomerMiddleware {

    static getCustomer(name: any, requestBody: any) {


        return async (dispatch: any) => {

            return new Promise(async (resolve, reject) => {
                try {
                    const token = await localStorage.getItem('token');
                    const response = await ApiCaller.Post(
                        'chthonic/request',
                        {
                            name,
                            requestBody: { requestBody }
                        },
                        bearerHeaders,
                    );
                    if (response.status == 201 || response.status == 200) {
                        // const next = useCallback(() => navigate(`/CustomerProfile/${requestBody.cnic}`), [navigate]);
                        console.log(response.data.payload)
                        dispatch(CustomerAction.Customers(response.data.payload));
                        resolve(response.data.payload);
                        // next()
                    } else {
                        reject(false);
                    }
                } catch (error: any) {
                    console.log(error)
                }
            });
        };
    }
}
