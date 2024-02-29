import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer'
import Weather from '../../src/components/Weather';
import { WeatherDays } from '../../src/types';

const sampleDay: WeatherDays = {
	'Today': {
		day: {
			number: 1,
			name: 'Today',
			icon: 'sunny',
			startTime: '2021-08-01T06:00:00-05:00',
			endTime: '2021-08-01T18:00:00-05:00',
			detailedForecast: 'Sunny',
			temperature: 80,
			windSpeed: '5 mph',
			windDirection: 'N',
			temperatureUnit: 'F',
		}
	}
}

test('Weather renders correctly', () => {
	const component = renderer.create(
		<Weather
			generatedAt='2021-08-01T12:00:00-05:00'
			days={sampleDay}
			locationData={{
				formattedAddress: '123 Main St, Springfield, IL 62701',
				displayName: '123 Main St, Springfield, IL'
			}}
		/>
	).toJSON();

	expect(component).to.have.property('type', 'section');
	expect(component).to.matchSnapshot();
})

test('Weather does not render if there are no days', () => {
	const component = renderer.create(
		<Weather
			generatedAt='2021-08-01T12:00:00-05:00'
			days={{}}
			locationData={{
				formattedAddress: '123 Main St, Springfield, IL 62701',
				displayName: '123 Main St, Springfield, IL'
			}}
		/>
	).toJSON();

	expect(component).to.be.null;
})

test('Weather does not render if there is no generatedAt', () => {
	const component = renderer.create(
		<Weather
			generatedAt=''
			days={sampleDay}
			locationData={{
				formattedAddress: '123 Main St, Springfield, IL 62701',
				displayName: '123 Main St, Springfield, IL'
			}}
		/>
	).toJSON();

	expect(component).to.be.null;
})

test('Weather does not render if there is no locationData', () => {
	const component = renderer.create(
		<Weather
			generatedAt='2021-08-01T12:00:00-05:00'
			days={sampleDay}

			// @ts-ignore - Testing the component's behavior when locationData is not provided
			locationData={{}}
		/>
	).toJSON();

	expect(component).to.be.null;
})