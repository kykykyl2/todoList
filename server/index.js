import cors from 'cors'
import express from 'express'

import {
    createTodo,
    deleteAllTodos,
    deleteTodo,
    findCategory,
    getTodo,
    listCategories,
    listTodos,
    updateTodo,
} from './db.js'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json({ limit: '10kb' }))

const parseId = value => {
    const id = Number(value)

    return Number.isInteger(id) && id > 0 ? id : null
}

const getTitle = body => {
    const title = body.title ?? body.nom_tache

    return typeof title === 'string' ? title.trim() : null
}

const getCategoryId = body => {
    const category = body.categoryId ?? body.idCategory ?? body.id_categorie

    if (category === undefined || category === null || category === '' || category === 0 || category === '0') {
        return null
    }

    return parseId(category) || 0
}

const getCompleted = body => {
    const completed = body.completed ?? body._check

    return typeof completed === 'boolean' ? completed : undefined
}

const validateCategory = categoryId => {
    if (categoryId === null) {
        return listCategories()[0]
    }

    return findCategory(categoryId)
}

app.get('/health', (request, response) => {
    response.json({ status: 'ok' })
})

app.get('/categories', (request, response) => {
    response.json(listCategories())
})

app.get('/todos', (request, response) => {
    response.json(listTodos())
})

app.post('/todos', (request, response) => {
    const title = getTitle(request.body)
    const categoryId = getCategoryId(request.body)
    const category = validateCategory(categoryId)

    if (!title) {
        return response.status(400).json({ error: 'Le titre est obligatoire.' })
    }

    if (!category) {
        return response.status(400).json({ error: 'La categorie demandee est introuvable.' })
    }

    return response.status(201).json(createTodo({ title, categoryId: category.id_categorie }))
})

const updateTodoHandler = (request, response) => {
    const todoId = parseId(request.params.id)
    const todo = todoId ? getTodo(todoId) : null

    if (!todo) {
        return response.status(404).json({ error: 'Tache introuvable.' })
    }

    const title = getTitle(request.body)
    const completed = getCompleted(request.body)
    const categoryId = getCategoryId(request.body)
    const hasTitle = request.body.title !== undefined || request.body.nom_tache !== undefined
    const hasCategory =
        request.body.categoryId !== undefined ||
        request.body.idCategory !== undefined ||
        request.body.id_categorie !== undefined

    if (hasTitle && !title) {
        return response.status(400).json({ error: 'Le titre est obligatoire.' })
    }

    if (hasCategory && !validateCategory(categoryId)) {
        return response.status(400).json({ error: 'La categorie demandee est introuvable.' })
    }

    if (completed === undefined && !hasTitle && !hasCategory) {
        return response.status(400).json({ error: 'Aucune modification valide.' })
    }

    const updatedTodo = updateTodo(todoId, {
        title: hasTitle ? title : undefined,
        completed,
        categoryId: hasCategory ? categoryId : undefined,
    })

    return response.json(updatedTodo)
}

app.put('/todos/:id', updateTodoHandler)
app.patch('/todos/:id', updateTodoHandler)

app.delete('/todos', (request, response) => {
    deleteAllTodos()
    response.status(204).send()
})

app.delete('/todos/:id', (request, response) => {
    const todoId = parseId(request.params.id)

    if (!todoId || !getTodo(todoId)) {

        return response.status(404).json({ error: 'Tache introuvable.' })
    }

    deleteTodo(todoId)

    return response.status(204).send()
})

app.use((error, request, response, next) => {
    if (error instanceof SyntaxError && error.status === 400 && error.body) {

        return response.status(400).json({ error: 'Le JSON envoye est invalide.' })
    }

    console.error(error)

    return next(error)
})

app.listen(port, () => {
    console.log(`API todo disponible sur http://localhost:${port}`)
})