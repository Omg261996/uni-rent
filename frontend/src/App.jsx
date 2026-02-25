import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";
import MyItems from "./pages/MyItems";
function App() {

  // check login
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/add-item" element={<AddItem />} />
          
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/my-items" element={<MyItems />} />
        
        <Route
          path="/item/:id"
          element={isLoggedIn ? <ItemDetail /> : <Navigate to="/login" />}
/>
<Route path="/add" element={isLoggedIn ? <AddItem /> : <Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
