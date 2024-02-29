import { WeatherDataExtended, LocationData, Period, WeatherDays, ForecastData } from "../types";

export async function fetchWeatherData(
	locationData: LocationData
): Promise< WeatherDataExtended | {error: string}> {
	try {
		// Fetch the latitude and longitude coordinates from the Nominatim API
		const coordinates = await getCoordinates(locationData.formattedAddress);

		if ('error' in coordinates) {
			return { error: coordinates.error }
		}

		const { lat, lon, displayName } = coordinates;

		// Check if the location is in the United States, if not return an error
		if (!displayName.includes('United States')) {
			return { error: 'This app only supports locations in the United States' }
		}
		
		// Fetch the weather data from the National Weather Service API
		const forecast = await getForecast(lat, lon);

		// Check if an error occurred while fetching the weather data
		if ('error' in forecast) {
			return forecast;
		}	

		// Desctructure the weather data
		const { generatedAt, periods } = forecast;

		// Validate the weather data
		if (!generatedAt || !periods) {
			return { error: 'Invalid weather data' }
		}

		// Parse the periods into days
		const days = periods.reduce((acc, period: Period) => {
			const { name } = period;
			
			switch (name) {
				case "Today":
				case "This Afternoon":
					acc['Today'] = {...acc['Today'], day: period}
					break;
				case "Tonight":
					acc['Today'] = {...acc['Today'], night: period}
					break;
				default:
					if (name.includes('Night')) {
						const dayName = name.split(' ')[0]
						acc[dayName] = {...acc[dayName], night: period}
					} else {
						acc[name] = {...acc[name], day: period}
					}
					break;
			}

			return acc
		}, {} as WeatherDays);		

		return { generatedAt, days, displayName }
	} catch (error) {
		// Return an error message
		return { error: `An error occurred while fetching the weather data: ${(error as Error).message}` }
	}
}

async function getCoordinates(address: string): Promise<{lat: string, lon: string, displayName: string} | {error: string}> {
	// Fetch the latitude and longitude coordinates from the Nominatim API
	const url = new URL('https://nominatim.openstreetmap.org/search');
	url.searchParams.set('q', address);
	url.searchParams.set('format', 'jsonv2');
	
	try {
		// Fetch the location data
		const response = await fetch(url.toString());
		const locations = await response.json();
		
		// Validate the location data
		if (locations.length === 0) {
			return {error: 'No location data found'};
		}
		
		const { lat, lon, display_name: displayName  } = locations[0];
	
		return { lat, lon, displayName }
	} catch (error) {
		// Return an error message
		return { error: `An error occurred while fetching the location data: ${(error as Error).message}` }
	}
}

async function getForecast(lat: string, lon: string): Promise<ForecastData | {error: string}> {
	// Fetch the weather data from the National Weather Service API
	const weatherResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
	const { properties: { forecast: forecastUrl } } = await weatherResponse.json()

	// Fetch the forecast
	const forecastResponse = await fetch(forecastUrl);
	const data = await forecastResponse.json();

	// Destructure the forecast data
	const { properties: {generatedAt, periods} } = data;

	return { generatedAt, periods}
}