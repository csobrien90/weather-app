import { useState } from 'react';
import { fetchWeatherData } from '../lib/fetchWeatherData';
import { autocompleteLocation } from '../lib/autocompleteLocation';
import { LocationData, WeatherData, autocompleteLocationData } from '../types';

export default function LocationInput({
	setLocationData,
	setWeatherData
}: {
	setLocationData: (locationData: LocationData) => void,
	setWeatherData: React.Dispatch<React.SetStateAction<WeatherData>>
}): JSX.Element {
	const [addressLookup, setAddressLookup] = useState('');
	const [locationLookupLoading, setLocationLookupLoading] = useState(false);
	const [addressLookupAbortController, setAddressLookupAbortController] = useState(new AbortController());
	const [possibleLocations, setPossibleLocations] = useState([] as string[]);
	const [error, setError] = useState('');

	const handleAddressLookup = async (e: React.ChangeEvent<HTMLInputElement>) => {
		// Cancel previous fetch
		addressLookupAbortController.abort();

		// Clear location data if input is empty
		if (e.target.value === '') {
			setAddressLookup('');
			setLocationData({formattedAddress: '', displayName: ''});
			setPossibleLocations([]);
			setError('');
			return;
		}

		// Update addressLookup
		setAddressLookup(e.target.value);

		// Don't make API call if input is less than 3 characters
		if (e.target.value.length < 3) return;

		// Set loading state
		setLocationLookupLoading(true);

		// Clear error
		setError('');
		
		// Create new AbortController
		const newAbortController = new AbortController();
		setAddressLookupAbortController(newAbortController);

		// Fetch location data
		const data = await autocompleteLocation(e.target.value, newAbortController.signal);

		if (data === undefined) return;
		
		if ('error' in data) {
			console.error(data.error);
			setError(data.error);
			setLocationLookupLoading(false);
			return;
		}

		// Set possible locations
		const possibleLocations = data.map((item: autocompleteLocationData) => item.properties.formatted)
		setPossibleLocations(possibleLocations);

		// If value is an exact match, set locationData
		if (possibleLocations.length >= 1 && possibleLocations[0] === e.target.value) {
			// Set locationData to the selected location
			const selectedLocation = data.find((item: autocompleteLocationData) => item.properties.formatted === e.target.value);

			if (!selectedLocation) return;

			const newAddress = selectedLocation.properties.formatted;
			setLocationData({
				formattedAddress: newAddress,
				displayName: newAddress
			});

			// Get weather data
			const newWeatherData = await fetchWeatherData({formattedAddress: newAddress});

			if ('error' in newWeatherData) {
				console.error(newWeatherData.error);
				setError(newWeatherData.error);
				setLocationLookupLoading(false);
				return;
			}

			setWeatherData(newWeatherData);

			// Clear possibleLocations
			setPossibleLocations([]);
			
			// Clear addressLookup
			setAddressLookup('');
		}

		// Clear loading state
		setLocationLookupLoading(false);
	}

	const getCurrentLocation = async () => {
		setLocationLookupLoading(true);

		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			
			const { latitude, longitude } = position.coords;

			const newWeatherData = await fetchWeatherData({formattedAddress: `${latitude},${longitude}`});

			if ('error' in newWeatherData) {
				console.error(newWeatherData.error);
				setError(newWeatherData.error);
				setLocationLookupLoading(false);
				return;
			}

			const { displayName } = newWeatherData;

			setLocationData({
				formattedAddress: `${latitude},${longitude}`,
				displayName: displayName.split(',').slice(0, -1).join(',')
			});

			setWeatherData(newWeatherData);

			setLocationLookupLoading(false);
		} catch (error) {
			console.error(error);
			setLocationLookupLoading(false);
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
			{locationLookupLoading && <p>Loading...</p>}
			{!locationLookupLoading && addressLookup.length > 0 && possibleLocations.length === 0 && <p>No results found</p>}
			{error && <p>{error}</p>}
		</form>
	)
}