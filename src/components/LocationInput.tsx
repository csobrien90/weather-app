import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { fetchWeatherData } from '../lib/fetchWeatherData';
import { autocompleteLocation } from '../lib/autocompleteLocation';
import { LocationData, WeatherData, autocompleteLocationData, FormStateMessageProps } from '../types';
import locationIcon from '../assets/images/location.svg';

const FormStateMessage: React.FC<FormStateMessageProps> = ({
	locationLookupLoading,
	error,
	addressLookup,
	possibleLocations
}: FormStateMessageProps): JSX.Element => {
	if (locationLookupLoading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	if (addressLookup.length > 0 && possibleLocations.length === 0) {
		return <p>No results found</p>
	}

	return <></>
}

export default function LocationInput({
	setLocationData,
	setWeatherData
}: {
	setLocationData: Dispatch<SetStateAction<LocationData>>,
	setWeatherData: Dispatch<SetStateAction<WeatherData>>
}): JSX.Element {
	// State
	const [addressLookup, setAddressLookup] = useState('');
	const [locationLookupLoading, setLocationLookupLoading] = useState(false);
	const [addressLookupAbortController, setAddressLookupAbortController] = useState(new AbortController());
	const [possibleLocations, setPossibleLocations] = useState<autocompleteLocationData[]>([]);
	const [error, setError] = useState('');

	const handleAddressLookup = async (e: ChangeEvent<HTMLInputElement>) => {
		// Cancel previous fetch
		addressLookupAbortController.abort();

		// Update addressLookup
		const input = e.target.value;
		setAddressLookup(input);

		// Clear location data if input is empty
		if (input === '') {
			clearData();
			setLocationData({ formattedAddress: '', displayName: '' });
			return;
		}

		// Don't make API call if input is less than 3 characters
		if (input.length < 3) return;

		// Prepare for new fetch
		setLocationLookupLoading(true);
		setError('');
		
		// Create new AbortController and set to state
		const newAbortController = new AbortController();
		setAddressLookupAbortController(newAbortController);

		try {
			// Fetch location data
			const data = await autocompleteLocation(input, newAbortController.signal);
	
			if (!data) return;
			
			if ('error' in data) {
				setError(data.error);
				setLocationLookupLoading(false);
				return;
			}

			// If value is an exact match, set locationData
			if (possibleLocations.length >= 1 && possibleLocations.some((location: autocompleteLocationData) => location.properties.formatted === input)) {
				handleExactMatch(possibleLocations, input);
				return;
			} else if (data.length >= 1 && data.some((location: autocompleteLocationData) => location.properties.formatted === input)) {
				handleExactMatch(data, input);
				return;
			}

			// Set possible locations
			setPossibleLocations(data);

			// Clear loading state
			setLocationLookupLoading(false);
		} catch (error) {
			// If request is aborted, no need to handle error
			if ((error as Error).name === 'AbortError') return;
			setError('An error occurred while fetching data');
			setLocationLookupLoading(false);
		}
	}

	const handleExactMatch = async (data: autocompleteLocationData[], input: string) => {
		// Set locationData to the selected location
		const selectedLocation = data.find((item: autocompleteLocationData) => item.properties.formatted === input);

		if (!selectedLocation) return;

		// Clear weather data
		setWeatherData({ generatedAt: '', days: {} });

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
		
		// Clear data and reset loading state
		clearData();
		setLocationLookupLoading(false);
	}

	const getCurrentLocation = async () => {
		setLocationLookupLoading(true);

		try {
			// Get current position from geolocation API
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

			// Get weather data for current location
			const { latitude, longitude } = position.coords;
			const newWeatherData = await fetchWeatherData({formattedAddress: `${latitude},${longitude}`});

			if ('error' in newWeatherData) {
				console.error(newWeatherData.error);
				setError(newWeatherData.error);
				setLocationLookupLoading(false);
				return;
			}

			// Set locationData to the current location
			const { displayName } = newWeatherData;
			setLocationData({
				formattedAddress: `${latitude},${longitude}`,
				displayName: displayName.split(',').slice(0, -1).join(',')
			});

			// Set weather data and clear loading state
			setWeatherData(newWeatherData);
			setLocationLookupLoading(false);
		} catch (error) {
			console.error(error);
			setLocationLookupLoading(false);
		}
	}

	const clearData = () => {
		setAddressLookup('');
		setPossibleLocations([]);
		setError('');
	};

	return (
		<section>
			<form>
				<div>
					<label>Location</label>
					<input type="text" list="possibleLocations" value={addressLookup} onChange={handleAddressLookup} />
					<datalist id="possibleLocations">
						{possibleLocations.length > 0 && addressLookup.length > 0 && possibleLocations.map((location, index) => {
							return (<option key={index} value={location.properties.formatted} />)
						})}
					</datalist>
				</div>
				<button
					type='button'
					onClick={getCurrentLocation}
				>Use Current Location <img src={locationIcon} alt="use current location" /></button>
			</form>
			<FormStateMessage
				locationLookupLoading={locationLookupLoading}
				error={error}
				addressLookup={addressLookup}
				possibleLocations={possibleLocations}
			/>
		</section>
	)
}