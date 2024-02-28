import { useState } from 'react';
import { fetchWeatherData } from '../lib/fetchWeatherData';
import { autocompleteLocation } from '../lib/autocompleteLocation';

export default function LocationInput({setLocationData, setWeatherData}: {
	locationData: {formattedAddress: string, displayName: string},
	setLocationData: (locationData: {formattedAddress: string, displayName: string}) => void,
	setWeatherData: (weatherData: {generatedAt: string, periods: any[]} ) => void
}): JSX.Element {
	const [addressLookup, setAddressLookup] = useState('');
	const [addressLookupAbortController, setAddressLookupAbortController] = useState(new AbortController());
	const [possibleLocations, setPossibleLocations] = useState([]);

	const handleAddressLookup = async (e: React.ChangeEvent<HTMLInputElement>) => {
		// Cancel previous fetch
		addressLookupAbortController.abort();

		// Clear location data if input is empty
		if (e.target.value === '') {
			setAddressLookup('');
			setLocationData({formattedAddress: '', displayName: ''});
			setPossibleLocations([]);
			return;
		}

		// Update addressLookup
		setAddressLookup(e.target.value);

		// Don't make API call if input is less than 3 characters
		if (e.target.value.length < 3) return;

		// Create new AbortController
		const newAbortController = new AbortController();
		setAddressLookupAbortController(newAbortController);

		// Fetch location data
		const data = await autocompleteLocation(e.target.value, newAbortController.signal);

		if (data === undefined) return;
		
		if ('error' in data) {
			console.error(data.error);
			return;
		}

		// Set possible locations
		const possibleLocations = data.map((item: any) => item.properties.formatted)
		setPossibleLocations(possibleLocations);

		// If value is an exact match, set locationData
		if (possibleLocations.length === 1 && possibleLocations[0] === e.target.value) {
			// Set locationData to the selected location
			const selectedLocation = data.find((item: any) => item.properties.formatted === e.target.value);
			const newAddress = selectedLocation.properties.formatted;
			setLocationData({
				formattedAddress: newAddress,
				displayName: newAddress.split(',').slice(0, -1).join(',')
			});

			// Get weather data
			const newWeatherData = await fetchWeatherData({formattedAddress: newAddress});

			if ('error' in newWeatherData) {
				console.error(newWeatherData.error);
				return;
			}

			setWeatherData(newWeatherData);

			// Clear possibleLocations
			setPossibleLocations([]);
			
			// Clear addressLookup
			setAddressLookup('');
		}
	}

	const getCurrentLocation = async () => {
		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			
			const { latitude, longitude } = position.coords;

			const newWeatherData = await fetchWeatherData({formattedAddress: `${latitude},${longitude}`});

			if ('error' in newWeatherData) {
				console.error(newWeatherData.error);
				return;
			}

			const { displayName } = newWeatherData;

			setLocationData({
				formattedAddress: `${latitude},${longitude}`,
				displayName: displayName.split(',').slice(0, -1).join(',')
			});

			setWeatherData(newWeatherData);

			
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<form>
			<div>
				<label>Location</label>
				<input type="text" list="possibleLocations" value={addressLookup} onChange={handleAddressLookup} />
				<datalist id="possibleLocations">
					{possibleLocations.length > 0 && addressLookup.length > 0 && possibleLocations.map((location, index) => {
						return (<option key={index} value={location} />)
					})}
				</datalist>
			</div>
			<button
				type='button'
				onClick={getCurrentLocation}
			>Use Current Location</button>
		</form>
	)
}