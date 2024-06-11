import React, { useState } from 'react';
import '../css/CarDetailForm.css';

const CarDetailForm = ({ car, onRent, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRent({ startDate, endDate });
  };

  return (
    <div className="car-detail-form">
      <h2>Detalles del coche</h2>
      <div className="car-detail">
        <h3>{car.model}</h3>
        <p>Año: {car.year}</p>
        <p>Precio por día: ${car.price}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Fecha de inicio:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label>
            Fecha de finalización:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </label>
          <button type="submit">Confirmar renta</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default CarDetailForm;
