import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ListProjects } from './pages/ListProjects'
import { ProjectDetail } from './pages/ProjectDetail'
import { ScrollToTop } from './components/ScrollToTop'
import { ModalProvider, useModal } from './context/ModalContext'
import { FeedbackModal } from './components/FeedbackModal'

function AppContent() {
  const { isOpen, closeModal } = useModal();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-projects" element={<ListProjects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      {isOpen && <FeedbackModal onClose={closeModal} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App
