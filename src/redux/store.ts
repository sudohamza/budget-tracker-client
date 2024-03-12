import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import incomeReducer from "./incomeSlice";
import userReducer from "./userSlice";
import expenseReducer from "./expenseSlice";
import goalReducer from "./goalsSlice";
import dashboardReducer from "./dashboardSlice";
import ledgerReducer from "./ledgerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    income: incomeReducer,
    expense: expenseReducer,
    goal: goalReducer,
    dashboard: dashboardReducer,
    ledger: ledgerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
