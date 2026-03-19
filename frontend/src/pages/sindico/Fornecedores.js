 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const fornecedores = [
  { id: 1, nome: 'TechElevadores Ltda', categoria: 'Elevadores', contato: '(11) 3344-5566', email: 'contato@techelevadores.com', avaliacao: 5, contratos: 1, ultimoServico: '08/03/2025', status: 'Ativo' },
  { id: 2, nome: 'HidroFix Servicos', categoria: 'Hidraulica', contato: '(11) 4455-6677', email: 'hidro@hidrofix.com', avaliacao: 4, contratos: 0, ultimoServico: '14/03/2025', status: 'Ativo' },
  { id: 3, nome: 'LimpaMax Conservacao', categoria: 'Limpeza', contato: '(11) 5566-7788', email: 'limpeza@limpamax.com', avaliacao: 5, contratos: 1, ultimoServico: '17/03/2025', status: 'Ativo' },
  { id: 4, nome: 'Eletro Solucoes', categoria: 'Eletrica', contato: '(11) 6677-8899', email: 'eletro@eletrosolucoes.com', avaliacao: 3, contratos: 0, ultimoServico: '01/03/2025', status: 'Ativo' },
  { id: 5, nome: 'PinturaPro', categoria: 'Pintura', contato: '(11) 7788-9900', email: 'pintura@pinturapro.com', avaliacao: 4, contratos: 0, ultimoServico: '20/02/2025', status: 'Inativo' },
  { id: 6, nome: 'Jardim Verde', categoria: 'Jardinagem', contato: '(11) 8899-0011', email: 'jardim@jardimverde.com', avaliacao: 5, contratos: 1, ultimoServico: '15/03/2025', status: 'Ativo' },
];

const categorias = ['Todas', 'Elevadores', 'Hidraulica', 'Limpeza', 'Eletrica', 'Pintura', 'Jardinagem'];

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
    flexWrap: 'wrap',
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
    whiteSpace: 'nowrap',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  fornCard: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '20px',
    boxShadow: 'var(--sombra)',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
  },
  fornTopo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  fornNome: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  fornCategoria: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  estrelas: {
    display: 'flex',
    gap: '2px',
    marginBottom: '12px',
  },
  estrela: {
    color: '#f59e0b',
    fontSize: '14px',
  },
  estrelaCinza: {
    color: 'var(--cinza-medio)',
    fontSize: '14px',
  },
  fornInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    borderTop: '1px solid var(--cinza-medio)',
    paddingTop: '12px',
  },
  fornInfoLinha: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  fornInfoValor: {
    fontWeight: '600',
    color: 'var(--azul-principal)',
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
    marginBottom: '6px',
  },
  modalSub: {
    fontSize: '13px',
    color: 'var(--cinza-texto)',
    marginBottom: '20px',
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

function Estrelas({ nota }) {
  return (
    <div style={styles.estrelas}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={i <= nota ? styles.estrela : styles.estrelaCinza}>
          {i <= nota ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function Fornecedores() {
  const [filtro, setFiltro] = useState('Todas');
  const [selecionado, setSelecionado] = useState(null);
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  const fornFiltrados = filtro === 'Todas'
    ? fornecedores
    : fornecedores.filter((f) => f.categoria === filtro);

  return (
    <Layout perfil="sindico" titulo="Fornecedores" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Total Cadastrados</div>
          <div style={styles.cardValor}>{fornecedores.length}</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Ativos</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>
            {fornecedores.filter(f => f.status === 'Ativo').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Com Contrato</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>
            {fornecedores.filter(f => f.contratos > 0).length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: '#f59e0b' }}>
          <div style={styles.cardLabel}>Media de Avaliacao</div>
          <div style={{ ...styles.cardValor, color: '#f59e0b' }}>
            {(fornecedores.reduce((a, f) => a + f.avaliacao, 0) / fornecedores.length).toFixed(1)}
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
        <button style={styles.btnNovo}>Cadastrar Fornecedor</button>
      </div>

      <div style={styles.grid}>
        {fornFiltrados.map((f) => (
          <div key={f.id} style={styles.fornCard} onClick={() => setSelecionado(f)}>
            <div style={styles.fornTopo}>
              <div>
                <div style={styles.fornNome}>{f.nome}</div>
                <div style={styles.fornCategoria}>{f.categoria}</div>
              </div>
              <span style={{
                ...styles.badge,
                backgroundColor: f.status === 'Ativo' ? '#f0fdf4' : '#fef2f2',
                color: f.status === 'Ativo' ? '#16a34a' : '#dc2626',
              }}>{f.status}</span>
            </div>
            <Estrelas nota={f.avaliacao} />
            <div style={styles.fornInfo}>
              <div style={styles.fornInfoLinha}>
                <span>Ultimo servico</span>
                <span style={styles.fornInfoValor}>{f.ultimoServico}</span>
              </div>
              <div style={styles.fornInfoLinha}>
                <span>Contratos ativos</span>
                <span style={styles.fornInfoValor}>{f.contratos}</span>
              </div>
              <div style={styles.fornInfoLinha}>
                <span>Contato</span>
                <span style={styles.fornInfoValor}>{f.contato}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selecionado && (
        <div style={styles.modal} onClick={() => setSelecionado(null)}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitulo}>{selecionado.nome}</div>
            <div style={styles.modalSub}>{selecionado.categoria}</div>
            <Estrelas nota={selecionado.avaliacao} />
            <div style={styles.modalGrid}>
              <div>
                <div style={styles.modalLabel}>Telefone</div>
                <div style={styles.modalValor}>{selecionado.contato}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>E-mail</div>
                <div style={styles.modalValor}>{selecionado.email}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Ultimo Servico</div>
                <div style={styles.modalValor}>{selecionado.ultimoServico}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Contratos Ativos</div>
                <div style={styles.modalValor}>{selecionado.contratos}</div>
              </div>
              <div>
                <div style={styles.modalLabel}>Status</div>
                <span style={{
                  ...styles.badge,
                  backgroundColor: selecionado.status === 'Ativo' ? '#f0fdf4' : '#fef2f2',
                  color: selecionado.status === 'Ativo' ? '#16a34a' : '#dc2626',
                }}>{selecionado.status}</span>
              </div>
            </div>
            <div style={styles.modalBotoes}>
              <button style={styles.btnPrimario}>Solicitar Servico</button>
              <button style={styles.btnSecundario} onClick={() => setSelecionado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
