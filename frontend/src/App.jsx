import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ListProjects } from './pages/ListProjects'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-projects" element={<ListProjects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
