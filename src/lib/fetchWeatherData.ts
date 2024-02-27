export async function fetchWeatherData(locationData: {
	streetAddress: string,
	city: string,
	state: string,
	zip: string
}): Promise<{
	generatedAt: string,
	periods: {
		number: number,
		name: string,
		detailedForecast: string,
		temperature: number,
		windSpeed: string,
	}[]
} | {error: string}> {
	try {
		// Fetch the latitude and longitude coordinates from the Nominatim API
		const url = new URL('https://nominatim.openstreetmap.org/search');
		url.searchParams.set('street', locationData.streetAddress);
		url.searchParams.set('city', locationData.city);
		url.searchParams.set('state', locationData.state);
		url.searchParams.set('postalcode', locationData.zip);
		url.searchParams.set('country', 'USA');
		url.searchParams.set('format', 'jsonv2');
	
		// Fetch the location data
		const response = await fetch(url.toString());
		const locations = await response.json() as { lat: string, lon: string }[];
		const { lat, lon } = locations[0];
	
		// Fetch the weather data from the National Weather Service API
		const weatherResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
		const { properties: { forecast: forecastUrl } } = await weatherResponse.json()
	
		// Fetch the forecast
		const forecastResponse = await fetch(forecastUrl);
		const { properties: {generatedAt, periods} } = await forecastResponse.json();
	
		return { generatedAt, periods}
	} catch (error) {
		console.error(error);
		return { error: `An error occurred while fetching the weather data: ${(error as Error).message}` }
	}
}