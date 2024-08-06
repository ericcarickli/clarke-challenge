import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('renders input with label and placeholder', () => {
    render(<Input id="name-input" label="Name" value="" onChange={() => {}} placeholder="Enter name" />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();
});

test('calls onChange with correct value when input changes', () => {
    const handleChange = jest.fn();
    render(<Input id="name-input" label="Name" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalledWith('John');
});
