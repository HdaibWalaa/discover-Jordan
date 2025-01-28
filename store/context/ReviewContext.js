import React, { createContext, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  // Function to add a review
  const addReviewToContext = (placeId, newReview) => {
    setReviews((prev) => [...prev, newReview]);
  };

  // Function to delete a review
  const deleteReviewFromContext = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };

  // Function to edit a review
  const editReviewInContext = (reviewId, updatedComment) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, comment: updatedComment } : review
      )
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReviewToContext,
        deleteReviewFromContext,
        editReviewInContext,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
