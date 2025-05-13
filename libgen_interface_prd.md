
# 📄 Product Requirements Document (PRD)

## 1. Product Overview

This application is a web-based front-end for [Library Genesis (LibGen)](http://libgen.rs), designed to simplify and automate the process of querying and downloading digital books, articles, or magazines.

The MVP allows users to paste in a plain-text list of books, automatically searches LibGen using appropriate rules, and downloads the best available match based on predefined preferences. It packages the results into a downloadable `.zip` file, complete with a report on success/failure for each item.

## 2. Target Audience

The application is built for:
- Non-technical users (e.g., students, educators, researchers, casual readers)
- Individuals who currently find LibGen’s interface or process too cumbersome
- Power users looking to automate bulk downloads of educational or recreational reading materials

## 3. Problem Statement

LibGen offers powerful access to open-access knowledge, but the interface and workflow are complex and unintuitive. Common issues users face include:
- Needing to manually navigate and search across multiple domains or database categories
- Difficulty interpreting search results and choosing mirrors or formats
- No support for batch downloads or automation

This tool solves that problem by reducing the workflow from 6+ manual steps to one automated process.

## 4. MVP Scope

The MVP will:
- Accept a plain-text list of books (`[Book Title] by [Author]`)
- Automatically categorize each book as fiction or non-fiction/sci-tech
- Query the appropriate LibGen category and parse results
- Select the most relevant file based on recency, English language, EPUB format (fallback: PDF)
- Attempt download using mirrors in order of preference, retrying as needed
- Generate a `.zip` archive of all successful downloads
- Include a plain-text download report in the archive and show a visual summary in the UI

## 5. Core Features

| Feature | Description |
|--------|-------------|
| **Book List Input** | Textarea for users to paste a list of books in `[Title] by [Author]` format |
| **Categorization** | Rule-based logic to determine fiction vs. non-fiction |
| **Search & Query** | Automated querying of LibGen's appropriate database |
| **Filtering & Prioritization** | Default to most recent, English, EPUB files (fallback to PDF) |
| **Mirror Handling** | Attempts first mirror; retries second if first fails |
| **Batch Download** | Packages all successful downloads into a `.zip` |
| **Download Report** | UI displays per-book result; also stored in `download-report.txt` inside the archive |

## 6. Tech Stack

| Component | Tool |
|----------|------|
| **Frontend** | React + Tailwind CSS |
| **Backend** | Node.js + Express or Fastify |
| **HTTP & Scraping** | `axios` + `cheerio` |
| **Archiving** | `archiver` to create ZIP files |
| **Storage** | In-memory for MVP; future: S3-compatible for persistence |
| **Deployment** | Vercel (frontend), Fly.io or Railway (backend) |

## 7. User Flow

1. **Landing Page**
   - Simple interface with paste-in text area
   - "Start Download" button

2. **Processing**
   - UI shows live progress log per title
   - Retry logic kicks in for download failures

3. **Download Page**
   - “Your archive is ready” message
   - Download button for `.zip`
   - Visual success/failure table
   - `.txt` report inside the archive

## 8. Technical Requirements

| Area | Specification |
|------|---------------|
| **Frontend Behavior** | Single-page React app; minimal input needed |
| **Backend Workflow** | For each title: categorize → query → filter → download → report |
| **ZIP Handling** | All files + report zipped; auto-deleted from temp storage after short time |
| **Mirror Resilience** | Supports retry logic and mirror failover |
| **Logging** | Persist logs of title, success/failure, and download metadata |
| **Security** | No user auth for MVP, but basic CORS, timeouts, and input sanitization required |

## 9. Constraints & Risks

| Constraint | Description |
|------------|-------------|
| **Mirror Instability** | LibGen mirrors may go offline or change structure frequently |
| **Legal/Ethical Risk** | LibGen is a grey-area source; app should avoid encouraging illegal activity |
| **Resource Limits** | MVP may need to restrict batch size or ZIP size (e.g., 500MB max) |
| **No User Auth** | For MVP simplicity, no login/account features |
| **Limited Persistence** | No long-term storage of files or user state in MVP |

## 10. Success Criteria

- A local development instance runs end-to-end with no critical bugs
- System correctly processes and downloads at least 80% of valid titles
- UI reflects status clearly and consistently
- `.zip` contains successfully downloaded books and a correct `download-report.txt`
- At least one successful full-cycle test with an external (non-developer) user

## 11. Future Scope

| Feature | Description |
|---------|-------------|
| **Kindle Integration** | Email EPUB/MOBI files directly to user's Kindle device |
| **List Import** | Parse incoming emails or integrate with booklist sources (e.g. GoodReads) |
| **User Accounts** | Enable saving download history, preferences, and personalized queues |
| **Advanced Filtering** | User-defined filters for filetype, size, year, language |
| **Browser Extension** | Launch downloads from any webpage using selected text |
