import React from 'react';
import './FlightResults.css'; 

const FlightResults = ({ searchResults }) => {
  return (
    <div className="results-container">
      <h2>Search Results:</h2>
      <ul className="results-list">
        {searchResults.map(flight => (
          <li key={flight.id} className="results-item">
            <p>Departure Airport: {flight.departureAirport}</p>
            <p>Arrival Airport: {flight.arrivalAirport}</p>
            <p>Departure Date: {flight.departureDate}</p>
            <p>Arrival Date: {flight.arrivalDate}</p>
            <p>Duration: {flight.duration}</p>
            <p>Price: {flight.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightResults;

