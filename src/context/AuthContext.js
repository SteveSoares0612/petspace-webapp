// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CustomModal from "../components/CustomModal";

// Create AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide auth state and functions
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [petList, setPetList] = useState([]);
  const [allergenList, setAllergenList] = useState([]);
  const [petDetails, setPetDetails] = useState(null);

  const BASE_URL = "http://localhost:8000";

  // Function to get the XSRF token
  const getCsrfToken = async () => {
    try {
      let response = await axios.get(BASE_URL + "/sanctum/csrf-cookie", {
        withCredentials: true, // Required for cookies to be sent
      });
      if (response.status === 204) {
        console.log("CSRF token fetched successfully");
      } else {
        throw new Error("Failed to fetch CSRF token");
      }
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const login = async (email, password) => {
    try {
      // Fetch the CSRF token
      await getCsrfToken();

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      // Send the login request using Axios
      const response = await axios.post(
        BASE_URL + "/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = response.data.data; // Access the 'data' object in the response
        console.log(data);
        const userData = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          email_verified_at: data.email_verified_at,
          role: data.role,
          dob: data.dob,
          gender: data.gender,
          is_form_filled: data.is_form_filled,
          created_at: data.created_at,
          updated_at: data.updated_at,
          address: data.address,
          pets_count: data.pets_count,
          phone: data.phone,
          profile_image: data.profile_image,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        setAuthError(null);
        return true;
      } else {
        throw new Error("Login failed: Invalid response status");
      }
    } catch (error) {
      if (error.response) {
        setAuthError(error.response.data.message || "Login failed");
      } else {
        setAuthError("An unexpected error occurred: " + error.message);
      }
      setIsAuthenticated(false); // Set authentication state to false
      return false; // Return false for failed login
    }
  };

  const signUp = async (first_name, last_name, email, password) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
    try {
      // Step 1: Fetch the CSRF token.
      await getCsrfToken();

      // Extract the XSRF token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      // Step 2: Send the login request using Axios
      const response = await axios.post(
        BASE_URL + "/api/register",
        { first_name, last_name, email, password }, // Send credentials in request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token), // Set the XSRF token in the headers
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        setAuthError(null); // Clear any existing error
        return true; // Return true for successful login
      } else {
        throw new Error("Login failed: Invalid response status");
      }
    } catch (error) {
      if (error.response) {
        setAuthError(error.response.data.message || "Login failed");
      } else {
        setAuthError("An unexpected error occurred: " + error.message);
      }
      setIsAuthenticated(false); // Set authentication state to false
      return false; // Return false for failed login
    }
  };

  const logout = async (email) => {
    localStorage.clear();
    try {
      // Extract the XSRF token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.post(
        BASE_URL + "/api/logout",
        { email }, // Send credentials in request body
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token), // Set the XSRF token in the headers
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const cookieName = cookie.split("=")[0];
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      }

      setIsAuthenticated(false); // Set authentication state to false
      setAuthError(null);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.post(
        `${BASE_URL}/web/account/update/`,
        updatedUserData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Throw error so it can be caught by the calling function
    }
  };

  const getFamilyMembers = async () => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.get(
        `${BASE_URL}/web/account/member/member-list`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setFamilyMembers(response.data.list); // Extracting the data array directly
      } else {
        throw new Error("Failed to fetch family members");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        }
      } else {
        console.error("Error fetching family members:", error);
      }
      throw error;
    }
  };

  const addFamilyMember = async (email) => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.post(
        `${BASE_URL}/web/account/member/add`,
        { email }, // Data to be sent
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setFamilyMembers(response.data);
      } else {
        setModalMessage(response.data.message || "Failed to add family member");
        setShowModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (!isLoginPage) {
            setIsAuthenticated(false);
          }
        } else if (error.response?.data?.message) {
          setModalMessage(error.response.data.message);
          setShowModal(true);
        }
      } else {
        console.error("Error adding family members:", error);
        setModalMessage("An unexpected error occurred. Please try again.");
        setShowModal(true);
      }
    }
  };

  const deleteFamilyMember = async (id) => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.delete(
        `${BASE_URL}/web/account/member/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        return true;
      } else {
        setModalMessage(
          response.data.message || "Failed to delete family member"
        );
        setShowModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        } else if (error.response?.data?.message) {
          setModalMessage(error.response.data.message);
          setShowModal(true);
        }
      } else {
        console.error("Error deleting family members:", error);
      }
      throw error;
    }
  };

  const addPet = async (name, breed, animal_type, dob, color, gender) => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.post(
        `${BASE_URL}/web/pet/create`,
        { name, breed, animal_type, dob, color, gender },
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Pet added successfully:", response.data);
        const updatedUser = { ...user, pets_count: user.pets_count + 1 };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        await getPetList();
      } else {
        setModalMessage(response.data.message || "Failed to add pet");
        setShowModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        } else if (error.response?.data?.message) {
          setModalMessage(error.response.data.message);
          setShowModal(true);
        }
      } else {
        console.error("Error adding pets:", error);
      }
    }
  };

  const getPetList = async () => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      console.log("TOKEN: " + token);
      const response = await axios.get(`${BASE_URL}/web/pet/pet-list`, {
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(token),
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setPetList(response.data);
        console.log("petList: ", response.data);
      } else {
        throw new Error("Failed to fetch list of pets");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        }
      } else {
        console.error("Error fetching pets");
      }
      throw error;
    }
  };

  const deletePet = async (petid) => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.delete(
        `${BASE_URL}/web/pet/delete/${petid}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedUser = { ...user, pets_count: user.pets_count - 1 };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return true;
      } else {
        throw new Error("Failed to delete pet");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        }
      } else {
        console.error("Error deleting pet:", error);
      }
      throw error;
    }
  };

  const getPetDetails = async (petId) => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      console.log("TOKEN: " + token);
      const response = await axios.get(
        `${BASE_URL}/web/pet/pet-detail/${petId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setPetDetails(response.data);
      } else {
        throw new Error("Failed to fetch pet details");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        }
      } else {
        console.error("Error fetching pet details");
      }
      throw error;
    }
  };

  const uploadUserImage = async (file) => {
    try {
      // Retrieve the CSRF token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const formData = new FormData();
      formData.append("image", file); // Append the image file
      formData.append("filename", file.name); // Append the image filename

      // Send the image to the server
      const response = await axios.post(
        "http://localhost:8000/web/account/change-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Image uploaded successfully:", response.data.image_url);
        const updatedUserImage = {
          ...user,
          profile_image: response.data.image_url,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserImage));
        window.location.reload();
        return response.data;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Throw error so it can be caught by the calling function
    }
  };

  const uploadPetImage = async (file, petID) => {
    try {
      // Retrieve the CSRF token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const formData = new FormData();
      formData.append("image", file); // Append the image file
      formData.append("pet_id", petID);
      console.log(petID)

      // Send the image to the server
      const response = await axios.post(
        "http://localhost:8000/web/pet/change-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Image uploaded successfully:", response.data.image_url);
        // const updatedUserImage = {
        //   ...user,
        //   profile_image: response.data.image_url,
        // };
        // localStorage.setItem("user", JSON.stringify(updatedUserImage));
        window.location.reload();
        return response.data;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Throw error so it can be caught by the calling function
    }
  };
  

  const updatePet = async (updatedPetData) => {
    const isLoginPage = window.location.pathname === "/signin";
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      const response = await axios.post(
        `${BASE_URL}/web/pet/update/`,
        updatedPetData,
        {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedPet = response.data;
        console.log(updatedPet);
      } else {
        setModalMessage(response.data.message || "Failed to update pet");
        setShowModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        } else if (error.response?.data?.message) {
          setModalMessage(error.response.data.message);
          setShowModal(true);
        }
      } else {
        console.error("Error updating pet:", error);
      }
    }
  };

  const getAllergenList = async () => {
    const isLoginPage = window.location.pathname === "/signin";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("CSRF token not found in cookies");
      }

      console.log("TOKEN: " + token);
      const response = await axios.get(`${BASE_URL}/web/pet/allergen-dictionary`, {
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(token),
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setAllergenList(response.data);
        console.log("petList: ", response.data);
      } else {
        throw new Error("Failed to fetch list of pets");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isLoginPage) {
          setIsAuthenticated(false);
        }
      } else {
        console.error("Error fetching pets");
      }
      throw error;
    }
  };

  useEffect(() => {
    setAuthError(null);
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setIsAuthenticated(true); // User is considered authenticated
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user data from localStorage
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getFamilyMembers();
      getPetList();
      getAllergenList();
    }
  }, [isAuthenticated]);

  const values = {
    isAuthenticated,
    login,
    signUp,
    logout,
    updateUser,
    authError,
    user,
    familyMembers,
    getFamilyMembers,
    addFamilyMember,
    deleteFamilyMember,
    addPet,
    getPetList,
    petList,
    deletePet,
    getPetDetails,
    petDetails,
    uploadUserImage,
    updatePet,
    uploadPetImage,
    allergenList,
    getAllergenList
  };

  return (
    <AuthContext.Provider value={values}>
      <>
        {children}
        <CustomModal
          show={showModal}
          title="Failed"
          message={modalMessage}
          showCancel={false}
          variant="danger"
          onConfirm={() => setShowModal(false)}
          showConfirm={true}
          confirmText="Close"
        />
      </>
    </AuthContext.Provider>
  );
};
