import { bool, func, number, oneOfType, string } from 'prop-types'
import { useEffect, useState } from 'react'

import IconButton from '../IconButton'

import './ListItem.css'
import ListItemActions from './ListItemActions'
import ListItemContent from './ListItemContent/index.jsx'

const ListItem = ({
    id = '',
    isChecked = false,
    title = '',
    setData = Function.prototype,
}) => {
    const [titleTask, setTitleTask] = useState(title)
    const [isCheckedTask, setIsCheckedTask] = useState(isChecked)
    const [isEditTask, setIsEditTask] = useState(false)
    const [isSendTitle, setIsSendTitle] = useState(false)

    const handleClickChecked = () => {
        setIsCheckedTask(!isCheckedTask)
    }

    const handleClickEdit = () => {
        if (titleTask) {
            setIsEditTask(!isEditTask)

            if (isEditTask) {
                setIsSendTitle(true)
            }
        }
    }

    const handleChange = e => {
        setTitleTask(e.target.value)
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter' && titleTask) {
            setIsEditTask(false)
            setIsSendTitle(true)
        }
    }

    const handleClickDelete = () => {
        // TODO SEND DELETE TASK
        setData(prevState => prevState.filter(item => item.id !== id))
    }

    useEffect(() => {
        if (isSendTitle) {
            // TODO SEND NEW TITLE
            console.log('Envoi du nouveau titre')
            setIsSendTitle(false)
        }
    }, [isSendTitle])

    useEffect(() => {
        // TODO SEND CHECKED TASK
        console.log(`Tâche ${isCheckedTask ? 'terminer' : 'en cour'}`)
        setData(prevState => {
            console.log('toto', prevState[id])

            return prevState
        })
    }, [isCheckedTask])

    return (
        <div className={`list-item${isCheckedTask ? ' done' : ''}`}>
            <div
                className={`list-item-color ${isCheckedTask ? ' done' : ''}`}
            />
            <IconButton
                iconName={isCheckedTask ? 'checked' : 'unchecked'}
                onClick={handleClickChecked}
            />
            <ListItemContent
                isEditTask={isEditTask}
                isCheckedTask={isCheckedTask}
                titleTask={titleTask}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
            />
            <ListItemActions
                isEditTask={isEditTask}
                isCheckedTask={isCheckedTask}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
            />
        </div>
    )
}

ListItem.propTypes = {
    id: oneOfType([string, number]),
    isChecked: bool,
    title: oneOfType([string, number]),
    setData: func,
}

export default ListItem
