import { FarmerDetails } from "./types";

const url = '/api/farmer';

export const registerFarmer = async (farmerData: FarmerDetails) => {
  try {
    console.log("Base URL:", url); 
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(farmerData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Full response from server:', text);

      if (response.status >= 500) {
        throw new Error('We are experiencing technical difficulties. Please try again later.');
      } else if (response.status === 400) {
        throw new Error('A farmer with these credentials already exists.');
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    }

    const data = await response.json();
    return data;

  } catch (error: any) {
    console.error('Error during registration:', error.message);
    throw error; 
  }
};
