import { fetchLiveCompetitorBacklinks, cleanDomain } from '../src/utils/realSeoAudit';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { competitorUrl, myUrl } = req.body || {};
  if (!competitorUrl) {
    return res.status(400).json({ error: 'competitorUrl é obrigatório' });
  }

  const { domain: compDomain } = cleanDomain(competitorUrl);
  const { domain: myDomain } = cleanDomain(myUrl || 'meusite.com.br');

  try {
    const backlinks = await fetchLiveCompetitorBacklinks(compDomain, myDomain);

    return res.status(200).json({
      competitorDomain: compDomain,
      myDomain,
      totalFound: backlinks.length,
      backlinks,
      analyzedAt: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Erro ao buscar backlinks do concorrente: ' + (err.message || 'Falha') });
  }
}
