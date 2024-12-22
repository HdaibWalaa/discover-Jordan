import React, { createContext, useState } from "react";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState({
    name: "",
    description: "",
    days: [{ activities: [] }],
  });

  const addActivityToDay = (dayIndex, activity) => {
    const updatedDays = [...plan.days];
    if (updatedDays[dayIndex]) {
      updatedDays[dayIndex].activities.push(activity);
    } else {
      console.error(`Day ${dayIndex} does not exist.`);
      return;
    }
    setPlan({ ...plan, days: updatedDays });
  };

  const addNewDay = () => {
    const newDay = { activities: [] };
    setPlan({ ...plan, days: [...plan.days, newDay] });
  };

  return (
    <PlanContext.Provider
      value={{ plan, setPlan, addActivityToDay, addNewDay }}
    >
      {children}
    </PlanContext.Provider>
  );
};
