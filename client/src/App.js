import {
  createBrowserRouter,
  BrowserRouter,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import { Menu } from "./components/nav/Menu";
import toast, { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Error } from "./pages/Error";
function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
