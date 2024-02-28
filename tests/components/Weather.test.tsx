import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer'
import Weather from '../../src/components/Weather';

test('Weather renders correctly', () => {
	const component = renderer.create(
		<Weather
			generatedAt='2021-08-01T12:00:00-05:00'
			periods={[
				{
					number: 1,
					name: 'Today',
					detailedForecast: 'Sunny',
					temperature: 80,
					windSpeed: '5 mph'
				}
			]}
			locationData={{
				formattedAddress: '123 Main St, Springfield, IL 62701',
				displayName: '123 Main St, Springfield, IL'
			}}
		/>
	).toJSON();

	expect(component).to.have.property('type', 'section');
	expect(component).to.matchSnapshot();
})

test('Weather does not render if there are no periods', () => {
	const component = renderer.create(
		<Weather
			generatedAt='2021-08-01T12:00:00-05:00'
			periods={[]}
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
			periods={[
				{
					number: 1,
					name: 'Today',
					detailedForecast: 'Sunny',
					temperature: 80,
					windSpeed: '5 mph'
				}
			]}
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
			periods={[
				{
					number: 1,
					name: 'Today',
					detailedForecast: 'Sunny',
					temperature: 80,
					windSpeed: '5 mph'
				}
			]}
			// @ts-ignore - Testing the component's behavior when locationData is not provided
			locationData={{}}
		/>
	).toJSON();

	expect(component).to.be.null;
})