import RoleSlice from './RoleReducer';
import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../../Store/index';
import { AxiosAPI } from '../../Axios/API/Axios';


const axios = AxiosAPI();

export const usersRole = createAsyncThunk("role",
	async () => {
		const response = await axios.get('/role')
		return response.data.payload
	}
)

export const addNewRole = createAsyncThunk("role",
	async (body: any) => {
		const response = await axios.post('/role', {
			name: body.name,
			parentId: parseInt(body.parentId),
		});
		console.log(response.data)
		return response.data.payload
	})


export const updateRole = createAsyncThunk('role',
	async (id: number, body: any) => {
		const response = await axios.patch(`/role/${id}`, {
			name: body.name,
			parentId: parseInt(body.parentId)
		})
		return response.data.payload
	})
