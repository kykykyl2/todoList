import { arrayOf, func, objectOf } from 'prop-types'

import ListItem from '../ListItem'

import './List.css'

const List = ({ data = [], setData = Function.prototype }) => (
    <div className='list'>
        {data.map(item => (
            <ListItem
                key={item.id}
                id={item.id}
                title={item.title}
                isChecked={item.checked}
                setData={setData}
            />
        ))}
    </div>
)

List.propTypes = {
    data: arrayOf(objectOf(() => {})),
    setData: func,
}

export default List
