import React from 'react';
import FarmerRegistrationForm from "../components/FarmerRegistration";

// pages/user_registration/page.tsx
import DashboardLayout from '../components/Layout';

const UserRegistrationPage = () => {
  return (
    <DashboardLayout>
      <FarmerRegistrationForm/>
      
    </DashboardLayout>
  );
};

export default UserRegistrationPage;

