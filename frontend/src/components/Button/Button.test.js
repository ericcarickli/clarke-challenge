import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
test('renders button with text', () => {
    render(_jsx(Button, { onClick: () => { }, children: "Click me" }));
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
});
test('button is disabled when disabled prop is true', () => {
    render(_jsx(Button, { onClick: () => { }, disabled: true, children: "Click me" }));
    expect(screen.getByText(/Click me/i)).toBeDisabled();
});
test('button calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(_jsx(Button, { onClick: handleClick, children: "Click me" }));
    fireEvent.click(screen.getByText(/Click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
