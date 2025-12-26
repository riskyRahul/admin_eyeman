import Delete from "../modal/delete/Delete";

export const apiendpoints = {
    // Super-Admin 
    // Auth
    login: "/admin/v2/auth/login",

    // Dashboard
    dashboard: "/admin/v2/auth/dashboard",

    // voyager 
    Getvoyager: "/admin/v2/user/list",
    DeleteUser: "/admin/v2/user/delete/:id",
    statusUser: "/admin/v2/user/status/:id",
    detailUser: "/admin/v2/user/detail/:id",

    // Continents
    Getcontinents: "/admin/v2/continents/list",

    // Countries
    Getcountries: "/admin/v2/countries/list",

    // place 
    GetPlace: "/admin/v2/places/list",
    DeletePalce: "/admin/v2/places/delete/:id",
    getContinentsWiseCountries: "/admin/v2/countries/getByContinent/:id",
    AddPlace: "/admin/v2/places/add",
    EditPlace: "/admin/v2/places/edit/:id",
    statusPlaces: "/admin/v2/places/status/:id",

    // Location
    GetLocation: "/admin/v2/locations/list",
    DeleteLocation: "/admin/v2/locations/delete/:id",
    AddLocation: "/admin/v2/locations/add",
    EditLocation: "/admin/v2/locations/edit/:id",
    statusLocations: "/admin/v2/locations/status/:id",

    // event-category 
    GetEventCategory: "/admin/v2/event-categories/list",
    DeleteEventCategory: "/admin/v2/event-categories/delete/:id",
    AddEventCategory: "/admin/v2/event-categories/add",
    EditEventCategory: "/admin/v2/event-categories/edit/:id",
    GetEventCategoryRequests: "/admin/v2/event-categories/request-list",
    updateApprovalStatus: "/admin/v2/event-categories/approval/:id",
    updateStatus: "/admin/v2/event-categories/status/:id",

    // faqs
    GetFaqs: "/admin/v2/faqs/list",
    DeleteFaqs: "/admin/v2/faqs/delete/:id",
    AddFaqs: "/admin/v2/faqs/add",
    EditFaqs: "/admin/v2/faqs/edit/:id",

    // policy
    GetPolicy: "/admin/v2/policies/list",
    DeletePolicy: "/admin/v2/policies/delete/:id",
    AddPolicy: "/admin/v2/policies/add",
    EditPolicy: "/admin/v2/policies/edit/:id",

    // help-center
    GetHelpCenter: "/admin/v2/help-center/list",

    // team
    GetTeam: "/admin/v2/team/list",
    DeleteTeam: "/admin/v2/team/delete/:id",
    AddTeam: "/admin/v2/team/add",
    EditTeam: "/admin/v2/team/edit/:id",
    statusTeam: "/admin/v2/team/status/:id",
    detailTeam: "/admin/v2/team/detail/:id",
}