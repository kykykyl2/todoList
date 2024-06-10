import { bool, func } from 'prop-types'

import IconButton from '../../IconButton'

import './ListItemActions.css'

const ListItemActions = ({
    isEditTask = false,
    isCheckedTask = false,
    handleClickDelete,
    handleClickEdit,
}) => (
    <div className='list-item-actions'>
        {!isCheckedTask && (
            <IconButton
                iconName={isEditTask ? 'done' : 'edit'}
                onClick={handleClickEdit}
            />
        )}
        <IconButton iconName='delete' onClick={handleClickDelete} />
    </div>
)

ListItemActions.propTypes = {
    isEditTask: bool,
    isCheckedTask: bool,
    handleClickDelete: func,
    handleClickEdit: func,
}

export default ListItemActions
