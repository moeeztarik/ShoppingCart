import axios, { AxiosResponse } from 'axios';
import { act, render, screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Home from '../components/Home';
import { mockApi } from "../helpers/common";

describe('Api Response', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  render(<Home />);
  test('api response', async () => {
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    const title = await mockApi();  // Run the function
    expect(title).toEqual(1);
    expect(await screen.findByText('Select Color')).toBeInTheDocument();
    expect(await screen.getByTestId('decrement-2')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('decrement-2'))
  });
});