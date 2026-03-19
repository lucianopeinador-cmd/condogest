 import React from 'react';
import Layout from '../../components/layout/Layout';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const dadosFinanceiros = [
  { mes: 'Out', receita: 42000, despesa: 31000 },
  { mes: 'Nov', receita: 44500, despesa: 33000 },
  { mes: 'Dez', receita: 41000, despesa: 38000 },
  { mes: 'Jan', receita: 46000, despesa: 32000 },
  { mes: 'Fev', receita: 43000, despesa: 29000 },
  { mes: 'Mar', receita: 47500, despesa: 34000 },
];

const dadosInadimplencia = [
  { mes: 'Out', inadimplentes: 8 },
  { mes: 'Nov', inadimplentes: 6 },
  { mes: 'Dez', inadimplentes: 11 },
  { mes: 'Jan', inadimplentes: 9 },
  { mes: 'Fev', inadimplentes: 7 },
  { mes: 'Mar', inadimplentes: 5 },
];

const chamadosRecentes = [
  { id: 1, unidade: 'Apto 204', assunto: 'Vazamento no banheiro', prioridade: 'Alta', status: 'Aberto' },
  { id: 2, unidade: 'Apto 112', assunto: 'Portao da garagem com defeito', prioridade: 'Alta', status: 'Em andamento' },
  { id: 3, unidade: 'Apto 301', assunto: 'Lampada queimada no corredor', prioridade: 'Baixa', status: 'Aberto' },
  { id: 4, unidade: 'Apto 405', assunto: 'Barulho excessivo', prioridade: 'Media', status: 'Em andamento' },
];

const styles = {
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '28px',
  },
  card: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '24px',
    boxShadow: 'var(--sombra)',
    borderTop: '4px solid var(--azul-principal)',
  },
  cardLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '10px',
  },
  cardValor: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--azul-principal)',
    marginBottom: '6px',
  },
  cardSub: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
  },
  graficos: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '28px',
  },
  boxGrafico: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '24px',
    boxShadow: 'var(--sombra)',
  },
  boxTitulo: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--azul-principal)',
    marginBottom: '20px',
  },
  tabelaBox: {
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
  scoreBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
  },
  scoreNumero: {
    fontSize: '72px',
    fontWeight: '900',
    color: 'var(--verde-sucesso)',
    lineHeight: 1,
  },
  scoreLabel: {
    fontSize: '13px',
    color: 'var(--cinza-texto)',
    marginTop: '8px',
    textAlign: 'center',
  },
  scoreBarra: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--cinza-medio)',
    borderRadius: '4px',
    marginTop: '16px',
    overflow: 'hidden',
  },
  scorePreenchimento: {
    height: '100%',
    width: '78%',
    backgroundColor: 'var(--verde-sucesso)',
    borderRadius: '4px',
  },
};

function getBadgeStyle(valor) {
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

export default function DashboardSindico() {
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  return (
    <Layout perfil="sindico" titulo="Dashboard" nomeUsuario={nomeUsuario}>

      <div style={styles.cards}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Receita do Mes</div>
          <div style={styles.cardValor}>R$ 47.500</div>
          <div style={styles.cardSub}>+3,2% em relacao ao mes anterior</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--vermelho-alerta)' }}>
          <div style={styles.cardLabel}>Inadimplentes</div>
          <div style={{ ...styles.cardValor, color: 'var(--vermelho-alerta)' }}>5</div>
          <div style={styles.cardSub}>R$ 8.200 em aberto</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.cardLabel}>Chamados Abertos</div>
          <div style={{ ...styles.cardValor, color: 'var(--amarelo-aviso)' }}>12</div>
          <div style={styles.cardSub}>3 com prioridade alta</div>
        </div>
        <div style={{ ...styles.card, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.cardLabel}>Proxima Assembleia</div>
          <div style={{ ...styles.cardValor, color: 'var(--verde-sucesso)', fontSize: '20px' }}>28/03/2025</div>
          <div style={styles.cardSub}>12 confirmados de 48</div>
        </div>
      </div>

      <div style={styles.graficos}>
        <div style={styles.boxGrafico}>
          <div style={styles.boxTitulo}>Receita x Despesa — Ultimos 6 meses</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dadosFinanceiros}>
              <defs>
                <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a3a6b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1a3a6b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']} />
              <Legend />
              <Area type="monotone" dataKey="receita" name="Receita" stroke="#1a3a6b" strokeWidth={2} fill="url(#colorReceita)" />
              <Area type="monotone" dataKey="despesa" name="Despesa" stroke="#dc2626" strokeWidth={2} fill="url(#colorDespesa)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.boxGrafico}>
          <div style={styles.boxTitulo}>Score do Condominio</div>
          <div style={styles.scoreBox}>
            <div style={styles.scoreNumero}>78</div>
            <div style={styles.scoreLabel}>Saude geral do condominio</div>
            <div style={styles.scoreBarra}>
              <div style={styles.scorePreenchimento} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--cinza-texto)', marginTop: '8px' }}>
              Bom — acima da media da regiao
            </div>
          </div>
        </div>
      </div>

      <div style={styles.graficos}>
        <div style={styles.tabelaBox}>
          <div style={styles.boxTitulo}>Chamados Recentes</div>
          <table style={styles.tabela}>
            <thead>
              <tr>
                <th style={styles.th}>Unidade</th>
                <th style={styles.th}>Assunto</th>
                <th style={styles.th}>Prioridade</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {chamadosRecentes.map((c) => (
                <tr key={c.id}>
                  <td style={styles.td}>{c.unidade}</td>
                  <td style={styles.td}>{c.assunto}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...getBadgeStyle(c.prioridade) }}>
                      {c.prioridade}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...getBadgeStyle(c.status) }}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.boxGrafico}>
          <div style={styles.boxTitulo}>Inadimplencia Mensal</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dadosInadimplencia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="inadimplentes" name="Inadimplentes" fill="#1a3a6b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </Layout>
  );
}
