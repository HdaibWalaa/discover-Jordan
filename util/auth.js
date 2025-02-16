import axios from "axios";
import BASE_URL from "../hook/apiConfig";

// Function to authenticate user
export async function authenticate(
  usernameOrEmail,
  password,
  device_token,
  language
) {
  const url = `${BASE_URL}/login`;

  const dataToSend = {
    usernameOrEmail,
    password,
    device_token,
  };

  try {
    const response = await axios.post(url, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        "Content-Language": language,
        "X-API-KEY": "DISCOVERJO91427",
      },
    });

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure from server.");
    }

    const { token, first_login, verified_email } = response.data.data;

    if (!token) {
      throw new Error(
        "Authentication failed: Token is missing in the response."
      );
    }

    console.log("Login token:", token); // Log the token for debugging
    return {
      token,
      first_login,
      verified_email,
    };
  } catch (error) {
    if (error.response) {
      // Server responded with a status outside of the 2xx range
      console.error(
        "Authentication error:",
        error.response.data?.message || "Unknown server error"
      );
      throw new Error(
        error.response.data?.message || "Server returned an error during login."
      );
    } else if (error.request) {
      // No response received from the server
      console.error("No response from the server:", error.request);
      throw new Error(
        "Unable to connect to the server. Please try again later."
      );
    } else {
      // Error occurred in setting up the request
      console.error("Error setting up authentication request:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}

const handleLogout = async () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  try {
    authCtx.logout();
    // Reset the navigation stack and redirect to the Onboarding screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Onboarding" }],
    });
  } catch (error) {
    console.error("Logout error:", error);
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      Alert.alert(
        "Logout Error",
        error.response.data.msg || "An error occurred during logout."
      );
    } else if (error.request) {
      // No response was received from the server
      Alert.alert(
        "Logout Error",
        "No response from the server. Please try again later."
      );
    } else {
      // Something else went wrong in setting up the request
      Alert.alert(
        "Logout Error",
        "An unexpected error occurred. Please try again later."
      );
    }
  }
};

// Function to create a new user
export async function createUser(
  username,
  email,
  password,
  confirmPassword,
  language
) {
  const url = `${BASE_URL}/register`;

  const dataToSend = {
    username,
    email,
    password,
    password_confirmation: confirmPassword,
    device_token: "ABCDEFGHIJKLNNOP",
  };

  try {
    const response = await axios.post(url, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        "Content-Language": language,
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error.message);
    throw error;
  }
}

// Function to request password reset
export async function forgotPassword(email) {
  const url = `${BASE_URL}/forgot-password`;

  const dataToSend = new FormData();
  dataToSend.append("email", email);

  try {
    const response = await axios.post(url, dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data; // Ensure response data is returned
  } catch (error) {
    console.error(
      "Error occurred during password reset request:",
      error.response?.data || error.message
    );
    throw error; // Throw error to be handled in resetPasswordHandler
  }
}

// Function to reset user password
export async function resetPassword(email, password, confirmPassword, token) {
  const url = `${BASE_URL}/reset-password`;

  const dataToSend = {
    email,
    password,
    password_confirmation: confirmPassword,
    token,
  };

  try {
    const response = await axios.post(url, dataToSend, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred during password reset:", error.message);
    throw error;
  }
}

// Function to resend verification email
export async function resendVerificationEmail(token, email) {
  const url = `${BASE_URL}/email/verification-notification`;

  try {
    console.log("API URL:", url); // Log the API URL
    console.log("Email being sent:", email); // Log the email being sent
    console.log("Authorization Header:", `Bearer ${token}`); // Log the token in the Authorization header

    const response = await axios.post(
      url,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Resend verification email error:", error.message); // Log the error message
    throw error;
  }
}

// Function to fetch user profile
export async function getUserProfile(token, language) {
  const url = `${BASE_URL}/user/profile`;

  try {
    console.log("Sending request with token:", token);
    console.log("Language being sent:", language); // ✅ Debugging log

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": language, // ✅ Send `ar` or `en` dynamically
        "X-API-KEY": "DISCOVERJO91427",
      },
    });

    console.log("Profile Response:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}

// Function to update user profile
export async function updateUserProfile(data, token) {
  const url = `${BASE_URL}/profile/update`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": "en",
        "Content-Type": "multipart/form-data",
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while updating profile:", error.message);
    throw error;
  }
}

// Function to set user location
export const setUserLocation = async (
  longitude,
  latitude,
  addressAr,
  addressEn,
  token
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/set-location`,
      {
        longitude,
        latitude,
        address_ar: addressAr,
        address_en: addressEn,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": "DISCOVERJO91427",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error setting location:",
      error.response?.data || error.message
    );
    throw error;
  }
};
