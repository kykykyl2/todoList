import { func } from 'prop-types'
import { useState } from 'react'

import Button from '../Button'
import Input from '../Input'

import './AddTodo.css'

const AddTodo = ({ setData = Function.prototype }) => {
    const [title, setTitle] = useState('')

    const handleChange = event => {
        setTitle(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        // TODO ADD NEW TASK
        setData(prevState => prevState)
        setTitle('')
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <Input
                name='sendTodo'
                onChange={handleChange}
                value={title}
                placeholder='Nom de la tâche'
            />
            <Button type='submit'>Ajouter</Button>
        </form>
    )
}

AddTodo.propTypes = {
    setData: func,
}

export default AddTodo
