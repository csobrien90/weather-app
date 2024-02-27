import { fetchWeatherData } from '../lib/fetchWeatherData';

export default function LocationInput({locationData, setLocationData, setWeatherData}: {
	locationData: {streetAddress: string, city: string, state: string, zip: string},
	setLocationData: (locationData: {streetAddress: string, city: string, state: string, zip: string}) => void,
	setWeatherData: (weatherData: {generatedAt: string, periods: any[]} ) => void
}): JSX.Element {

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const weatherData = await fetchWeatherData(locationData);
		
		if ('error' in weatherData) {
			console.error(weatherData.error);
			return;
		}
		
		setWeatherData(weatherData);
	}

	return (
		<form>
			<div>
				<label htmlFor="streetAddress">Street Address</label>
				<input
					type="text"
					id="streetAddress"
					value={locationData.streetAddress}
					onChange={(e) => setLocationData({ ...locationData, streetAddress: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					value={locationData.city}
					onChange={(e) => setLocationData({ ...locationData, city: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor="state">State</label>
				<input
					type="text"
					id="state"
					value={locationData.state}
					onChange={(e) => setLocationData({ ...locationData, state: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor="zip">Zip</label>
				<input
					type="text"
					id="zip"
					value={locationData.zip}
					onChange={(e) => setLocationData({ ...locationData, zip: e.target.value })}
				/>
			</div>
			<button type="submit" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	)
}