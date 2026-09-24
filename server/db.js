import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import Database from 'better-sqlite3'

const serverDirectory = path.dirname(fileURLToPath(import.meta.url))
const databasePath = process.env.DB_FILE || path.join(serverDirectory, 'data', 'todo.db')

fs.mkdirSync(path.dirname(databasePath), { recursive: true })

const database = new Database(databasePath)

database.pragma('foreign_keys = ON')
database.pragma('journal_mode = WAL')
database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL CHECK (length(trim(title)) > 0),
        completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
        category_id INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    );
`)

const categoryCount = database.prepare('SELECT COUNT(*) AS count FROM categories').get()

if (categoryCount.count === 0) {
    const insertCategory = database.prepare('INSERT INTO categories (name) VALUES (?)')
    const seedCategories = database.transaction(() => {
        for (const category of ['Personnel', 'Travail', 'Important']) {
            insertCategory.run(category)
        }
    })

    seedCategories()
}

export const listCategories = () =>
    database
        .prepare(
            `SELECT id AS id_categorie, name AS nom_categorie
             FROM categories
             ORDER BY id`,
        )
        .all()

export const findCategory = categoryId =>
    database
        .prepare(
            `SELECT id AS id_categorie, name AS nom_categorie
             FROM categories
             WHERE id = ?`,
        )
        .get(categoryId)

const todoSelect = `
    SELECT
        todos.id,
        todos.title AS nom_tache,
        todos.completed AS _check,
        todos.category_id AS id_categorie,
        todos.created_at,
        todos.updated_at,
        categories.id AS category_id,
        categories.name AS category_name
    FROM todos
    INNER JOIN categories ON categories.id = todos.category_id
`

const formatTodo = todo => ({
    id: todo.id,
    nom_tache: todo.nom_tache,
    _check: Boolean(todo._check),
    id_categorie: todo.id_categorie,
    title: todo.nom_tache,
    completed: Boolean(todo._check),
    categoryId: todo.id_categorie,
    createdAt: todo.created_at,
    updatedAt: todo.updated_at,
    Category: {
        id_categorie: todo.category_id,
        nom_categorie: todo.category_name,
    },
})

export const listTodos = () =>
    database
        .prepare(`${todoSelect} ORDER BY todos.completed ASC, todos.created_at DESC, todos.id DESC`)
        .all()
        .map(formatTodo)

export const createTodo = ({ title, categoryId }) => {
    const result = database
        .prepare('INSERT INTO todos (title, category_id) VALUES (?, ?)')
        .run(title, categoryId)

    return getTodo(result.lastInsertRowid)
}

export const getTodo = todoId => {
    const todo = database.prepare(`${todoSelect} WHERE todos.id = ?`).get(todoId)

    return todo ? formatTodo(todo) : null
}

export const updateTodo = (todoId, changes) => {
    const fields = []
    const values = []

    if (changes.title !== undefined) {
        fields.push('title = ?')
        values.push(changes.title)
    }

    if (changes.completed !== undefined) {
        fields.push('completed = ?')
        values.push(changes.completed ? 1 : 0)
    }

    if (changes.categoryId !== undefined) {
        fields.push('category_id = ?')
        values.push(changes.categoryId)
    }

    if (fields.length === 0) {
        return getTodo(todoId)
    }

    fields.push('updated_at = CURRENT_TIMESTAMP')
    database
        .prepare(`UPDATE todos SET ${fields.join(', ')} WHERE id = ?`)
        .run(...values, todoId)

    return getTodo(todoId)
}

export const deleteTodo = todoId => database.prepare('DELETE FROM todos WHERE id = ?').run(todoId)

export const deleteAllTodos = () => database.prepare('DELETE FROM todos').run()