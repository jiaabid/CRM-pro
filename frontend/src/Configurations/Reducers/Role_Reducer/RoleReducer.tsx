import { createSlice, PayloadAction, current, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
// import axios from 'axios';
import { AxiosAPI } from '../../Axios/API/Axios';
import { RootState } from '../../Store';
import { addNewRole, updateRole, usersRole } from './RoleAction';


// const axios = AxiosAPI();

interface RoleState {
    Role: any[],
    AddRole: any[],
    status: string
}

let initialState: RoleState = {
    Role: [],
    AddRole: [],
    status: "pending"

}

const RoleSlice = createSlice({
    name: 'Roles',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [usersRole.fulfilled as any]: (state: any, action: PayloadAction<any>) => {
            console.log(current(state.Role), action.payload, 'in payload')
            state.Role = action.payload
            // return [...action.payload]
        },
        [addNewRole.fulfilled as any]: (state: RoleState, action: PayloadAction<any>) => {
            state.Role.push(action.payload)
        },
        // [updateRole.fulfilled as any]: (state: RoleState, action: PayloadAction<any>) => {
        //     state.Role.find((data: any) => {
        //         if (data.id === action.payload.id) {
        //             data = action.payload
        //         }

        //     })
        //     let itemIndex = state.Role.findIndex(el=>el.id == action.payload.id)
        //     state.Role.splice(itemIndex,1)
        //     state.Role.push(action.payload)
        //     console.log(current(state.Role))
        // }
    }
})


export default RoleSlice;