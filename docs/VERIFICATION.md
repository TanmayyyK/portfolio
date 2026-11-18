# Publication and verification checklist

- [ ] GitHub Actions quality, unit and contrast tests pass
- [ ] Actual Lighthouse JSON and HTML reports uploaded by CI; record measured scores only
- [ ] Chromium viewport screenshots at 360/768/1024/1440 inspected
- [ ] Keyboard navigation, color theme, command palette and reduced-motion checked
- [ ] Check accent foreground on dark/light canvas, panels and elevated surfaces
- [ ] Test Chrome, Safari and Firefox when available
- [ ] Review source repository security before publicly promoting linked project
- [ ] Add verified screenshots (see SCREENSHOTS.md)
- [ ] Set SITE_URL after deployed URL is confirmed; leave RESUME_URL empty until provided
- [ ] Keep REVEAL_EMPLOYER=false until approved employer-announcement disclosure
- [ ] Configure scoped PROFILE_SYNC_TOKEN for daily profile README generation
- [ ] Verify all external links and final bundle payload
- [ ] Confirm GitHub Pages source: GitHub Actions

Local, browser, and Lighthouse scores must never be reported without real execution results.
