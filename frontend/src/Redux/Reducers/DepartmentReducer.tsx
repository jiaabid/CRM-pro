import { DEPARTMENT, ADD_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from '../action_types'

interface DepartmentState {
    Departments: any[]
}

const initialState: DepartmentState = {
    Departments: []
}

const DepartmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DEPARTMENT:
            state = { ...state, Departments: action.payload }
            break;

        case ADD_DEPARTMENT:
            let newDepart: any = [...state.Departments, action.payload]
            state = { ...state, Departments: newDepart }
            break;

        case UPDATE_DEPARTMENT:
            state = {
                ...state,
                Departments: state.Departments.map((el) => {
                    if (el.id === action.payload.id) {
                        el = action.payload;
                        return el;
                    }
                    return el;
                }),
            };
            break;
        case DELETE_DEPARTMENT:
            state = {
                ...state,
                Departments: state.Departments.filter((el: any) => el.id !== action.payload.id)
            }
            break;
        default:
            break
    }

    return state;
}

export default DepartmentReducer