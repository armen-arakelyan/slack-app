import { BrowserRouter, Routes, Route } from "react-router-dom"
import Form from '../Form'
import Main from "../Main"

const PageRouter = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Form /> } />
        <Route path="/feed" element={ <Main /> } />
      </Routes>
  </BrowserRouter>
)

export default PageRouter
