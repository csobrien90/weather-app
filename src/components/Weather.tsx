export default function Weather({
	generatedAt,
	periods,
	locationData
}: {
	generatedAt: string,
	periods: { 
		number: number,
		name: string,
		detailedForecast: string,
		temperature: number,
		windSpeed: string
	}[],
	locationData: {formattedAddress: string, displayName: string}
}) {
	if (!periods || !periods.length || !generatedAt) {
		return null;
	}

	// Format the generatedAt date
	const date = new Date(generatedAt);
	const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
	const formattedDate = date.toLocaleTimeString(undefined, options);

	// Format the displayName
	let displayName = ''
	if (locationData.displayName.split(',').length > 5) {
		displayName = locationData.displayName.split(',').slice(3, -3).join(',');
	} else if (locationData.displayName.split(',').length > 3) {
		displayName = locationData.displayName.split(',').slice(1, -1).join(',');
	} else {
		displayName = locationData.displayName.split(',').slice(0, -1).join(',');
	}

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