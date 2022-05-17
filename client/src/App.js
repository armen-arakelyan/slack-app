import React from 'react'
import './App.css'
import PageRouter from './components/Router'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const App = () => {
  return (
    <div className="App">
      <ReactNotifications />
      <PageRouter />
    </div>
  )
}

export default App
