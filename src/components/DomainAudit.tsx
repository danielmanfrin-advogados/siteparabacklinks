import React, { useState } from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  ExternalLink, 
  Zap, 
  ArrowUpRight, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Award,
  Search,
  Filter,
  Download,
  Link2,
  Layers,
  Sparkles
} from 'lucide-react';
import { DomainAuditData, IncomingBacklink } from '../types';

interface DomainAuditProps {
  auditData: DomainAuditData | null;
  isLoading: boolean;
  onAuditUrl: (url: string) => void;
  onNavigateToGenerator: () => void;
  onOpenReport: () => void;
}

export const DomainAudit: React.FC<DomainAuditProps> = ({
  auditData,
  isLoading,
  onAuditUrl,
  onNavigateToGenerator,
  onOpenReport,
}) => {
  const [inputUrl, setInputUrl] = useState(auditData?.domain || '');
  const [backlinkSearch, setBacklinkSearch] = useState('');
  const [backlinkFilter, setBacklinkFilter] = useState<string>('all');
  const [activeAuditTab, setActiveAuditTab] = useState<'overview' | 'backlinks' | 'score'>('overview');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onAuditUrl(inputUrl.trim());
    }
  };

  // Filter incoming backlinks list
  const incomingList: IncomingBacklink[] = auditData?.incomingBacklinks || [];
  const filteredIncoming = incomingList.filter(item => {
    const matchesSearch = 
      item.sourceDomain.toLowerCase().includes(backlinkSearch.toLowerCase()) ||
      item.anchorText.toLowerCase().includes(backlinkSearch.toLowerCase()) ||
      item.sourceUrl.toLowerCase().includes(backlinkSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(backlinkSearch.toLowerCase());
    
    if (!matchesSearch) return false;

    if (backlinkFilter === 'dofollow') return item.linkType === 'Dofollow';
    if (backlinkFilter === 'nofollow') return item.linkType === 'Nofollow';
    if (backlinkFilter === 'highDa') return item.sourceDa >= 85;
    if (backlinkFilter === 'news') return item.category === 'Portal de Notícias';
    if (backlinkFilter === 'tech') return item.category === 'Plataforma Tech' || item.category === 'Artigo / Blog';

    return true;
  });

  const handleExportIncomingCsv = () => {
    if (incomingList.length === 0) return;
    const headers = ['Domínio de Origem', 'URL de Origem', 'URL de Destino', 'Texto Âncora', 'DA Origem', 'PA Origem', 'Tipo', 'Categoria', 'Status', 'Primeira Detecção'];
    const rows = incomingList.map(b => [
      `"${b.sourceDomain}"`,
      `"${b.sourceUrl}"`,
      `"${b.targetUrl}"`,
      `"${b.anchorText}"`,
      b.sourceDa,
      b.sourcePa,
      `"${b.linkType}"`,
      `"${b.category}"`,
      `"${b.status} (${b.statusCode})"`,
      `"${b.firstDetected}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `backlinks_existentes_${auditData?.domain || 'site'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const grade = auditData?.grade;

  // Grade color helper
  const getGradeColorClasses = (letter?: string) => {
    switch (letter) {
      case 'A+':
      case 'A':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          badge: 'bg-emerald-600 text-white',
          bar: 'bg-emerald-600',
        };
      case 'B+':
      case 'B':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          badge: 'bg-blue-600 text-white',
          bar: 'bg-blue-600',
        };
      case 'C':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          badge: 'bg-amber-600 text-white',
          bar: 'bg-amber-600',
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          badge: 'bg-slate-700 text-white',
          bar: 'bg-slate-600',
        };
    }
  };

  const gradeColors = getGradeColorClasses(grade?.letter);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Auditoria & Nota de Autoridade do Domínio
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Consulte a nota geral de autoridade, a quantidade total e a lista detalhada de backlinks reais que o site possui na web.
          </p>
        </div>

        {auditData && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAuditUrl(auditData.domain)}
              disabled={isLoading}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Recalcular Métricas</span>
            </button>
            <button
              onClick={onOpenReport}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Gerar Relatório Completo</span>
            </button>
          </div>
        )}
      </div>

      {/* URL Input Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Globe2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite o domínio para auditar (ex: globo.com, uol.com.br, meusite.com.br)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputUrl.trim()}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analisando Domínio...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Auditar Domínio Agora</span>
              </>
            )}
          </button>
        </form>
      </div>

      {auditData ? (
        <div className="space-y-8">
          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg text-xs font-medium w-fit">
            <button
              onClick={() => setActiveAuditTab('overview')}
              className={`px-3.5 py-2 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeAuditTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visão Geral & Métricas Moz
            </button>
            <button
              onClick={() => setActiveAuditTab('score')}
              className={`px-3.5 py-2 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeAuditTab === 'score'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Nota de Autoridade ({grade?.letter || 'B'})</span>
            </button>
            <button
              onClick={() => setActiveAuditTab('backlinks')}
              className={`px-3.5 py-2 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeAuditTab === 'backlinks'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Backlinks Existentes ({incomingList.length})</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & MOZ METRICS */}
          {activeAuditTab === 'overview' && (
            <div className="space-y-8">
              {/* Highlight Card: Authority Grade & Quantity Overview */}
              {grade && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex items-center gap-5 border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-5">
                    <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-mono font-extrabold ${gradeColors.bg} border ${gradeColors.border} shrink-0 shadow-xs`}>
                      <span className={`text-3xl ${gradeColors.text}`}>{grade.letter}</span>
                      <span className="text-[10px] text-slate-500 font-sans font-semibold uppercase tracking-wider">Nota SEO</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Classificação de Autoridade</span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                        {grade.ratingLabel}
                      </h3>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                          {grade.numericScore}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">/ 100 pontos</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {grade.summary}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Backlinks Identificados:</span>
                        <strong className="text-slate-900 font-mono text-sm tabular-nums">
                          {auditData.metrics.totalBacklinks.toLocaleString('pt-BR')} links
                        </strong>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-slate-400 block">Domínios Únicos:</span>
                        <strong className="text-slate-900 font-mono text-sm tabular-nums">
                          {auditData.metrics.referringDomains.toLocaleString('pt-BR')} domínios
                        </strong>
                      </div>
                      <div className="border-l border-slate-200 pl-4">
                        <span className="text-slate-400 block">Dofollow / Nofollow:</span>
                        <strong className="text-emerald-700 font-mono text-sm tabular-nums">
                          {auditData.metrics.dofollowPercent}% / {auditData.metrics.nofollowPercent}%
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Authority Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Domain Authority (DA) */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Domain Authority (DA)</span>
                    <span className="text-[11px] font-mono text-slate-400">Escala Moz 1-100</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-blue-600 tracking-tight tabular-nums">
                      {auditData.metrics.domainAuthority}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">/100</span>
                  </div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditData.metrics.domainAuthority}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5">
                    Força calculada com base na rede de links externos do domínio.
                  </p>
                </div>

                {/* Page Authority (PA) */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Page Authority (PA)</span>
                    <span className="text-[11px] font-mono text-slate-400">Página Raiz</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-slate-900 tracking-tight tabular-nums">
                      {auditData.metrics.pageAuthority}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">/100</span>
                  </div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditData.metrics.pageAuthority}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5">
                    Poder de ranqueamento da página inicial nos mecanismos de busca.
                  </p>
                </div>

                {/* Spam Score */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Índice de Spam Score</span>
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                      {auditData.metrics.spamScore <= 5 ? 'Seguro' : 'Atenção'}
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className={`text-4xl font-extrabold font-mono tracking-tight tabular-nums ${
                      auditData.metrics.spamScore <= 5 ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {auditData.metrics.spamScore}%
                    </span>
                  </div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        auditData.metrics.spamScore <= 5 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.max(8, auditData.metrics.spamScore)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5">
                    {auditData.metrics.spamScore <= 5
                      ? 'Perfil saudável sem risco de penalidades algorítmicas.'
                      : 'Monitorar links suspeitos e submeter arquivo disavow.'}
                  </p>
                </div>

                {/* Trust Flow & Citation Flow */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Trust Flow / Citation Flow</span>
                    <span className="text-[11px] font-mono text-slate-400">Majestic SEO</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Trust (TF)</span>
                      <span className="text-2xl font-bold font-mono text-slate-800 tabular-nums">
                        {auditData.metrics.trustFlow}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Citation (CF)</span>
                      <span className="text-2xl font-bold font-mono text-slate-800 tabular-nums">
                        {auditData.metrics.citationFlow}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    Proporção: <strong className="font-mono text-slate-700">{(auditData.metrics.trustFlow / Math.max(1, auditData.metrics.citationFlow)).toFixed(2)}</strong> (Ideal ≥ 0.70)
                  </div>
                </div>
              </div>

              {/* Technical Diagnostics */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Sinais Técnicos de Rastreabilidade e Infraestrutura
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                      {auditData.hasSsl ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Criptografia SSL (HTTPS)</span>
                      <span className="text-slate-500 mt-0.5 block">
                        {auditData.hasSsl ? 'Certificado válido ativo' : 'Alerta: site sem HTTPS'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Tempo de Resposta TTFB</span>
                      <span className="text-slate-500 font-mono mt-0.5 block tabular-nums">
                        {auditData.ttfb} ms ({auditData.ttfb < 300 ? 'Excelente' : 'Aceitável'})
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                      {auditData.hasRobots ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Robots.txt</span>
                      <span className="text-slate-500 mt-0.5 block">
                        {auditData.hasRobots ? 'Presente e acessível' : 'Não encontrado'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                      {auditData.hasSitemap ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Sitemap XML</span>
                      <span className="text-slate-500 mt-0.5 block">
                        {auditData.hasSitemap ? 'Mapeado para buscadores' : 'Não localizado'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Status HTTP</span>
                      <span className="text-slate-500 font-mono mt-0.5 block tabular-nums">
                        {auditData.httpStatus} OK (Acessível)
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                      <Globe2 className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Servidor Web</span>
                      <span className="text-slate-500 font-mono mt-0.5 block truncate max-w-[170px]">
                        {auditData.serverHeader}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-700 mb-1">Snippet detectado na página inicial:</div>
                  <div className="text-sm font-semibold text-blue-800 line-clamp-1">{auditData.title}</div>
                  <div className="text-xs font-mono text-emerald-700 mt-0.5">{auditData.url}</div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{auditData.description}</div>
                </div>
              </div>

              {/* Anchor Profile */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Perfil de Textos Âncora Identificados
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Distribuição de termos âncora que apontam para {auditData.domain}.
                </p>
                <div className="space-y-3">
                  {auditData.anchorTexts.map((anchor, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-800">
                          "{anchor.anchor}" <span className="text-slate-400 font-normal">({anchor.type})</span>
                        </span>
                        <span className="font-mono font-semibold text-slate-700 tabular-nums">
                          {anchor.percentage}% <span className="text-slate-400 font-normal">({anchor.count.toLocaleString('pt-BR')} links)</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${anchor.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED AUTHORITY SCORECARD */}
          {activeAuditTab === 'score' && grade && (
            <div className="space-y-8">
              {/* Grand Score Display */}
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs">
                <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-8">
                  <div className={`w-32 h-32 rounded-3xl flex flex-col items-center justify-center font-mono font-black ${gradeColors.bg} border-2 ${gradeColors.border} shrink-0 shadow-sm`}>
                    <span className={`text-6xl ${gradeColors.text}`}>{grade.letter}</span>
                    <span className="text-xs text-slate-500 font-sans font-semibold uppercase tracking-wider mt-1">Nota Geral</span>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                      Auditoria de Autoridade RankLink
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-2">
                      {grade.ratingLabel}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed max-w-2xl">
                      {grade.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <Award className="w-4 h-4 text-blue-600" />
                        Score Composto: <strong className="font-mono text-sm">{grade.numericScore} / 100</strong>
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">
                        Domínio Auditado: <strong className="text-slate-800 font-mono">{auditData.domain}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* The 5 Authority Pillars Breakdown */}
                <div className="pt-8">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    Avaliação Detalhada por Pilares de Autoridade (0 a 100)
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Cada pilar representa um critério chave considerado pelos algoritmos de busca para definir o ranqueamento orgânico.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pillar 1 */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                        <span>1. Força do Perfil de Backlinks</span>
                        <span className="font-mono text-sm font-bold text-blue-600 tabular-nums">
                          {grade.breakdown.backlinkProfileScore} / 100
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${grade.breakdown.backlinkProfileScore}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Mede a quantidade, qualidade e peso de ranqueamento dos domínios externos que citam este site.
                      </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                        <span>2. Integridade Técnica & Core Web Vitals</span>
                        <span className="font-mono text-sm font-bold text-emerald-600 tabular-nums">
                          {grade.breakdown.technicalHealthScore} / 100
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${grade.breakdown.technicalHealthScore}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Avalia presença de HTTPS, tempo de resposta (TTFB: {auditData.ttfb}ms), sitemap XML e robots.txt.
                      </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                        <span>3. Diversidade de Domínios Únicos</span>
                        <span className="font-mono text-sm font-bold text-indigo-600 tabular-nums">
                          {grade.breakdown.domainDiversityScore} / 100
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${grade.breakdown.domainDiversityScore}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Calcula a proporção entre backlinks totais ({auditData.metrics.totalBacklinks.toLocaleString('pt-BR')}) e domínios independentes ({auditData.metrics.referringDomains.toLocaleString('pt-BR')}).
                      </p>
                    </div>

                    {/* Pillar 4 */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                        <span>4. Segurança contra Spam & Penalidades</span>
                        <span className="font-mono text-sm font-bold text-emerald-600 tabular-nums">
                          {grade.breakdown.spamSafetyScore} / 100
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${grade.breakdown.spamSafetyScore}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Taxa de risco de spam atual: {auditData.metrics.spamScore}%. Perfil protegido contra filtros Penguin e penalidades manuais.
                      </p>
                    </div>

                    {/* Pillar 5 */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 md:col-span-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                        <span>5. Equilíbrio de Fluxo (Trust Flow / Citation Flow)</span>
                        <span className="font-mono text-sm font-bold text-blue-600 tabular-nums">
                          {grade.breakdown.trustCitationBalance} / 100
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${grade.breakdown.trustCitationBalance}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Relação entre qualidade (TF: {auditData.metrics.trustFlow}) e volume (CF: {auditData.metrics.citationFlow}). Proporção equilibrada transmite confiança aos buscadores.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INCOMING BACKLINKS EXPLORER ("QUAIS SÃO ELES") */}
          {activeAuditTab === 'backlinks' && (
            <div className="space-y-6">
              {/* Backlinks KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Total de Backlinks</span>
                  <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {auditData.metrics.totalBacklinks.toLocaleString('pt-BR')}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Links externos rastreados</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Domínios de Referência</span>
                  <div className="mt-2 text-2xl font-bold font-mono text-blue-600 tabular-nums">
                    {auditData.metrics.referringDomains.toLocaleString('pt-BR')}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Sites independentes</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Proporção Dofollow</span>
                  <div className="mt-2 text-2xl font-bold font-mono text-emerald-600 tabular-nums">
                    {auditData.metrics.dofollowPercent}%
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Transfere PageRank direto</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                  <span className="text-xs text-slate-500 font-medium block">Links Auditados no Dossiê</span>
                  <div className="mt-2 text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {incomingList.length}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Fontes detalhadas catalogadas</span>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                {/* Table Header Controls */}
                <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70">
                  {/* Segmented Filter */}
                  <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg text-xs font-medium overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => setBacklinkFilter('all')}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        backlinkFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Todos ({incomingList.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setBacklinkFilter('dofollow')}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        backlinkFilter === 'dofollow' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Dofollow
                    </button>
                    <button
                      type="button"
                      onClick={() => setBacklinkFilter('nofollow')}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        backlinkFilter === 'nofollow' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Nofollow
                    </button>
                    <button
                      type="button"
                      onClick={() => setBacklinkFilter('highDa')}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        backlinkFilter === 'highDa' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Alta Autoridade (DA ≥ 85)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBacklinkFilter('news')}
                      className={`px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        backlinkFilter === 'news' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Portais Noticiosos
                    </button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por âncora ou domínio..."
                        value={backlinkSearch}
                        onChange={(e) => setBacklinkSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900"
                      />
                    </div>
                    {/* Export */}
                    <button
                      type="button"
                      onClick={handleExportIncomingCsv}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Exportar CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 w-12">#</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Página de Origem (Quem Linka)</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Texto Âncora</th>
                        <th className="px-3 py-3 text-right font-semibold text-slate-700">DA Origem</th>
                        <th className="px-3 py-3 text-left font-semibold text-slate-700">Tipo</th>
                        <th className="px-3 py-3 text-left font-semibold text-slate-700">Categoria</th>
                        <th className="px-3 py-3 text-left font-semibold text-slate-700">Destino</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredIncoming.map((link, idx) => (
                        <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 text-slate-400 font-mono tabular-nums">{idx + 1}</td>
                          <td className="px-4 py-3 max-w-xs">
                            <div className="font-semibold text-slate-900">{link.sourceDomain}</div>
                            <a
                              href={link.sourceUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-blue-600 hover:text-blue-800 hover:underline truncate max-w-xs mt-0.5"
                              title={link.sourceUrl}
                            >
                              <span className="truncate">{link.sourceUrl}</span>
                              <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
                            </a>
                          </td>
                          <td className="px-4 py-3 max-w-[200px]">
                            <span className="font-medium text-slate-800 block truncate" title={link.anchorText}>
                              "{link.anchorText}"
                            </span>
                          </td>
                          <td className="px-3 py-3 text-right">
                            <span className="font-mono font-bold text-blue-600 tabular-nums">
                              {link.sourceDa}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">PA {link.sourcePa}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`font-semibold ${link.linkType === 'Dofollow' ? 'text-emerald-700' : 'text-slate-500'}`}>
                              {link.linkType}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-600 whitespace-nowrap">
                            {link.category}
                          </td>
                          <td className="px-3 py-3 font-mono text-[11px] text-slate-500 truncate max-w-[140px]" title={link.targetUrl}>
                            {link.targetUrl.replace(`https://${auditData.domain}`, '') || '/'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {link.status === 'Ativo' ? (
                              <span className="text-emerald-700 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{link.statusCode} OK</span>
                              </span>
                            ) : link.status === 'Redirecionado' ? (
                              <span className="text-blue-600 font-medium flex items-center gap-1">
                                <span>301 Redir</span>
                              </span>
                            ) : (
                              <span className="text-amber-700 font-medium flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                <span>404 Não encontrado</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {filteredIncoming.length === 0 && (
                        <tr>
                          <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                            Nenhum backlink encontrado para os filtros selecionados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span>
                    Exibindo {filteredIncoming.length} de {incomingList.length} fontes catalogadas no dossiê de links de {auditData.domain}.
                  </span>
                  <button
                    onClick={onNavigateToGenerator}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    + Criar mais backlinks para este site
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Strategic Next Steps Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-300" />
                <h4 className="text-base font-bold">
                  Quer aumentar a Nota de Autoridade e o volume de Backlinks deste site?
                </h4>
              </div>
              <p className="text-xs text-blue-200 mt-1 max-w-xl leading-relaxed">
                Utilize nosso Gerador Automático para criar novos backlinks permanentes em mais de 50 diretórios e indexadores globais de alta autoridade (DA 70+ a 98).
              </p>
            </div>
            <button
              onClick={onNavigateToGenerator}
              className="px-5 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Criar Novos Backlinks Agora
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <Globe2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">Nenhum domínio auditado ainda</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Digite o endereço de um website acima para consultar a nota geral de autoridade, a quantidade total de backlinks e a lista detalhada de quem aponta para ele.
          </p>
        </div>
      )}
    </div>
  );
};
