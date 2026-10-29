import { BacklinkProvider } from '../types';

export const BACKLINK_PROVIDERS: BacklinkProvider[] = [
  // High Authority WHOIS & DNS Registries
  {
    id: 'whois-domaintools',
    name: 'Whois DomainTools',
    da: 92,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://whois.domaintools.com/{domain}',
    description: 'Registro WHOIS e histórico de IP indexado por buscadores.'
  },
  {
    id: 'similarweb',
    name: 'SimilarWeb Analytics',
    da: 94,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://www.similarweb.com/website/{domain}/',
    description: 'Perfil público de audiência, rank global e tráfego orgânico.'
  },
  {
    id: 'archive-org',
    name: 'Wayback Machine (Archive.org)',
    da: 96,
    type: 'Dofollow',
    category: 'Indexador de Busca',
    urlTemplate: 'https://web.archive.org/web/*/{domain}',
    description: 'Registro histórico de páginas preservadas com rastreamento permanente.'
  },
  {
    id: 'siteindices',
    name: 'SiteIndices Explorer',
    da: 81,
    type: 'Dofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://siteindices.com/site/{domain}',
    description: 'Diretório internacional com análise de SEO e índice de tráfego.'
  },
  {
    id: 'cutestat',
    name: 'CuteStat Directory',
    da: 78,
    type: 'Dofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://{domain}.cutestat.com',
    description: 'Página de estatísticas de site com link dofollow direto permanente.'
  },
  {
    id: 'builtwith',
    name: 'BuiltWith Technology Profile',
    da: 91,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://builtwith.com/{domain}',
    description: 'Auditoria de stack tecnológica, servidores e scripts detectados.'
  },
  {
    id: 'urlvoid',
    name: 'URLVoid Reputation Audit',
    da: 84,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://www.urlvoid.com/scan/{domain}/',
    description: 'Varredura de segurança de domínio e análise de reputação IP.'
  },
  {
    id: 'siteworthtraffic',
    name: 'SiteWorthTraffic Value',
    da: 79,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://siteworthtraffic.com/report/{domain}',
    description: 'Cálculo de valor estimado do site e métricas de visitantes diários.'
  },
  {
    id: 'hypestat',
    name: 'HypeStat Metrics',
    da: 82,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://hypestat.com/info/{domain}',
    description: 'Relatório completo de servidores DNS, segurança e pageviews.'
  },
  {
    id: 'dnschecker',
    name: 'DNSChecker Records',
    da: 87,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://dnschecker.org/all-dns-records-of-domain.php?query={domain}',
    description: 'Mapeamento global de apontamentos DNS e servidores de nomes.'
  },
  {
    id: 'google-safebrowsing',
    name: 'Google Safe Browsing Transparency',
    da: 98,
    type: 'Dofollow',
    category: 'Indexador de Busca',
    urlTemplate: 'https://transparencyreport.google.com/safe-browsing/search?url={domain}',
    description: 'Validação de confiança e integridade pelo Google Safe Search.'
  },
  {
    id: 'pagespeed-insights',
    name: 'Google PageSpeed Insights',
    da: 99,
    type: 'Nofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://pagespeed.web.dev/analysis?url=https%3A%2F%2F{domain}',
    description: 'Auditoria oficial do Google Core Web Vitals e renderização.'
  },
  {
    id: 'securityheaders',
    name: 'Security Headers Audit',
    da: 76,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://securityheaders.com/?q={domain}',
    description: 'Auditoria de cabeçalhos de segurança HTTP (CSP, HSTS, X-Frame).'
  },
  {
    id: 'siterankdata',
    name: 'Site Rank Data',
    da: 73,
    type: 'Dofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://siterankdata.com/{domain}',
    description: 'Perfil de rank de busca e backlinks identificados pelo rastreador.'
  },
  {
    id: 'w3c-validator',
    name: 'W3C Markup Validation',
    da: 97,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://validator.w3.org/nu/?doc=https%3A%2F%2F{domain}',
    description: 'Página de validação de conformidade de código HTML pelo consórcio W3C.'
  },
  {
    id: 'semrush-overview',
    name: 'Semrush Public Overview',
    da: 93,
    type: 'Nofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://www.semrush.com/analytics/overview/?q={domain}',
    description: 'Visão geral pública de palavras-chave ranqueadas e autoridade.'
  },
  {
    id: 'hostsearch',
    name: 'HostSearch Registry',
    da: 70,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://www.hostsearch.com/tools/whois.asp?domain={domain}',
    description: 'Diretório de provedores de hospedagem e servidores de internet.'
  },
  {
    id: 'ssllabs',
    name: 'Qualys SSL Labs',
    da: 91,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://www.ssllabs.com/ssltest/analyze.html?d={domain}',
    description: 'Certificação de criptografia SSL/TLS e nota técnica de segurança.'
  },
  {
    id: 'robtex',
    name: 'Robtex IP Explorer',
    da: 80,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://www.robtex.com/dns-lookup/{domain}',
    description: 'Grafo de conexões de rede, roteamento BGP e nós DNS.'
  },
  {
    id: 'aboutus',
    name: 'AboutUs Web Community',
    da: 83,
    type: 'Dofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://aboutus.com/{domain}',
    description: 'Enciclopédia comunitária de websites e perfis corporativos da web.'
  },
  {
    id: 'bing-ping',
    name: 'Bing Index Pinger',
    da: 96,
    type: 'Ping Indexador',
    category: 'Indexador de Busca',
    urlTemplate: 'https://www.bing.com/ping?sitemap=https%3A%2F%2F{domain}%2Fsitemap.xml',
    description: 'Notificação instantânea aos robôs de indexação do mecanismo Bing.'
  },
  {
    id: 'google-ping',
    name: 'Google Index Pinger',
    da: 99,
    type: 'Ping Indexador',
    category: 'Indexador de Busca',
    urlTemplate: 'https://www.google.com/ping?sitemap=https%3A%2F%2F{domain}%2Fsitemap.xml',
    description: 'Sinalização direta ao Googlebot para rastreamento prioritário do sitemap.'
  },
  {
    id: 'whoishostingthis',
    name: 'WhoIsHostingThis Directory',
    da: 86,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://www.whoishostingthis.com/?q={domain}',
    description: 'Detecção pública de infraestrutura de nuvem e servidores de hosting.'
  },
  {
    id: 'sitechecker',
    name: 'Sitechecker Pro Insights',
    da: 77,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://sitechecker.pro/seo-report/{domain}',
    description: 'Diagnóstico rápido de fatores On-Page e status de indexabilidade.'
  },
  {
    id: 'statshow',
    name: 'StatShow Website Stats',
    da: 71,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://www.statshow.com/www/{domain}',
    description: 'Relatório de idade de domínio, visualizações e estimativa financeira.'
  },
  {
    id: 'iplocation',
    name: 'IPLocation Lookup',
    da: 78,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://www.iplocation.net/domain-to-ip?domain={domain}',
    description: 'Geolocalização de servidores e mapeamento de datacenter do domínio.'
  },
  {
    id: 'feedburner-ping',
    name: 'FeedBurner Ping Engine',
    da: 92,
    type: 'Ping Indexador',
    category: 'Indexador de Busca',
    urlTemplate: 'https://feedburner.google.com/fb/a/pingEngine?source=https%3A%2F%2F{domain}',
    description: 'Pinger de canais RSS e conteúdos publicados para feeds agregadores.'
  },
  {
    id: 'gtmetrix',
    name: 'GTmetrix Performance Report',
    da: 89,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://gtmetrix.com/reports/{domain}',
    description: 'Auditoria de velocidade com notas PageSpeed e tempos de carregamento.'
  },
  {
    id: 'domainwhitepages',
    name: 'DomainWhitePages Directory',
    da: 69,
    type: 'Diretório',
    category: 'Diretório Global',
    urlTemplate: 'https://domainwhitepages.com/domain/{domain}',
    description: 'Lista de domínios públicos e registros de titularidade corporativa.'
  },
  {
    id: 'whoisology',
    name: 'Whoisology Deep History',
    da: 74,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://whoisology.com/{domain}',
    description: 'Conexões entre proprietários de sites e registros históricos de nomes.'
  },
  {
    id: 'myipms',
    name: 'MyIP.ms IP Database',
    da: 85,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://myip.ms/info/whois6/{domain}',
    description: 'Banco de dados mundial de servidores web com links para domínios ativos.'
  },
  {
    id: 'sitestats',
    name: 'SiteStats Analytics',
    da: 68,
    type: 'Diretório',
    category: 'Diretório Global',
    urlTemplate: 'https://sitestats.org/{domain}',
    description: 'Índice de websites com cálculo de popularidade e relevância.'
  },
  {
    id: 'shodan-host',
    name: 'Shodan Open Internet Index',
    da: 88,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://www.shodan.io/search?query=hostname:{domain}',
    description: 'Monitoramento de serviços expostos e certificados de servidores.'
  },
  {
    id: 'yandex-ping',
    name: 'Yandex Webmaster Ping',
    da: 94,
    type: 'Ping Indexador',
    category: 'Indexador de Busca',
    urlTemplate: 'https://yandex.com/search/?text=site%3A{domain}',
    description: 'Pesquisa e chamada de rastreador do mecanismo Yandex para novos links.'
  },
  {
    id: 'openpagerank',
    name: 'OpenPageRank Registry',
    da: 75,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://openpagerank.com/search?q={domain}',
    description: 'Algoritmo de PageRank aberto e métricas de autoridade de links.'
  },
  {
    id: 'domainbigdata',
    name: 'DomainBigData Dossier',
    da: 82,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://domainbigdata.com/{domain}',
    description: 'Dossiê cadastral de domínios com links para registros e emails vinculados.'
  },
  {
    id: 'websiteiq',
    name: 'WebsiteIQ Profile',
    da: 72,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://websiteiq.com/domain/{domain}',
    description: 'Painel de inteligência competitiva e ranking setorial de domínios.'
  },
  {
    id: 'trustpilot-search',
    name: 'Trustpilot Company Profile',
    da: 95,
    type: 'Nofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://www.trustpilot.com/review/{domain}',
    description: 'Página de reputação corporativa e avaliações de consumidores online.'
  },
  {
    id: 'spyonweb',
    name: 'SpyOnWeb Network Research',
    da: 76,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://spyonweb.com/{domain}',
    description: 'Agrupamento de sites pelo mesmo Google Analytics e AdSense ID.'
  },
  {
    id: 'majestic-public',
    name: 'Majestic SEO Public Summary',
    da: 90,
    type: 'Nofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://majestic.com/reports/site-explorer?folder=&q={domain}&IndexDataSource=F',
    description: 'Métricas mundiais de Trust Flow (TF) e Citation Flow (CF).'
  },
  {
    id: 'pingomatic',
    name: 'Ping-o-Matic Multi-Index',
    da: 89,
    type: 'Ping Indexador',
    category: 'Indexador de Busca',
    urlTemplate: 'https://pingomatic.com/ping/?title={domain}&blogurl=https%3A%2F%2F{domain}',
    description: 'Disparador centralizado para mais de 15 agregadores de blogs e portais.'
  },
  {
    id: 'serpstat-public',
    name: 'Serpstat Search Database',
    da: 85,
    type: 'Dofollow',
    category: 'Métricas Web',
    urlTemplate: 'https://serpstat.com/domains/overview/?query={domain}',
    description: 'Visibilidade orgânica e concorrentes de busca mapeados.'
  },
  {
    id: 'alexa-archive',
    name: 'Sitestat Archive',
    da: 72,
    type: 'Dofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://sitestat.net/analyze/{domain}',
    description: 'Rank de popularidade e contagem de páginas indexadas.'
  },
  {
    id: 'sitejabber-search',
    name: 'Sitejabber Merchant Registry',
    da: 87,
    type: 'Nofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://www.sitejabber.com/reviews/{domain}',
    description: 'Diretório público de integridade comercial e links de comerciantes.'
  },
  {
    id: 'archive-is',
    name: 'Archive.today Snapshot',
    da: 91,
    type: 'Dofollow',
    category: 'Indexador de Busca',
    urlTemplate: 'https://archive.is/{domain}',
    description: 'Instantâneo permanente da página web com espelhamento mundial.'
  },
  {
    id: 'whois-sc',
    name: 'Whois.sc Registry',
    da: 79,
    type: 'Dofollow',
    category: 'WHOIS & DNS',
    urlTemplate: 'https://www.whois.sc/{domain}',
    description: 'Consulta rápida de servidores de nomes e data de expiração.'
  },
  {
    id: 'similarweb-sub',
    name: 'WebStat Domain Directory',
    da: 74,
    type: 'Dofollow',
    category: 'Diretório Global',
    urlTemplate: 'https://webstatsdomain.org/domains/{domain}',
    description: 'Diretório com métricas de valor e segurança do site.'
  },
  {
    id: 'ssl-shopper',
    name: 'SSL Shopper Checker',
    da: 83,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://www.sslshopper.com/ssl-checker.html#hostname={domain}',
    description: 'Verificação da cadeia de certificados intermediários SSL.'
  },
  {
    id: 'cyren-lookup',
    name: 'Cyren IP / URL Reputation',
    da: 81,
    type: 'Dofollow',
    category: 'Auditoria Técnica',
    urlTemplate: 'https://www.cyren.com/security-center/url-category-check?url={domain}',
    description: 'Classificação de categorias de conteúdo e filtro de segurança.'
  },
  {
    id: 'domainhacks',
    name: 'DomainHacks Public Index',
    da: 67,
    type: 'Diretório',
    category: 'Diretório Global',
    urlTemplate: 'https://domainhacks.info/{domain}',
    description: 'Mapeamento de prefixos e termos do domínio na web.'
  }
];
