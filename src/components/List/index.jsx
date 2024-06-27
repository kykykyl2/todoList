import { arrayOf, bool, func, objectOf } from 'prop-types'

import ListItem from '../ListItem'

import './List.css'

const List = ({
    data = [],
    setData = Function.prototype,
    setReload = Function.prototype,
    reload,
}) => (
    <div className='list'>
        {data
            .filter(x => x.isDisplayed)
            .map(item => (
                <ListItem
                    key={item.id}
                    item={item}
                    setData={setData}
                    setReload={setReload}
                    reload={reload}
                />
            ))}
    </div>
)

List.propTypes = {
    reload: bool,
    setReload: func,
    data: arrayOf(objectOf(() => {})),
    setData: func,
}

export default List
