export default function Weather({ generatedAt, periods }: { generatedAt: string, periods: { number: number, name: string, detailedForecast: string, temperature: number, windSpeed: string }[] }) {
	if (!periods || !periods.length || !generatedAt) {
		return null;
	}

	return (
		<section>
			<h2>Weather</h2>
			<p>Generated at: {generatedAt}</p>
			<ul>
				{periods.map((period) => (
					<li key={period.number}>
						<h3>{period.name}</h3>
						<p>{period.detailedForecast}</p>
						<p>Temperature: {period.temperature}°F</p>
						<p>Wind Speed: {period.windSpeed}</p>
					</li>
				))}
			</ul>
		</section>
	)
}