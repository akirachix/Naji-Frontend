import React from 'react';
import FarmerRegistrationForm from "../components/FarmerRegistration";

// pages/user_registration/page.tsx
import DashboardLayout from '../components/Layout';

const UserRegistrationPage = () => {
  return (
    <DashboardLayout>
      <FarmerRegistrationForm/>
      <h1>User Registration</h1>
      
    </DashboardLayout>
  );
};

export default UserRegistrationPage;

