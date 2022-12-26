import { USER_APPROVAL, USER_REJECTED, USER_PENDING, REQUEST_REJECTED, REQUEST_APPROVE } from '../action_types'

export default class ARPActions {
    static Approvals = (data: any) => {
        return {
            type: USER_APPROVAL,
            payload: data
        }
    }
    static Rejections = (data: any) => {
        return {
            type: USER_REJECTED,
            payload: data
        }
    }
    static Pendings = (data: any) => {
        return {
            type: USER_PENDING,
            payload: data
        }
    }
    static requestRejected = (data: any) => {
        return {
            type: REQUEST_REJECTED,
            payload: data
        }

    }
    static requestApprove = (data: any) => {
        return {
            type: REQUEST_APPROVE,
            payload: data
        }

    }
}