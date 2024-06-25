import { arrayOf, func, objectOf } from 'prop-types'

import ListItem from '../ListItem'

import './List.css'

const List = ({ data = [], setData = Function.prototype }) => (
    <div className='list'>
        {data
            .filter(x => x.isDisplayed)
            .map(item => (
                <ListItem key={item.id} item={item} setData={setData} />
            ))}
    </div>
)

List.propTypes = {
    data: arrayOf(objectOf(() => {})),
    setData: func,
}

export default List
