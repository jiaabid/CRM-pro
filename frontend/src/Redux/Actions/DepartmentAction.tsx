import { DEPARTMENT, ADD_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from '../action_types'

export default class DepartmentAction {
    static Department = (data: any) => {
        return {
            type: DEPARTMENT,
            payload: data
        }
    }
    static NewDepartment = (data: any) => {
        return {
            type: ADD_DEPARTMENT,
            payload: data
        }
    }
    static UpdateDepartment = (data: any) => {
        return {
            type: UPDATE_DEPARTMENT,
            payload: data
        }
    }
    static DeleteDepartment = (data: any) => {
        return {
            type: DELETE_DEPARTMENT,
            payload: data
        }
    }
}