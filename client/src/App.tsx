import './App.css'
import { Login } from './components/Login'
import { Signup } from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
function App() {
  return (
    <Router>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  )
}

export default App
