import { useState } from 'react';

export default function LocationInput() {
	const [streetAddress, setStreetAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Fetch the latitude and longitude coordinates from the Nominatim API
		// https://nominatim.openstreetmap.org/search?city=Louisville&street=600+W+Main+St&format=jsonv2

		// Build the URL
		const url = new URL('https://nominatim.openstreetmap.org/search');
		url.searchParams.set('street', streetAddress);
		url.searchParams.set('city', city);
		url.searchParams.set('state', state);
		url.searchParams.set('postalcode', zip);
		url.searchParams.set('format', 'jsonv2');
		
		// Fetch the data
		const response = await fetch(url.toString());
		const data = await response.json();
		console.log(data);
	}

	return (
		<form>
			<div>
				<label htmlFor="streetAddress">Street Address</label>
				<input
					type="text"
					id="streetAddress"
					value={streetAddress}
					onChange={(e) => setStreetAddress(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="city">City</label>
				<input
					type="text"
					id="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="state">State</label>
				<input
					type="text"
					id="state"
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="zip">Zip</label>
				<input
					type="text"
					id="zip"
					value={zip}
					onChange={(e) => setZip(e.target.value)}
				/>
			</div>
			<button type="submit" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	)
}