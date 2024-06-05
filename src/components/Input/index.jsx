import { useState } from 'react'
import './styles.css'

function Input() {
  const [value, setValue] = useState("")
  function handleChange(event) {
    setValue(event.target.value)
  } 
  return(<input className='input' type='text' value={value}  onChange={handleChange} placeholder='écrivez ici !'/>)
}  

export default Input
