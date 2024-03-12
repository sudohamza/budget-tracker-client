import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const incomeURL = "http://localhost:3000/income";
const expenseURL = "http://localhost:3000/expense";

type GoalDetails = {
  name: string;
  amount: number;
  endDate: string;
};

type DashboardSliceState = {
  totalIncome: number;
  totalSavings: number;
  totalExpenses: number;
  goalList: Array<GoalDetails>;
};

const initialState: DashboardSliceState = {
  totalIncome: 0,
  totalSavings: 0,
  totalExpenses: 0,
  goalList: [],
};

export const getTotalIncome = createAsyncThunk("dashboard/income", async () => {
  try {
    const { data } = await axios.get(incomeURL);
    const totalIncome = data.reduce((acc: number, item: any) => {
      acc += item.amount;
      return acc;
    }, 0);
    console.log(totalIncome);
    return totalIncome;
  } catch (error) {
    throw new Error("Error in get all income");
  }
});
export const getTotalExpense = createAsyncThunk(
  "dashboard/expense",
  async () => {
    try {
      const { data } = await axios.get(expenseURL);
      const totalExpense = data.reduce((acc: number, item: any) => {
        acc += item.amount;
        return acc;
      }, 0);
      console.log(totalExpense);
      return totalExpense;
    } catch (error) {
      throw new Error("Error in get all income");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalIncome.fulfilled, (state, action) => {
        state.totalIncome = action.payload;
      })
      .addCase(getTotalExpense.fulfilled, (state, action) => {
        state.totalExpenses = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
