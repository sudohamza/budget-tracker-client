import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const incomeURL = "http://localhost:3000/income";

type IncomeDetails = {
  id: number;
  source: string;
  amount: number;
  receivedAt: string;
};

type IncomeSliceState = {
  incomeList: Array<IncomeDetails>;
  deleteDialog: number | false;
  isLoading: boolean;
  detailsDialog: boolean;
  editDetails: IncomeDetails | null;
};

const initialState: IncomeSliceState = {
  incomeList: [],
  deleteDialog: 0,
  isLoading: false,
  detailsDialog: false,
  editDetails: null,
};

type GetIncomeListPayload = {
  startAt?: string;
  endAt?: string;
};

export const getIncomeList = createAsyncThunk(
  "income/list",
  async function (payload: GetIncomeListPayload, thunkApi) {
    const params = new URLSearchParams();
    if (payload.endAt) {
      params.append("endAt", payload.endAt);
    }
    if (payload.startAt) {
      params.append("startAt", payload.startAt);
    }
    try {
      thunkApi.dispatch(startLoading());
      const { data } = await axios.get(`${incomeURL}?${params.toString()}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export type IncomeDetailsPayload = {
  source: string;
  amount: number;
  receivedAt: string;
};

export const createIncome = createAsyncThunk(
  "income/create",
  async function (values: IncomeDetailsPayload, thunkApi) {
    try {
      thunkApi.dispatch(startLoading());
      const { data } = await axios.post(incomeURL, values);
      thunkApi.dispatch(
        getIncomeList({ startAt: undefined, endAt: undefined })
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteIncome = createAsyncThunk(
  "income/delete",
  async function (id: number, thunkApi) {
    try {
      thunkApi.dispatch(startLoading());
      await axios.delete(`${incomeURL}/${id}`);
      thunkApi.dispatch(getIncomeList({}));
      return id;
    } catch (error) {
      return error;
    }
  }
);

type EditDetailsPayload = {
  id: number;
  values: IncomeDetails;
};

export const updateIncome = createAsyncThunk(
  "income/update",
  async function (payload: EditDetailsPayload, thunkApi) {
    try {
      await axios.patch(`${incomeURL}/${payload.id}`, payload.values);
      thunkApi.dispatch(getIncomeList({}));
      return;
    } catch (error) {
      return error;
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setDetailsDialog: (state, { payload }) => {
      if (payload === false) {
        state.detailsDialog = false;
        state.editDetails = null;
      } else {
        state.detailsDialog = true;
        const incomeItem = state.incomeList.find((item) => item.id === payload);
        if (incomeItem) {
          state.editDetails = incomeItem;
        }
      }
    },
    setDeleteDialog: (state, { payload }) => {
      state.deleteDialog = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncomeList.fulfilled, (state, actions) => {
        state.incomeList = actions.payload;
        state.isLoading = false;
      })
      .addCase(getIncomeList.rejected, (state) => {
        state.incomeList = [];
        state.isLoading = false;
      })
      .addCase(createIncome.fulfilled, (state) => {
        state.detailsDialog = false;
        state.isLoading = false;
      })
      .addCase(createIncome.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteIncome.fulfilled, (state) => {
        state.deleteDialog = false;
        state.isLoading = false;
      })
      .addCase(deleteIncome.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateIncome.fulfilled, (state) => {
        state.editDetails = null;
        state.isLoading = false;
        state.detailsDialog = false;
      })
      .addCase(updateIncome.rejected, () => {});
  },
});

export default incomeSlice.reducer;
export const { setDetailsDialog, setDeleteDialog, startLoading, stopLoading } =
  incomeSlice.actions;
