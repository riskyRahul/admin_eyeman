import { createSlice } from "@reduxjs/toolkit";
import { reqtoSuperAdminAddEventCategory, reqtoSuperAdminAddFaqs, reqtoSuperAdminAddLocation, reqtoSuperAdminAddPlace, reqtoSuperAdminAddPolicy, reqtoSuperAdminCountriesWiseCountry, reqtoSuperAdminDashboard, reqtoSuperAdminDeleteEventCategory, reqtoSuperAdminDeleteFaqs, reqtoSuperAdminDeleteLocation, reqtoSuperAdminDeletePalce, reqtoSuperAdminDeletePolicy, reqtoSuperAdminDeleteUser, reqtoSuperAdminDetailUser, reqtoSuperAdminEditEventCategory, reqtoSuperAdminEditFaqs, reqtoSuperAdminEditLocation, reqtoSuperAdminEditPalce, reqtoSuperAdminEditPolicy, reqtoSuperAdminGetCategoryRequest, reqtoSuperAdminGetContinents, reqtoSuperAdminGetCountries, reqtoSuperAdminGeteventCategory, reqtoSuperAdminGetFaqs, reqtoSuperAdminGetHelpCenter, reqtoSuperAdminGetLocation, reqtoSuperAdminGetPlace, reqtoSuperAdminGetPolicy, reqtoSuperAdminGetVoyager, reqtoSuperAdminStatusLocations, reqtoSuperAdminStatusPlaces, reqtoSuperAdminStatusUser, reqtoSuperAdminUpdateCategoryRequest } from "../../services/superadmin/SuperAdminServices";

const initialState = {
    loader: false,

    // dashboard
    dashboardLoader: false,
    dashboard: {},

    //  voyager 
    voyagerList: [],
    userDetails: [],
    deleteUserLoader: false,
    userDetailsLoader: false,

    // continents
    continentsList: [],

    // countries
    countriesList: [],
    countriesWiseCountryList: [],
    countriesWiseCountryLoader: false,

    placeList: [],
    placeLoader: false,

    locationLoader: false,
    locationList: [],

    faqsLoader: false,
    deleteFaqsLoader: false,
    addFaqsLoader: false,
    editFaqsLoader: false,
    faqsList: [],

    policyLoader: false,
    deletePolicyLoader: false,
    addPolicyLoader: false,
    editPolicyLoader: false,
    policyList: [],

    helpCenterLoader: false,
    helpCenterList: [],

    eventCategoryList: [],
    eventCategoryLoader: false,

    error: null,
    deleteLoader: false,
};

const SuperAdminSlice = createSlice({
    name: "SuperAdminSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // reqtoSuperAdminDashboard
        builder.addCase(reqtoSuperAdminDashboard.pending, (state) => {
            state.dashboardLoader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminDashboard.fulfilled, (state, action) => {
            state.dashboardLoader = false;
            state.dashboard = action.payload?.data || {};
        });
        builder.addCase(reqtoSuperAdminDashboard.rejected, (state, action) => {
            state.dashboardLoader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminGetVoyager
        builder.addCase(reqtoSuperAdminGetVoyager.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetVoyager.fulfilled, (state, action) => {
            state.loader = false;
            state.voyagerList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetVoyager.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminStatusUser
        builder.addCase(reqtoSuperAdminStatusUser.pending, (state) => {
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminStatusUser.fulfilled, (state, action) => {
            state.voyagerList = state.voyagerList.map((i) =>
                i._id === action.payload._id
                    ? { ...i, profile_status: action.payload.status }
                    : i
            );
        });
        builder.addCase(reqtoSuperAdminStatusUser.rejected, (state, action) => {
            state.error = action.payload;
        });

        // reqtoSuperAdminDetailUser
        builder.addCase(reqtoSuperAdminDetailUser.pending, (state) => {
            state.userDetailsLoader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminDetailUser.fulfilled, (state, action) => {
            state.userDetailsLoader = false;
            state.userDetails = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminDetailUser.rejected, (state, action) => {
            state.userDetailsLoader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminDeleteUser
        builder.addCase(reqtoSuperAdminDeleteUser.pending, (state) => {
            state.deleteUserLoader = true;
        });
        builder.addCase(reqtoSuperAdminDeleteUser.fulfilled, (state, action) => {
            state.deleteUserLoader = false;
            state.voyagerList = state.voyagerList.filter((i) => i._id !== action.payload._id);
        });
        builder.addCase(reqtoSuperAdminDeleteUser.rejected, (state, action) => {
            state.deleteUserLoader = false;
        });

        // reqtoSuperAdminGetCompany
        builder.addCase(reqtoSuperAdminGetContinents.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetContinents.fulfilled, (state, action) => {
            state.loader = false;
            state.continentsList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetContinents.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminGetCompany
        builder.addCase(reqtoSuperAdminGetCountries.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetCountries.fulfilled, (state, action) => {
            state.loader = false;
            state.countriesList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetCountries.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminCountriesWiseCountry
        builder.addCase(reqtoSuperAdminCountriesWiseCountry.pending, (state) => {
            state.countriesWiseCountryLoader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminCountriesWiseCountry.fulfilled, (state, action) => {
            state.countriesWiseCountryLoader = false;
            state.countriesWiseCountryList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminCountriesWiseCountry.rejected, (state, action) => {
            state.countriesWiseCountryLoader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminGetPlace
        builder.addCase(reqtoSuperAdminGetPlace.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetPlace.fulfilled, (state, action) => {
            state.loader = false;
            state.placeList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetPlace.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminDeleteCompany
        builder.addCase(reqtoSuperAdminDeletePalce.pending, (state) => {
            state.deleteLoader = true;
        });
        builder.addCase(reqtoSuperAdminDeletePalce.fulfilled, (state, action) => {
            state.deleteLoader = false;
            state.placeList = state.placeList.filter((i) => i._id !== action.payload._id);
        });
        builder.addCase(reqtoSuperAdminDeletePalce.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoSuperAdminAddPlace
        builder.addCase(reqtoSuperAdminAddPlace.pending, (state) => {
            state.placeLoader = true;
        });
        builder.addCase(reqtoSuperAdminAddPlace.fulfilled, (state, action) => {
            state.placeLoader = false;
        });
        builder.addCase(reqtoSuperAdminAddPlace.rejected, (state, action) => {
            state.placeLoader = false;
        });

        // reqtoSuperAdminEditPalce
        builder.addCase(reqtoSuperAdminEditPalce.pending, (state, action) => {
            state.placeLoader = true;
        })
        builder.addCase(reqtoSuperAdminEditPalce.fulfilled, (state, action) => {
            state.placeLoader = false;
        })
        builder.addCase(reqtoSuperAdminEditPalce.rejected, (state, action) => {
            state.placeLoader = false;
        })

        // reqtoSuperAdminGetLocation
        builder.addCase(reqtoSuperAdminGetLocation.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetLocation.fulfilled, (state, action) => {
            state.loader = false;
            state.locationList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetLocation.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminDeleteLocation
        builder.addCase(reqtoSuperAdminDeleteLocation.pending, (state) => {
            state.deleteLoader = true;
        });
        builder.addCase(reqtoSuperAdminDeleteLocation.fulfilled, (state, action) => {
            state.deleteLoader = false;
            state.locationList = state.locationList.filter((i) => i._id !== action.payload._id);
        });
        builder.addCase(reqtoSuperAdminDeleteLocation.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoSuperAdminAddLocation
        builder.addCase(reqtoSuperAdminAddLocation.pending, (state) => {
            state.locationLoader = true;
        });
        builder.addCase(reqtoSuperAdminAddLocation.fulfilled, (state, action) => {
            state.locationLoader = false;
        });
        builder.addCase(reqtoSuperAdminAddLocation.rejected, (state, action) => {
            state.locationLoader = false;
        });

        // reqtoSuperAdminEditLocation
        builder.addCase(reqtoSuperAdminEditLocation.pending, (state, action) => {
            state.locationLoader = true;
        });
        builder.addCase(reqtoSuperAdminEditLocation.fulfilled, (state, action) => {
            state.locationLoader = false;
        });
        builder.addCase(reqtoSuperAdminEditLocation.rejected, (state, action) => {
            state.locationLoader = false;
        });

        builder.addCase(reqtoSuperAdminGeteventCategory.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGeteventCategory.fulfilled, (state, action) => {
            state.loader = false;
            state.eventCategoryList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGeteventCategory.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminDeleteEventCategory
        builder.addCase(reqtoSuperAdminDeleteEventCategory.pending, (state) => {
            state.deleteLoader = true;
        });
        builder.addCase(reqtoSuperAdminDeleteEventCategory.fulfilled, (state, action) => {
            state.deleteLoader = false;
            state.eventCategoryList = state.eventCategoryList.filter((i) => i._id !== action.payload._id);
        });
        builder.addCase(reqtoSuperAdminDeleteEventCategory.rejected, (state, action) => {
            state.deleteLoader = false;
        });

        // reqtoSuperAdminAddEventCategory
        builder.addCase(reqtoSuperAdminAddEventCategory.pending, (state) => {
            state.eventCategoryLoader = true;
        });
        builder.addCase(reqtoSuperAdminAddEventCategory.fulfilled, (state, action) => {
            state.eventCategoryLoader = false;
        });
        builder.addCase(reqtoSuperAdminAddEventCategory.rejected, (state, action) => {
            state.eventCategoryLoader = false;
        });

        // reqtoSuperAdminEditEventCategory
        builder.addCase(reqtoSuperAdminEditEventCategory.pending, (state, action) => {
            state.eventCategoryLoader = true;
        });
        builder.addCase(reqtoSuperAdminEditEventCategory.fulfilled, (state, action) => {
            state.eventCategoryLoader = false;
        });
        builder.addCase(reqtoSuperAdminEditEventCategory.rejected, (state, action) => {
            state.eventCategoryLoader = false;
        });

        // reqtoSuperAdminGetCategoryRequest
        builder.addCase(reqtoSuperAdminGetCategoryRequest.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetCategoryRequest.fulfilled, (state, action) => {
            state.loader = false;
            state.categoryRequestList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetCategoryRequest.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminUpdateCategoryRequest
        builder.addCase(reqtoSuperAdminUpdateCategoryRequest.pending, (state) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminUpdateCategoryRequest.fulfilled, (state, action) => {
            state.loader = false;
        });
        builder.addCase(reqtoSuperAdminUpdateCategoryRequest.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminStatusPlaces
        builder.addCase(reqtoSuperAdminStatusPlaces.pending, (state) => {
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminStatusPlaces.fulfilled, (state, action) => {
            state.placeList = state.placeList.map((i) =>
                i._id === action.payload._id
                    ? { ...i, status: action.payload.status }
                    : i
            );
        });
        builder.addCase(reqtoSuperAdminStatusPlaces.rejected, (state, action) => {
            state.error = action.payload;
        });

        // reqtoSuperAdminStatusLocations
        builder.addCase(reqtoSuperAdminStatusLocations.pending, (state) => {
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminStatusLocations.fulfilled, (state, action) => {
            state.locationList = state.locationList.map((i) =>
                i._id === action.payload._id
                    ? { ...i, status: action.payload.status }
                    : i
            );
        });
        builder.addCase(reqtoSuperAdminStatusLocations.rejected, (state, action) => {
            state.error = action.payload;
        });

        // reqtoSuperAdminGetFaqs
        builder.addCase(reqtoSuperAdminGetFaqs.pending, (state) => {
            state.faqsLoader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetFaqs.fulfilled, (state, action) => {
            state.faqsLoader = false;
            state.faqsList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetFaqs.rejected, (state, action) => {
            state.faqsLoader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminDeleteFaqs
        builder.addCase(reqtoSuperAdminDeleteFaqs.pending, (state) => {
            state.deleteFaqsLoader = true;
        });
        builder.addCase(reqtoSuperAdminDeleteFaqs.fulfilled, (state, action) => {
            state.deleteFaqsLoader = false;
            state.faqsList = state.faqsList.filter((i) => i._id !== action.payload._id);
        });
        builder.addCase(reqtoSuperAdminDeleteFaqs.rejected, (state, action) => {
            state.deleteFaqsLoader = false;
        });

        // reqtoSuperAdminAddFaqs
        builder.addCase(reqtoSuperAdminAddFaqs.pending, (state) => {
            state.addFaqsLoader = true;
        });
        builder.addCase(reqtoSuperAdminAddFaqs.fulfilled, (state, action) => {
            state.addFaqsLoader = false;
        });
        builder.addCase(reqtoSuperAdminAddFaqs.rejected, (state, action) => {
            state.addFaqsLoader = false;
        });

        // reqtoSuperAdminEditFaqs
        builder.addCase(reqtoSuperAdminEditFaqs.pending, (state, action) => {
            state.editFaqsLoader = true;
        });
        builder.addCase(reqtoSuperAdminEditFaqs.fulfilled, (state, action) => {
            state.editFaqsLoader = false;
        });
        builder.addCase(reqtoSuperAdminEditFaqs.rejected, (state, action) => {
            state.editFaqsLoader = false;
        });

        // reqtoSuperAdminGetPolicy
        builder.addCase(reqtoSuperAdminGetPolicy.pending, (state) => {
            state.policyLoader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetPolicy.fulfilled, (state, action) => {
            state.policyLoader = false;
            state.policyList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetPolicy.rejected, (state, action) => {
            state.policyLoader = false;
            state.error = action.payload;
        });

        // reqtoSuperAdminDeletePolicy
        builder.addCase(reqtoSuperAdminDeletePolicy.pending, (state) => {
            state.deletePolicyLoader = true;
        });
        builder.addCase(reqtoSuperAdminDeletePolicy.fulfilled, (state, action) => {
            state.deletePolicyLoader = false;
            state.policyList = state.policyList.filter((i) => i._id !== action.payload._id);
        });
        builder.addCase(reqtoSuperAdminDeletePolicy.rejected, (state, action) => {
            state.deletePolicyLoader = false;
        });

        // reqtoSuperAdminAddPolicy
        builder.addCase(reqtoSuperAdminAddPolicy.pending, (state) => {
            state.addPolicyLoader = true;
        });
        builder.addCase(reqtoSuperAdminAddPolicy.fulfilled, (state, action) => {
            state.addPolicyLoader = false;
        });
        builder.addCase(reqtoSuperAdminAddPolicy.rejected, (state, action) => {
            state.addPolicyLoader = false;
        });

        // reqtoSuperAdminEditPolicy
        builder.addCase(reqtoSuperAdminEditPolicy.pending, (state, action) => {
            state.editPolicyLoader = true;
        });
        builder.addCase(reqtoSuperAdminEditPolicy.fulfilled, (state, action) => {
            state.editPolicyLoader = false;
        });
        builder.addCase(reqtoSuperAdminEditPolicy.rejected, (state, action) => {
            state.editPolicyLoader = false;
        });

        // reqtoSuperAdminGetHelpCenter
        builder.addCase(reqtoSuperAdminGetHelpCenter.pending, (state) => {
            state.helpCenterLoader = true;
            state.error = null;
        });
        builder.addCase(reqtoSuperAdminGetHelpCenter.fulfilled, (state, action) => {
            state.helpCenterLoader = false;
            state.helpCenterList = action.payload?.data;
        });
        builder.addCase(reqtoSuperAdminGetHelpCenter.rejected, (state, action) => {
            state.helpCenterLoader = false;
            state.error = action.payload;
        });
    }
});

export default SuperAdminSlice.reducer;