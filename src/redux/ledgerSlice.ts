import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ledgerURL = "http://localhost:3000/income/ledger";

type LedgerDetails = {
  id: number;
  type: string;
  title: string;
  amount: number;
  date: string;
};

type LedgerSliceState = {
  dataList: Array<LedgerDetails>;
};

const initialState: LedgerSliceState = {
  dataList: [],
};
type GetByDate = {
  startAt?: string;
  endAt?: string;
};

export const getLedgerData = createAsyncThunk(
  "ledger/data",
  async (payload: GetByDate) => {
    const params = new URLSearchParams();
    if (payload.endAt) {
      params.append("endAt", payload.endAt);
    }
    if (payload.startAt) {
      params.append("startAt", payload.startAt);
    }
    try {
      const { data } = await axios.get(`${ledgerURL}?${params.toString()}`);
      return data;
    } catch (error) {
      throw new Error("Received Error while getting ledger data");
    }
  }
);

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLedgerData.fulfilled, (state, action) => {
        state.dataList = action.payload;
        console.log(action.payload);
      })
      .addCase(getLedgerData.rejected, (_, { error }) => {
        console.log(error);
      });
  },
});

export default ledgerSlice.reducer;
