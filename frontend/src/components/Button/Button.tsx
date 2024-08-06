import { ReactNode } from "react";
import styles from './Button.module.scss';

interface ButtonProps {
    children: ReactNode | string;
    onClick: () => void;
    disabled?: boolean;
}

function Button({
    children,
    onClick,
    disabled=false
}: ButtonProps) {
    return(
        <button
            className={`${styles.button} ${disabled ? styles.disabled : ''}`}
            onClick={!disabled ? onClick : () => {}}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;