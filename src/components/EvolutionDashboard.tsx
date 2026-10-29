import React, { useState } from 'react';
import { Sliders, TrendingUp, Target, Calendar, ArrowUpRight, CheckCircle2, Shield, Activity, Plus, BarChart2 } from 'lucide-react';
import { DomainAuditData, CustomMetricConfig, BacklinkSubmission } from '../types';

interface EvolutionDashboardProps {
  auditData: DomainAuditData | null;
  customMetrics: CustomMetricConfig[];
  onOpenCustomMetricsModal: () => void;
  submissions: BacklinkSubmission[];
  targetDa: number;
  setTargetDa: (val: number) => void;
  onNavigateToGenerator: () => void;
}

export const EvolutionDashboard: React.FC<EvolutionDashboardProps> = ({
  auditData,
  customMetrics,
  onOpenCustomMetricsModal,
  submissions,
  targetDa,
  setTargetDa,
  onNavigateToGenerator,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '12m'>('12m');
  const [activeMetricTab, setActiveMetricTab] = useState<'backlinks' | 'domains' | 'da'>('backlinks');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  if (!auditData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <BarChart2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-800">Nenhum dado de monitoramento ativo</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Audite um domínio ou crie novos backlinks para iniciar o acompanhamento de evolução no dashboard.
        </p>
        <button
          onClick={onNavigateToGenerator}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Iniciar no Gerador de Backlinks
        </button>
      </div>
    );
  }

  // Filter historical data based on time range
  let displayedHistory = auditData.historical;
  if (timeRange === '7d') {
    displayedHistory = auditData.historical.slice(-3);
  } else if (timeRange === '30d') {
    displayedHistory = auditData.historical.slice(-4);
  } else if (timeRange === '90d') {
    displayedHistory = auditData.historical.slice(-6);
  }

  // Metric value calculation helpers for custom cards
  const getMetricValue = (metricId: string) => {
    const m = auditData.metrics;
    switch (metricId) {
      case 'da':
        return { val: `${m.domainAuthority}`, sub: '+4 nos últimos 30d', trend: '+4.2%' };
      case 'pa':
        return { val: `${m.pageAuthority}`, sub: '+3 nos últimos 30d', trend: '+3.1%' };
      case 'backlinks':
        return { val: m.totalBacklinks.toLocaleString('pt-BR'), sub: `+${submissions.length || 45} novos links`, trend: '+18.4%' };
      case 'referringDomains':
        return { val: m.referringDomains.toLocaleString('pt-BR'), sub: '+12 novos domínios', trend: '+9.1%' };
      case 'dofollowRatio':
        return { val: `${m.dofollowPercent}%`, sub: 'Taxa saudável (meta ≥ 65%)', trend: '+2.0%' };
      case 'avgBacklinkDa':
        const avg = submissions.length > 0
          ? Math.round(submissions.reduce((acc, s) => acc + s.da, 0) / submissions.length)
          : 82;
        return { val: `${avg}/100`, sub: 'Alta qualidade média', trend: 'Estável' };
      case 'spamScore':
        return { val: `${m.spamScore}%`, sub: 'Baixo risco de penalidade', trend: '0%' };
      case 'velocity':
        return { val: '+14 links/sem', sub: 'Ritmo orgânico recomendado', trend: 'Ótimo' };
      case 'indexRate':
        return { val: '94.2%', sub: 'Links detectados por indexadores', trend: '+6.1%' };
      case 'ttfb':
        return { val: `${auditData.ttfb}ms`, sub: 'Tempo de primeiro byte', trend: '-25ms' };
      case 'trustFlow':
        return { val: `${m.trustFlow}`, sub: 'Métrica de qualidade de citação', trend: '+2' };
      case 'citationFlow':
        return { val: `${m.citationFlow}`, sub: 'Métrica de volume de citação', trend: '+1' };
      default:
        return { val: '—', sub: '', trend: '' };
    }
  };

  // SVG Chart Dimensions & Math
  const maxVal = Math.max(
    ...displayedHistory.map(h => 
      activeMetricTab === 'backlinks' ? h.backlinks : activeMetricTab === 'domains' ? h.referringDomains : h.da
    )
  ) * 1.15;
  const minVal = 0;

  const chartWidth = 800;
  const chartHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const graphWidth = chartWidth - paddingX * 2;
  const graphHeight = chartHeight - paddingY * 2;

  const points = displayedHistory.map((d, i) => {
    const val = activeMetricTab === 'backlinks' ? d.backlinks : activeMetricTab === 'domains' ? d.referringDomains : d.da;
    const x = paddingX + (i / Math.max(1, displayedHistory.length - 1)) * graphWidth;
    const y = chartHeight - paddingY - ((val - minVal) / Math.max(1, maxVal - minVal)) * graphHeight;
    return { x, y, val, month: d.month };
  });

  const pathD = points.length > 0
    ? points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '')
    : '';

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  // Target DA calculation
  const currentDa = auditData.metrics.domainAuthority;
  const goalDa = targetDa || Math.min(100, currentDa + 15);
  const targetProgress = Math.min(100, Math.round((currentDa / goalDa) * 100));

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Context */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Dashboard de Evolução de Links & Autoridade
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Monitorando: <strong className="text-slate-800 font-mono">{auditData.domain}</strong> · Atualizado em tempo real
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCustomMetricsModal}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Personalizar Métricas</span>
          </button>
        </div>
      </div>

      {/* Target & Link Velocity Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Target DA Goal Card */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-900">
                  Meta de Autoridade de Domínio (DA Target)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Definir meta:</span>
                <input
                  type="number"
                  min={currentDa}
                  max={100}
                  value={goalDa}
                  onChange={(e) => setTargetDa(Number(e.target.value))}
                  className="w-14 px-1.5 py-0.5 text-xs font-mono font-bold text-blue-600 border border-slate-200 rounded text-center"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">
                DA Atual: <strong className="font-mono text-slate-900">{currentDa}</strong>
              </span>
              <span className="text-slate-600 font-medium">
                Meta: <strong className="font-mono text-blue-600">{goalDa}</strong>
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${targetProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{targetProgress}% alcançado da meta estipulada</span>
            <span>Estimativa: ~60 a 90 dias com links criados regularmente</span>
          </div>
        </div>

        {/* Link Acquisition Health */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Velocidade de Links
              </span>
              <span className="text-emerald-700 font-mono text-[11px] font-bold">RITMO SEGURO</span>
            </div>
            <div className="mt-3 text-3xl font-bold font-mono text-slate-900 tabular-nums">
              +14 <span className="text-xs font-normal text-slate-400">links/semana</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              O ritmo atual de novos backlinks respeita as diretrizes contra crescimento artificial e preserva o Spam Score em nível mínimo.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Risco algorítmico: Baixo</span>
            <span className="text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Normal
            </span>
          </div>
        </div>
      </div>

      {/* Customizable Dynamic Metric Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Métricas Monitoradas Ativas
          </h2>
          <button
            onClick={onOpenCustomMetricsModal}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
          >
            Ajustar cards visíveis
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {customMetrics.filter(m => m.enabled).map((metric) => {
            const data = getMetricValue(metric.id);
            return (
              <div
                key={metric.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700 truncate">{metric.label}</span>
                  <span className="text-[11px] font-mono text-blue-600 font-semibold">{data.trend}</span>
                </div>
                <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {data.val}
                </div>
                <div className="mt-1 text-[11px] text-slate-400 truncate">
                  {data.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Evolution Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Trajetória de Crescimento e Histórico
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Acompanhamento cronológico do perfil de backlinks e autoridade de domínio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveMetricTab('backlinks')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMetricTab === 'backlinks' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Backlinks Totais
              </button>
              <button
                onClick={() => setActiveMetricTab('domains')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMetricTab === 'domains' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Domínios Referência
              </button>
              <button
                onClick={() => setActiveMetricTab('da')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMetricTab === 'da' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Evolução DA
              </button>
            </div>

            {/* Time Horizon Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              {(['7d', '30d', '90d', '12m'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 uppercase ${
                    timeRange === range ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SVG Chart Rendering */}
        <div className="relative w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-64 select-none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingY + graphHeight * ratio;
              return (
                <line
                  key={i}
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Shaded Area */}
            {areaD && (
              <path
                d={areaD}
                fill="url(#chartGradient)"
              />
            )}

            {/* Line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Data Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint === i ? 6 : 4}
                  fill="#FFFFFF"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  className="transition-all duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Month label */}
                <text
                  x={p.x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className="text-[11px] font-mono fill-slate-400"
                >
                  {p.month}
                </text>
              </g>
            ))}
          </svg>

          {/* Tooltip on hover */}
          {hoveredPoint !== null && points[hoveredPoint] && (
            <div
              className="absolute z-10 bg-slate-900 text-white text-xs rounded-lg px-3 py-1.5 pointer-events-none shadow-lg -translate-x-1/2 -translate-y-full font-mono"
              style={{
                left: `${(points[hoveredPoint].x / chartWidth) * 100}%`,
                top: `${(points[hoveredPoint].y / chartHeight) * 100}%`,
              }}
            >
              <div className="font-bold">{points[hoveredPoint].month}</div>
              <div className="text-blue-300">
                {activeMetricTab === 'backlinks' && `Backlinks: ${points[hoveredPoint].val.toLocaleString('pt-BR')}`}
                {activeMetricTab === 'domains' && `Domínios: ${points[hoveredPoint].val.toLocaleString('pt-BR')}`}
                {activeMetricTab === 'da' && `DA Moz: ${points[hoveredPoint].val}/100`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
