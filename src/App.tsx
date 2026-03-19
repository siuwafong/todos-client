import {BrowserRouter, Routes, Route} from 'react-router';
import {MainLayout} from "./components/MainLayout.tsx";
import {About} from "./pages/About.tsx";
import {Home} from "./pages/Home.tsx"


const AppContent = () => {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Route>
        </Routes>
    )
}

function App() {
    return (
      <BrowserRouter>
            <AppContent />
      </BrowserRouter>
    )
}

export default App
