import { bool, func } from 'prop-types'
import { useEffect, useState } from 'react'

import Button from '../Button'
import Input from '../Input'
import Select from '../Select'

import './AddTodo.css'
import axios from 'axios'

const AddTodo = ({ setReload = Function.prototype, reload }) => {
    const [title, setTitle] = useState('')
    const [idCategory, setIdCategory] = useState(0)
    const [categories, setCategories] = useState([])

    console.log(idCategory, categories)

    useEffect(() => {
        axios
            .get('http://localhost:3000/categories')
            .then(res => setCategories(res.data))
    }, [])

    const handleChange = event => {
        setTitle(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        // TODO ADD NEW TASK
        axios
            .post('http://localhost:3000/todos', {
                title,
                idCategory,
            })
            .then(function () {
                setReload(!reload)
            })
            .catch(function (error) {
                console.log(error)
            })

        setTitle('')
        setIdCategory(null)
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <Input
                name='sendTodo'
                onChange={handleChange}
                value={title}
                placeholder='Nom de la tâche'
            />
            <Select
                className='Select'
                categories={categories}
                setIdCategory={setIdCategory}
            />
            <Button type='submit'>Ajouter</Button>
        </form>
    )
}

AddTodo.propTypes = {
    reload: bool,
    setData: func,
    setReload: func,
}

export default AddTodo
