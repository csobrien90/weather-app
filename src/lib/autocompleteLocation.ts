import { GEOAPIFY_API_KEY } from '../../env'

export async function autocompleteLocation(address: string, signal: AbortSignal): Promise<any> {
	try {
		const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${GEOAPIFY_API_KEY}`, {signal});
		const data = await response.json();
		return data.features;
	} catch (error) {
		if((error as Error).name === 'AbortError') return;

		console.error(error);
		return {error: 'Error fetching location data'};
	}
}