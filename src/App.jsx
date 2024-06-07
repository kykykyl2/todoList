import Title from './components/Title'
// import Input from './components/Input'
 // import Button from './components/Button'
import List from './components/List'
import ToDoSend from './components/ToDoSend'

import './App.css'

function App() {

  return (
    <>
      <Title title='To Do List' />
     <ToDoSend />
      <List />
   </>
  )
}

export default App
