import { SetStateAction, useState } from 'react';

import LocationInput from './components/LocationInput'
import Weather from './components/Weather'

import './App.css'

function App() {
	const [locationData, setLocationData] = useState({
		streetAddress: '',
		city: '',
		state: '',
		zip: ''
	});

	const [weatherData, setWeatherData]: [any, any] = useState({
		generatedAt: '',
		periods: []
	});

	/*
		1. Input and Submit: Provide an input field where users can enter an address, city, or
		other location and a method for querying weather data based on user input.
		2. Geolocation: Utilize the Nominatim API to convert the location entered by the user into
		latitude and longitude coordinates.
		3. Weather: Fetch weather data from the National Weather Service API using the latitude
		and longitude coordinates obtained from the geolocation API.
		4. Display: Display the following weather information for the specified location:

		- Temperature (in Fahrenheit)
		- Description of the weather conditions
		- Wind speed
		- Detailed forecast
	*/
	
	return (
		<main>
			<h1>Weather App</h1>
			<LocationInput locationData={locationData} setLocationData={setLocationData} setWeatherData={setWeatherData} />
			<Weather {...weatherData} />
		</main>
	)
}

export default App
