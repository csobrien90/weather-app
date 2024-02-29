import { GEOAPIFY_AUTOCOMPLETE_LAMBDA_URL } from '../../env'
import { autocompleteLocationData } from '../types'

export async function autocompleteLocation(
	address: string,
	signal: AbortSignal
): Promise<autocompleteLocationData[] | void | {error: string}> {
	try {
		// Check if the request was aborted
		if (signal.aborted) return;

		// Build the URL for the Geoapify Autocomplete Lambda
		const url = new URL(GEOAPIFY_AUTOCOMPLETE_LAMBDA_URL);
		url.searchParams.set('a', address);

		// Fetch the location data from the Geoapify API
		const response = await fetch(url.toString(), { signal });

		// Parse the response and return the possible locations
		const data = await response.json();		
		return data.features;
	} catch (error) {
		// If the request was aborted, let it fail silently and return
		if((error as Error).name === 'AbortError') return;

		// Log the error and return an error message
		console.error(error);
		return {error: 'Error fetching location data'};
	}
}