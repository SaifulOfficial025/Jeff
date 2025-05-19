import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Authentication/Registration";
import Login from "../Pages/Authentication/Login";
import DashboardLayout from "../Layout/Admin/DashboardLayout";
import OTP_Verification from "../Pages/Authentication/OTP_Verification";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import Admin_Home from "../Layout/Admin/Admin_Home";
import SelectionPage from "../Pages/Authentication/SelectionPage";
import RegistrationPage from "../Pages/Authentication/Registration";
import Base_Labor_rates from "../Pages/Authentication/userAuthentication/Base_Labor_rates";
import General_Project_Context from "../Pages/Authentication/userAuthentication/General_Project_Context";
import Fabrication_Capabilities from "../Pages/Authentication/userAuthentication/Fabrication_Capabilities";
import Field_Erection from "../Pages/Authentication/userAuthentication/Field_Erection";
import UserLogin from "../Pages/Authentication/userAuthentication/UserLogin";
import EmailVerification from "../Pages/Authentication/userAuthentication/EmailVerification";
import UserOTPVerfication from "../Pages/Authentication/userAuthentication/UserOTPVerfication";
import UserResetPass from "../Pages/Authentication/userAuthentication/UserResetPass";
import EmplayeeRegistration from "../Pages/Authentication/EmployeeAuthentication/EmplayeeRegistration";
import VendorRegistration from "../Pages/Authentication/VendorAuthentication/VendorRegistration";
  

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
        children: [
          {path: '/', element: <Home/>}
      ]
    },

    {
        path: '/dashboard',
        element: <DashboardLayout />,
      children: [
      {index: true, element: <Admin_Home />},
      {path: 'admin_home', element: <Admin_Home/>}
        ]
    },



    { path: '/select_role', element: <SelectionPage/>},
     {path: '/sign_up', element: <RegistrationPage/>},

    //  usersAuthentication

    { path: '/base_labor_rates', element: <Base_Labor_rates/>},
    { path: '/general_project_context', element: <General_Project_Context/>},
    { path: '/fabrication_capabilities', element: <Fabrication_Capabilities/>},
    { path: '/field_erection', element: <Field_Erection/>},
    { path: '/user_login', element: <UserLogin/>},
    { path: '/user_email_verification', element: <EmailVerification/>},
    { path: '/user_otp_verify', element: <UserOTPVerfication/>},
    { path: '/user_reset_password', element: <UserResetPass/>},


    //employeeAuthentication
    {path: '/emplayee_sign_up', element: <EmplayeeRegistration/>},


    //vendorAuthentication
    {path: '/vendor_sign_up', element: <VendorRegistration/>}
   


  ]);