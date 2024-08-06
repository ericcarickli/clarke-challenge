import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateProvider from './CreateProvider';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
    jest.clearAllMocks();
});  

test('renders CreateProvider and submits form', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { url: 'http://example.com/logo.png' } }) // Mock file upload response
                 .mockResolvedValueOnce({ data: {} }); // Mock GraphQL request response

    render(
        <MemoryRouter>
            <CreateProvider />
        </MemoryRouter>
    );

    // Simulate input changes
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Provider A' } });
    fireEvent.change(screen.getByLabelText(/Estado de origem/i), { target: { value: 'SP' } });
    fireEvent.change(screen.getByLabelText(/Custo por kwh/i), { target: { value: '0,54' } });
    fireEvent.change(screen.getByLabelText(/Limite mínimo de kwh/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Número total de clientes/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Avaliação média dos clientes/i), { target: { value: '5' } });
    // Add more field changes as needed

    // Simulate file upload
    fireEvent.change(screen.getByTestId('file-input'), { target: { files: [new File(['dummy content'], 'example.png', { type: 'image/png' })] } });

    fireEvent.click(screen.getByText(/Salvar/i));

    await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledTimes(2); // Check for upload and GraphQL request
    });
});
