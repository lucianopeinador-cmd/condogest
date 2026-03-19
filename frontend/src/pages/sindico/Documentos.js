 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const documentos = [
  { id: 1, nome: 'Convencao do Condominio', categoria: 'Legal', tamanho: '2.4 MB', data: '15/01/2024', tipo: 'PDF', acesso: 'Todos' },
  { id: 2, nome: 'Regulamento Interno', categoria: 'Legal', tamanho: '1.1 MB', data: '15/01/2024', tipo: 'PDF', acesso: 'Todos' },
  { id: 3, nome: 'Contrato Empresa de Limpeza', categoria: 'Contratos', tamanho: '890 KB', data: '03/03/2025', tipo: 'PDF', acesso: 'Sindico' },
  { id: 4, nome: 'Contrato Manutencao Elevadores', categoria: 'Contratos', tamanho: '1.2 MB', data: '10/01/2025', tipo: 'PDF', acesso: 'Sindico' },
  { id: 5, nome: 'Balancete Fevereiro 2025', categoria: 'Financeiro', tamanho: '540 KB', data: '05/03/2025', tipo: 'PDF', acesso: 'Todos' },
  { id: 6, nome: 'Balancete Janeiro 2025', categoria: 'Financeiro', tamanho: '520 KB', data: '05/02/2025', tipo: 'PDF', acesso: 'Todos' },
  { id: 7, nome: 'Ata Assembleia Fev 2025', categoria: 'Atas', tamanho: '310 KB', data: '12/02/2025', tipo: 'PDF', acesso: 'Todos' },
  { id: 8, nome: 'Ata Assembleia Nov 2024', categoria: 'Atas', tamanho: '290 KB', data: '20/11/2024', tipo: 'PDF', acesso: 'Todos' },
  { id: 9, nome: 'AVCB — Auto de Vistoria', categoria: 'Legal', tamanho: '1.8 MB', data: '22/06/2024', tipo: 'PDF', acesso: 'Sindico' },
  { id: 10, nome: 'Apolice Seguro Predial 2025', categoria: 'Seguros', tamanho: '2.1 MB', data: '01/01/2025', tipo: 'PDF', acesso: 'Sindico' },
];

const categorias = ['Todas', 'Legal', 'Contratos', 'Financeiro', 'Atas', 'Seguros'];

const styles = {
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  filtros: {
    display: 'flex',
    gap: '8px',
  },
  filtroBtn: {
    padding: '7px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    border: '1.5px solid var(--cinza-medio)',
    backgroundColor: 'var(--branco)',
    color: 'var(--cinza-texto)',
  },
  filtroBtnAtivo: {
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    border: '1.5px solid var(--azul-principal)',
  },
  btnNovo: {
    padding: '9px 20px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '28px',
  },
  card: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '20px 24px',
    boxShadow: 'var(--sombra)',
    borderTop: '4px solid var(--azul-principal)',
  },
  cardLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  cardValor: {
    fontSize: '26px',
    fontWeight: '800',
    color: 'var(--azul-principal)',
  },
  box: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '24px',
    boxShadow: 'var(--sombra)',
  },
  tabela: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    fontSize: '11px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '0 16px 12px',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  td: {
    padding: '14px 16px',
    fontSize: '13px',
    color: 'var(--azul-principal)',
    borderBottom: '1px solid var(--cinza-medio)',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  iconDoc: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: '#eff6ff',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginRight: '10px',
  },
  btnAcao: {
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--cinza-claro)',
    color: 'var(--azul-principal)',
    cursor: 'pointer',
    border: 'none',
    marginRight: '6px',
  },
};

function getCategoriaBadge(cat) {
  const map = {
    Legal: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Contratos: { backgroundColor: '#fffbeb', color: '#d97706' },
    Financeiro: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Atas: { backgroundColor: '#faf5ff', color: '#7c3aed' },
    Seguros: { backgroundColor: '#fff1f2', color: '#e11d48' },
  };
  return map[cat] || {};
}

export default function Documentos() {
  const [filtro, setFiltro] = useState('Todas');
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  const docsFiltrados = filtro === 'Todas'
    ? documentos
    : documentos.filter((d) => d.categoria === filtro);

  return (
    <Layout perfil="sindico" titulo="Documentos" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Total de Arquivos</div>
          <div style={styles.cardValor}>{documentos.length}</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: '#2563eb' }}>
          <div style={styles.cardLabel}>Contratos Ativos</div>
          <div style={{ ...styles.cardValor, color: '#2563eb' }}>
            {documentos.filter(d => d.categoria === 'Contratos').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Acesso Publico</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>
            {documentos.filter(d => d.acesso === 'Todos').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Restrito Sindico</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>
            {documentos.filter(d => d.acesso === 'Sindico').length}
          </div>
        </div>
      </div>

      <div style={styles.topo}>
        <div style={styles.filtros}>
          {categorias.map((c) => (
            <button
              key={c}
              style={{ ...styles.filtroBtn, ...(filtro === c ? styles.filtroBtnAtivo : {}) }}
              onClick={() => setFiltro(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <button style={styles.btnNovo}>Enviar Documento</button>
      </div>

      <div style={styles.box}>
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Categoria</th>
              <th style={styles.th}>Tamanho</th>
              <th style={styles.th}>Data</th>
              <th style={styles.th}>Acesso</th>
              <th style={styles.th}>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {docsFiltrados.map((d) => (
              <tr key={d.id}>
                <td style={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={styles.iconDoc}>PDF</span>
                    <span style={{ fontWeight: '600' }}>{d.nome}</span>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...getCategoriaBadge(d.categoria) }}>{d.categoria}</span>
                </td>
                <td style={styles.td}>{d.tamanho}</td>
                <td style={styles.td}>{d.data}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: d.acesso === 'Todos' ? '#f0fdf4' : '#fffbeb',
                    color: d.acesso === 'Todos' ? '#16a34a' : '#d97706',
                  }}>{d.acesso}</span>
                </td>
                <td style={styles.td}>
                  <button style={styles.btnAcao}>Visualizar</button>
                  <button style={styles.btnAcao}>Baixar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
