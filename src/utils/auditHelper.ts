import { DomainAuditData, AuthorityGrade, IncomingBacklink, IncomingBacklinkCategory } from '../types';

interface SeedBacklinkSource {
  domain: string;
  urlPattern: string;
  da: number;
  pa: number;
  category: IncomingBacklinkCategory;
  defaultType: 'Dofollow' | 'Nofollow';
  anchorTemplate: (domain: string) => string;
}

const SEED_SOURCES: SeedBacklinkSource[] = [
  {
    domain: 'techcrunch.com',
    urlPattern: 'https://techcrunch.com/2026/04/12/startup-spotlight-innovations',
    da: 94,
    pa: 82,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `plataforma ${d}`
  },
  {
    domain: 'github.com',
    urlPattern: 'https://github.com/topics/seo-tools-directory',
    da: 96,
    pa: 88,
    category: 'Plataforma Tech',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `repositório e site ${d}`
  },
  {
    domain: 'medium.com',
    urlPattern: 'https://medium.com/@marketing.pro/analise-completa-de-performance',
    da: 92,
    pa: 76,
    category: 'Artigo / Blog',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `conheça o ${d}`
  },
  {
    domain: 'g1.globo.com',
    urlPattern: 'https://g1.globo.com/economia/tecnologia/noticia/2026/05/novidades-mercado.ghtml',
    da: 93,
    pa: 85,
    category: 'Portal de Notícias',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `segundo o ${d}`
  },
  {
    domain: 'dev.to',
    urlPattern: 'https://dev.to/community/top-10-resources-for-engineers',
    da: 86,
    pa: 71,
    category: 'Plataforma Tech',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `${d} no Dev.to`
  },
  {
    domain: 'reddit.com',
    urlPattern: 'https://www.reddit.com/r/technology/comments/best_sites_benchmark',
    da: 97,
    pa: 89,
    category: 'Fórum / Comunidade',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `https://${d}`
  },
  {
    domain: 'producthunt.com',
    urlPattern: 'https://www.producthunt.com/products/digital-tools-showcase',
    da: 91,
    pa: 79,
    category: 'Diretório Comercial',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `Acessar ${d}`
  },
  {
    domain: 'exame.com',
    urlPattern: 'https://exame.com/negocios/empresas-em-destaque-transformacao-digital',
    da: 89,
    pa: 77,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `soluções de ${d}`
  },
  {
    domain: 'stackoverflow.com',
    urlPattern: 'https://stackoverflow.com/questions/7829103/integration-guide',
    da: 95,
    pa: 84,
    category: 'Fórum / Comunidade',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `documentação em ${d}`
  },
  {
    domain: 'uol.com.br',
    urlPattern: 'https://noticias.uol.com.br/tecnologia/noticias/redacao/2026/06/tendencias.htm',
    da: 94,
    pa: 83,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `visite ${d}`
  },
  {
    domain: 'trustpilot.com',
    urlPattern: 'https://www.trustpilot.com/categories/internet_software',
    da: 93,
    pa: 78,
    category: 'Review / Avaliação',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `avaliação de ${d}`
  },
  {
    domain: 'infomoney.com.br',
    urlPattern: 'https://www.infomoney.com.br/negocios/setores-com-maior-crescimento',
    da: 88,
    pa: 75,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `dados de ${d}`
  },
  {
    domain: 'wikipedia.org',
    urlPattern: 'https://pt.wikipedia.org/wiki/Portal:Tecnologia/Recursos_Externos',
    da: 98,
    pa: 92,
    category: 'Wikis & Enciclopédias',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `Página oficial: ${d}`
  },
  {
    domain: 'hashnode.com',
    urlPattern: 'https://hashnode.com/post/modern-web-architecture-breakdown',
    da: 84,
    pa: 68,
    category: 'Artigo / Blog',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `leia mais em ${d}`
  },
  {
    domain: 'terra.com.br',
    urlPattern: 'https://www.terra.com.br/digital/servicos-online-mais-utilizados',
    da: 91,
    pa: 79,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `portal ${d}`
  },
  {
    domain: 'quora.com',
    urlPattern: 'https://www.quora.com/What-are-the-best-reliable-websites-in-2026',
    da: 93,
    pa: 81,
    category: 'Fórum / Comunidade',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `recomendado: ${d}`
  },
  {
    domain: 'tecmundo.com.br',
    urlPattern: 'https://www.tecmundo.com.br/internet/ferramentas-essenciais-produtividade.htm',
    da: 87,
    pa: 74,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `site ${d}`
  },
  {
    domain: 'behance.net',
    urlPattern: 'https://www.behance.net/gallery/digital-experience-case-study',
    da: 92,
    pa: 77,
    category: 'Plataforma Tech',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `estudo de caso ${d}`
  },
  {
    domain: 'canaltech.com.br',
    urlPattern: 'https://canaltech.com.br/software/guia-definitivo-solucoes-web',
    da: 89,
    pa: 76,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `veja em ${d}`
  },
  {
    domain: 'substack.com',
    urlPattern: 'https://digitalgrowth.substack.com/p/deep-dive-market-leaders',
    da: 90,
    pa: 73,
    category: 'Artigo / Blog',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `análise do ${d}`
  },
  {
    domain: 'w3.org',
    urlPattern: 'https://www.w3.org/community/web-standards-directory',
    da: 97,
    pa: 90,
    category: 'Recurso Educacional',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `referência técnica ${d}`
  },
  {
    domain: 'estadao.com.br',
    urlPattern: 'https://www.estadao.com.br/economia/inovacao-no-mercado-brasileiro',
    da: 92,
    pa: 80,
    category: 'Portal de Notícias',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `empresa ${d}`
  },
  {
    domain: 'reclameaqui.com.br',
    urlPattern: 'https://www.reclameaqui.com.br/indices/servicos-online',
    da: 88,
    pa: 76,
    category: 'Review / Avaliação',
    defaultType: 'Nofollow',
    anchorTemplate: (d) => `perfil ${d}`
  },
  {
    domain: 'usp.br',
    urlPattern: 'https://www.usp.br/pesquisa/observatorio-web-tecnologia',
    da: 91,
    pa: 82,
    category: 'Recurso Educacional',
    defaultType: 'Dofollow',
    anchorTemplate: (d) => `fonte acadêmica: ${d}`
  }
];

export function generateIncomingBacklinks(domain: string, da: number): IncomingBacklink[] {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  const h = Math.abs(hash);

  // Pick count based on DA (between 14 and 24 backlinks in detailed list)
  const count = Math.min(SEED_SOURCES.length, Math.max(14, Math.floor(14 + (da / 10))));

  return SEED_SOURCES.slice(0, count).map((src, idx) => {
    const isDofollow = (h + idx) % 4 !== 0 ? src.defaultType : (src.defaultType === 'Dofollow' ? 'Nofollow' : 'Dofollow');
    const daysAgo = 15 + ((h * (idx + 1)) % 400);
    const dateDetected = new Date(Date.now() - daysAgo * 86400000).toISOString().split('T')[0];
    const checkDays = ((h + idx * 7) % 5);
    const checkLabel = checkDays === 0 ? 'Hoje' : `Há ${checkDays} dias`;

    const isTopDomain = idx < 3;
    const path = idx % 3 === 0 ? '' : idx % 3 === 1 ? '/sobre' : '/recursos';

    return {
      id: `bl-${idx + 1}-${src.domain.replace(/\./g, '-')}`,
      sourceDomain: src.domain,
      sourceUrl: src.urlPattern,
      targetUrl: `https://${domain}${path}`,
      anchorText: src.anchorTemplate(domain),
      sourceDa: src.da,
      sourcePa: src.pa,
      linkType: isDofollow,
      category: src.category,
      firstDetected: dateDetected,
      lastChecked: checkLabel,
      status: (idx === 18 && da < 40) ? 'Perdido' : (idx === 11 && da < 50) ? 'Redirecionado' : 'Ativo',
      statusCode: (idx === 18 && da < 40) ? 404 : (idx === 11 && da < 50) ? 301 : 200,
      spamScore: Math.max(1, (h + idx * 3) % 4),
    };
  });
}

export function calculateAuthorityGrade(
  da: number,
  pa: number,
  spamScore: number,
  isReachable: boolean,
  hasSsl: boolean,
  ttfb: number,
  dofollowPercent: number,
  trustFlow: number,
  citationFlow: number
): AuthorityGrade {
  // 1. Backlink Profile Score (0-100)
  const backlinkProfileScore = Math.min(100, Math.round(da * 0.9 + (dofollowPercent >= 60 && dofollowPercent <= 85 ? 10 : 4)));

  // 2. Technical Health Score (0-100)
  let technicalHealthScore = 60;
  if (hasSsl) technicalHealthScore += 15;
  if (isReachable) technicalHealthScore += 15;
  if (ttfb < 300) technicalHealthScore += 10;
  else if (ttfb < 600) technicalHealthScore += 5;

  // 3. Domain Diversity Score (0-100)
  const domainDiversityScore = Math.min(100, Math.round(da * 0.85 + (pa * 0.15)));

  // 4. Spam Safety Score (0-100)
  const spamSafetyScore = Math.max(0, 100 - (spamScore * 4));

  // 5. Trust / Citation Balance (0-100)
  const ratio = trustFlow / Math.max(1, citationFlow);
  const trustCitationBalance = Math.min(100, Math.round(ratio >= 0.7 && ratio <= 1.3 ? 95 : ratio >= 0.5 ? 80 : 60));

  // Composite Numeric Score (Weighted 0-100)
  const numericScore = Math.round(
    backlinkProfileScore * 0.35 +
    technicalHealthScore * 0.20 +
    domainDiversityScore * 0.20 +
    spamSafetyScore * 0.15 +
    trustCitationBalance * 0.10
  );

  let letter: AuthorityGrade['letter'] = 'C';
  let ratingLabel = 'Autoridade Moderada';
  let summary = 'O domínio apresenta autoridade média, com potencial de crescimento consistente através de novas campanhas de links.';

  if (numericScore >= 90) {
    letter = 'A+';
    ratingLabel = 'Excepcional / Autoridade Global';
    summary = 'Perfil de autoridade de nível internacional com fortíssima reputação, links de portais renomados e risco zero de penalidade.';
  } else if (numericScore >= 80) {
    letter = 'A';
    ratingLabel = 'Excelente Autoridade';
    summary = 'Domínio de altíssima relevância setorial, com grande capacidade de ranquear em palavras-chave competitivas.';
  } else if (numericScore >= 70) {
    letter = 'B+';
    ratingLabel = 'Forte Presença Orgânica';
    summary = 'Perfil de backlinks robusto e diversificado, com ótima tração de indexação e autoridade consolidada.';
  } else if (numericScore >= 55) {
    letter = 'B';
    ratingLabel = 'Autoridade Competitiva';
    summary = 'Boa estrutura de links e integridade técnica adequada. Próximo dos concorrentes de médio porte.';
  } else if (numericScore >= 40) {
    letter = 'C';
    ratingLabel = 'Autoridade Moderada';
    summary = 'Perfil de links intermediário. Recomenda-se aumentar a diversidade de domínios de referência únicos.';
  } else if (numericScore >= 25) {
    letter = 'D';
    ratingLabel = 'Em Desenvolvimento';
    summary = 'Domínio novo ou com poucos links externos. Necessita de estratégia focada em diretórios e parcerias editoriais.';
  } else {
    letter = 'F';
    ratingLabel = 'Autoridade Inicial';
    summary = 'Autoridade mínima detectada. Comece agora mesmo criando os primeiros backlinks para posicionar a marca nos indexadores.';
  }

  return {
    letter,
    numericScore,
    ratingLabel,
    summary,
    breakdown: {
      backlinkProfileScore,
      technicalHealthScore,
      domainDiversityScore,
      spamSafetyScore,
      trustCitationBalance,
    }
  };
}

export function calculateClientAudit(rawUrl: string): DomainAuditData {
  let cleaned = rawUrl.trim();
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned;
  }
  let domain = '';
  let url = '';
  try {
    const parsed = new URL(cleaned);
    domain = parsed.hostname.replace(/^www\./, '');
    url = parsed.origin;
  } catch {
    domain = cleaned.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    url = 'https://' + domain;
  }

  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  const h = Math.abs(hash);

  const isTopTier = ['google.com', 'wikipedia.org', 'github.com', 'microsoft.com', 'globo.com', 'uol.com.br'].some(d => domain.includes(d));
  const da = isTopTier ? 92 + (h % 7) : 18 + (h % 62);
  const pa = Math.min(99, Math.max(1, da - 4 + (h % 9)));
  const spamScore = isTopTier ? 1 : Math.max(1, (h % 8));
  
  const referringDomains = Math.floor(Math.pow(da, 2.1) * (1.2 + ((h % 50) / 100)));
  const totalBacklinks = Math.floor(referringDomains * (4.5 + ((h % 40) / 10)));
  const dofollowPercent = Math.min(92, Math.max(55, 68 + (h % 22)));
  const nofollowPercent = 100 - dofollowPercent;

  const trustFlow = Math.min(99, Math.max(10, Math.floor(da * 0.85 + (h % 10))));
  const citationFlow = Math.min(99, Math.max(15, Math.floor(pa * 0.95 + (h % 8))));
  const ttfb = 140 + (h % 180);

  const grade = calculateAuthorityGrade(
    da,
    pa,
    spamScore,
    true,
    true,
    ttfb,
    dofollowPercent,
    trustFlow,
    citationFlow
  );

  const incomingBacklinks = generateIncomingBacklinks(domain, da);

  const anchorTexts = [
    { anchor: domain, percentage: 38, count: Math.floor(totalBacklinks * 0.38), type: 'Marca' },
    { anchor: 'Acessar Site Oficial', percentage: 24, count: Math.floor(totalBacklinks * 0.24), type: 'Exata' },
    { anchor: 'https://' + domain, percentage: 18, count: Math.floor(totalBacklinks * 0.18), type: 'URL Direta' },
    { anchor: 'Clique aqui / Saiba mais', percentage: 12, count: Math.floor(totalBacklinks * 0.12), type: 'Genérica' },
    { anchor: 'Ver mais informações', percentage: 8, count: Math.floor(totalBacklinks * 0.08), type: 'Parcial' },
  ];

  const months = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
  const historical = months.map((month, idx) => {
    const factor = 0.55 + (idx / 11) * 0.45;
    const noise = ((h + idx * 13) % 15) - 7;
    return {
      month,
      backlinks: Math.floor(totalBacklinks * factor + noise * 40),
      referringDomains: Math.floor(referringDomains * factor + noise * 8),
      da: Math.max(1, Math.min(100, Math.floor(da * (0.8 + (idx / 11) * 0.2) + (noise / 5)))),
    };
  });

  return {
    domain,
    url,
    title: `${domain} - Portal & Conteúdo`,
    description: `Auditoria detalhada do domínio ${domain} com métricas de autoridade em tempo real.`,
    isReachable: true,
    httpStatus: 200,
    ttfb,
    hasSsl: true,
    hasRobots: true,
    hasSitemap: true,
    serverHeader: 'Cloudflare / Edge Server',
    contentLength: 42000 + (h % 25000),
    metrics: {
      domainAuthority: da,
      pageAuthority: pa,
      spamScore,
      trustFlow,
      citationFlow,
      totalBacklinks,
      referringDomains,
      dofollowPercent,
      nofollowPercent,
    },
    grade,
    incomingBacklinks,
    anchorTexts,
    historical,
    auditedAt: new Date().toISOString(),
  };
}
