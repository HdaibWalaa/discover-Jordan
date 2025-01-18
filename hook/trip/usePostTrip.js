import axios from "axios";
import BASE_URL from "../apiConfig";

export async function usePostTrip(
  token,
  tripType,
  placeId,
  name,
  description,
  cost,
  ageMin,
  ageMax,
  gender,
  date,
  time,
  attendanceNumber,
  tags,
  users
) {
  if (!token) {
    console.error("Error: Authentication token is missing.");
    throw new Error("Authentication token is missing.");
  }

  const url = `${BASE_URL}/trip/create`;
  const formData = new FormData();
  formData.append("trip_type", tripType);
  formData.append("place_id", placeId);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("cost", cost);
  formData.append("age_min", ageMin);
  formData.append("age_max", ageMax);
  formData.append("gender", gender);
  formData.append("date", date);
  formData.append("time", time);
  formData.append("attendance_number", attendanceNumber);
  formData.append("tags", JSON.stringify(tags));
  formData.append("users", JSON.stringify(users));

  console.log("Making API request with token:", token);
  console.log("Form Data:", formData);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("API Response Status:", response.status);
    console.log("API Response Data:", response.data);

    if (response.status !== 200) {
      console.error("Error: Failed to create trip:", response.data.message);
      throw new Error(response.data.message || "Failed to create trip");
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error creating trip:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "There was an issue creating the trip. Please check your inputs and try again."
    );
  }
}
