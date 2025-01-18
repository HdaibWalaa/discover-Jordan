import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import Input from "../Forms/Input";
import { PlanContext } from "../../store/context/PlanContext";
import { COLORS } from "../../constants/theme";

const CreatPlanForm = () => {
  const { plan, setPlan } = useContext(PlanContext);
  const [planName, setPlanName] = useState(plan.name || "");
  const [planDescription, setPlanDescription] = useState(
    plan.description || ""
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!planName) newErrors.name = "Plan name is required.";
    if (!planDescription)
      newErrors.description = "Plan description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    if (field === "name") setPlanName(value);
    if (field === "description") setPlanDescription(value);
    setPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Input
        label="Plan Name"
        textInputConfig={{
          placeholder: "Enter plan name",
          value: planName,
          onChangeText: (value) => handleChange("name", value),
        }}
        errorMessage={errors.name}
        iconSource={require("../../assets/images/icons/text.png")}
      />
      <Input
        label="Plan Description"
        textInputConfig={{
          placeholder: "Enter plan description",
          value: planDescription,
          multiline: true,
          onChangeText: (value) => handleChange("description", value),
        }}
        errorMessage={errors.description}
        iconSource={require("../../assets/images/icons/text.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
});

export default CreatPlanForm;
