import {BrowserRouter, Routes, Route} from 'react-router';
import {MainLayout} from "./components/MainLayout.tsx";
import {About} from "./pages/About/About.tsx";
import {Home} from "./pages/Home/Home.tsx"
import {Details} from "./pages/Details/Details.tsx";
import {NotFound} from "./pages/NotFound/NotFound.tsx";


const AppContent = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/todo/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
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
