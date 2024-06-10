import { func, oneOf, string } from 'prop-types'

import Icon from '../Icon'

import './IconButton.css'

const IconButton = ({ color = '#e8eaed', onClick = () => {}, iconName }) => (
    <button className='icon-button' onClick={onClick}>
        <Icon name={iconName} color={color} />
    </button>
)

IconButton.propTypes = {
    color: string,
    onClick: func,
    iconName: oneOf([
        'send',
        'done',
        'checked',
        'unchecked',
        'edit',
        'delete',
        'lightMode',
        'darkMode',
    ]).isRequired,
}

export default IconButton
