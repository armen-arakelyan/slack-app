import { BrowserRouter, Routes, Route } from "react-router-dom"
import Form from '../Form'

const PageRouter = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
  </BrowserRouter>
)

export default PageRouter
