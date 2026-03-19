 import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const chamadosIniciais = [
  { id: 1, unidade: 'Apto 204', morador: 'Roberto Nunes', assunto: 'Vazamento no banheiro', categoria: 'Hidraulica', prioridade: 'Alta', status: 'Aberto', data: '14/03/2025', descricao: 'Agua vazando embaixo da pia do banheiro social.' },
  { id: 2, unidade: 'Apto 112', morador: 'Fernanda Lima', assunto: 'Portao da garagem com defeito', categoria: 'Eletrica', prioridade: 'Alta', status: 'Em andamento', data: '13/03/2025', descricao: 'Portao nao abre pelo controle remoto.' },
  { id: 3, unidade: 'Apto 301', morador: 'Gustavo Pires', assunto: 'Lampada queimada no corredor', categoria: 'Eletrica', prioridade: 'Baixa', status: 'Aberto', data: '12/03/2025', descricao: 'Corredor do 3o andar sem iluminacao.' },
  { id: 4, unidade: 'Apto 405', morador: 'Mariana Castro', assunto: 'Barulho excessivo', categoria: 'Ocorrencia', prioridade: 'Media', status: 'Em andamento', data: '11/03/2025', descricao: 'Barulho alto apos meia noite recorrente.' },
  { id: 5, unidade: 'Apto 502', morador: 'Paulo Mendes', assunto: 'Infiltracao na parede', categoria: 'Hidraulica', prioridade: 'Alta', status: 'Aberto', data: '10/03/2025', descricao: 'Mancha de umidade crescendo na parede da sala.' },
  { id: 6, unidade: 'Apto 110', morador: 'Silvia Rocha', assunto: 'Elevador com barulho estranho', categoria: 'Manutencao', prioridade: 'Media', status: 'Concluido', data: '08/03/2025', descricao: 'Elevador fazendo barulho ao subir.' },
];

const styles = {
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  filtros: {
    display: 'flex',
    gap: '10px',
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
    transition: 'all 0.2s',
  },
  filtroBtnAtivo: {
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    border: '1.5px solid var(--azul-principal)',
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
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--azul-principal)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  chamadoCard: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '20px',
    boxShadow: 'var(--sombra)',
    borderLeft: '4px solid var(--azul-principal)',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
  },
  chamadoTopo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  chamadoUnidade: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
  },
  chamadoMorador: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    marginTop: '2px',
  },
  chamadoAssunto: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--azul-principal)',
    marginBottom: '8px',
  },
  chamadoDescricao: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    lineHeight: '1.5',
    marginBottom: '12px',
  },
  chamadoRodape: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
  },
  chamadoData: {
    fontSize: '11px',
    color: 'var(--cinza-texto)',
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
    width: '520px',
    boxShadow: 'var(--sombra-forte)',
  },
  modalTitulo: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '20px',
  },
  modalLinha: {
    display: 'flex',
    gap: '16px',
    marginBottom: '14px',
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

function getBadge(valor) {
  const map = {
    Alta: { backgroundColor: '#fef2f2', color: '#dc2626' },
    Media: { backgroundColor: '#fffbeb', color: '#d97706' },
    Baixa: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Aberto: { backgroundColor: '#eff6ff', color: '#2563eb' },
    'Em andamento': { backgroundColor: '#fffbeb', color: '#d97706' },
    Concluido: { backgroundColor: '#f0fdf4', color: '#16a34a' },
  };
  return map[valor] || {};
}

function getBordaColor(prioridade) {
  if (prioridade === 'Alta') return '#dc2626';
  if (prioridade === 'Media') return '#d97706';
  return '#16a34a';
}

export default function Chamados() {
  const [filtro, setFiltro] = useState('Todos');
  const [selecionado, setSelecionado] = useState(null);
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  const filtros = ['Todos', 'Aberto', 'Em andamento', 'Concluido'];

  const chamadosFiltrados = filtro === 'Todos'
    ? chamadosIniciais
    : chamadosIniciais.filter((c) => c.status === filtro);

  return (
    <Layout perfil="sindico" titulo="Chamados" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Total</div>
          <div style={styles.cardValor}>{chamadosIniciais.length}</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: '#2563eb' }}>
          <div style={styles.cardLabel}>Abertos</div>
          <div style={{ ...styles.cardValor, color: '#2563eb' }}>
            {chamadosIniciais.filter(c => c.status === 'Aberto').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Em andamento</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>
            {chamadosIniciais.filter(c => c.status === 'Em andamento').length}
          </div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Concluidos</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)' }}>
            {chamadosIniciais.filter(c => c.status === 'Concluido').length}
          </div>
        </div>
      </div>

      <div style={styles.topo}>
        <div style={styles.filtros}>
          {filtros.map((f) => (
            <button
              key={f}
              style={{ ...styles.filtroBtn, ...(filtro === f ? styles.filtroBtnAtivo : {}) }}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.grid}>
        {chamadosFiltrados.map((c) => (
          <div
            key={c.id}
            style={{ ...styles.chamadoCard, borderLeftColor: getBordaColor(c.prioridade) }}
            onClick={() => setSelecionado(c)}
          >
            <div style={styles.chamadoTopo}>
              <div>
                <div style={styles.chamadoUnidade}>{c.unidade}</div>
                <div style={styles.chamadoMorador}>{c.morador}</div>
              </div>
              <span style={{ ...styles.badge, ...getBadge(c.prioridade) }}>{c.prioridade}</span>
            </div>
            <div style={styles.chamadoAssunto}>{c.assunto}</div>
            <div style={styles.chamadoDescricao}>{c.descricao}</div>
            <div style={styles.chamadoRodape}>
              <span style={{ ...styles.badge, ...getBadge(c.status) }}>{c.status}</span>
              <span style={styles.chamadoData}>{c.data}</span>
            </div>
          </div>
        ))}
      </div>

      {selecionado && (
        <div style={styles.modal} onClick={() => setSelecionado(null)}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitulo}>Detalhes do Chamado #{selecionado.id}</div>
            <div style={styles.modalLinha}>
              <div style={{ flex: 1 }}>
                <div style={styles.modalLabel}>Unidade</div>
                <div style={styles.modalValor}>{selecionado.unidade}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.modalLabel}>Morador</div>
                <div style={styles.modalValor}>{selecionado.morador}</div>
              </div>
            </div>
            <div style={styles.modalLinha}>
              <div style={{ flex: 1 }}>
                <div style={styles.modalLabel}>Categoria</div>
                <div style={styles.modalValor}>{selecionado.categoria}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.modalLabel}>Data</div>
                <div style={styles.modalValor}>{selecionado.data}</div>
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <div style={styles.modalLabel}>Descricao</div>
              <div style={styles.modalValor}>{selecionado.descricao}</div>
            </div>
            <div style={styles.modalLinha}>
              <div style={{ flex: 1 }}>
                <div style={styles.modalLabel}>Prioridade</div>
                <span style={{ ...styles.badge, ...getBadge(selecionado.prioridade) }}>{selecionado.prioridade}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.modalLabel}>Status</div>
                <span style={{ ...styles.badge, ...getBadge(selecionado.status) }}>{selecionado.status}</span>
              </div>
            </div>
            <div style={styles.modalBotoes}>
              <button style={styles.btnPrimario}>Atribuir Zelador</button>
              <button style={styles.btnSecundario} onClick={() => setSelecionado(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
