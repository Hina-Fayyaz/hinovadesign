/** Shared by the Next.js forms and the original, independently styled portfolio. */
export async function submitInquiry(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const configResponse = await fetch('/form-config.json', { cache: 'no-store', signal: controller.signal });
    if (!configResponse.ok) throw new Error('Online submissions are unavailable. Please email contact@hinovadesign.com.');
    const config = await configResponse.json();
    if (!config.endpoint) throw new Error('Online submissions are not available yet. Please email contact@hinovadesign.com. Your details have not been sent.');
    const endpoint = new URL(config.endpoint);
    if (endpoint.protocol !== 'https:') throw new Error('Online submissions are unavailable. Please email contact@hinovadesign.com.');
    const headers = { 'Content-Type': 'application/json' };
    if (config.publishableKey) headers.apikey = config.publishableKey;
    const response = await fetch(endpoint.href, {
      method: 'POST', headers, signal: controller.signal,
      body: JSON.stringify({ ...payload, source: typeof location !== 'undefined' ? location.pathname : '/' })
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) {
      throw new Error(response.status === 429
        ? 'Too many attempts. Please wait a moment before trying again.'
        : 'Your submission could not be confirmed. Please try again or email contact@hinovadesign.com.');
    }
    return result;
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('The request timed out. We could not confirm receipt. Please email contact@hinovadesign.com before submitting again.');
    if (error instanceof TypeError) throw new Error('Unable to connect. Please check your connection or email contact@hinovadesign.com.');
    throw error;
  } finally { clearTimeout(timeout); }
}
