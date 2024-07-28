import styles from './Input.module.scss';

interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
    errorMessage?: string;
    width?: string;
    placeholder?: string;
    required?: boolean;
    type?: 'text' | 'number';
}


function Input({
    label,
    value,
    onChange,
    hasError,
    width,
    errorMessage,
    placeholder,
    type,
    required=false
}: InputProps) {
    return(
        <div className={styles.container} style={{ width }}>
            <label className={styles.label}>{label}{required && ' *'}</label>
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    value={value}
                    className={styles.input}
                    placeholder={placeholder}
                    onChange={(e) => { type === 'number' ? onChange(e.target.value.replace(/[^0-9]+/g, '')) : onChange(e.target.value)}}
                />
            </div>
            {hasError && (<span className={styles.error}>{errorMessage}</span>)}
        </div>
    );
} 

export default Input;