import { createSlice } from "@reduxjs/toolkit";
import { reqtoSuperAdminLogin } from "../../services/superadmin/AuthServices";

const initialState = {
    loader: false,
    data: null,
    error: null,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.loader = false;
            state.data = null;
            state.error = null;
            localStorage.removeItem("eyeman-superAdmin-token");
        }
    },
    extraReducers: (builer) => {
        // reqtoSuperAdminLogin
        builer.addCase(reqtoSuperAdminLogin.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builer.addCase(reqtoSuperAdminLogin.fulfilled, (state, action) => {
            const token = action.payload?.data?.token;

            state.loader = false;
            // state.data.token = token;

            if (token) {
                localStorage.setItem("eyeman-superAdmin-token", token);
            }
        });
        builer.addCase(reqtoSuperAdminLogin.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });
    }
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
