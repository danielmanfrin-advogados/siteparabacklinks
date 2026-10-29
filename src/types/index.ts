export interface DomainMetrics {
  domainAuthority: number;
  pageAuthority: number;
  spamScore: number;
  trustFlow: number;
  citationFlow: number;
  totalBacklinks: number;
  referringDomains: number;
  dofollowPercent: number;
  nofollowPercent: number;
}

export interface AnchorTextItem {
  anchor: string;
  percentage: number;
  count: number;
  type: string;
}

export interface HistoricalPoint {
  month: string;
  backlinks: number;
  referringDomains: number;
  da: number;
}

export interface DomainAuditData {
  domain: string;
  url: string;
  title: string;
  description: string;
  isReachable: boolean;
  httpStatus: number;
  ttfb: number;
  hasSsl: boolean;
  hasRobots: boolean;
  hasSitemap: boolean;
  serverHeader: string;
  contentLength: number;
  metrics: DomainMetrics;
  anchorTexts: AnchorTextItem[];
  historical: HistoricalPoint[];
  auditedAt: string;
}

export type BacklinkType = 'Dofollow' | 'Nofollow' | 'Diretório' | 'Ping Indexador';

export interface BacklinkProvider {
  id: string;
  name: string;
  da: number;
  type: BacklinkType;
  category: 'WHOIS & DNS' | 'Métricas Web' | 'Indexador de Busca' | 'Auditoria Técnica' | 'Diretório Global';
  urlTemplate: string;
  description: string;
}

export interface BacklinkSubmission {
  providerId: string;
  providerName: string;
  da: number;
  type: BacklinkType;
  category: string;
  backlinkUrl: string;
  targetUrl: string;
  status: 'idle' | 'submitting' | 'success' | 'failed';
  latencyMs?: number;
  message?: string;
  verifiedAt?: string;
}

export interface CustomMetricConfig {
  id: string;
  label: string;
  enabled: boolean;
  description: string;
  format: 'number' | 'percent' | 'ms' | 'score';
}

export interface MonitoredProject {
  id: string;
  domain: string;
  url: string;
  targetDa: number;
  da: number;
  totalBacklinks: number;
  referringDomains: number;
  spamScore: number;
  lastUpdated: string;
}
