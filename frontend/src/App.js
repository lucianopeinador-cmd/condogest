import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../src/styles/global.css';

import Login from './pages/Login';
import DashboardSindico from './pages/sindico/Dashboard';
import Financeiro from './pages/sindico/Financeiro';
import Chamados from './pages/sindico/Chamados';
import Assembleias from './pages/sindico/Assembleias';
import Documentos from './pages/sindico/Documentos';
import Moradores from './pages/sindico/Moradores';
import Fornecedores from './pages/sindico/Fornecedores';
import Funcionarios from './pages/sindico/Funcionarios';
import Relatorios from './pages/sindico/Relatorios';
import Juridico from './pages/sindico/Juridico';
import DashboardMorador from './pages/morador/Dashboard';
import DashboardZelador from './pages/zelador/Dashboard';
import DashboardFuncionario from './pages/funcionario/Dashboard';

function RotaProtegida({ children, perfilNecessario }) {
  const perfil = localStorage.getItem('perfil');
  if (!perfil) return <Navigate to="/login" />;
  if (perfilNecessario && perfil !== perfilNecessario) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/sindico/dashboard" element={<RotaProtegida perfilNecessario="sindico"><DashboardSindico /></RotaProtegida>} />
        <Route path="/sindico/financeiro" element={<RotaProtegida perfilNecessario="sindico"><Financeiro /></RotaProtegida>} />
        <Route path="/sindico/chamados" element={<RotaProtegida perfilNecessario="sindico"><Chamados /></RotaProtegida>} />
        <Route path="/sindico/assembleias" element={<RotaProtegida perfilNecessario="sindico"><Assembleias /></RotaProtegida>} />
        <Route path="/sindico/documentos" element={<RotaProtegida perfilNecessario="sindico"><Documentos /></RotaProtegida>} />
        <Route path="/sindico/moradores" element={<RotaProtegida perfilNecessario="sindico"><Moradores /></RotaProtegida>} />
        <Route path="/sindico/fornecedores" element={<RotaProtegida perfilNecessario="sindico"><Fornecedores /></RotaProtegida>} />
        <Route path="/sindico/funcionarios" element={<RotaProtegida perfilNecessario="sindico"><Funcionarios /></RotaProtegida>} />
        <Route path="/sindico/relatorios" element={<RotaProtegida perfilNecessario="sindico"><Relatorios /></RotaProtegida>} />
        <Route path="/sindico/juridico" element={<RotaProtegida perfilNecessario="sindico"><Juridico /></RotaProtegida>} />

        <Route path="/morador/dashboard" element={<RotaProtegida perfilNecessario="morador"><DashboardMorador /></RotaProtegida>} />
        <Route path="/zelador/dashboard" element={<RotaProtegida perfilNecessario="zelador"><DashboardZelador /></RotaProtegida>} />
        <Route path="/funcionario/dashboard" element={<RotaProtegida perfilNecessario="funcionario"><DashboardFuncionario /></RotaProtegida>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}