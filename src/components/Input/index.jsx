import { bool, func, node, number, oneOfType, string } from 'prop-types'

import './Input.css'

const Input = ({
    placeholder,
    type = 'text',
    onChange = () => {},
    onKeyDown = () => {},
    onBlur = () => {},
    value = '',
    name,
    labelName = '',
    isAutoFocus = false,
}) => (
    <label htmlFor={name} className='input-label'>
        {labelName}
        <input
            className='input'
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            autoFocus={isAutoFocus}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
        />
    </label>
)

Input.propTypes = {
    placeholder: string,
    type: string,
    onChange: func,
    onKeyDown: func,
    onBlur: func,
    value: oneOfType([string, number]),
    labelName: oneOfType([string, number, node]),
    name: string.isRequired,
    isAutoFocus: bool,
}

export default Input
