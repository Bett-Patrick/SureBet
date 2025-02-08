import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Layout from "./Pages/Layout"
import PredictionsPage from "./Pages/PredictionsPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path="/predictions" element={<PredictionsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App