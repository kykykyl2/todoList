import { bool, func, number, object, oneOfType, string } from 'prop-types'
import { useEffect, useState } from 'react'

import IconButton from '../IconButton'

import './ListItem.css'
import ListItemActions from './ListItemActions'
import ListItemContent from './ListItemContent/index.jsx'
import axios from 'axios'

const ListItem = ({
    item = {},
    setData = Function.prototype,
    setReload = Function.prototype,
    reload,
}) => {
    const [titleTask, setTitleTask] = useState(item.nom_tache)
    const [isCheckedTask, setIsCheckedTask] = useState(item._check)
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

    const handleClickDelete = id => {
        // TODO SEND DELETE TASK
        axios.delete('http://localhost:3000/todos/' + id).then(() => {
            setData(prevState => prevState.filter(x => x.id !== id))
        })
    }

    useEffect(() => {
        if (isSendTitle) {
            axios
                .put('http://localhost:3000/todos/' + item.id, {
                    nom_tache: titleTask,
                })
                .then(() => {
                    console.log('a été modifier')
                })
            // TODO SEND NEW TITLE
            console.log('Envoi du nouveau titre')
            setIsSendTitle(false)
        }
    }, [isSendTitle, item])
    useEffect(() => {
        // TODO SEND CHECKED TASK
        axios
            .put('http://localhost:3000/todos/' + item.id, {
                _check: isCheckedTask,
            })
            .then(() => {
                setReload(!reload)
            })
        console.log(`Tâche ${isCheckedTask ? 'terminer' : 'en cour'}`)
    }, [isCheckedTask])
    console.log(item)

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
                categories={item.Category.nom_categorie}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
            />
            <ListItemActions
                isEditTask={isEditTask}
                isCheckedTask={isCheckedTask}
                handleClickEdit={handleClickEdit}
                handleClickDelete={() => handleClickDelete(item.id)}
            />
        </div>
    )
}

ListItem.propTypes = {
    id: oneOfType([string, number]),
    isChecked: bool,
    title: oneOfType([string, number]),
    setData: func,
    item: object,
    setReload: func,
    reload: bool,
}

export default ListItem
