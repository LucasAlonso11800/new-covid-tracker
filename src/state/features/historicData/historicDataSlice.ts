import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIResponse, Response } from "../../../types";

export const getHistoricData = createAsyncThunk(
    'historicData/getHistoricData',
    async () => {
        const response: APIResponse<Response[]> = await (await axios.get('https://api.covidtracking.com/v2/us/daily.json')).data;
        return response.data
    }
);

export type HistoricDataType = {
    loading: boolean
    data: Response[]
    error: string | undefined | null
};

const initialState: HistoricDataType = {
    loading: true,
    data: [],
    error: null
};

export const historicDataSlice = createSlice({
    name: 'historicDataSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getHistoricData.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = null
        })
        builder.addCase(getHistoricData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(getHistoricData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = null;
        })
    },
});

export default historicDataSlice.reducer;