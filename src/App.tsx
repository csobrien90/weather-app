import LocationInput from './components/LocationInput'
import Weather from './components/Weather'

import './App.css'

function App() {
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
			<LocationInput />
			<Weather />
		</main>
	)
}

export default App
