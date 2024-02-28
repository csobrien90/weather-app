import { WeatherDay, WeatherProps } from '../types';

// Import icon images
import dayIcon from '../assets/images/day.svg';
import nightIcon from '../assets/images/night.svg';
import sunIcon from '../assets/images/sun.svg';
import partialSunIcon from '../assets/images/partial-sun.svg';
import rainIcon from '../assets/images/rain.svg';
import snowIcon from '../assets/images/snow.svg';
import stormIcon from '../assets/images/thunder.svg';
import cloudIcon from '../assets/images/cloud.svg';

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
			{ Object.keys(limitedDays).map((day, index) => <WeatherCard key={index} day={day} data={limitedDays[day]} format="landscape" />) }
		</section>
	)
}

function WeatherCard({ day, data, format }: { day: string, data: WeatherDay, format: "portrait" | "landscape" }): JSX.Element {
	const desc = getDescription(data);

	// Determine which icon to use
	const descText = data.day ? data.day.detailedForecast : data.night ? data.night.detailedForecast : '';
	const icon = getIcon(descText);

	switch (format) {
		case "portrait":
			// To do
			return <></>
		case "landscape":
			return (
				<article className='weather-card'>
					<img src={icon.src} alt={icon.alt} />
					<div>
						<h3>{day}</h3>
						<p>
							{data.day && <span><img src={dayIcon} alt="sun" /> {data.day.temperature}&deg;{data.day.temperatureUnit}</span>}
							<span> / </span>
							{data.night && <span><img src={nightIcon} alt="moon" /> {data.night.temperature}&deg;{data.night.temperatureUnit}</span>}
						</p>
						{desc && <span className="description" >{desc}</span>}
					</div>
				</article>
			)
		default:
			return <></>
	}
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

const getIcon = (desc: string): {src: string, alt: string} => {
	if (desc.toLowerCase().includes('partly')) return {src: partialSunIcon, alt: 'mostly sunny'};
	if (desc.toLowerCase().includes('sunny')) return {src: sunIcon, alt: 'sunny'};
	if (desc.toLowerCase().includes('thunder')) return {src: stormIcon, alt: 'thunderstorm'};
	if (desc.toLowerCase().includes('rain')) return {src: rainIcon, alt: 'rain'};
	if (desc.toLowerCase().includes('snow')) return {src: snowIcon, alt: 'snow'};
	if (desc.toLowerCase().includes('fog')) return {src: cloudIcon, alt: 'cloudy'};

	return {src: '', alt: desc};
}

const getDescription = (data: WeatherDay): JSX.Element | null => {
	if (!data.day && !data.night) return null;

	const dayDesc = data.day ? data.day.detailedForecast : '';
	const nightDesc = data.night ? data.night.detailedForecast : '';

	if (dayDesc && nightDesc) return <><p>Day: {dayDesc}</p><p>Night: {nightDesc}</p></>;
	if (dayDesc) return <p>{dayDesc}</p>;
	if (nightDesc) return <p>{nightDesc}</p>;

	return null;
}