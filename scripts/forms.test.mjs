import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { submitInquiry } from '../public/forms/submit.mjs';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const config = { endpoint: 'https://example.supabase.co/functions/v1/submit-inquiry', publishableKey: 'sb_publishable_test' };
const payload = { type: 'contact', data: { name: 'Test', email: 'test@example.com', message: 'Test message only' } };
test('unconfigured service never posts data or reports success', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json({ endpoint: '' }); };
  await assert.rejects(submitInquiry(payload), /not available yet/);
  assert.equal(calls, 1);
});
test('accepted submission sends expected JSON and publishable key', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1 ? Response.json(config) : Response.json({ ok: true, id: 'test-id' });
  };
  assert.equal((await submitInquiry(payload)).id, 'test-id');
  assert.equal(calls[1].url, config.endpoint);
  assert.equal(calls[1].options.method, 'POST');
  assert.equal(calls[1].options.headers.apikey, config.publishableKey);
  assert.deepEqual(JSON.parse(calls[1].options.body).data, payload.data);
  assert.equal(calls[1].options.headers.Authorization, undefined);
});
test('HTTP errors and missing server confirmation cannot produce success', async () => {
  for (const response of [Response.json({ ok: true }, { status: 500 }), Response.json({}), new Response('<html>error</html>')]) {
    let calls = 0;
    globalThis.fetch = async () => ++calls === 1 ? Response.json(config) : response;
    await assert.rejects(submitInquiry(payload), /could not be confirmed/);
  }
});
test('rate limiting and network failure have useful retry guidance', async () => {
  let calls = 0;
  globalThis.fetch = async () => ++calls === 1 ? Response.json(config) : Response.json({}, { status: 429 });
  await assert.rejects(submitInquiry(payload), /Too many attempts/);
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch'); };
  await assert.rejects(submitInquiry(payload), /Unable to connect/);
});
test('timeout explains that receipt cannot be confirmed', async () => {
  globalThis.fetch = async () => { throw new DOMException('Aborted', 'AbortError'); };
  await assert.rejects(submitInquiry(payload), /could not confirm receipt/);
});
test('insecure endpoints are rejected before sending details', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json({ endpoint: 'http://example.com' }); };
  await assert.rejects(submitInquiry(payload), /unavailable/);
  assert.equal(calls, 1);
});
