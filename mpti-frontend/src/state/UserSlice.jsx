import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URI
})

export const loginUser = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        const prepData = JSON.stringify({
            username: data.username,
            password: data.password
        })

        try {
            const response = await axiosInstance.post("/user/login", prepData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const result = await response.data

            localStorage.setItem("user", JSON.stringify(result.data))
            return result;
        } catch (error) {
            if (error.response) {
                const message = error.response.data.errors;
                return thunkAPI.rejectWithValue(message)
            } else {
                return thunkAPI.rejectWithValue("Network error")
            }

        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.delete("/user/logout", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data.token
                }
            })

            const result = await response.data

            localStorage.removeItem("user")
            return result;
        } catch (error) {
            if (error.response) {
                const message = error.response.data.errors;
                return thunkAPI.rejectWithValue(message)
            } else {
                return thunkAPI.rejectWithValue("Network error")
            }

        }
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState: {
        loading: null,
        error: null,
        message: null,
        login: {
            username: null,
            password: null
        },

        data: JSON.parse(localStorage.getItem("user")) || null
    },
    reducers: {
        updateUsernameUser: (state, action) => {
            state.login.username = action.payload
        },
        updatePasswordUser: (state, action) => {
            state.login.password = action.payload
        },
        updateErrorUser: (state, action) => {
            state.error = action.payload
        },
        updateMessageUser: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.login.username = null;
                state.login.password = null;
                state.data = action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.message = action.payload.data
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload
            })
    }
})

export const { updateUsernameUser, updatePasswordUser, updateErrorUser, updateMessageUser } = UserSlice.actions
export default UserSlice.reducer