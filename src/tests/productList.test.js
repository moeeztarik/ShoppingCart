import axios, { AxiosResponse } from 'axios';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Home from '../components/Home';
import { mockApi } from "../helpers/common";

describe('Api Response', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('api response', async () => {
    const mAxiosResponse = {
      status: 200,
    };
    render(<Home />);
    const title = await mockApi();  // Run the function
    expect(title).toEqual(1);
    expect(await screen.findByText('Select Color')).toBeInTheDocument();
    expect(await screen.findByText('Products')).toBeInTheDocument();
    expect(await screen.getByTestId('container-1')).toBeInTheDocument();
    expect(await screen.getByTestId('container-2')).toBeInTheDocument();
    
  });
});