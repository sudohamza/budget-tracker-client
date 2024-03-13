import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const incomeURL = "http://localhost:3000/expense";

type ExpenseDetails = {
  id: number;
  type: string;
  amount: number;
  spendAt: string;
};

type ExpenseSliceState = {
  expenseList: Array<ExpenseDetails>;
  deleteDialog: number | false;
  isLoading: boolean;
  detailsDialog: boolean;
  editDetails: ExpenseDetails | null;
  errMsg: string | undefined;
};

const initialState: ExpenseSliceState = {
  expenseList: [],
  deleteDialog: 0,
  isLoading: false,
  detailsDialog: false,
  editDetails: null,
  errMsg: "",
};

type GetExpenseListPayload = {
  startAt?: string;
  endAt?: string;
};

export const removeMsg = createAsyncThunk("expense/removeMsg", async () => {
  try {
    await new Promise((r) => setTimeout(r, 5000));
  } catch (error) {
    return error;
  }
});

export const getExpenseList = createAsyncThunk(
  "expense/list",
  async function (payload: GetExpenseListPayload, thunkApi) {
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

export type ExpenseDetailsPayload = {
  type: string;
  amount: number;
  spendAt: string;
};

export const createExpense = createAsyncThunk(
  "expense/create",
  async function (values: ExpenseDetailsPayload, thunkApi) {
    try {
      thunkApi.dispatch(startLoading());
      const { data } = await axios.post(incomeURL, values);
      thunkApi.dispatch(getExpenseList({}));
      return data;
    } catch (error: any) {
      thunkApi.dispatch(removeMsg());
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async function (id: number, thunkApi) {
    try {
      thunkApi.dispatch(startLoading());
      await axios.delete(`${incomeURL}/${id}`);
      thunkApi.dispatch(getExpenseList({}));
      return id;
    } catch (error) {
      return error;
    }
  }
);

type EditDetailsPayload = {
  id: number;
  values: ExpenseDetailsPayload;
};

export const updateExpense = createAsyncThunk(
  "expense/update",
  async function (payload: EditDetailsPayload, thunkApi) {
    try {
      await axios.patch(`${incomeURL}/${payload.id}`, payload.values);
      thunkApi.dispatch(getExpenseList({}));
      return;
    } catch (error) {
      return error;
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
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
        const expenseItem = state.expenseList.find(
          (item) => item.id === payload
        );
        if (expenseItem) {
          state.editDetails = expenseItem;
        }
      }
    },
    setDeleteDialog: (state, { payload }) => {
      state.deleteDialog = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenseList.fulfilled, (state, actions) => {
        state.expenseList = actions.payload;
        state.isLoading = false;
      })
      .addCase(getExpenseList.rejected, (state) => {
        state.expenseList = [];
        state.isLoading = false;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.detailsDialog = false;
        state.isLoading = false;
      })
      .addCase(createExpense.rejected, (state, { error }) => {
        state.isLoading = false;
        state.errMsg = error.message;
      })
      .addCase(deleteExpense.fulfilled, (state) => {
        state.deleteDialog = false;
        state.isLoading = false;
      })
      .addCase(deleteExpense.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateExpense.fulfilled, (state) => {
        state.editDetails = null;
        state.isLoading = false;
        state.detailsDialog = false;
      })
      .addCase(updateExpense.rejected, () => {})
      .addCase(removeMsg.fulfilled, (state) => {
        state.errMsg = "";
      });
  },
});

export default expenseSlice.reducer;
export const { setDetailsDialog, setDeleteDialog, startLoading, stopLoading } =
  expenseSlice.actions;
