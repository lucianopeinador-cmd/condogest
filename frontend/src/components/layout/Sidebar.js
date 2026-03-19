import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menuSindico = [
  { label: 'Dashboard', path: '/sindico/dashboard', icon: '▪' },
  { label: 'Financeiro', path: '/sindico/financeiro', icon: '▪' },
  { label: 'Chamados', path: '/sindico/chamados', icon: '▪' },
  { label: 'Assembleias', path: '/sindico/assembleias', icon: '▪' },
  { label: 'Documentos', path: '/sindico/documentos', icon: '▪' },
  { label: 'Moradores', path: '/sindico/moradores', icon: '▪' },
  { label: 'Fornecedores', path: '/sindico/fornecedores', icon: '▪' },
  { label: 'Funcionarios', path: '/sindico/funcionarios', icon: '▪' },
  { label: 'Relatorios', path: '/sindico/relatorios', icon: '▪' },
  { label: 'Juridico', path: '/sindico/juridico', icon: '▪' },
];

const menuMorador = [
  { label: 'Inicio', path: '/morador/dashboard', icon: '▪' },
  { label: 'Meus Chamados', path: '/morador/chamados', icon: '▪' },
  { label: 'Financeiro', path: '/morador/financeiro', icon: '▪' },
  { label: 'Documentos', path: '/morador/documentos', icon: '▪' },
  { label: 'Comunicados', path: '/morador/comunicados', icon: '▪' },
  { label: 'Reservas', path: '/morador/reservas', icon: '▪' },
];

const menuZelador = [
  { label: 'Inicio', path: '/zelador/dashboard', icon: '▪' },
  { label: 'Chamados', path: '/zelador/chamados', icon: '▪' },
  { label: 'Manutencao', path: '/zelador/manutencao', icon: '▪' },
];

const menuFuncionario = [
  { label: 'Inicio', path: '/funcionario/dashboard', icon: '▪' },
  { label: 'Tarefas', path: '/funcionario/tarefas', icon: '▪' },
  { label: 'Comunicados', path: '/funcionario/comunicados', icon: '▪' },
];

const menus = {
  sindico: menuSindico,
  morador: menuMorador,
  zelador: menuZelador,
  funcionario: menuFuncionario,
};

const styles = {
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    backgroundColor: 'var(--azul-principal)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  },
  logo: {
    padding: '32px 24px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  logoTitle: {
    color: 'var(--branco)',
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  logoSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '11px',
    marginTop: '4px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  nav: {
    flex: 1,
    padding: '16px 0',
    overflowY: 'auto',
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    padding: '16px 24px 8px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '11px 24px',
    color: 'rgba(255,255,255,0.75)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
  },
  menuItemAtivo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--branco)',
    borderLeft: '3px solid var(--branco)',
    fontWeight: '600',
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  btnSair: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.75)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  emergencia: {
    width: '100%',
    padding: '11px',
    backgroundColor: 'var(--vermelho-alerta)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    marginBottom: '10px',
    letterSpacing: '0.5px',
  },
};

export default function Sidebar({ perfil }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = menus[perfil] || menuSindico;

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoTitle}>CondoGest</div>
        <div style={styles.logoSubtitle}>Gestao Inteligente</div>
      </div>

      <nav style={styles.nav}>
        <div style={styles.sectionLabel}>Menu Principal</div>
        {menu.map((item) => (
          <div
            key={item.path}
            style={{
              ...styles.menuItem,
              ...(location.pathname === item.path ? styles.menuItemAtivo : {}),
            }}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div style={styles.footer}>
        <button style={styles.emergencia}>
          Emergencia
        </button>
        <button
          style={styles.btnSair}
          onClick={() => navigate('/login')}
        >
          Sair
        </button>
      </div>
    </div>
  );
}