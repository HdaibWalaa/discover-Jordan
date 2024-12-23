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
      },
    });

    const token = response.data?.data?.token; // Extract token from the correct path
    console.log("Login token:", token); // Log the token
    return {
      token, // Return token for further use
      ...response.data.data, // Spread other user details for additional context
    };
  } catch (error) {
    console.error("Error during authentication:", error.message);
    throw error;
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
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred during password reset request:",
      error.response?.data || error.message
    );
    throw error;
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
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred during password reset:", error.message);
    throw error;
  }
}

// Function to resend verification email
export async function resendVerificationEmail(token) {
  const url = `${BASE_URL}/email/verification-notification`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred during email verification resend:",
      error.message
    );
    throw error;
  }
}



// Function to fetch user profile
export async function getUserProfile(token) {
  const url = `${BASE_URL}/user/profile`;
  try {
    console.log("Sending request with token:", token);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": "en",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
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
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while updating profile:", error.message);
    throw error;
  }
}

// Function to set user location
export async function setUserLocation(data, token) {
  const url = `${BASE_URL}/user/set-location`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while setting location:", error.message);
    throw error;
  }
}
