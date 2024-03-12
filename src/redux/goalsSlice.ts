import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const incomeURL = "http://localhost:3000/goal";

type GoalDetails = {
  id: number;
  name: string;
  amount: number;
  endDate: string;
};

type GoalSliceState = {
  goalList: Array<GoalDetails>;
  deleteDialog: number | false;
  isLoading: boolean;
  detailsDialog: boolean;
  editDetails: GoalDetails | null;
};

const initialState: GoalSliceState = {
  goalList: [],
  deleteDialog: 0,
  isLoading: false,
  detailsDialog: false,
  editDetails: null,
};

type GetGoalListPayload = {
  startAt?: string;
  endAt?: string;
};

export const getGoalList = createAsyncThunk(
  "goal/list",
  async function (payload: GetGoalListPayload, thunkApi) {
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

export type GoalDetailsPayload = {
  name: string;
  amount: number;
  endDate: string;
};

export const createGoal = createAsyncThunk(
  "goal/create",
  async function (values: GoalDetailsPayload, thunkApi) {
    try {
      thunkApi.dispatch(startLoading());
      const { data } = await axios.post(incomeURL, values);
      thunkApi.dispatch(getGoalList({}));
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goal/delete",
  async function (id: number, thunkApi) {
    try {
      thunkApi.dispatch(startLoading());
      await axios.delete(`${incomeURL}/${id}`);
      thunkApi.dispatch(getGoalList({}));
      return id;
    } catch (error) {
      return error;
    }
  }
);

type EditDetailsPayload = {
  id: number;
  values: GoalDetailsPayload;
};

export const updateGoal = createAsyncThunk(
  "Goal/update",
  async function (payload: EditDetailsPayload, thunkApi) {
    try {
      await axios.patch(`${incomeURL}/${payload.id}`, payload.values);
      thunkApi.dispatch(getGoalList({}));
      return;
    } catch (error) {
      return error;
    }
  }
);

const goalSlice = createSlice({
  name: "goal",
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
        const goalItem = state.goalList.find((item) => item.id === payload);
        if (goalItem) {
          state.editDetails = goalItem;
        }
      }
    },
    setDeleteDialog: (state, { payload }) => {
      state.deleteDialog = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoalList.fulfilled, (state, actions) => {
        state.goalList = actions.payload;
        state.isLoading = false;
      })
      .addCase(getGoalList.rejected, (state) => {
        state.goalList = [];
        state.isLoading = false;
      })
      .addCase(createGoal.fulfilled, (state) => {
        state.detailsDialog = false;
        state.isLoading = false;
      })
      .addCase(createGoal.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteGoal.fulfilled, (state) => {
        state.deleteDialog = false;
        state.isLoading = false;
      })
      .addCase(deleteGoal.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateGoal.fulfilled, (state) => {
        state.editDetails = null;
        state.isLoading = false;
        state.detailsDialog = false;
      })
      .addCase(updateGoal.rejected, () => {});
  },
});

export default goalSlice.reducer;
export const { setDetailsDialog, setDeleteDialog, startLoading, stopLoading } =
  goalSlice.actions;
