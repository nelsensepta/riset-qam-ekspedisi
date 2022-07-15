import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CekOngkir from "./pages/CekOngkir";
import CekResi from "./pages/CekResi";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="home">
        <Route index element={<ProtectedRoute component={Home} />} />
        <Route
          path="cek-ongkir"
          element={<ProtectedRoute component={CekOngkir} />}
        />
        <Route
          path="cek-resi"
          element={<ProtectedRoute component={CekResi} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
