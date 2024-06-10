import { useState } from 'react'

import ActionsList from './components/ActionsList'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import List from './components/List'

import './App.css'

const App = () => {
    const [data, setData] = useState([])

    return (
        <div className='app'>
            <Header />
            <main className='main'>
                <AddTodo setData={setData} />
                <ActionsList data={data} setData={setData} />
                <List data={data} setData={setData} />
            </main>
        </div>
    )
}

export default App
