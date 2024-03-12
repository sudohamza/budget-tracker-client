import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginUrl = "http://localhost:3000/user/login";
const logoutUrl = "http://localhost:3000/user/logout";
const registerUrl = "http://localhost:3000/user/register";
const profileUrl = "http://localhost:3000/user/profile";

type UserProfile = {
  fullName: string;
  email: string;
};

type UserSliceState = {
  isReady: boolean;
  isLoading: boolean;
  profile: UserProfile | null;
  errorMessage: string;
};

const initialState: UserSliceState = {
  isReady: false,
  isLoading: false,
  profile: null,
  errorMessage: "",
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  "user/login",
  async function (values: LoginPayload, thunkAPI) {
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const { data } = await axios.post(loginUrl, values);
      return data;
    } catch (error: any) {
      thunkAPI.dispatch(removeMsg());
      throw new Error("Invalid username or password.");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async function () {
  try {
    axios.get(logoutUrl);
    return;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async function () {
    try {
      await new Promise((r) => setTimeout(r, 750));
      const { data } = await axios.get(profileUrl);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export const removeMsg = createAsyncThunk("user/removeMsg", async () => {
  try {
    await new Promise((r) => setTimeout(r, 5000));
  } catch (error) {
    return error;
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (values: RegisterPayload, thunkAPI) => {
    try {
      const { data } = await axios.post(registerUrl, values);
      return data;
    } catch (error: any) {
      thunkAPI.dispatch(removeMsg());
      throw new Error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReady = true;
        state.profile = action.payload;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isReady = false;
        if (error.message) state.errorMessage = error.message;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReady = true;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isReady = true;
        state.isLoading = false;
      })
      .addCase(logout.pending, () => {})
      .addCase(logout.fulfilled, (state) => {
        state.profile = null;
      })
      .addCase(logout.rejected, () => {})
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReady = true;
        state.profile = action.payload;
      })
      .addCase(register.rejected, (state, { error }) => {
        state.isLoading = false;
        if (error.message) state.errorMessage = error.message;
      })
      .addCase(removeMsg.fulfilled, (state) => {
        state.errorMessage = "";
      });
  },
});

export default userSlice.reducer;
