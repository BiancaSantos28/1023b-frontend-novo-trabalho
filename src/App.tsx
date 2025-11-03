import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import AdminUsuarios from "./pages/AdminUsuarios";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
