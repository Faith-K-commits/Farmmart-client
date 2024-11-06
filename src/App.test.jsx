/* eslint-env vitest */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, expect } from 'vitest';
import App from './App';

test('renders the App component', () => {
  render(<App />);
  const headingElement = screen.getByText(/Test Continuous Integration/i);
  expect(headingElement).toBeInTheDocument();
});