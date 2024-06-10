import { func } from 'prop-types'
import { useState } from 'react'

import Button from '../Button'
import Input from '../Input'
import Select from '../Select'

import './AddTodo.css'

const AddTodo = ({ setData = Function.prototype }) => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')

    const handleChange = event => {
        setTitle(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        // TODO ADD NEW TASK
        setData(prevState =>
            title
                ? [{ id: Math.random(), title, category }, ...prevState]
                : prevState,
        )
        setTitle('')
        setCategory('')
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <Input
                name='sendTodo'
                onChange={handleChange}
                value={title}
                placeholder='Nom de la tâche'
            />
            <Select category={category} setCategory={setCategory} />
            <Button type='submit'>Ajouter</Button>
        </form>
    )
}

AddTodo.propTypes = {
    setData: func,
}

export default AddTodo
