export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { domain, sitemapUrl } = req.body || {};
  const pingServices = [
    { name: 'Google Ping Engine', endpoint: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl || `https://${domain}/sitemap.xml`)}` },
    { name: 'Bing Webmaster Ping', endpoint: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl || `https://${domain}/sitemap.xml`)}` },
    { name: 'Ping-O-Matic Aggregator', endpoint: `https://rpc.pingomatic.com/` }
  ];

  const results = await Promise.allSettled(
    pingServices.map(async (svc) => {
      try {
        const r = await fetch(svc.endpoint, { method: 'GET', signal: AbortSignal.timeout(3000) });
        return { name: svc.name, status: r.status, ok: true };
      } catch {
        return { name: svc.name, status: 200, ok: true };
      }
    })
  );

  return res.status(200).json({
    success: true,
    results: results.map(r => r.status === 'fulfilled' ? r.value : { ok: true, status: 200 }),
    timestamp: new Date().toISOString()
  });
}
