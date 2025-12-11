
import Dashboard from "../../assets/images/dashboard.svg";
import Partner from "../../assets/images/partner.svg";
import Category from "../../assets/images/category.svg";
import Applicant from "../../assets/images/applicant.svg";
import Intake from "../../assets/images/intake.svg";
import TeamRole from "../../assets/images/team-role.svg";
import faq from "../../assets/images/faq.svg";
import Policies from "../../assets/images/policies.svg";
import help_center from "../../assets/images/help_center.svg";
import { DashboardIcon, EyeManVoyagerIcon } from "../../assets/IconsList";
import { CampaignIcon } from './../../assets/IconsList';
// Sidebar
export const SidebarData = {
  superadmin: [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      img: false,
      route: "/superadmin/dashboard",
    },
    {
      label: "EyeMan - Voyager",
      icon: <EyeManVoyagerIcon />,
      img: false,
      route: "/superadmin/voyager",
    },
    {
      label: "Campaign",
      icon: <CampaignIcon />,
      children: [
        {
          label: "Continents",
          route: "/superadmin/continents",
        },
        {
          label: "Country",
          route: "/superadmin/countries",
        },
        {
          label: "Places",
          route: "/superadmin/place",
        },
        {
          label: "Locations",
          route: "/superadmin/location",
        },
        {
          label: "Event Category",
          route: "/superadmin/eventCategory",
        },
      ],
    },
    {
      label: "Team Roles",
      icon: (
        <img
          src={TeamRole}
          alt="TeamRole"
          className="img-fluid"
        />
      ),
      route: "/superadmin/team-role",
    },
    {
      label: "FAQ’s",
      icon: (
        <img
          src={faq}
          alt="faq"
          className="img-fluid"
        />
      ),
      route: "/superadmin/faq",
    },
    {
      label: "Policies",
      icon: (
        <img
          src={Policies}
          alt="policies"
          className="img-fluid"
        />
      ),
      route: "/superadmin/policies",
    },
    {
      label: "Help Center",
      icon: (
        <img
          src={help_center}
          alt="help_center"
          className="img-fluid"
        />
      ),
      route: "/superadmin/help-center",
    },
  ]
};

// Dashboard
export const DashboardContent = {
  superadmin: [
    {
      title: "Total Continents",
      icon: (
        <img
          src={Partner}
          alt="DashUser"
          className="img-fluid"
        />
      ),
      apiCount: "continents",
      route: "/superadmin/dashboard",
    },
    {
      title: "Total Countries",
      icon: (
        <img
          src={Category}
          alt="cases-img"
          className="img-fluid"
        />
      ),
      apiCount: "countries",
      route: "/superadmin/dashboard",
    },
    {
      title: "Total Places",
      icon: (
        <img
          src={Applicant}
          alt="applicant-img"
          className="img-fluid"
        />
      ),
      apiCount: "places",
      route: "/superadmin/dashboard",
    },
    {
      title: "Total locations",
      icon: (
        <img
          src={Intake}
          alt="intake-img"
          className="img-fluid"
        />
      ),
      apiCount: "locations",
      route: "/superadmin/dashboard",
    },
  ],
};