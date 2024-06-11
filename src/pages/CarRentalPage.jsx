import React, { useContext } from 'react';
import axios from 'axios';
import '../css/CarRentalPage.css';
import { AppContext } from '../context/AppContext';

const CarRentalPage = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleCarSelect = (car) => {
    dispatch({ type: 'SET_SELECTED_CAR', payload: car });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'details' });
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
    <div className="car-rental-page">
      <h2>Lista de coches disponibles</h2>
      <div className="filter-section">
        <label htmlFor="location-select">Seleccionar Ubicación:</label>
        <select id="location-select" value={state.selectedLocation} onChange={handleLocationChange}>
          <option value="">Seleccione una ubicación</option>
          {state.locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="car-list">
        {state.cars.map((car) => (
          <div key={car.id} className="car-item" onClick={() => handleCarSelect(car)}>
            <img src={car.imageUrl} alt={car.model} />
            <h3>{car.model}</h3>
            <p>Año: {car.year}</p>
            <p>Precio por día: ${car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRentalPage;
