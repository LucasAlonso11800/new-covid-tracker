import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIResponse, Response } from "../../../types";
import { RootState } from "../../store";

export const getHistoricData = createAsyncThunk(
    'historicData/getHistoricData',
    async (_, thunkAPI) => {
        try {
            const response: APIResponse<Response[]> = await (await axios.get('https://api.covidtracking.com/v2/us/daily.json')).data;
            return response.data
        }
        catch (error) {
            throw thunkAPI.rejectWithValue(JSON.parse(JSON.stringify(error)))
        }
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
            const { message } = action.payload as AxiosError;
            state.loading = false;
            state.error = message;
        })
        builder.addCase(getHistoricData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = null;
        })
    },
});

export const selectHistoricData = (state: RootState) => state.historicData;

export default historicDataSlice.reducer;