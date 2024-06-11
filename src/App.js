import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import CarRentalPage from './pages/CarRentalPage';
import CarDetailForm from './pages/CarDetailForm';
import RentalConfirmation from './pages/RentalConfirmation';
import { AppContext, AppProvider } from './context/AppContext';

const App = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/location');
        dispatch({ type: 'SET_LOCATIONS', payload: response.data });
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, [dispatch]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars');
        dispatch({ type: 'SET_CARS', payload: response.data });
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, [dispatch]);

  const handleCarSelect = (car) => {
    dispatch({ type: 'SET_SELECTED_CAR', payload: car });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'details' });
  };

  const handleRent = (details) => {
    dispatch({ type: 'SET_RENTAL_DETAILS', payload: details });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'confirmation' });
  };

  const handleClose = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'search' });
  };

  const handleLocationChange = (event) => {
    const selectedLocationId = event.target.value;
    dispatch({ type: 'SET_SELECTED_LOCATION', payload: selectedLocationId });
  };

  const handleSearch = async () => {
    try {
      let response;
      if (state.selectedLocation) {
        response = await axios.get(`http://localhost:8080/api/cars/byLocation/${state.selectedLocation}`);
      } else {
        response = await axios.get('http://localhost:8080/api/cars');
      }
      dispatch({ type: 'SET_CARS', payload: response.data });
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <div>
      {state.currentPage === 'search' && (
        <CarRentalPage
          cars={state.cars}
          locations={state.locations}
          selectedLocation={state.selectedLocation}
          onCarSelect={handleCarSelect}
          onLocationChange={handleLocationChange}
          onSearch={handleSearch}
        />
      )}
      {state.currentPage === 'details' && state.selectedCar && (
        <CarDetailForm car={state.selectedCar} onRent={handleRent} onClose={handleClose} />
      )}
      {state.currentPage === 'confirmation' && (
        <RentalConfirmation car={state.selectedCar} {...state.rentalDetails} onClose={handleClose} />
      )}
    </div>
  );
};

const AppWrapper = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWrapper;
