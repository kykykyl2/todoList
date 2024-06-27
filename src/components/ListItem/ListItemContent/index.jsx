import { bool, func, string } from 'prop-types'

import Input from '../../Input/index.jsx'

import './ListItemContent.css'

const ListItemContent = ({
    titleTask = '',
    categories = '',
    isEditTask = false,
    isCheckedTask = false,
    handleChange,
    handleKeyDown,
}) => (
    <div className='list-item-content'>
        {isEditTask && !isCheckedTask ? (
            <Input
                name='title-task'
                value={titleTask}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                isAutoFocus
            />
        ) : (
            <>
                <h3
                    className={`list-item-content_title${isCheckedTask ? ' checked' : ''}`}
                >
                    {titleTask}
                </h3>
                <span className='list-item-content_category'>{categories}</span>
            </>
        )}
    </div>
)

ListItemContent.propTypes = {
    categories: string,
    titleTask: string,
    isEditTask: bool,
    isCheckedTask: bool,
    handleChange: func,
    handleKeyDown: func,
}

export default ListItemContent
