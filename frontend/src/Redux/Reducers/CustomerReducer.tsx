import { useNavigate } from 'react-router-dom';
import { FETCH_CUSTOMER } from '../action_types'

interface CustomerState {
    Customers: any
}

const initialState: CustomerState = {
    Customers: null
}
const CustomerReducer = (state = initialState, action: any) => {
    // const navigate = useNavigate();

    switch (action.type) {
        case FETCH_CUSTOMER:
            console.log(action.payload.responseData)
            state = { ...state, Customers: action.payload.responseData.data }
             
            
            break;


        default:
            break;
    }
    return state
}


export default CustomerReducer;