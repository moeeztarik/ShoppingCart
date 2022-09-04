import axios, { AxiosResponse } from 'axios';
import { act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Home from '../components/Home';
import { mockApi } from "../helpers/common";


describe('Api Response', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('api response', async () => {
    render(<Home />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    const title = await mockApi();  // Run the function
    expect(title).toEqual(1);
    expect(await screen.findByText('Select Color')).toBeInTheDocument();
    expect(await screen.getByTestId('increment-2')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('increment-2'))
  });
});