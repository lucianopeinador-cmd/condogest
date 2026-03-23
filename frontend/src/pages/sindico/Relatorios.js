import React from 'react';
import Layout from '../../components/layout/Layout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const dadosMensais = [
  { mes: 'Out', receita: 42000, despesa: 31000 },
  { mes: 'Nov', receita: 44500, despesa: 33000 },
  { mes: 'Dez', receita: 41000, despesa: 38000 },
  { mes: 'Jan', receita: 46000, despesa: 32000 },
  { mes: 'Fev', receita: 43000, despesa: 29000 },
  { mes: 'Mar', receita: 47500, despesa: 34000 },
];

const dadosDespesas = [
  { name: 'Pessoal', value: 18400, color: '#1a3a6b' },
  { name: 'Manutencao', value: 8200, color: '#2563eb' },
  { name: 'Utilities', value: 9900, color: '#3b82f6' },
  { name: 'Seguros', value: 1200, color: '#60a5fa' },
  { name: 'Outros', value: 2300, color: '#93c5fd' },
];

const dadosChamados = [
  { mes: 'Out', abertos: 18, concluidos: 15 },
  { mes: 'Nov', abertos: 14, concluidos: 13 },
  { mes: 'Dez', abertos: 22, concluidos: 18 },
  { mes: 'Jan', abertos: 16, concluidos: 16 },
  { mes: 'Fev', abertos: 11, concluidos: 10 },
  { mes: 'Mar', abertos: 12, concluidos: 8 },
];

const relatorios = [
  { nome: 'Balancete Marco 2025', tipo: 'Financeiro', data: '17/03/2025', tamanho: '540 KB' },
  { nome: 'Relatorio de Chamados — Marco 2025', tipo: 'Operacional', data: '17/03/2025', tamanho: '320 KB' },
  { nome: 'Balancete Fevereiro 2025', tipo: 'Financeiro', data: '05/03/2025', tamanho: '520 KB' },
  { nome: 'Relatorio de Inadimplencia — Fev 2025', tipo: 'Financeiro', data: '05/03/2025', tamanho: '210 KB' },
  { nome: 'Relatorio de Chamados — Fev 2025', tipo: 'Operacional', data: '05/03/2025', tamanho: '298 KB' },
];

const styles = {
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '28px',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '28px',
  },
  box: {
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiCard: {
    backgroundColor: 'var(--branco)',
    borderRadius: 'var(--borda-radius)',
    padding: '20px 24px',
    boxShadow: 'var(--sombra)',
    borderTop: '4px solid var(--azul-principal)',
  },
  kpiLabel: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  kpiValor: {
    fontSize: '26px',
    fontWeight: '800',
    color: 'var(--azul-principal)',
    marginBottom: '4px',
  },
  kpiSub: {
    fontSize: '12px',
    color: 'var(--cinza-texto)',
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
    padding: '13px 16px',
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
  btnAcao: {
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    cursor: 'pointer',
    border: 'none',
    marginRight: '6px',
  },
  btnGerar: {
    padding: '8px 16px',
    backgroundColor: 'var(--azul-principal)',
    color: 'var(--branco)',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
};

function getTipoBadge(tipo) {
  const map = {
    Financeiro: { backgroundColor: '#f0fdf4', color: '#16a34a' },
    Operacional: { backgroundColor: '#eff6ff', color: '#2563eb' },
  };
  return map[tipo] || {};
}

export default function Relatorios() {
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Sindico';

  return (
    <Layout perfil="sindico" titulo="Relatorios" nomeUsuario={nomeUsuario}>

      <div style={styles.grid3}>
        <div style={styles.kpiCard}>
          <div style={styles.kpiLabel}>Taxa de Inadimplencia</div>
          <div style={styles.kpiValor}>10,4%</div>
          <div style={styles.kpiSub}>5 de 48 unidades</div>
        </div>
        <div style={{ ...styles.kpiCard, borderTopColor: 'var(--verde-sucesso)' }}>
          <div style={styles.kpiLabel}>Taxa de Resolucao</div>
          <div style={{ ...styles.kpiValor, color: 'var(--verde-sucesso)' }}>83%</div>
          <div style={styles.kpiSub}>Chamados concluidos no mes</div>
        </div>
        <div style={{ ...styles.kpiCard, borderTopColor: 'var(--amarelo-aviso)' }}>
          <div style={styles.kpiLabel}>Saldo do Mes</div>
          <div style={{ ...styles.kpiValor, color: 'var(--amarelo-aviso)' }}>R$ 13.500</div>
          <div style={styles.kpiSub}>Receita menos despesas</div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.box}>
          <div style={styles.boxTitulo}>Receita x Despesa</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dadosMensais}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`R$ ${v.toLocaleString('pt-BR')}`, '']} />
              <Legend />
              <Bar dataKey="receita" name="Receita" fill="#1a3a6b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="despesa" name="Despesa" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.box}>
          <div style={styles.boxTitulo}>Distribuicao de Despesas</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={dadosDespesas}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {dadosDespesas.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`R$ ${v.toLocaleString('pt-BR')}`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ ...styles.box, marginBottom: '28px' }}>
        <div style={styles.boxTitulo}>Chamados — Abertos x Concluidos</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dadosChamados}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="abertos" name="Abertos" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="concluidos" name="Concluidos" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.box}>
        <div style={styles.boxTitulo}>
          Relatorios Gerados
          <button style={styles.btnGerar}>Gerar Novo Relatorio</button>
        </div>
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Tipo</th>
              <th style={styles.th}>Data</th>
              <th style={styles.th}>Tamanho</th>
              <th style={styles.th}>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {relatorios.map((r, idx) => (
              <tr key={idx}>
                <td style={styles.td}><span style={{ fontWeight: '600' }}>{r.nome}</span></td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...getTipoBadge(r.tipo) }}>{r.tipo}</span>
                </td>
                <td style={styles.td}>{r.data}</td>
                <td style={styles.td}>{r.tamanho}</td>
                <td style={styles.td}>
                  <button style={styles.btnAcao}>Baixar PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
