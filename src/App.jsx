import { useRef, useState } from 'react'
import './App.css'
import GroupList from './components/GroupList'
import Form from './components/Form'

function init() {
  let groups = localStorage.getItem('groups')
  if (groups)
    return JSON.parse(groups)
  return []
}

function App() {

  const [all, setAll] = useState(init)

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
