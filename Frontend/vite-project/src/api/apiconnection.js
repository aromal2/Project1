import { typography } from "@material-tailwind/react";
import axios from "axios";
// Define your base URL for the API
const BASEurl = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
});

const getToken = () => localStorage.getItem("token");


export const signup = async (values) => {
  try {
    const response = await BASEurl.post("/", values);
    console.log(response);
return response;
    // return response.data; // Handle the response data as needed
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Handle the error as needed
  }
};
// Define the login function
export const login = async (values) => {
  try {
    const response = await BASEurl.post("/loginform", values);
return response.data
    // return response.data; // Handle the response data as needed
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Handle the error as needed
  }
};

export const addstudent = async (values) => {
  try {
  
    const response = await BASEurl.post("/addstudent", values);
    
    return response // Handle the response data as needed
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Handle the error as needed
  }
};

export const viewProfile = async () => {
  try {
    
    const response = await BASEurl.get("/viewprofile", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(typeof response.data);
    return response.data; // Handle the response data as needed
  } catch (error) {
    console.error("Viewprofile error:", error);
    throw error; // Handle the error as needed
  }
};


export const deletestudent = async (studentId) => {
  try {
  
   const response = await BASEurl.delete(`/deletestudent/${studentId}`);
  
    return response; // Return response data
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

export const editProfile = async (updated) => {
  try {
    
  console.log(updated,"97777777777777777");
    const response = await BASEurl.put(`/updateprofile`, updated, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response,'888888');
    return response; // Handle the response data as needed
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Handle the error as needed
  }
};

