import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {

  
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
          <Route path="/signup" element={<SignupPage /> } />
          <Route path="/login" element={<LoginPage /> } />
          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
