 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const funcionarios = [
  { id: 1, nome: 'Jose Carlos Silva', cargo: 'Zelador', turno: 'Diurno', telefone: '(11) 91234-5678', email: 'jose@condogest.com', admissao: '03/05/2019', status: 'Ativo', salario: 'R$ 2.800,00' },
  { id: 2, nome: 'Maria Aparecida Santos', cargo: 'Auxiliar de Limpeza', turno: 'Diurno', telefone: '(11) 92345-6789', email: 'maria@condogest.com', admissao: '15/08/2021', status: 'Ativo', salario: 'R$ 1.800,00' },
  { id: 3, nome: 'Antonio Pereira Lima', cargo: 'Porteiro', turno: 'Noturno', telefone: '(11) 93456-7890', email: 'antonio@condogest.com', admissao: '20/11/2020', status: 'Ativo', salario: 'R$ 2.200,00' },
  { id: 4, nome: 'Claudia Regina Souza', cargo: 'Auxiliar de Limpeza', turno: 'Diurno', telefone: '(11) 94567-8901', email: 'claudia@condogest.com', admissao: '10/02/2022', status: 'Ativo', salario: 'R$ 1.800,00' },
  { id: 5, nome: 'Paulo Henrique Costa', cargo: 'Porteiro', turno: 'Diurno', telefone: '(11) 95678-9012', email: 'paulo@condogest.com', admissao: '01/06/2023', status: 'Ferias', salario: 'R$ 2.200,00' },
];

const styles = {
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
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

function getStatusBadge(status) {
  const map = {
    Ativo: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Ferias: { backgroundColor: '#eff6ff', color: '#2563eb' },
    Inativo: { backgroundColor: '#fef2f2', color: '#dc2626' },
  };
  return map[status] || {};
}

function getTurnoBadge(turno) {
  const map = {
    Diurno: { backgroundColor: '#fffbeb', color: '#d97706' },
    Noturno: { backgroundColor: '#f0f0ff', color: '#4338ca' },
  };
  return map[turno] || {};
}

function getIniciais(nome) {
  return nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Funcionarios() {
  const [selecionado, setSelecionado] = useState(null);
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  const folha = funcionarios.reduce((acc, f) => {
    const val = parseFloat(f.salario.replace('R$ ', '').replace('.', '').replace(',', '.'));
    return acc + val;
  }, 0);

  return (
    <Layout perfil="sindico" titulo="Funcionarios" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Total de Funcionarios</div>
          <div style={styles.cardValor}>{funcionarios.length}</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Ativos</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>
            {funcionarios.filter(f => f.status === 'Ativo').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: '#2563eb' }}>
          <div style={styles.cardLabel}>Em Ferias</div>
          <div style={{ ...styles.cardValor, color: '#2563eb' }}>
            {funcionarios.filter(f => f.status === 'Ferias').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Folha Mensal</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)', fontSize: '20px' }}>
            R$ {folha.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div style={styles.topo}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--azul-principal)' }}>
          Quadro de Funcionarios
        </div>
        <button style={styles.btnNovo}>Cadastrar Funcionario</button>
      </div>

      <div style={styles.box}>
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Funcionario</th>
              <th style={styles.th}>Cargo</th>
              <th style={styles.th}>Turno</th>
              <th style={styles.th}>Admissao</th>
              <th style={styles.th}>Salario</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr key={f.id}>
                <td style={styles.td}>
                  <div style={styles.nomeBox}>
                    <div style={styles.avatar}>{getIniciais(f.nome)}</div>
                    <div style={styles.nomeInfo}>
                      <span style={styles.nomePrincipal}>{f.nome}</span>
                      <span style={styles.nomeEmail}>{f.email}</span>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>{f.cargo}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...getTurnoBadge(f.turno) }}>{f.turno}</span>
                </td>
                <td style={styles.td}>{f.admissao}</td>
                <td style={styles.td}>{f.salario}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...getStatusBadge(f.status) }}>{f.status}</span>
                </td>
                <td style={styles.td}>
                  <button style={styles.btnAcao} onClick={() => setSelecionado(f)}>Ver</button>
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
                <div style={styles.modalTitulo}>{selecionado.nome}</div>
              </div>
            </div>
            <div style={styles.modalGrid}>
              <div>
                <div style={styles.modalLabel}>Cargo</div>
                <div style={styles.modalValor}>{selecionado.cargo}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Turno</div>
                <div style={styles.modalValor}>{selecionado.turno}</div>
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
                <div style={styles.modalLabel}>Admissao</div>
                <div style={styles.modalValor}>{selecionado.admissao}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Salario</div>
                <div style={styles.modalValor}>{selecionado.salario}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Status</div>
                <span style={{ ...styles.badge, ...getStatusBadge(selecionado.status) }}>{selecionado.status}</span>
              </div>
            </div>
            <div style={styles.modalBotoes}>
              <button style={styles.btnPrimario}>Editar Cadastro</button>
              <button style={styles.btnSecundario} onClick={() => setSelecionado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
