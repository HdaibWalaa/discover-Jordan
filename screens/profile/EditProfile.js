// import React, { useState, useEffect, useContext } from "react";
// import { ScrollView, StyleSheet, Alert } from "react-native";
// import axios from "axios";
// import { AuthContext } from "../../store/auth-context";
// import LoadingIndicator from "../../components/Reusable/LoadingIndicator";
// import { EditForm } from "../../components";
// import BASE_URL from "../../hook/apiConfig";

// const EditProfile = ({ navigation }) => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const authCtx = useContext(AuthContext);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/user/profile`, {
//           headers: {
//             Authorization: `Bearer ${authCtx.token}`,
//             Accept: "application/json",
//           },
//         });
//         setProfile(response.data.data || {});
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         Alert.alert("Error", "Failed to fetch profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [authCtx.token]);

//   const handleSaveProfile = async (updatedProfileData) => {
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/profile/update`,
//         updatedProfileData,
//         {
//           headers: {
//             Authorization: `Bearer ${authCtx.token}`,
//             "Content-Type": "multipart/form-data",
//             Accept: "application/json",
//           },
//         }
//       );

//       Alert.alert(
//         "Profile Updated",
//         response?.data?.msg || "Your profile has been updated successfully!"
//       );
//       authCtx.authenticate(authCtx.token, false); // Update firstLogin to false
//       navigation.reset({ index: 0, routes: [{ name: "BottomTabs" }] });
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error", "Failed to update profile. Please try again!");
//     }
//   };

//   if (loading) {
//     return <LoadingIndicator />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <EditForm profile={profile} onSaveProfile={handleSaveProfile} />
//     </ScrollView>
//   );
// };

// export default EditProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
// });
