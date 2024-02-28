export interface WeatherData {
	generatedAt: string,
	periods: { 
		number: number,
		name: string,
		detailedForecast: string,
		temperature: number,
		windSpeed: string
	}[]
}

export interface WeatherProps extends WeatherData {
	locationData: LocationData
}

export interface WeatherDataExtended extends WeatherData {
	displayName: string
}

export interface LocationData {
	formattedAddress: string,
	displayName?: string
}


// {
//     "type": "Feature",
//     "properties": {
//         "country": "Brazil",
//         "country_code": "br",
//         "region": "Southeast Region",
//         "state": "São Paulo",
//         "county": "Região Metropolitana de Campinas",
//         "city": "Sumaré",
//         "municipality": "Região Imediata de Campinas",
//         "postcode": "13170-001",
//         "district": "Sumaré",
//         "datasource": {
//             "sourcename": "openstreetmap",
//             "attribution": "© OpenStreetMap contributors",
//             "license": "Open Database License",
//             "url": "https://www.openstreetmap.org/copyright"
//         },
//         "state_code": "SP",
//         "result_type": "postcode",
//         "lon": -47.2702083,
//         "lat": -22.8190147,
//         "parent_as_place_id": true,
//         "formatted": "Sumaré (Sumaré) - SP, 13170-001, Brazil",
//         "address_line1": "Sumaré (Sumaré) - SP",
//         "address_line2": "13170-001, Brazil",
//         "category": "administrative",
//         "timezone": {
//             "name": "America/Sao_Paulo",
//             "offset_STD": "-03:00",
//             "offset_STD_seconds": -10800,
//             "offset_DST": "-03:00",
//             "offset_DST_seconds": -10800
//         },
//         "plus_code": "589J5PJH+9W",
//         "plus_code_short": "JH+9W Sumaré, Região Metropolitana de Campinas, Brazil",
//         "rank": {
//             "confidence": 1,
//             "confidence_city_level": 1,
//             "match_type": "full_match"
//         },
//         "place_id": "51cbcd812f96a247c059797187f2aad136c0f00101f901dbbe560000000000c00207"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [
//             -47.2702083,
//             -22.8190147
//         ]
//     },
//     "bbox": [
//         -47.3706769,
//         -22.9083958,
//         -47.2332661,
//         -22.7893005
//     ]
// }
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