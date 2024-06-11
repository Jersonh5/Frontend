import React from 'react';
import '../css/RentalConfirmation.css';

const RentalConfirmation = ({ car, startDate, endDate, onClose }) => {
  return (
    <div className="rental-confirmation">
      <h2>Confirmación de Renta</h2>
      <div className="receipt">
        <h3>{car.model}</h3>
        <p>Año: {car.year}</p>
        <p>Precio por día: ${car.price}</p>
        <p>Fecha de inicio: {startDate}</p>
        <p>Fecha de finalización: {endDate}</p>
        <p>¡Renta confirmada!</p>
      </div>
      <button className="rental-confirmation-button" onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default RentalConfirmation;
