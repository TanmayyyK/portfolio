# Tanmay Kumar — Engineering Portfolio

Public engineering portfolio for five verified GitHub projects. The employer name is intentionally hidden until `content/site.json` sets `REVEAL_EMPLOYER` to true. The Agentic Commerce project is independent, using public APIs.

Run `npm run build`, `npm run lint`, `npm test`, and `npm run preview`. The site is a lightweight static HTML/CSS/JavaScript implementation. No private repository or non-GitHub source is used.

The GitHub profile README is generated from the same `content/profile.json` and `content/site.json`, with a scheduled synchronization action. The profile-repository sync requires a scoped `PROFILE_SYNC_TOKEN` secret and will skip until configured. `SITE_URL` and `RESUME_URL` are intentionally blank until approved; missing links are omitted.

Lighthouse results and browser QA screenshots must be measured in CI. No scores are claimed in advance. Project diagrams are explicitly labeled as illustrations based on repository architecture.
