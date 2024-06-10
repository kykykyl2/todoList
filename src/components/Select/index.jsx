import { func, string } from 'prop-types'

import './Select.css'

const optionsList = [
    {
        id: 0,
        optionLabel: 'Travail',
    },
    {
        id: 1,
        optionLabel: 'Travaux',
    },
    {
        id: 2,
        optionLabel: 'Course',
    },
    {
        id: 3,
        optionLabel: 'Enfant',
    },
    {
        id: 4,
        optionLabel: 'École',
    },
]

const Select = ({ category = '', setCategory = Function.prototype }) => (
    <select
        className='select'
        value={category}
        onChange={event => setCategory(event.target.value)}
    >
        {optionsList.map(option => (
            <option
                className='select_option'
                key={option.id}
                value={option.optionLabel}
            >
                {option.optionLabel}
            </option>
        ))}
    </select>
)

Select.propTypes = {
    category: string,
    setCategory: func,
}

export default Select
