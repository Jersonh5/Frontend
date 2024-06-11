import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  currentPage: 'search',
  selectedCar: null,
  rentalDetails: {},
  cars: [],
  locations: [],
  selectedLocation: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SELECTED_CAR':
      return { ...state, selectedCar: action.payload };
    case 'SET_RENTAL_DETAILS':
      return { ...state, rentalDetails: action.payload };
    case 'SET_CARS':
      return { ...state, cars: action.payload };
    case 'SET_LOCATIONS':
      return { ...state, locations: action.payload };
    case 'SET_SELECTED_LOCATION':
      return { ...state, selectedLocation: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
