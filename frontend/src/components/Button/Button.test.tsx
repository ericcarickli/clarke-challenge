import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
});

test('button is disabled when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);
    expect(screen.getByText(/Click me/i)).toBeDisabled();
});

test('button calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText(/Click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
