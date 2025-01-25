import {Customer} from "../model/Customer.ts";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: Customer [] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/customer',
})

export const saveCustomer =createAsyncThunk(
    'customer/saveCustomer',
    async (customer:Customer)=>{
        try {
            const resp = await api.post('/add',customer);
            return resp.data;
        }catch(error){
            return console.log('error',error);
        }
    }
);


//create slice

const customerSlice = createSlice({
    name:'customer',
    initialState,
    reducers:{
        addCustomer(state, action:PayloadAction<Customer>){
            state.push(action.payload);
        }
    },

    extraReducers:(builder) => {
        builder
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.log("Failed to save customer:", action.payload);
            })
            .addCase(saveCustomer.pending, (state, action) => {
                console.log("Pending:",action.payload);
            });
    }
});
export const {addCustomer} = customerSlice.actions;
export default customerSlice.reducer;

