import { useRef, useState } from 'react'
import './App.css'
import GroupList from './components/GroupList'
import Form from './components/Form'

function App() {

  const [all, setAll] = useState([])

  return (
    <div>
      <GroupList all={all} />
      <Form 
        all={all}
        setAll={setAll} 
      />
    </div>
  )
}

export default App
