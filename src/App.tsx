// import external dependencies
import { useState } from 'react';

// Import components
import LocationInput from './components/LocationInput'
import Weather from './components/Weather'

// Import types
import { WeatherDays, LocationData } from './types';

export default function App() {
	// Create app state
	const [locationData, setLocationData] = useState({formattedAddress: '', displayName: ''} as LocationData);
	const [weatherData, setWeatherData] = useState({
		generatedAt: '',
		days: {} as WeatherDays
	});

	return (
		<main>
			<h1>Weather App</h1>
			<p>Search for a location to get its current weather forecast. You can search by street address, city, county, state, and/or zip code. You can also search for business names, though not all businesses are available.</p>
			<p>Please note, this app only supports locations in the United States.</p>
			<LocationInput
				setLocationData={setLocationData}
				setWeatherData={setWeatherData}
			/>
			<Weather
				locationData={locationData}
				{...weatherData}
			/>
		</main>
	)
}