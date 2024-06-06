import Title from './components/Title'
import Input from './components/Input'
import Button from './components/Button'
import Liste from './components/Liste'

import './App.css'

function App() {

  return (
    <>
      <Title title='To Do List' />
      <div className='input_wraper'>
        <Input />
        <Button />
      </div>
      <Liste />
   </>
  )
}

export default App
