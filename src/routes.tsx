import { Routes, BrowserRouter, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ShirtDetails from "./pages/ShirtDetails";

function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="detalhes/:id" element={<ShirtDetails />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
