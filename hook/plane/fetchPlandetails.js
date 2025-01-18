import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchPlanDetails = async (id, token, language) => {
  try {
    if (!token) {
      throw new Error("No token found in storage.");
    }

    console.log("Token received in fetchPlanDetails:", token);

    const response = await axios.get(`${BASE_URL}/plan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": language, 
        
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      const messages = error.response.data.msg;
      if (messages.includes("The selected plan id is invalid.")) {
        console.error("The plan ID provided is invalid.");
      } else if (
        messages.includes(
          "validation.msg.api.you_are_not_the_owner_of_this_plan"
        )
      ) {
        console.error("You do not have permission to access this plan.");
      } else {
        console.error("Error fetching plan details:", error.response.data);
      }
    } else {
      console.error("Error fetching plan details:", error.message);
    }
    throw error;
  }
};

export default fetchPlanDetails;
