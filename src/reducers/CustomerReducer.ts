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

export const UpdateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customer:Customer)=>{
        try {
            const resp = await api.put(`/update/${customer.CustomerID}`,customer);
            return resp.data;
        }catch (error){
            return console.log('error',error);
        }
    }
)

export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async ()=>{
        try {
            const resp = await api.get('/get');
            return resp.data;
        }catch (error){
            return console.log('error',error);
        }
    }
)

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
        //add customer
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
        //update customer
        builder
        .addCase(UpdateCustomer.rejected, (state, action) => {
            console.log("Failed to update customer:", action.payload);
        })
        .addCase(UpdateCustomer.fulfilled, (state, action) => {
            const customer = state.find((customer:Customer) => customer.Email === action.payload.Email);
            if (customer) {
                customer.Name = action.payload.Name;
                customer.Address = action.payload.address;

            }
        })
        .addCase(UpdateCustomer.pending, (state, action) => {
            console.log("Pending to update customer:", action.payload);
        });
        //get all customer
        builder
        .addCase(getCustomers.fulfilled, (state, action) => {
            action.payload.map((customer:Customer) => {
                state.push(customer);
            })
        })
        .addCase(getCustomers.pending, (state, action) => {
            console.log("Pending to get customer:", action.payload);
        })
        .addCase(getCustomers.rejected, (state, action) => {
            console.log("Rejected to get customer:", action.payload);
        })
    }
});



export const {addCustomer} = customerSlice.actions;
export default customerSlice.reducer;

