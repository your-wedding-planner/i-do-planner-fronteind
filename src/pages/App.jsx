import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} /> 
        <Route path="/signup" element={<Signup/>} /> 
      </Routes>
    </div>
  )
}

export default App
