# Design notes

## Selected Agon sections

| Hinova section          | Supplied Agon source                                                  | Adaptation                                                                                                                                                                                                                                  |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Coach and educator hero | `Home2/Section1.vue`                                                  | Split copy-and-photo layout, rounded asymmetric image treatment, floating information card, and clear CTA pair. Colours, fonts, copy, and supporting information use Hinova's brand and content. Template marketing statistics are omitted. |
| Service exploration     | `Home1/Section3.vue`                                                  | Pill-shaped service tabs and a large split content panel. All four Hinova services retain their existing descriptions, deliverables, and outcomes. Tabs support arrow keys, Home, and End.                                                  |
| Ways to begin           | `Home4/Section2.vue` with `Home2/Section4.vue`                        | Three scoped starting options use the numbered service layout and rounded colour panels.                                                                                                                                                    |
| Process                 | `Home7/Section3.vue`                                                  | Supporting photograph paired with a four-step, two-column numbered process.                                                                                                                                                                 |
| FAQs                    | `Home3/Section5.vue`                                                  | Introductory column beside expandable questions. Native details/summary controls preserve keyboard operation.                                                                                                                               |
| Team                    | Supplied Agon team images                                             | Heading plus four images only, as requested.                                                                                                                                                                                                |
| Strategy call           | `Home3/Section7.vue` / `Home6/Section7.vue` contact-panel composition | Split branded call summary and discussion points, retaining the free 45-minute call and inquiry links from the current site.                                                                                                                |

The entry page preserves the current site's two separate audience journeys. No template sales claims, client logos, fabricated testimonials, invented team biographies, newsletter signup, pricing plans, shop, or unrelated service categories have been carried over.

## Content source

The copy was retrieved from the following existing pages on 25 September 2026 UTC (26 September in Pakistan):

- https://hinova-learning-design.ponitale.chatgpt.site/
- https://hinova-learning-design.ponitale.chatgpt.site/coaches/
- https://hinova-learning-design.ponitale.chatgpt.site/educators/
- The site's existing `inquiry.js` question configuration and email-draft behavior.

The main page copy is retained in `content/site-content.json`. The previous descriptive team text is intentionally replaced with a heading and photos. Some content is repositioned within the redesigned sections to suit the template layout; no additional services have been invented.

## Project structure

Next.js App Router, React, TypeScript, CSS, local fonts, and compressed local image assets. Pages are statically exported; no runtime backend is required. Only navigation, service tabs, and inquiry forms use client-side React. The source ZIP excludes `node_modules`, `.next`, `out`, credentials, temporary files, and the complete purchased template archive.
