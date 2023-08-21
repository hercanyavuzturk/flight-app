import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FlightSearch.css";
import mockFlights from "../../mockFlights";
import { format } from "date-fns";
import FlightResults from "../FlightResults/FlightResults";

const FlightSearch = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [oneWay, setOneWay] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const validateFields = () => {
    const newErrors = {};

    if (!departureAirport.trim()) {
      newErrors.departureAirport = "Departure airport is required";
    }

    if (!oneWay && !arrivalAirport.trim()) {
      newErrors.arrivalAirport = "Arrival airport is required";
    }

    if (!departureDate) {
      newErrors.departureDate = "Departure date is required";
    }

    if (!oneWay && !arrivalDate) {
      newErrors.arrivalDate = "Arrival date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    const isValid = validateFields();

    if (isValid) {
      // Burada arama işlemlerini yapabilirsiniz
      // API çağrıları ve sonuçların işlenmesi gibi

      const searchResults = mockFlights.filter((flight) => {
        const flightDepartureDateMock = flight.departureDate;
        const flightArrivalDateMock = flight.arrivalDate;
        const formattedDepartureDateUser = format(departureDate, "yyyy-MM-dd");
        const formattedArrivalDateUser = arrivalDate
          ? format(arrivalDate, "yyyy-MM-dd")
          : null;

        const lowerCaseDepartureAirport = departureAirport.toLowerCase();
        const lowerCaseArrivalAirport = arrivalAirport.toLowerCase();
        const flightDepartureAirport = flight.departureAirport.toLowerCase();
        const flightArrivalAirport = flight.arrivalAirport.toLowerCase();

        // console.log(flightDepartureDateMock);
        // console.log(formattedDepartureDateUser);
        return (
          flightDepartureAirport === lowerCaseDepartureAirport &&
          flightArrivalAirport === lowerCaseArrivalAirport &&
          flightDepartureDateMock === formattedDepartureDateUser &&
          (!arrivalDate || flightArrivalDateMock === formattedArrivalDateUser)
        );
      });
      
      

      console.log(searchResults);
      setSearchResults(searchResults);
    }
  };

  return (
    <div className="search-container">
      <div className="form-group">
        <label>Departure Airport:</label>
        <input
          type="text"
          className={`form-control ${errors.departureAirport ? "error" : ""}`}
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
          placeholder="Enter departure airport"
        />
        {errors.departureAirport && (
          <div className="error-message">{errors.departureAirport}</div>
        )}
      </div>
      <div className="form-group">
        <label>Arrival Airport:</label>
        <input
          type="text"
          className={`form-control ${errors.arrivalAirport ? "error" : ""}`}
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value)}
          placeholder="Enter arrival airport"
          
        />
        {errors.arrivalAirport && (
          <div className="error-message">{errors.arrivalAirport}</div>
        )}
      </div>
      <div className="form-group">
        <label>Departure Date:</label>
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        {errors.departureDate && (
          <div className="error-message">{errors.departureDate}</div>
        )}
      </div>
      {!oneWay && (
        <div className="form-group">
          <label>Arrival Date:</label>
          <DatePicker
            selected={arrivalDate}
            onChange={(date) => setArrivalDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          {errors.arrivalDate && (
            <div className="error-message">{errors.arrivalDate}</div>
          )}
        </div>
      )}
      <div className="form-group">
        <label>One-Way:</label>
        <input
          type="checkbox"
          checked={oneWay}
          onChange={() => setOneWay(!oneWay)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {searchResults.length > 0 && (
        <FlightResults searchResults={searchResults} />
      )}
    </div>
  );
};

export default FlightSearch;
