import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FindProvider from './FindProvider';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
jest.mock('axios');
const mockedAxios = axios;
test('renders FindProvider and fetches providers', async () => {
    mockedAxios.post.mockResolvedValue({ data: { data: { providersByMinimumLimit: [{ id: '1', name: 'Provider A', state: 'SP', kwhCost: '0.5', minimumLimit: '1000', totalClients: '500', clientRate: '4.5', logoUrl: 'http://example.com/logo.png' }] } } });
    render(_jsx(MemoryRouter, { children: _jsx(FindProvider, {}) }));
    fireEvent.change(screen.getByLabelText(/Consumo mensal de energia \(kWh\)/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/Enviar/i));
    await waitFor(() => {
        expect(screen.getByText(/Provider A/i)).toBeInTheDocument();
    });
});
