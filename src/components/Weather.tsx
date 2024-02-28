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

	return (
		<section>
			<h2>Forecast for {locationData.displayName.split(',').splice(1).join(',').replace(', United States of America', '')}</h2>
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