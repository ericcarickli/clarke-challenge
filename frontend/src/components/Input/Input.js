import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import styles from './Input.module.scss';
function Input({ id, label, value, onChange, hasError, width, errorMessage, placeholder, type, required = false }) {
    return (_jsxs("div", { className: styles.container, style: { width }, children: [_jsxs("label", { className: styles.label, htmlFor: id, children: [label, required && ' *'] }), _jsx("div", { className: styles.inputContainer, children: _jsx("input", { id: id, type: "text", value: value, className: styles.input, placeholder: placeholder, onChange: (e) => { type === 'number' ? onChange(e.target.value.replace(/[^0-9]+/g, '')) : onChange(e.target.value); } }) }), hasError && (_jsx("span", { className: styles.error, children: errorMessage }))] }));
}
export default Input;
