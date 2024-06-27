import { useEffect, useState } from 'react'
import axios from 'axios'

import ActionsList from './components/ActionsList'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import List from './components/List'

import './App.css'

const App = () => {
    const [data, setData] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        axios
            .get('http://localhost:3000/todos')
            .then(res =>
                setData(res.data.map(x => ({ ...x, isDisplayed: true }))),
            )
    }, [reload])

    return (
        <div className='app'>
            <Header />
            <main className='main'>
                <AddTodo
                    setData={setData}
                    setReload={setReload}
                    reload={reload}
                />
                <ActionsList data={data} setData={setData} />
                <List
                    data={data}
                    setData={setData}
                    reload={reload}
                    setReload={setReload}
                />
            </main>
        </div>
    )
}

export default App
