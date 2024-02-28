import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer'
import App from '../src/App';

test('App renders', async () => {
	const component = renderer.create(<App />).toJSON();

	// Check if the component is a main element
	expect(component).to.have.property('type', 'main');

	// Check for h1 element
	expect(component.children[0]).to.have.property('type', 'h1');
});