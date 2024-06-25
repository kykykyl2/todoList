import { array, func, number } from 'prop-types'

import './Select.css'

const Select = ({
    categories = [],
    setIdCategory = Function.prototype,
    idCategory = null,
}) => (
    <select
        className='select'
        value={
            idCategory !== null
                ? categories.find(x => x.id_categorie === idCategory)
                      .id_categorie
                : null
        }
        onChange={event => setIdCategory(event.target.value)}
    >
        {categories.map(option => (
            <option
                className='select_option'
                key={option.id_categorie}
                value={option.id_categorie}
            >
                {option.nom_categorie}
            </option>
        ))}
    </select>
)

Select.propTypes = {
    categories: array,
    setIdCategory: func,
    idCategory: number,
}

export default Select
