const { randomUUID } = require('node:crypto');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!body || !['lead', 'consultation'].includes(body.type)) {
      return res.status(400).json({ ok: false, error: 'Invalid submission type' });
    }

    const data = body.data || {};

    if (data.website && body.type === 'lead') {
      return res.status(200).json({ ok: true });
    }

    const name = body.type === 'lead'
      ? data.name
      : [data.first_name, data.last_name].filter(Boolean).join(' ');

    if (!name || !data.email) {
      return res.status(400).json({ ok: false, error: 'Name and email are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      return res.status(400).json({ ok: false, error: 'Enter a valid email address' });
    }

    if (JSON.stringify(body).length > 100000) {
      return res.status(413).json({ ok: false, error: 'Submission is too large' });
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    const webhookSecret = process.env.FORM_WEBHOOK_SECRET;

    if (!appsScriptUrl || !webhookSecret) {
      throw new Error('Submission service is not configured');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    let upstream;
    try {
      upstream = await fetch(appsScriptUrl, {
        method: 'POST',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          type: body.type,
          data,
          submissionId: body.type === 'consultation' && data.id
            ? data.id
            : randomUUID(),
          submittedAt: new Date().toISOString(),
          secret: webhookSecret
        })
      });
    } finally {
      clearTimeout(timeout);
    }

    const upstreamText = await upstream.text();
    let result;

    try {
      result = JSON.parse(upstreamText);
    } catch {
      throw new Error('Google workflow returned an invalid response');
    }

    if (!upstream.ok || !result.ok) {
      throw new Error(result.error || 'Google workflow rejected the submission');
    }

    return res.status(200).json({
      ok: true,
      submissionId: result.submissionId,
      savedToSheet: result.savedToSheet !== false,
      notionSynced: result.notionSynced !== false
    });
  } catch (error) {
    console.error('Form workflow error:', error);
    return res.status(500).json({
      ok: false,
      error: 'Unable to submit the form right now. Please try again.'
    });
  }
};
