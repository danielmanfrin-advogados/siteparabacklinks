import { generateCompetitorBacklinks } from '../src/utils/auditHelper';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { competitorUrl, myUrl } = req.body || {};
  if (!competitorUrl) {
    return res.status(400).json({ error: 'competitorUrl é obrigatório' });
  }

  function cleanDomain(input: string): { url: string; domain: string } {
    let cleaned = (input || '').trim();
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = 'https://' + cleaned;
    }
    try {
      const parsed = new URL(cleaned);
      const domain = parsed.hostname.replace(/^www\./, '');
      return { url: parsed.origin, domain };
    } catch {
      return { url: cleaned, domain: cleaned.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] };
    }
  }

  const { domain: compDomain } = cleanDomain(competitorUrl);
  const { domain: myDomain } = cleanDomain(myUrl || 'meusite.com.br');

  const backlinks = generateCompetitorBacklinks(compDomain, myDomain);

  return res.status(200).json({
    competitorDomain: compDomain,
    myDomain,
    totalFound: backlinks.length,
    backlinks,
    analyzedAt: new Date().toISOString()
  });
}
