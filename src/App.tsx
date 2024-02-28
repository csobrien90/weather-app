import { useState } from 'react';

import LocationInput from './components/LocationInput'
import Weather from './components/Weather'

import './App.css'

export default function App() {
	const [locationData, setLocationData] = useState({formattedAddress: '', displayName: ''});

	const [weatherData, setWeatherData]: [any, any] = useState({
		generatedAt: '',
		periods: []
	});

	return (
		<main>
			<h1>Weather App</h1>
			<LocationInput locationData={locationData} setLocationData={setLocationData} setWeatherData={setWeatherData} />
			<Weather locationData={locationData} {...weatherData} />
		</main>
	)
}