
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SuperAdminAuthSlice from "./slices/superadmin/AuthSlice";
import SuperAdminSlice from "./slices/superadmin/SuperAdminSlice";

// import AdminAuthSlice from "./slices/admin/AuthSlice";
// import AdminSlice from "./slices/admin/AdminSlice";

const reducer = combineReducers({
    // super-Admin
    SuperAdminAuth: SuperAdminAuthSlice,
    SuperAdmin: SuperAdminSlice,

    // sub-Admin
    // AdminAuth: AdminAuthSlice,
    // Admin: AdminSlice,
});

const store = configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) => {
    //     getDefaultMiddleware()
    // }
});

export default store;