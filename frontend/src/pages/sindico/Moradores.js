 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const moradores = [
  { id: 1, nome: 'Carlos Souza', unidade: 'Apto 102', bloco: 'A', telefone: '(11) 99201-4433', email: 'carlos@email.com', status: 'Inadimplente', veiculo: 'ABC-1234', moradores: 3 },
  { id: 2, nome: 'Ana Lima', unidade: 'Apto 215', bloco: 'B', telefone: '(11) 98342-5521', email: 'ana@email.com', status: 'Em dia', veiculo: 'DEF-5678', moradores: 2 },
  { id: 3, nome: 'Pedro Alves', unidade: 'Apto 308', bloco: 'A', telefone: '(11) 97453-6610', email: 'pedro@email.com', status: 'Inadimplente', veiculo: 'GHI-9012', moradores: 4 },
  { id: 4, nome: 'Mariana Castro', unidade: 'Apto 405', bloco: 'C', telefone: '(11) 96564-7799', email: 'mariana@email.com', status: 'Em dia', veiculo: 'JKL-3456', moradores: 2 },
  { id: 5, nome: 'Roberto Nunes', unidade: 'Apto 501', bloco: 'B', telefone: '(11) 95675-8888', email: 'roberto@email.com', status: 'Em dia', veiculo: 'MNO-7890', moradores: 1 },
  { id: 6, nome: 'Julia Ferreira', unidade: 'Apto 410', bloco: 'C', telefone: '(11) 94786-9977', email: 'julia@email.com', status: 'Inadimplente', veiculo: 'PQR-1234', moradores: 3 },
  { id: 7, nome: 'Marcos Costa', unidade: 'Apto 203', bloco: 'A', telefone: '(11) 93897-0066', email: 'marcos@email.com', status: 'Em dia', veiculo: 'STU-5678', moradores: 5 },
  { id: 8, nome: 'Fernanda Lima', unidade: 'Apto 112', bloco: 'B', telefone: '(11) 92908-1155', email: 'fernanda@email.com', status: 'Em dia', veiculo: 'VWX-9012', moradores: 2 },
];

const styles = {
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  busca: {
    padding: '9px 16px',
    border: '1.5px solid var(--cinza-medio)',
    borderRadius: '8px',
    fontSize: '13px',
    color: 'var(--azul-principal)',
    width: '280px',
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
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    marginRight: '10px',
    flexShrink: 0,
  },
  nomeBox: {
    display: 'flex',
    alignItems: 'center',
  },
  nomeInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  nomePrincipal: {
    fontWeight: '600',
    fontSize: '13px',
    color: 'var(--azul-principal)',
  },
  nomeEmail: {
    fontSize: '11px',
    color: 'var(--cinza-texto)',
    marginTop: '2px',
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
  modal: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modalBox: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '32px',
    width: '500px',
    boxShadow: 'var(--sombra-forte)',
  },
  modalTitulo: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '24px',
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  },
  modalLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  modalValor: {
    fontSize: '14px',
    color: 'var(--azul-principal)',
    fontWeight: '500',
  },
  modalBotoes: {
    display: 'flex',
    gap: '10px',
    marginTop: '24px',
  },
  btnPrimario: {
    flex: 1,
    padding: '11px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
  },
  btnSecundario: {
    flex: 1,
    padding: '11px',
    backgroundColor: 'var(--cinza-claro)',
    color: 'var(--azul-principal)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
};

function getIniciais(nome) {
  return nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Moradores() {
  const [busca, setBusca] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  const moradoresFiltrados = moradores.filter(m =>
    m.nome.toLowerCase().includes(busca.toLowerCase()) ||
    m.unidade.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Layout perfil="sindico" titulo="Moradores" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Total de Unidades</div>
          <div style={styles.cardValor}>48</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Em Dia</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>
            {moradores.filter(m => m.status === 'Em dia').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--vermelho-alerta)' }}>
          <div style={styles.cardLabel}>Inadimplentes</div>
          <div style={{ ...styles.cardValor, color: 'var(--vermelho-alerta)' }}>
            {moradores.filter(m => m.status === 'Inadimplente').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Total de Moradores</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>
            {moradores.reduce((acc, m) => acc + m.moradores, 0)}
          </div>
        </div>
      </div>

      <div style={styles.topo}>
        <input
          style={styles.busca}
          placeholder="Buscar por nome ou unidade..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button style={styles.btnNovo}>Cadastrar Morador</button>
      </div>

      <div style={styles.box}>
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Morador</th>
              <th style={styles.th}>Unidade</th>
              <th style={styles.th}>Bloco</th>
              <th style={styles.th}>Telefone</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {moradoresFiltrados.map((m) => (
              <tr key={m.id}>
                <td style={styles.td}>
                  <div style={styles.nomeBox}>
                    <div style={styles.avatar}>{getIniciais(m.nome)}</div>
                    <div style={styles.nomeInfo}>
                      <span style={styles.nomePrincipal}>{m.nome}</span>
                      <span style={styles.nomeEmail}>{m.email}</span>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>{m.unidade}</td>
                <td style={styles.td}>Bloco {m.bloco}</td>
                <td style={styles.td}>{m.telefone}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: m.status === 'Em dia' ? '#f0fdf4' : '#fef2f2',
                    color: m.status === 'Em dia' ? '#16a34a' : '#dc2626',
                  }}>{m.status}</span>
                </td>
                <td style={styles.td}>
                  <button style={styles.btnAcao} onClick={() => setSelecionado(m)}>Ver</button>
                  <button style={styles.btnAcao}>Mensagem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selecionado && (
        <div style={styles.modal} onClick={() => setSelecionado(null)}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{ ...styles.avatar, width: '48px', height: '48px', fontSize: '16px' }}>
                {getIniciais(selecionado.nome)}
              </div>
              <div>
                <div style={styles.modalTitulo} s>{selecionado.nome}</div>
              </div>
            </div>
            <div style={styles.modalGrid}>
              <div>
                <div style={styles.modalLabel}>Unidade</div>
                <div style={styles.modalValor}>{selecionado.unidade}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Bloco</div>
                <div style={styles.modalValor}>Bloco {selecionado.bloco}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Telefone</div>
                <div style={styles.modalValor}>{selecionado.telefone}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>E-mail</div>
                <div style={styles.modalValor}>{selecionado.email}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Veiculo</div>
                <div style={styles.modalValor}>{selecionado.veiculo}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Moradores na unidade</div>
                <div style={styles.modalValor}>{selecionado.moradores} pessoas</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Status financeiro</div>
                <span style={{
                  ...styles.badge,
                  backgroundColor: selecionado.status === 'Em dia' ? '#f0fdf4' : '#fef2f2',
                  color: selecionado.status === 'Em dia' ? '#16a34a' : '#dc2626',
                }}>{selecionado.status}</span>
              </div>
            </div>
            <div style={styles.modalBotoes}>
              <button style={styles.btnPrimario}>Enviar Mensagem</button>
              <button style={styles.btnSecundario} onClick={() => setSelecionado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
