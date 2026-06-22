# FahimOS 2.0

FahimOS 2.0 is the full upgraded personal operating system built from the complete version-one Life Command Center. It saves locally in the browser and includes the full planner, school, money, faith, health, study, files, settings, and assistant automation system.

## Included Features

- Home dashboard that reflects data from every hub
- Command Menu navigation
- Half-hour daily schedule
- Tasks, to-do lists, reminders, alarms, and countdowns
- Advanced weekly/daily/monthly/one-time class scheduling
- Assignments, important school dates, study blocks, school notes, project notes
- Complete Java learning path with code, practice, projects, and video search links
- Full-stack developer resources: Bro Code, freeCodeCamp, Coursera, LinkedIn Learning, MDN, roadmap.sh
- Money hub with monthly bills, due dates, paid status, totals, money tracker, and Credit Karma link
- Faith hub with five-prayer tracker, real prayer-time lookup, Quran reading/reflection, all 114 surah selector, and Quran.com links
- Health hub with sleep tracker, workout coach, workout timer logs, discipline streak, and fat-loss guidance
- Motivation page with mindset principles, Islamic reminders, famous quotes, Power Laws, books, movies, songs, and podcasts
- Life hub with planning tools, journal entry, saved URLs, files/history, Google Calendar, and Google Maps
- Local file vault with PDF/image/text preview, download, and delete controls
- Editable Power Life roadmap inside Settings
- Settings for themes, colors, profile, menu pages, front-page cards, GitHub Upload, and GPT Assistant API
- Save current page as PDF and store the copy in History
- Export/import JSON backups
- API-ready GPT Assistant endpoint at `api/assistant.js`

## Version-One Data

The app intentionally keeps the original local storage keys so saved version-one browser data can carry forward when the browser allows it. Use Export JSON and Import JSON for the safest migration between devices or URLs.

## Run Locally

Open `index.html` in your browser.

## GitHub Pages

GitHub Pages can host the static website, but it cannot run `api/assistant.js`.

For GitHub Pages:

1. Upload the contents of this folder to your repository.
2. Enable Pages from repository Settings.
3. Use the website normally with local browser saving.

## GPT Assistant Automation

To use the real OpenAI-powered assistant, deploy the full folder to Vercel, Netlify, Cloudflare, or another backend host that can run `api/assistant.js`.

Vercel setup:

1. Deploy this folder.
2. Add environment variable `OPENAI_API_KEY`.
3. Optional: add `OPENAI_MODEL=gpt-5.4-mini` for a strong balance of capability, speed, and cost. Use `gpt-5.5` when you prefer maximum capability.
4. In FahimOS 2.0, open Settings > GPT Assistant API.
5. Use `/api/assistant` if hosted on the same Vercel project.

Never put your OpenAI API key in `app.js`, `index.html`, or any browser file.

The assistant now prepares multi-step actions as a preview. FahimOS changes data only after you select **Apply Changes**. Planning and review prompts can return advice without modifying records, and the encrypted credential vault is excluded from assistant context.

## Files

- `index.html`
- `styles.css`
- `app.js`
- `README.md`
- `package.json`
- `.env.example`
- `github-upload.html`
- `api/assistant.js`
- `assets/creative-command-bg.png`
- `assets/fahim-os-logo.svg`
