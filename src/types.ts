export interface ForecastData {
	generatedAt: string,
	periods: Period[]
}

export interface WeatherData {
	generatedAt: string,
	days: WeatherDays
}

export interface Period { 
	number: number,
	name: string,
	detailedForecast: string,
	temperature: number,
	temperatureUnit: "F" | "C",
	windSpeed: string,
	windDirection: string,
	startTime: string,
	endTime: string,
	icon: string
}

export interface WeatherProps extends WeatherData {
	locationData: LocationData
}

export interface WeatherDataExtended extends WeatherData {
	displayName: string
}

export interface WeatherDays {
	[key: string]: WeatherDay
}

export interface WeatherDay {
	day?: Period,
	night?: Period
}

export interface LocationData {
	formattedAddress: string,
	displayName?: string
}

export interface autocompleteLocationData {
	"properties": {
		"country": string,
		"country_code": string,
		"region": string,
		"state": string,
		"county": string,
		"city": string,
		"municipality": string,
		"postcode": string,
		"district": string,
		"datasource": {
			"sourcename": string,
			"attribution": string,
			"license": string,
			"url": string
		},
		"state_code": string,
		"result_type": string,
		"lon": number,
		"lat": number,
		"parent_as_place_id": boolean,
		"formatted": string,
		"address_line1": string,
		"address_line2": string,
		"category": string,
		"timezone": {
			"name": string,
			"offset_STD": string,
			"offset_STD_seconds": number,
			"offset_DST": string,
			"offset_DST_seconds": number
		},
		"plus_code": string,
		"plus_code_short": string,
		"rank": {
			"confidence": number,
			"confidence_city_level": number,
			"match_type": string
		},
		"place_id": string
	}
}