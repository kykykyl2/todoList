import { func, node, number, oneOfType, string } from 'prop-types'

import './Button.css'

const Button = ({
    children = null,
    className = '',
    type = 'button',
    onClick = Function.prototype,
}) => (
    <button
        type={type}
        className={`button ${className}`}
        onClick={event => {
            event.stopPropagation()
            onClick(event)
        }}
    >
        {children}
    </button>
)

Button.propTypes = {
    children: oneOfType([string, number, node]),
    onClick: func,
    type: string,
    className: string,
}

export default Button
