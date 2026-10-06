# Hinova Design — Next.js website

This is one Next.js project for the Hinova brand. Hina Fayyaz’s original portfolio is preserved as a separate static page under `public/hinafayyaz/`, so it keeps its own design while being served at the same domain. Upload the **contents of this folder** to the root of your GitHub repository. The package.json, app/, components/, content/, and public/ folders should be at the repository root.

## Pages

| URL | Page |
| --- | --- |
| / | Audience choice: Coaches or Educators |
| /coaches/ | Hinova services for coaches |
| /educators/ | Hinova services for educators |
| /coaches/start-project/ and /educators/start-project/ | Project inquiries |
| /hinafayyaz/ | Hina Fayyaz’s personal portfolio |
| /hinafayyaz/project-inquiry.html | Original portfolio's six-step project inquiry |
| /insights/ and /insights/[article-slug]/ | Blog and article library |
| /contact/ | Contact form and business contact channels |
| /privacy-policy/, /refund-and-cancellation/, /terms-of-service/ | Website information and project terms |

The founder section on both audience pages links to /hinafayyaz/. The hero button and strategy call buttons use https://calendly.com/hinovadesign/45-minute-meeting.

## Where to edit things

| What you want to change | File or folder |
| --- | --- |
| Entry page | app/page.tsx |
| Coach and educator page layout | components/AudiencePage.tsx |
| Coach and educator copy | content/site-content.json |
| Team names, roles and photo paths | content/team.ts |
| Team and founder layout | components/TeamSection.tsx and components/FounderSection.tsx |
| Team and founder styling | app/styles/team-founder.css |
| Agency photography and source mapping | public/images/agency/ and docs/IMAGE-SOURCES.md |
| Founder photo | public/images/founder/hina-fayyaz.png |
| Original personal portfolio page | public/hinafayyaz/index.html |
| Portfolio components, styles and scripts | public/hinafayyaz/src/ |
| Original portfolio images and logos | public/hinafayyaz/assets/ |
| Portfolio project wizard | public/hinafayyaz/project-inquiry.html and public/hinafayyaz/src/consultation.js |
| Insights page and article layout | app/insights/page.tsx and app/insights/[slug]/page.tsx |
| Form endpoint settings and setup | public/form-config.json and docs/FORMS-SETUP.md |
| Shared submission client | public/forms/submit.mjs |
| Blog sample articles and photos | content/blog-content.ts and public/images/agency/ |
| Brand colors, type and shared elements | app/globals.css, public/brand/ and app/fonts/ |
| Calendly link and contact email | content/index.ts |
| Project inquiry questions and form behavior | content/inquiry-content.ts and components/InquiryForm.tsx |
| Contact page and form | app/contact/page.tsx and components/ContactForm.tsx |
| Policy wording | content/policies.ts |
| Shared inner page design | components/InnerPageShell.tsx, components/PolicyPage.tsx and app/styles/inner-pages.css |

### Team photos

The three named members currently have photo placeholders. The Instructional Designer and Course Designer cards have name and photo placeholders. To replace a photo, place the file in public/images/team/ and set that member’s photo path in content/team.ts. For example, use /images/team/iqra-fayyaz.jpg.

### Content and contact behavior

The blog articles are sample copy for review and should be replaced with approved Hinova posts before public launch. The personal portfolio retains the supplied `hinovadesign-main.zip` page design and assets. Its HTML is separate from the Next.js app routes, so changes to the agency design do not restyle it.

All contact and project forms now use the shared JSON submission client in `public/forms/submit.mjs`. They no longer open an email draft. Configure your future Supabase Edge Function in `public/form-config.json`; instructions and the request/response contract are in `docs/FORMS-SETUP.md`. Until configured, forms show a clear unavailable message and retain entered details. A success screen appears only after an accepted server response. Portfolio layouts and styles remain original.

The contact page currently says that the business address is available on request and invites phone inquiries by email because no public mailing address or phone number was supplied. Replace those lines with approved business contact details before publication if you wish to display them. The three policy pages are general draft wording for this site's current behavior and custom project model. Confirm them against your actual business practices and client agreements before deploying them on hinovadesign.com.

## Run and deploy

Use Node.js 22 or newer. From the repository root:

    npm ci
    npm run dev

Open http://localhost:3000. To test the production export locally:

    npm run build
    npm run preview

Open http://localhost:4173. The build produces a static site in out/ and includes /hinafayyaz/. If your existing Vercel project is connected to GitHub, use the repository root as the Root Directory, **Next.js** as the framework, and npm run build as the build command. Remove any old custom Output Directory setting. Set NEXT_PUBLIC_SITE_URL=https://hinovadesign.com for canonical links, or rely on that default in content/index.ts.

The package excludes generated files, dependencies and the preview Site’s hosting configuration. Uploading to GitHub alone does not publish the site; redeploy the connected Vercel project after upload.
