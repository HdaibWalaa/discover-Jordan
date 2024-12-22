import React, { createContext, useState } from "react";

export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
  isFavourite: (id) => false,
});

const FavouritesContextProvider = ({ children }) => {
  const [ids, setIds] = useState([]);

  const addFavourite = (id) => {
    setIds((prevIds) => [...prevIds, id]);
  };

  const removeFavourite = (id) => {
    setIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
  };

  const isFavourite = (id) => {
    return ids.includes(id);
  };

  const value = {
    ids,
    addFavourite,
    removeFavourite,
    isFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
