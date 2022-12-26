
import { FETCH_CUSTOMER } from '../action_types';

export default class CustomerAction {
    static Customers = (data: any) => {
        return {
            type: FETCH_CUSTOMER,
            payload: data,
        };
    };
}