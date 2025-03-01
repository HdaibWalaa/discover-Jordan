import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchCreatPlan = async (planData, token) => {
  try {
    console.log("Making API request to:", `${BASE_URL}/plan/create`);
    console.log("With headers:", {
      Authorization: `Bearer ${
        token ? token.substring(0, 10) + "..." : "missing"
      }`,
      "X-API-KEY": "DISCOVERJO91427",
    });

    const response = await axios.post(`${BASE_URL}/plan/create`, planData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    // Check if the response contains the expected data
    if (!response.data) {
      return {
        success: false,
        error: true,
        msg: "No data received from server",
      };
    }

    // If status is 200 and we have a success message in Arabic or English
    if (response.data.status === 200 || response.status === 200) {
      // If we have a success message but no ID, consider it a successful creation
      if (
        response.data.msg &&
        (response.data.msg.includes("successfully") ||
          response.data.msg.includes("بنجاح") ||
          response.data.msg.includes("success"))
      ) {
        return {
          success: true,
          msg: response.data.msg,
          // Return an empty data object since we don't have an ID
          data: {},
        };
      }
    }

    // Try to extract ID if it exists in any form
    const planId =
      response.data.id || response.data.data?.id || response.data.plan?.id;

    if (planId) {
      return {
        success: true,
        data: { id: planId },
      };
    }

    // If we have a positive status code but no clear success indicator
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        msg: response.data.msg || "Plan created successfully",
        data: response.data.data || {},
      };
    }

    // Default error case
    return {
      success: false,
      error: true,
      msg: response.data?.msg || "Plan created but no ID was returned",
      data: response.data,
    };
  } catch (error) {
    let errorMsg = "An unexpected error occurred";

    if (error.response) {
      console.error(
        "Error response:",
        error.response.status,
        error.response.data
      );

      // Handle validation errors array
      if (Array.isArray(error.response.data)) {
        errorMsg = error.response.data
          .map((err) => err.replace("Error: ", ""))
          .join("\n");
      } else {
        errorMsg =
          error.response.data?.message ||
          error.response.data?.msg ||
          `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      console.error("Error request:", error.request);
      errorMsg = "No response from server. Check your internet connection.";
    } else {
      console.error("Error message:", error.message);
      errorMsg = error.message;
    }

    return {
      success: false,
      error: true,
      msg: errorMsg,
    };
  }
};

export default fetchCreatPlan;
