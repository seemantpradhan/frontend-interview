// Create an application that consumes the https://swapi.py4e.com/api/people  API 
// and displays a table containing a list of Star Wars characters and the films they have appeared in 
// and the vehicles they have used. The application should make multiple parallel API calls to fetch the film 
// and vehicle details using the URLs returned in the first API call and display them in the table.

import React from 'react';
import './style.css';
// import axios from 'axios';

export default function App() {
  const [persons, setPersons] = React.useState([]);

  const fetchPeopleDetails = () => {
    fetch('https://swapi.py4e.com/api/people')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        processFilmAndVehicle(data.results);
      });
  };

  const processFilmAndVehicle = async (persons) => {
    await Promise.all(
      persons.map(async (person) => {
        person.filmNames = await Promise.all(person.films.map(fetchFilmNames));
        person.vehicleNames = await Promise.all(
          person.vehicles.map(fetchVehicleNames)
        );
      })
    );
    console.log(persons);
    setPersons(persons);
  };

  const fetchFilmNames = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.title;
  };

  const fetchVehicleNames = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.name;
  };

  React.useEffect(() => {
    fetchPeopleDetails();
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <table>
        <tr>
          <th>Actor</th>
          <th>Films appeared in</th>
          <th>Vehicles Used</th>
        </tr>
        {persons.map((person) => (
          <tr>
            <td>{person.name}</td>
            <td key={person.name}> {person.filmNames.join(', ')}</td>
            <td key={person.created}> {person.vehicleNames.join(', ')}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
