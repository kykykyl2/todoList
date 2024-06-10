import { useState } from 'react'

import ActionsList from './components/ActionsList'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import List from './components/List'

import './App.css'

const fakeData = [
    {
        id: 1,
        title: 'Tâche 1',
        checked: false,
    },
    {
        id: 2,
        title: 'Tâche 2',
        checked: false,
    },
    {
        id: 3,
        title: 'Tâche 3',
        checked: true,
    },
    {
        id: 4,
        title: 'Tâche 4',
        checked: false,
    },
    {
        id: 5,
        title: 'Tâche 5',
        checked: true,
    },
]

const App = () => {
    const [data, setData] = useState(fakeData)

    return (
        <div className='app'>
            <Header />
            <main className='main'>
                <AddTodo setData={setData} />
                <ActionsList data={fakeData} setData={setData} />
                <List data={data} setData={setData} />
            </main>
        </div>
    )
}

export default App
