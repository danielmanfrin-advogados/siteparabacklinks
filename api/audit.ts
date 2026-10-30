import { fetchLiveSeoData } from '../src/utils/realSeoAudit';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { url: rawUrl } = req.body || {};
  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  try {
    const auditData = await fetchLiveSeoData(rawUrl);
    return res.status(200).json(auditData);
  } catch (err: any) {
    return res.status(500).json({ error: 'Erro ao auditar domínio: ' + (err.message || 'Falha na conexão') });
  }
}
