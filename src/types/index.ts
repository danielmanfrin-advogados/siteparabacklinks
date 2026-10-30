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

export type IncomingBacklinkCategory = 
  | 'Portal de Notícias' 
  | 'Artigo / Blog' 
  | 'Diretório Comercial' 
  | 'Fórum / Comunidade' 
  | 'Recurso Educacional' 
  | 'Wikis & Enciclopédias' 
  | 'Plataforma Tech' 
  | 'Review / Avaliação';

export interface IncomingBacklink {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  sourceDa: number;
  sourcePa: number;
  linkType: 'Dofollow' | 'Nofollow';
  category: IncomingBacklinkCategory;
  firstDetected: string;
  lastChecked: string;
  status: 'Ativo' | 'Redirecionado' | 'Perdido';
  statusCode: number;
  spamScore: number;
}

export type ReplicationActionType = 'direct_submission' | 'directory_claim' | 'editorial_outreach' | 'community_post';

export interface CompetitorBacklink {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  competitorUrl: string;
  anchorText: string;
  sourceDa: number;
  sourcePa: number;
  linkType: 'Dofollow' | 'Nofollow';
  category: IncomingBacklinkCategory;
  actionType: ReplicationActionType;
  replicationStatus: 'available' | 'requesting' | 'replicated' | 'outreach_ready';
  targetUrlForMySite: string;
  replicatedAt?: string;
  latencyMs?: number;
  outreachPitch?: {
    subject: string;
    body: string;
    editorEmail?: string;
  };
}

export interface AuthorityGrade {
  letter: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  numericScore: number; // 0 - 100
  ratingLabel: string;
  summary: string;
  breakdown: {
    backlinkProfileScore: number;
    technicalHealthScore: number;
    domainDiversityScore: number;
    spamSafetyScore: number;
    trustCitationBalance: number;
  };
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
  grade: AuthorityGrade;
  incomingBacklinks: IncomingBacklink[];
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
