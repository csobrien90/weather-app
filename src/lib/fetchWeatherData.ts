export async function fetchWeatherData(locationData: {formattedAddress: string}): Promise<{
	generatedAt: string,
	periods: {
		number: number,
		name: string,
		detailedForecast: string,
		temperature: number,
		windSpeed: string,
	}[],
	displayName: string
} | {error: string}> {
	try {
		const { lat, lon, displayName } = await getCoordinates(locationData.formattedAddress);

		if (!displayName.includes('United States')) {
			return { error: 'This app only supports locations in the United States' }
		}
		
		const forecast = await getForecast(lat, lon);

		if ('error' in forecast) {
			return forecast;
		}

		const { generatedAt, periods } = forecast;

		return { generatedAt, periods, displayName }
	} catch (error) {
		console.error(error);
		return { error: `An error occurred while fetching the weather data: ${(error as Error).message}` }
	}
}

async function getCoordinates(address: string): Promise<{lat: string, lon: string, displayName: string}> {
	// Fetch the latitude and longitude coordinates from the Nominatim API
	const url = new URL('https://nominatim.openstreetmap.org/search');
	url.searchParams.set('q', address);
	url.searchParams.set('format', 'jsonv2');
	
	// Fetch the location data
	const response = await fetch(url.toString());
	const locations = await response.json() as { lat: string, lon: string, display_name: string }[];
	const { lat, lon, display_name: displayName  } = locations[0];

	return { lat, lon, displayName }
}

async function getForecast(lat: string, lon: string): Promise<{
	generatedAt: string,
	periods: {
		number: number,
		name: string,
		detailedForecast: string,
		temperature: number,
		windSpeed: string,
	}[]
} | {error: string}> {
	// Fetch the weather data from the National Weather Service API
	const weatherResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
	const { properties: { forecast: forecastUrl } } = await weatherResponse.json()

	// Fetch the forecast
	const forecastResponse = await fetch(forecastUrl);
	const data = await forecastResponse.json();

	const { properties: {generatedAt, periods} } = data;

	return { generatedAt, periods}
}