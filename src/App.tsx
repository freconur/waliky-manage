import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Home } from './pages/Home';
import { Layout } from './container/Layout';
import { RegistroVenta } from './pages/RegistroVenta';
// import { SearchIdProduct } from './pages/SearchIdProduct';
import { TablaVentas } from './pages/TablaVentas';
import { SearchIdProduct } from './pages/SearchIdProduct';
import { Productos } from './pages/Productos';
import { Home } from './pages/Home';
import { AddProduct } from './pages/AddProduct';
import { Statistics } from './pages/Statistics';
import { Purchase } from './pages/Purchase';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro-de-ventas" element={<RegistroVenta />} />
          <Route path="/ventas" element={<TablaVentas />} />
          <Route path="/busqueda-de-producto" element={<SearchIdProduct />} />
          <Route path="/registro-de-productos" element={<Productos />} />
          <Route path="/agregar-producto" element={<AddProduct />} />
          <Route path="/estadisticas" element={<Statistics />} />
          <Route path="/compras" element={<Purchase />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
