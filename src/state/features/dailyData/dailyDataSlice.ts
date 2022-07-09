import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIResponse, Response } from "../../../types";

export const getDailyData = createAsyncThunk(
    'dailyData/getDailyData',
    async (date: string, thunkAPI) => {
        try {
            const response: APIResponse<Response> = await (await axios.get(`https://api.covidtracking.com/v2/us/daily/${date}.json`)).data;
            return response.data
        }
        catch (error) {
            throw thunkAPI.rejectWithValue(JSON.parse(JSON.stringify(error)))
        }
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
            const { message } = action.payload as AxiosError 
            state.loading = false;
            state.error = message;
        })
        builder.addCase(getDailyData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = null;
        })
    },
});

export default dailyDataSlice.reducer;