import { arrayOf, func, objectOf } from 'prop-types'

import Button from '../Button'

import './ActionsList.css'

const ActionsList = ({ data = [], setData = Function.prototype }) => {
    const handleFilterTodoTask = () => {
        setData(data.filter(item => !item.checked))
    }

    const handleFilterDoneTask = () => {
        setData(data.filter(item => item.checked))
    }

    const handleFilterAllTask = () => {
        setData(data)
    }

    const handleAllDelete = () => {
        // TODO REQUEST FOR ALL DELETE
        setData([])
    }

    return (
        <div className='list-actions'>
            <Button onClick={handleFilterTodoTask} className='button-todo'>
                A faire
            </Button>
            <Button onClick={handleFilterDoneTask} className='button-done'>
                Fait
            </Button>
            <Button onClick={handleFilterAllTask} className='button-all'>
                Tous
            </Button>
            <Button onClick={handleAllDelete} className='button-delete'>
                Tout supprimer
            </Button>
        </div>
    )
}

ActionsList.propTypes = {
    data: arrayOf(objectOf(() => {})),
    setData: func,
}

export default ActionsList
