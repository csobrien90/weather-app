import { WeatherProps } from '../types';

export default function Weather({
	generatedAt,
	days,
	locationData
}: WeatherProps): JSX.Element | null {
	if (!days || !Object.entries(days).length || !generatedAt) return null	

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

	if (!displayName) null;

	// Limit number of days to display
	const daysToDisplay = 3;
	const limitedDays = Object.keys(days).slice(0, daysToDisplay).reduce((acc, key) => {
		acc[key] = days[key];
		return acc;
	}, {} as typeof days);

	return (
		<section>
			<h2>Forecast for {displayName}</h2>
			<p>Last updated on: {formattedDate}</p>
			{
				Object.keys(limitedDays).map((day, index) => {
					const { day: dayPeriod, night: nightPeriod } = days[day];
					return (
						<article key={index}>
							<h3>{day}</h3>
							<img src={dayPeriod?.icon} alt={dayPeriod?.detailedForecast} />
							<p>{dayPeriod?.detailedForecast}</p>
							<p>Temperature: {dayPeriod?.temperature}°F</p>
							<p>Wind Speed: {dayPeriod?.windSpeed} {dayPeriod?.windDirection}</p>
							<h3>Night</h3>
							<img src={nightPeriod?.icon} alt={nightPeriod?.detailedForecast} />
							<p>{nightPeriod?.detailedForecast}</p>
							<p>Temperature: {nightPeriod?.temperature}°F</p>
							<p>Wind: {nightPeriod?.windSpeed} {nightPeriod?.windDirection}</p>
						</article>
					)
				})
			}
		</section>
	)
}

const formatDisplayName = (displayName: string): string => {
	let formattedDisplayName = '';
	if (displayName.split(',').length > 5) {
		formattedDisplayName = displayName.split(',').slice(2, -1).join(',');
	} else if (displayName.split(',').length > 3) {
		formattedDisplayName = displayName.split(',').slice(1, -1).join(',');
	} else if (displayName.split(',').length > 1) {
		formattedDisplayName = displayName.split(',').slice(0, -1).join(',');
	} else {
		formattedDisplayName = displayName;
	}

	return formattedDisplayName;
}