import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer'
import LocationInput from '../../src/components/LocationInput';
import { LocationData, WeatherData, WeatherDataExtended } from '../../src/types';

// define navigator.geolocation for the test
Object.defineProperty(navigator, 'geolocation', {
	value: {
		getCurrentPosition: (callback: PositionCallback) => {
			callback({
				coords: {
					latitude: 39.7817,
					longitude: -89.6501
				}
			} as GeolocationPosition);
		}
	}
});

test('LocationInput renders correctly', () => {
	const component = renderer.create(
		<LocationInput
			setLocationData={() => {}}
			setWeatherData={() => {}}
		/>
	).toJSON();
	
	// Check if the component is a form element
	expect(component).to.have.property('type', 'form');

	// Check against the snapshot
	expect(component).toMatchSnapshot();
})

test('LocationInput elements trigger the correct functions', () => {
	const setLocationData: React.Dispatch<React.SetStateAction<LocationData>> = (locationData) => {
		expect(locationData).to.have.property('formattedAddress', '123 Main St, Springfield, IL 62701');
		expect(locationData).to.have.property('displayName', '123 Main St, Springfield, IL');
	}

	const setWeatherData: React.Dispatch<React.SetStateAction<WeatherData>> = (weatherData) => {
		expect(weatherData).to.have.property('displayName', '123 Main St, Springfield, IL');
		expect(weatherData).to.have.property('weather');
	}

	const component = renderer.create(
		<LocationInput
			setLocationData={setLocationData}
			setWeatherData={setWeatherData}
		/>
	);

	const input = component.root.findByType('input');
	input.props.onChange({target: {value: '123 Main St, Springfield, IL 62701'}});

	const button = component.root.findByType('button');
	button.props.onClick();

	const datalist = component.root.findByType('datalist');
	expect(datalist).to.have.property('props');
	expect(datalist.props).to.have.property('id', 'possibleLocations');
})

test('LocationInput handles errors correctly', () => {
	const setLocationData: React.Dispatch<React.SetStateAction<LocationData>> = (locationData) => {
		expect(locationData).to.have.property('formattedAddress', '123 Main St, Springfield, IL 62701');
		expect(locationData).to.have.property('displayName', '123 Main St, Springfield, IL');
	}

	const setWeatherData: React.Dispatch<React.SetStateAction<WeatherData>> = (weatherData) => {
		expect(weatherData).to.have.property('displayName', '123 Main St, Springfield, IL');
		expect(weatherData).to.have.property('weather');
	}

	const component = renderer.create(
		<LocationInput
			setLocationData={setLocationData}
			setWeatherData={setWeatherData}
		/>
	);

	const input = component.root.findByType('input');
	input.props.onChange({target: {value: '123 Main St, Springfield, IL 62701'}});

	const button = component.root.findByType('button');
	button.props.onClick();

	const datalist = component.root.findByType('datalist');
	expect(datalist).to.have.property('props');
	expect(datalist.props).to.have.property('id', 'possibleLocations');
})

test('LocationInput handles loading state correctly', () => {
	const setLocationData: React.Dispatch<React.SetStateAction<LocationData>> = (locationData) => {
		expect(locationData).to.have.property('formattedAddress', '123 Main St, Springfield, IL 62701');
		expect(locationData).to.have.property('displayName', '123 Main St, Springfield, IL');
	}

	const setWeatherData: React.Dispatch<React.SetStateAction<WeatherData>> = (weatherData) => {
		expect(weatherData).to.have.property('displayName', '123 Main St, Springfield, IL');
		expect(weatherData).to.have.property('weather');
	}

	const component = renderer.create(
		<LocationInput
			setLocationData={setLocationData}
			setWeatherData={setWeatherData}
		/>
	);

	const input = component.root.findByType('input');
	input.props.onChange({target: {value: '123 Main St, Springfield, IL 62701'}});

	const button = component.root.findByType('button');
	button.props.onClick();

	const datalist = component.root.findByType('datalist');
	expect(datalist).to.have.property('props');
	expect(datalist.props).to.have.property('id', 'possibleLocations');
})