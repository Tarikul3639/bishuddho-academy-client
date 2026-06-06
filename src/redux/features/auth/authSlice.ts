import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUser } from "@/types/auth-user";

interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;

            state.isLoading = false;

            state.error = null;
        },

        clearUser: (state) => {
            state.user = null;

            state.isLoading = false;

            state.error = null;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;

            state.isLoading = false;
        },
    },
});

export const { setLoading, setUser, clearUser, setError } = authSlice.actions;

export default authSlice.reducer;
