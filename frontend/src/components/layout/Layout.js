 import React from 'react';
import Sidebar from './Sidebar';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--cinza-claro)',
  },
  main: {
    marginLeft: '240px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  topbar: {
    backgroundColor: 'var(--branco)',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: 'var(--sombra)',
    position: 'sticky',
    top: 0,
    zIndex: 90,
  },
  topbarTitulo: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
  },
  topbarUsuario: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
  },
  nomeUsuario: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--azul-principal)',
  },
  perfilBadge: {
    fontSize: '11px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  conteudo: {
    padding: '32px',
    flex: 1,
  },
};

export default function Layout({ children, perfil, titulo, nomeUsuario }) {
  const iniciais = nomeUsuario
    ? nomeUsuario.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'US';

  return (
    <div style={styles.container}>
      <Sidebar perfil={perfil} />
      <div style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarTitulo}>{titulo}</div>
          <div style={styles.topbarUsuario}>
            <div>
              <div style={styles.nomeUsuario}>{nomeUsuario || 'Usuario'}</div>
              <div style={styles.perfilBadge}>{perfil}</div>
            </div>
            <div style={styles.avatar}>{iniciais}</div>
          </div>
        </div>
        <div style={styles.conteudo}>{children}</div>
      </div>
    </div>
  );
}
