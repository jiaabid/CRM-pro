import { USER_APPROVAL, USER_REJECTED, USER_PENDING, REQUEST_APPROVE, REQUEST_REJECTED } from '../action_types'

interface ARPSTATE {
    Approvals: any[],
    Rejections: any[],
    Pendings: any[]
}

const initialState: ARPSTATE = {
    Approvals: [],
    Rejections: [],
    Pendings: []
}

const ARPReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_APPROVAL:
            state = { ...state, Approvals: action.payload }
            break;

        case USER_REJECTED:
            state = { ...state, Rejections: action.payload }
            break;

        case USER_PENDING:
            state = { ...state, Pendings: action.payload }
            break;

        case REQUEST_REJECTED:
            let requestrejected = state.Pendings.filter(
                (el) => el.id !== action.payload
            )
            state = { ...state, Pendings: requestrejected }
            break;


        case REQUEST_APPROVE:
            let requestApprove = state.Pendings.filter((el) =>
                el.id !== action.payload
            )
            state = { ...state, Pendings: requestApprove }
            break;
        default:
            break;
    }
    return state;
}

export default ARPReducer