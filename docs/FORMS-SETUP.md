# Connect Hinova forms to Supabase

The website is a static Next.js export. No Supabase project, database table or Edge Function is provisioned in this package. All agency and original portfolio forms share `public/forms/submit.mjs` and fetch `public/form-config.json` at submission time.

## 1. Implement your receiving Edge Function

Use a public inquiry endpoint that validates and stores a submission before returning success. It must accept browser requests without a signed-in visitor. Configure authentication accordingly; a publishable key identifies the application, not the visitor. Do not treat that key as spam protection.

Support `OPTIONS` preflight and `POST`, with CORS allowing your deployed origin and the `content-type` and `apikey` headers. Use the same CORS headers on error responses. Add the preview origin if you test there.

Request JSON:

```json
{
  "type": "contact",
  "source": "/contact/",
  "data": {
    "name": "Visitor name",
    "email": "visitor@example.com",
    "subject": "General inquiry",
    "message": "Project details"
  }
}
```

Types and data:

| Type | Data |
| --- | --- |
| `contact` | name, email, subject, message |
| `project` | Answers keyed by field names in `content/inquiry-content.ts`; top-level `audience` is coaches or educators |
| `strategy-call` | full_name, email, role_organisation, project, availability, services; top-level audience |
| `portfolio-contact` | name, email, message |
| `portfolio-project` | service, about, project, style, logistics, files |

Portfolio project files are grouped as `inspiration`, `branding`, and `logo`, each an array of `{name, original_name, type, size, data}`; `data` is base64. The client limits selection to five files, 2 MiB each, 3 MiB total. The encoded request may be roughly 4 MiB. Revalidate file type, count, actual decoded size and content on the server. Store attachments privately; do not return public file URLs. Reject the full request if files cannot be saved.

Return an HTTP 2xx JSON response **only after persistence**:

```json
{ "ok": true, "id": "optional-submission-id" }
```

Use non-2xx for validation, storage or other failures; HTTP 429 for rate limiting. A timeout is not proof of failure, so the UI advises contacting Hinova before retrying. The client never automatically retries a POST.

Use server-side validation, request size limits and rate limiting. Keep lead records and uploaded files private: enable RLS, deny anonymous SELECT access, and scope staff access. Any secret/service-role credentials belong only in the Edge Function environment, never this repository or frontend configuration. Keep internal error details in server logs rather than responses.

## 2. Configure the website

Edit `public/form-config.json`:

```json
{
  "endpoint": "https://YOUR-PROJECT.supabase.co/functions/v1/submit-inquiry",
  "publishableKey": "YOUR-PUBLISHABLE-KEY"
}
```

Only use a publishable key here. It is sent as the `apikey` header, not as a bearer token. Leave it empty if the receiving endpoint does not require one. The endpoint must use HTTPS. Build and redeploy after changing this file.

## 3. Verify your live connection

Test each form with your own test details, check that the correct record and private attachments are saved, and check error handling and rate limits. No real endpoint was called during the supplied automated checks. Run `node --test scripts/forms.test.mjs` to check the shared client with mocked responses.

Until configured, submission returns a clear message directing visitors to contact@hinovadesign.com. Entered values remain in the current page; they are not saved in browser storage.

Official references:
- https://supabase.com/docs/guides/functions/cors
- https://supabase.com/docs/guides/getting-started/api-keys
