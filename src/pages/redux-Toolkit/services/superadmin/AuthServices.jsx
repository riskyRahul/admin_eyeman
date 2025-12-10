import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../helper/Axios";
import { apiendpoints } from "../../../../components/constants/apiendpoint";
import { toast } from "react-toastify";

// reqtoSuperAdminLogin
export const reqtoSuperAdminLogin = createAsyncThunk("reqtoSuperAdminLogin", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.login, data);

        if (res.data?.success) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});