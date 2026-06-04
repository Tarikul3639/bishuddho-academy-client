import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    // RTK Query caching
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

/* TYPES */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;