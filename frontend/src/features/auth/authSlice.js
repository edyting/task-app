import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const localuser = JSON.parse(localStorage.getItem('user'));


const initialState ={
    user:localuser?localuser:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const register = createAsyncThunk('auth/register',async(user,thunkAPI)=>{
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=''
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading =true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading =false
            state.isSuccess =true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError =true
            state.isLoading =false
            state.user = null
            state.message= action.payload
        })
    },
})

export const {reset} =authSlice.actions;
export default authSlice.reducer;