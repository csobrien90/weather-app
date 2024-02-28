import { WeatherProps } from '../types';

export default function Weather({
	generatedAt,
	periods,
	locationData
}: WeatherProps): JSX.Element | null {
	if (!periods || !periods.length || !generatedAt) return null

	// Format the generatedAt date
	const date = new Date(generatedAt);
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};
	const formattedDate = date.toLocaleTimeString(undefined, options);

	// Format the displayName
	if (!locationData.displayName) return null;
	let displayName = formatDisplayName(locationData.displayName);

	if (!displayName || periods.length === 0) {
		return null;
	}

	return (
		<section>
			<h2>Forecast for {displayName}</h2>
			<p>Last updated on: {formattedDate}</p>
			{periods.map((period, index) => (
				<article key={index}>
					<h3>{period.name}</h3>
					<p>{period.detailedForecast}</p>
					<p>Temperature: {period.temperature}°F</p>
					<p>Wind Speed: {period.windSpeed}</p>
				</article>
			))}
		</section>
	)
}

const formatDisplayName = (displayName: string): string => {
	let formattedDisplayName = '';
	if (displayName.split(',').length > 5) {
		formattedDisplayName = displayName.split(',').slice(3, -3).join(',');
	} else if (displayName.split(',').length > 3) {
		formattedDisplayName = displayName.split(',').slice(1, -1).join(',');
	} else {
		formattedDisplayName = displayName.split(',').slice(0, -1).join(',');
	}

	return formattedDisplayName;
}