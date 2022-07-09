import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIResponse, Response } from "../../../types";

export const getDailyData = createAsyncThunk(
    'dailyData/getDailyData',
    async (date: string) => {
        const response: APIResponse<Response> = await (await axios.get(`https://api.covidtracking.com/v2/us/daily/${date}.json`)).data;
        return response.data
    }
);

export type DailyDataType = {
    loading: boolean
    data: Response | null
    error: string | undefined | null
};

const initialState: DailyDataType = {
    loading: true,
    data: null,
    error: null
};

export const dailyDataSlice = createSlice({
    name: 'dailyDataSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDailyData.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null
        })
        builder.addCase(getDailyData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(getDailyData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = null;
        })
    },
});

export default dailyDataSlice.reducer;