import {useState} from 'react'
import {TextField} from '@material-ui/core'
import styles from './index.module.scss'
interface Props {
    name: string, error: any, label: string, value: string, textFieldClassName?: any, onChange: any, placeholder: string, type: string
}

const TextFieldPrimary = ({name, error='', label, value, textFieldClassName, onChange, placeholder, type}:Props) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
        <div className={`${focused && error?styles.errorTextFieldBackground:styles.background} ${textFieldClassName || textFieldClassName}`}>
            <TextField onFocus={()=>setFocused(true)} name={name} label={label} fullWidth={true} value={value} placeholder={placeholder} type={type} onChange={onChange}  />
            {focused && error && <p className={`mt-1 ${styles.errorText}`}>{error}</p>}
        </div>
    )
}

export default TextFieldPrimary
