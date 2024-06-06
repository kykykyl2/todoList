import Title from './components/Title'
import Input from './components/Input'
import Button from './components/Button'
import List from './components/List'

import './App.css'

function App() {

  return (
    <>
      <Title title='To Do List' />
      <div className='input_wraper'>
        <Input />
        <Button />
      </div>
      <List />
   </>
  )
}

export default App
