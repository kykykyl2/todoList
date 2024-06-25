import { arrayOf, func, objectOf } from 'prop-types'

import Button from '../Button'

import './ActionsList.css'
import axios from 'axios'

const ActionsList = ({ data = [], setData = Function.prototype }) => {
    const handleFilterTodoTask = () => {
        setData(data.map(x => ({ ...x, isDisplayed: !x._check })))
    }

    const handleFilterDoneTask = () => {
        setData(data.map(x => ({ ...x, isDisplayed: x._check })))
    }

    const handleFilterAllTask = () => {
        setData(data.map(x => ({ ...x, isDisplayed: true })))
    }

    const handleAllDelete = () => {
        axios.delete('http://localhost:3000/todos/')
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
