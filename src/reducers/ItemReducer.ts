import {Item} from "../model/Item.ts";
import axios from "axios";
import {createAsyncThunk, createSlice,PayloadAction} from "@reduxjs/toolkit";

export const initialState : Item [] = [];
const api = axios.create({
    baseURL: 'http://localhost:3000/item',
    headers:{
        'Content-Type': 'application/json',
    },
});

export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item:Item)=>{
        try {
            const resp = await api.post('/add',item);
            return resp.data;
        }catch (err){
            return console.error('Error creating item', err);
        }
    }
);

// create slice
const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers:{
        addItem(state, action:PayloadAction<Item>){
              state.push(action.payload);
        }
    },
    extraReducers:(builder)=>{
        //add item
        builder
            .addCase(saveItem.fulfilled,(state, action)=>{
                state.push(action.payload);
            })
            .addCase(saveItem.rejected,(state, action)=>{
                console.log("Failed to save item:", action.payload);
            })
            .addCase(saveItem.pending,(state, action)=>{
                console.log("Pending:", action.payload);

            })

    }
})

export const {addItem} = itemSlice.actions;
export default itemSlice.reducer;