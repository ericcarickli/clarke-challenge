import { jsx as _jsx } from "react/jsx-runtime";
import styles from './Button.module.scss';
function Button({ children, onClick, disabled = false }) {
    return (_jsx("button", { className: `${styles.button} ${disabled ? styles.disabled : ''}`, onClick: !disabled ? onClick : () => { }, disabled: disabled, children: children }));
}
export default Button;
