import { Route, Routes } from "react-router";
import "./css/App.css";
import "./css/Sidebar.css";
import Login from "./pages/login/Login";
import { SuperAdminLayout } from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import SuperAdminDashboard from "./pages/super-admin/dashboard/Dashboard";

import SuperAdminContinents from "./pages/super-admin/continent/Continent";

import SuperAdminCountries from "./pages/super-admin/countries/Countries";

import SuperAdminplace from "./pages/super-admin/place/Place";

import SuperAdminlocation from "./pages/super-admin/location/Location";

import SuperAdmineventCategory from "./pages/super-admin/eventCategory/EventCategory";
import SuperAdminVoyager from "./pages/super-admin/voyager/Voyager";
import SuperAdmincategoryRequest from "./pages/super-admin/eventCategory/CategoryRequest";

import SuperAdminTeamRole from "./pages/super-admin/teamRole/TeamRole";
import SuperAdminFaq from "./pages/super-admin/faq/Faq";
import SuperAdminPolicies from "./pages/super-admin/policies/Policies";
import SuperAdminSetting from "./pages/super-admin/setting/Setting";
import SuperAdminHelpCenter from "./pages/super-admin/help/HelpCenter";
import SuperAdminNotification from "./pages/super-admin/notification/Notification";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<SuperAdminLayout />}>
          <Route
            path="/superadmin/dashboard"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/voyager"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminVoyager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/continents"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminContinents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/countries/:id?"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminCountries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/place"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminplace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/location"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminlocation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/eventCategory"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdmineventCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/eventCategory/categoryRequest"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdmincategoryRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/team-role"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminTeamRole />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/faq"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminFaq />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/policies"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminPolicies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/setting"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminSetting />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/notification"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminNotification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/help-center"
            element={
              <ProtectedRoute type="superadmin">
                <SuperAdminHelpCenter />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
