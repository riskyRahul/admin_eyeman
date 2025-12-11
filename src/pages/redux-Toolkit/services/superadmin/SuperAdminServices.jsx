import { createAsyncThunk } from "@reduxjs/toolkit";
import { authHeaders, authHeadersImages, Axios } from "../../helper/Axios";
import { apiendpoints } from "../../../../components/constants/apiendpoint";
import { toast } from "react-toastify";

// reqtoSuperAdminDashboard
export const reqtoSuperAdminDashboard = createAsyncThunk(
    "reqtoSuperAdminDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const res = await Axios.get(apiendpoints.dashboard, authHeaders());

            if (res.data?.status || res.data?.success) {
                return res.data;
            } else {
                return rejectWithValue(res.data);
            }

        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reqtoSuperAdminGetContinents
export const reqtoSuperAdminGetVoyager = createAsyncThunk("reqtoSuperAdminGetVoyager", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.Getvoyager, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminStatusUser
export const reqtoSuperAdminStatusUser = createAsyncThunk("reqtoSuperAdminStatusUser", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await Axios.put(apiendpoints.statusUser.replace(":id", id), data, authHeaders());

        if (res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data.userStatus
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminDetailUser
export const reqtoSuperAdminDetailUser = createAsyncThunk("reqtoSuperAdminDetailUser", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.detailUser.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminDeleteUser
export const reqtoSuperAdminDeleteUser = createAsyncThunk("reqtoSuperAdminDeleteUser", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.DeleteUser.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminGetContinents
export const reqtoSuperAdminGetContinents = createAsyncThunk("reqtoSuperAdminGetContinents", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.Getcontinents, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});


// reqtoSuperAdminGetCountries
export const reqtoSuperAdminGetCountries = createAsyncThunk("reqtoSuperAdminGetCountries", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.Getcountries, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminGetPlaces
export const reqtoSuperAdminGetPlace = createAsyncThunk("reqtoSuperAdminGetPlace", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetPlace, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminDeletePalce
export const reqtoSuperAdminDeletePalce = createAsyncThunk("reqtoSuperAdminDeletePalce", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.DeletePalce.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddPlace
export const reqtoSuperAdminAddPlace = createAsyncThunk("reqtoSuperAdminAddPlace", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.AddPlace, data, authHeadersImages("multipart/form-data"));

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminCountriesWiseCountry
export const reqtoSuperAdminCountriesWiseCountry = createAsyncThunk("reqtoSuperAdminCountriesWiseCountry", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.getContinentsWiseCountries.replace(":id", id), authHeaders());

        if (res.data?.success || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

export const reqtoSuperAdminEditPalce = createAsyncThunk(
    "reqtoSuperAdminEditPalce",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Axios.put(
                apiendpoints.EditPlace.replace(":id", id),
                data,
                authHeadersImages("multipart/form-data")
            );

            if (res.data?.success) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
                return rejectWithValue(res.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reqtoSuperAdminGetLocation
export const reqtoSuperAdminGetLocation = createAsyncThunk("reqtoSuperAdminGetLocation", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetLocation, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminDeletePalce
export const reqtoSuperAdminDeleteLocation = createAsyncThunk("reqtoSuperAdminDeleteLocation", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.DeleteLocation.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddLocation
export const reqtoSuperAdminAddLocation = createAsyncThunk("reqtoSuperAdminAddLocation", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.AddLocation, data, authHeadersImages("multipart/form-data"));

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminEditLocation
export const reqtoSuperAdminEditLocation = createAsyncThunk(
    "reqtoSuperAdminEditLocation",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Axios.put(
                apiendpoints.EditLocation.replace(":id", id),
                data,
                authHeadersImages("multipart/form-data")
            );

            if (res.data?.success) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
                return rejectWithValue(res.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// reqtoSuperAdminGeteventCategory
export const reqtoSuperAdminGeteventCategory = createAsyncThunk("reqtoSuperAdminGeteventCategory", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetEventCategory, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});


// reqtoSuperAdminDeleteEventCategory
export const reqtoSuperAdminDeleteEventCategory = createAsyncThunk("reqtoSuperAdminDeleteEventCategory", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.DeleteEventCategory.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddEventCategory
export const reqtoSuperAdminAddEventCategory = createAsyncThunk("reqtoSuperAdminAddEventCategory", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.AddEventCategory, data, authHeadersImages("multipart/form-data"));

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminEditEventCategory
export const reqtoSuperAdminEditEventCategory = createAsyncThunk(
    "reqtoSuperAdminEditEventCategory",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Axios.put(
                apiendpoints.EditEventCategory.replace(":id", id),
                data,
                authHeadersImages("multipart/form-data")
            );

            if (res.data?.success) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
                return rejectWithValue(res.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reqtoSuperAdminGetLocation
export const reqtoSuperAdminGetCategoryRequest = createAsyncThunk("reqtoSuperAdminGetCategoryRequest", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetEventCategoryRequests, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminUpdateCategoryRequest
export const reqtoSuperAdminUpdateCategoryRequest = createAsyncThunk(
    "reqtoSuperAdminUpdateCategoryRequest",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Axios.put(
                apiendpoints.updateApprovalStatus.replace(":id", id),
                data,
                authHeaders()
            );

            if (res.data?.success) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
                return rejectWithValue(res.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reqtoSuperAdminStatusPlaces
export const reqtoSuperAdminStatusPlaces = createAsyncThunk("reqtoSuperAdminStatusPlaces", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await Axios.put(apiendpoints.statusPlaces.replace(":id", id), data, authHeaders());

        if (res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data.placeStatus
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminStatusLocations
export const reqtoSuperAdminStatusLocations = createAsyncThunk("reqtoSuperAdminStatusLocations", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await Axios.put(apiendpoints.statusLocations.replace(":id", id), data, authHeaders());

        if (res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data.locationStatus
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminGetFaqs
export const reqtoSuperAdminGetFaqs = createAsyncThunk("reqtoSuperAdminGetFaqs", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetFaqs, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminDeletePolicy
export const reqtoSuperAdminDeletePolicy = createAsyncThunk("reqtoSuperAdminDeletePolicy", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.DeletePolicy.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddPolicy
export const reqtoSuperAdminAddPolicy = createAsyncThunk("reqtoSuperAdminAddPolicy", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.AddPolicy, data, authHeadersImages("application/json"));

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminEditPolicy
export const reqtoSuperAdminEditPolicy = createAsyncThunk(
    "reqtoSuperAdminEditPolicy",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Axios.put(
                apiendpoints.EditPolicy.replace(":id", id),
                data,
                authHeadersImages("application/json")
            );

            if (res.data?.success) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
                return rejectWithValue(res.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reqtoSuperAdminGetPolicy
export const reqtoSuperAdminGetPolicy = createAsyncThunk("reqtoSuperAdminGetPolicy", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetPolicy, authHeaders());

        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminDeleteFaqs
export const reqtoSuperAdminDeleteFaqs = createAsyncThunk("reqtoSuperAdminDeleteFaqs", async (id, { rejectWithValue }) => {
    try {
        const res = await Axios.delete(apiendpoints.DeleteFaqs.replace(":id", id), authHeaders());

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return {
                _id: id,
                status: res.data
            };
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminAddFaqs
export const reqtoSuperAdminAddFaqs = createAsyncThunk("reqtoSuperAdminAddFaqs", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.post(apiendpoints.AddFaqs, data, authHeadersImages("application/json"));

        if (res.data?.status || res.data?.success) {
            toast.success(res.data.message);

            return res.data;
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        throw err
    }
});

// reqtoSuperAdminEditFaqs
export const reqtoSuperAdminEditFaqs = createAsyncThunk(
    "reqtoSuperAdminEditFaqs",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await Axios.put(
                apiendpoints.EditFaqs.replace(":id", id),
                data,
                authHeadersImages("application/json")
            );

            if (res.data?.success) {
                toast.success(res.data.message);
                return res.data;
            } else {
                toast.error(res.data.message);
                return rejectWithValue(res.data);
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// reqtoSuperAdminGetHelpCenter
export const reqtoSuperAdminGetHelpCenter = createAsyncThunk("reqtoSuperAdminGetHelpCenter", async (data, { rejectWithValue }) => {
    try {
        const res = await Axios.get(apiendpoints.GetHelpCenter, authHeaders());
        if (res.data?.status || res.data?.success) {
            return res.data;
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        throw err
    }
});
