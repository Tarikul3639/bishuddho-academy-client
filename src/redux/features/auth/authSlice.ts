import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

import { AuthUser } from "@/types/auth-user";

interface AuthState {
    user: AuthUser | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setUser: (
            state,
            action: PayloadAction<AuthUser>,
        ) => {
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const {
    setUser,
    clearUser,
} = authSlice.actions;

export default authSlice.reducer;